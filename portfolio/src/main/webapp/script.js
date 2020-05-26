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
function addRandomGreeting() {
  const funFacts = [
    'I perform on an improv comedy team at Purdue.', 
    'I also have a hydroponic garden.', 
    'My favorite cereal is Cheerios.', 
    'When I was in third grade I refused to wear anything other than turtle-neck shirts.',
  ];

  // determine the current fact
  const funFactContainer = document.getElementById('fun-fact-container');
  const currentFactIndex = funFacts.indexOf(funFactContainer.innerText);
  
  // Pick a new random fact.
  var funFactIndex = currentFactIndex;
  while (funFactIndex === currentFactIndex) {
    funFactIndex = Math.floor(Math.random() * funFacts.length);
  }
  const funFact = funFacts[funFactIndex];
  
  // Add it to the page. 
  funFactContainer.innerText = funFact;
}
