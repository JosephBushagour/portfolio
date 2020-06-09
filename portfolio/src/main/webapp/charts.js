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

const polls = {
  catsDogs: {
    title: 'Cats or Dogs',
    choices: ['Cats', 'Dogs'],
  },
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

/**
 * Fetches the voting data and creates a chart with it
 */
async function drawChart() {
  const response = await fetch('/vote-results');
  const results = await response.json();

  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Choice');
  data.addColumn('number', 'Votes');

  Object.keys(results).forEach(result => {
    data.addRow([result, results[result]]);
  });

  const options = {
    title: 'Cats or Dogs',
    width: 600,
    height: 500,
  }

  const chart = new google.visualization.ColumnChart(
      document.getElementById('chart-container'));
  chart.draw(data, options);
}
