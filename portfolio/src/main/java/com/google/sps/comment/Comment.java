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

package com.google.sps.comment;

import com.google.appengine.api.datastore.Entity;

public class Comment {
  private double sentimentScore;
  private String text;

  public Comment(String text, double sentimentScore) {
    this.text = text;
    this.sentimentScore = sentimentScore;
  }

  // Secondary constructor for constructing from an entity
  public Comment(Entity e) {
    this.text = (String) e.getProperty("text");
    this.sentimentScore = (double) e.getProperty("sentimentScore");
  }
}
