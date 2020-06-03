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

/**
 * Adds a random fun fact to the page.
 */
function addRandomFunFact() {
  const funFacts = [
    'I perform on an improv comedy team at Purdue.', 
    'I also have a hydroponic garden.', 
    'My favorite cereal is Cheerios.', 
    'When I was in third grade I refused to wear anything other than turtle-neck shirts.',
    'I\'ve picked up the hobby of making my own hot sauces.',
    'I have an extensive collection of cheap pens.',
    'I have acquired enough vintage electronic test equipment to start my own lab.',
    'I used to play percussion but I wasn\'t very good.',
    'I have a pet cat names Oliver.',
  ];

  // determine the current fact
  const funFactContainer = document.getElementById('fun-fact-container');
  const currentFact = funFactContainer.innerText;

  // get the new fun fact
  let newFact;
  do {
    newFact = funFacts[Math.floor(Math.random() * funFacts.length)];
  } while (currentFact === newFact);

  // Add it to the page. 
  funFactContainer.innerText = newFact;
}

/**
 * Displays a greeting on the page using fetch
 */
async function displayComments() {
  const commentAmount = document.getElementById("comment-amount").value;

  // get comments from /data page
  const response = await fetch(`/data?comment-amount=${commentAmount}`);
  const comments = await response.json();

  // determine what to output
  const output = comments.length 
      ? comments.join('\n') : "--There are currently no comments--";

  // output the comments (or lack thereof) on the page
  document.getElementById('comment-container').innerText = output;
}
