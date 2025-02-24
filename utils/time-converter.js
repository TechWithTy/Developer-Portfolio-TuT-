export function timeConverter(isoTime) {
  const currentTime = new Date();
  const pastTime = new Date(isoTime);
  
  const timeDifference = currentTime.getTime() - pastTime.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Use date objects for accurate month and year calculations
  const monthsDiff =
    currentTime.getMonth() -
    pastTime.getMonth() +
    12 * (currentTime.getFullYear() - pastTime.getFullYear());

  const yearsDiff = currentTime.getFullYear() - pastTime.getFullYear();

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (monthsDiff < 12) {
    return monthsDiff === 1 ? "1 month ago" : `${monthsDiff} months ago`;
  } else {
    // Handle the "exactly 1 year ago" edge case
    if (yearsDiff === 1 && monthsDiff === 12 && currentTime < new Date(pastTime.getFullYear() + 1, pastTime.getMonth(), pastTime.getDate())) {
      return "12 months ago";
    }
    return yearsDiff === 1 ? "1 year ago" : `${yearsDiff} years ago`;
  }
}
