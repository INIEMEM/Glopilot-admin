export function formatDate(timestamp) {
  if(timestamp)
    {
        // Remove the 'Z' if it exists at the end of the timestamp
      const sanitizedTimestamp = timestamp.replace(/Z$/, '');
      const date = new Date(sanitizedTimestamp); // Convert to a Date object
  const today = new Date(); // Get today's date

  // Check if the date is today
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) {
    // If it's today, return only the time (hh:mm AM/PM format)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } else {
    // If it's not today, return full date and time (dd/mm/yyyy hh:mm AM/PM)
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
    }else
    {
      return
    }
  
  
}
