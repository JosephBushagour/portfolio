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

// The info for each clickable item in the picture
const info = {
  tackleBox: 'A cheap fishing tackle-box I bought from a hardware store.\
      They are the ideal way to organize your small components.',
  ti81: 'A Ti-81 calculator I found at a thrift store. The LCD screen\
      was broken when I found it, but upon further inspection some connections\
      just required some re-soldering.',
  computer: 'An old Dell Latitude I found in a business liquidation auction.\
      Runs linux and serves as my primary programming computer due to its \
      numerous USB/Parallel ports.',
  oscilloscope: 'This is one of my oscilloscopes; an old 1969 Sencore \
      PS163. Originally used in the TV repair business, I got this one for\
      free as a gift for running an electronics workshop at a local middle \
      school. I mostly use a Tektronix 465B nowadays, but this scope still\
      deserves its spot on my bench.',
  stm32MidiProject: 'This is one of my ongoing projects--a custom Midi\
      keyboard. It\'s based off of an STM32C8T6F103 development board, which \
      was chosen due to its relative cheapness and USB HID \
      (Human Input Device) capabilities.',
  wireDrawer: '\"And here\'s where I keep assorted lengths of wire.\"',
  mask: 'This is a mask I use for sanding, however, recently it has\
      acquired a different use...',
  devBoards: 'This box stores the majority of my development boards. \
      this includes STM32s, ESP32s, ESP8266s, AtMega328ps, Raspberry\
      Pis, and more.',
  schematics: 'These are schematics used for reference during projects.\
      For this project I\'m referencing the STM32 Pinout, and the datasheet \
      for my piezo sensors.',
  soldering: 'This is my soldering setup. My iron is a Ts-100 and I use \
      generic, hardware store flux as well as lead-free solder.',
  tape: 'A mountain of tape for various purposes, including, but not limited\
      to, electrical isolation, heat resistant adhesion, high voltage \
      warning, and more.',
  cannedAir: 'Canned air, when turned upside down, can be used as a cheap \
      \"freezer spray\" which can help test for temperature instability in \
      projects.',
  snips: 'Probably the highest quality tool I own is this pair of Hakko flush\
      cutters. They\'re a joy to use and are quite durable.',
  LEDsTransistors: 'A box shared between LEDs (5mm and 3mm) as well as \
      individual transistors (PNP and NPN). Useful beyond just aesthetics, \
      the LEDs help with quick circuit diagnosis and the transistors have \
      more uses than can be listed.',
  breadboards: 'These are breadboards, the default system for prototyping \
      circuits (provided the circuits are neither high frequency, nor high \
      power). You can never have enough!',
  resistors: 'This is a card-wallet that is used to organize my most common\
      resistors. Just out of frame is another, less organized box of them.',
  postItNotes: 'Post-its are, in my opinion, the ideal way to leave little \
      notes for future you. Plus, you can color-code them!',
  light: 'A halogen light, useful not only for the photons, but the produced \
      heat can help move solder fumes out of the way.',
}

/**
 * Upon clicking an image, this function loads that description to the html.
 */
function moreInfo(subject) {
  if (info.hasOwnProperty(subject)) {
    document.getElementById("electronics-info").innerHTML = 
        `<p>${info[subject]}</p>`
  }
}
