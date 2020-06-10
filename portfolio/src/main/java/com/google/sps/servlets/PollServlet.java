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
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/poll-results")
public class PollServlet extends HttpServlet {

  private static final String ENTITY_KIND = "Ballot";

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String poll = request.getParameter("poll");

    Filter pollFilter = new FilterPredicate("poll", FilterOperator.EQUAL, poll);
    Query query = new Query(ENTITY_KIND).setFilter(pollFilter);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    List<Entity> results = datastore.prepare(query).asList(FetchOptions.Builder.withDefaults());

    // Count the number of votes for each category to minimize JSON reponse.
    Map<String, Long> categoryVotes = 
        results.stream()
               .collect(Collectors.groupingBy(e -> (String) e.getProperty("vote"),
                                              Collectors.counting()));
    
    response.setContentType("application/json");
    Gson gson = new Gson();
    String json = gson.toJson(categoryVotes);
    response.getWriter().println(json);
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String vote = request.getParameter("vote");
    String poll = request.getParameter("poll");

    Entity ballotEntity = new Entity(ENTITY_KIND);
    ballotEntity.setProperty("poll", poll);
    ballotEntity.setProperty("vote", vote);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(ballotEntity);

    // No need to encode component because the passed in poll was already encoded.
    response.sendRedirect("/vote.html?poll=" + poll);
  }
}
