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

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawPoll);

// Map that holds all polls that can be voted on.
const polls = new Map([
  [
    'catsDogs', {
      title: 'Do you Prefer Cats or Dogs?',
      choices: ['Cats', 'Dogs'],
    }
  ],
  [
    'iceCream', {
      title: 'What is the Best Ice Cream Flavor?',
      choices: [
        'Vanilla', 
        'Chocolate', 
        'Cookies and Cream', 
        'Coffee', 
        'Chocolate Chip',
      ],
    }
  ],
  [
    'pancakesWaffles', {
      title: 'Do you Prefer Pancakes or Waffles?',
      choices: ['Pancakes', 'Waffles'],
    }
  ],
])

/**
 * Generate html for the options of polls to choose from.
 */
function getPollOptions() {
  return Array.from(polls).map((poll) => { return `
    <option value="${poll[0]}">${poll[1].title}</option>
  `
  }).join('');
}
document.getElementById('polls-choice').innerHTML = getPollOptions();

/**
 * Create the input form for user voting.
 */
function createInputForm(poll) {
  formOptions = polls.get(poll).choices.map(choice => { return `
    <option value="${choice}">${choice}</option>
  `
  }).join('');

  form = `
    <form action="/vote-results?poll=${poll}" method="POST">
      <select name="vote">
        ${formOptions}
      </select>
      <button>Submit</button>
    </form>
  `;

  document.getElementById('form-container').innerHTML = form;
}

/**
 * Fetche the voting data and creates a chart with it,
 * also update the voting submission form.
 */
async function drawPoll() {
  // Determine which poll we want to display.
  const selectorElement = document.getElementById('polls-choice');
  const choice = selectorElement.options[selectorElement.selectedIndex].value;

  const response = await fetch(`/vote-results?poll=${choice}`);
  const results = await response.json();

  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Choice');
  data.addColumn('number', 'Votes');

  Object.keys(results).forEach(result => {
    data.addRow([result, results[result]]);
  });

  const options = {
    title: polls.get(choice).title,
    width: 600,
    height: 500,
  }

  const chart = new google.visualization.ColumnChart(
      document.getElementById('chart-container'));
  chart.draw(data, options);

  createInputForm(choice);
}
