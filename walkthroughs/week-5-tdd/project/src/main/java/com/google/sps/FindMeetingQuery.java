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

package com.google.sps;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public final class FindMeetingQuery {

  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    Collection<String> attendees = request.getAttendees();
    Collection<String> optionalAttendees = request.getOptionalAttendees();

    List<TimeRange> optionalEventTimes = new ArrayList<>();
    List<TimeRange> eventTimes = new ArrayList<>();
    events.stream()
          .sorted((e1, e2) -> e1.getWhen().start() - e2.getWhen().start())
          .forEach(e -> {
            boolean attendee = !Collections.disjoint(e.getAttendees(), attendees);
            boolean optional = !Collections.disjoint(e.getAttendees(), optionalAttendees);
            if (optional || attendee) {
              optionalEventTimes.add(e.getWhen());
            } 
            if (attendee) {
              eventTimes.add(e.getWhen());
            }
          });
    
    List<TimeRange> optionalTimes = getOpenTimes(optionalEventTimes, request.getDuration());
    List<TimeRange> mandatoryTimes = getOpenTimes(eventTimes, request.getDuration());
    return optionalTimes.size() == 0 && attendees.size() != 0 ? mandatoryTimes : optionalTimes;
  }

  private List<TimeRange> getOpenTimes(List<TimeRange> eventTimes, long duration) {
    // Add value to end of list to allow safe "peeking" at the next element in loop.
    eventTimes.add(TimeRange.fromStartDuration(TimeRange.END_OF_DAY, /* duration= */ 0));

    // Jump through day, adding times when we find space.
    int previousEnd = TimeRange.START_OF_DAY;
    List<TimeRange> meetingTimes = new ArrayList<>();
    for (int i = 0; i < eventTimes.size() - 1; i++) {
      meetingTimes.add(
          TimeRange.fromStartEnd(previousEnd, eventTimes.get(i).start(), /* inclusive= */ false));
      previousEnd = eventTimes.get(i).end();
      while (i < eventTimes.size() - 1 && eventTimes.get(i + 1).start() <= previousEnd) {
        // Skip next event because it overlaps with current event.
        i++;
        previousEnd = Math.max(previousEnd, eventTimes.get(i).end());
      }
    }
    meetingTimes.add(
        TimeRange.fromStartEnd(previousEnd, TimeRange.END_OF_DAY, /* inclusive= */ true));

    return meetingTimes.stream()
                       .filter(time -> time.duration() >= duration)
                       .collect(Collectors.toList());
  }
}
