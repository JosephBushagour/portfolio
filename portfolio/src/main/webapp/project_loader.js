// Copyright 2020 Google LLC
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

// The projects stored as an array of objects, later turned into html
let projects = [
  {
    title: "DIY Digital Watch",
    image: "/images/watch.png",
    link: "http://555dreams.blogspot.com/2018/10/creating-dip-attiny85-watch-with-ds3231.html",
    description: "A digital watch on a custom PCB. Utilizes the AtTiny85 \
        microcontroller and DS3231 real-time-clock, as well as a 74HC595 shift \
        register.",
    keywords: ["Hardware", "Digital"],
  },
  {
    title: "Internet-connect Clock/Weather Station",
    image: "/images/clock.png",
    link: "http://555dreams.blogspot.com/2020/04/making-esp8266-based-clock-and-weather.html",
    description: "A digital clock and weather station based off the ESP8266 \
        microcontroller and the MAX7219 LED Drivers.",
    keywords: ["Hardware", "Software", "Digital"],
  },
  {
    title: "555-Timer Servo Driver",
    image: "/images/servo.jpg",
    link: "http://555dreams.blogspot.com/2018/09/driving-hc-sr04-ultrasonic-sensor-and.html",
    description: "A servo driver created only using 555-timers, transistors, \
     and analog components.",
    keywords: ["Hardware", "Analog"],
  },
]

/**
 * Creates the HTML for a card given the project described by the card
 */
function generateCard(project) {
  return `
    <a href="${project.link}" target="_blank">
      <div class="card">
      <img src="${project.image}" class="thumbnail">
        <div class="text">
          <div class="title">
            <h3>${project.title}</h3>
          </div>
          <div class="description">
            <p>${project.description}</p>
          </div>
          <div class="keywords">
            <p>Tags: ${project.keywords.join(", ")}</p>
          </div>
        </div>
      </div>
    </a>
  `;
}

// Fills the cards div with each generated card
document.getElementById("cards").innerHTML = 
    projects.map(generateCard).join("");
