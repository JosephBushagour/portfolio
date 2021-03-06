// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import com.google.gson.Gson;
import com.google.sps.comment.Comment;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that saves and returns comments */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    int commentAmount = getCommentAmount(request);

    // Get 'commentAmount' of comments sorted by timestamp
    // Newest first so new conversation is not buried under older posts
    Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery pq = datastore.prepare(query);
    List<Entity> results = pq.asList(FetchOptions.Builder.withLimit(commentAmount));

    List<Comment> comments = results.stream()
                                    .map(e -> new Comment(e))
                                    .collect(Collectors.toList());

    // Convert the comments to JSON
    Gson gson = new Gson();
    String json = gson.toJson(comments);

    // Respond with our comments
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String comment = request.getParameter("comment");
    
    // Time used to guarantee order of comments
    long timestamp = System.currentTimeMillis();

    // Build document for sentiment analysis
    Document doc =
        Document.newBuilder().setContent(comment).setType(Document.Type.PLAIN_TEXT).build();
    LanguageServiceClient languageService = LanguageServiceClient.create();
    Sentiment sentiment = languageService.analyzeSentiment(doc).getDocumentSentiment();
    float score = sentiment.getScore();
    languageService.close();

    Entity commentEntity = new Entity("Comment");
    commentEntity.setProperty("text", comment);
    commentEntity.setProperty("timestamp", timestamp);
    commentEntity.setProperty("sentimentScore", score);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(commentEntity);

    // Redirect user in order to leave the /data page
    response.sendRedirect("/index.html");
  }

  /** Returns the amount of comments entered by the user (10 if unable to parse). */
  private int getCommentAmount(HttpServletRequest request) {
    String commentAmountString = request.getParameter("comment-amount");

    int commentAmount;
    try {
      commentAmount = Integer.parseInt(commentAmountString);
    } catch (NumberFormatException e) {
      // Return default value if unable to parse integer, comments will still show
      return 10;
    }

    // Keep the amount of comments within the boundaries set by the HTML
    if (commentAmount < 1) {
      commentAmount = 1;
    } else if (commentAmount > 50) {
      commentAmount = 50;
    }

    return commentAmount;
  }
}
