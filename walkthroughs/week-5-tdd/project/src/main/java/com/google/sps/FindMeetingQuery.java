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

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.LinkedList;
import java.util.stream.Collectors;

public final class FindMeetingQuery {

  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    Collection<String> attendees = request.getAttendees();
    List<TimeRange> eventTimes =
        events.stream()
              .filter(e -> !Collections.disjoint(e.getAttendees(), attendees))
              .map(Event::getWhen)
              .sorted((range1, range2) -> range1.start() - range2.start())
              .collect(Collectors.toList());
    
    // Add value to end of list to allow safe "peeking" at the next element in loop.
    eventTimes.add(TimeRange.fromStartDuration(TimeRange.END_OF_DAY, 0));

    // Jump through day, adding meetings when we find space.
    int end = 0;
    List<TimeRange> meetingTimes = new LinkedList<>();
    for (int i = 0; i < eventTimes.size() - 1; i++) {
      meetingTimes.add(TimeRange.fromStartEnd(end, eventTimes.get(i).start(), false));
      end = eventTimes.get(i).end();
      while (i < eventTimes.size() - 1 && eventTimes.get(i + 1).start() <= end) {
        // Skip next event because it overlaps with current event.
        i++;
        end = Math.max(end, eventTimes.get(i).end());
      }
    }
    meetingTimes.add(TimeRange.fromStartEnd(end, TimeRange.END_OF_DAY, true));

    meetingTimes = meetingTimes.stream()
                               .filter(time -> time.duration() >= request.getDuration())
                               .collect(Collectors.toList());
    return meetingTimes;
  }
}
