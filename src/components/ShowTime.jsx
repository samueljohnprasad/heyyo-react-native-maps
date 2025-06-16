import React from 'react';
import { Text } from 'react-native';
import TimeAgo from 'javascript-time-ago';

// Time formatting component for displaying relative time
export const ShowTime = ({ date, style }) => {
  const timeAgo = new TimeAgo('en-US');
  
  // Handle both string dates and Date objects
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Format the date as relative time (e.g., "2 hours ago")
  const formattedTime = timeAgo.format(dateObj);
  
  return (
    <Text style={style}>
      {formattedTime}
    </Text>
  );
};
