//This part updates the MySql by connecting to PHP
const day = document.getElementById('day');
const time = document.getElementById('time');
let hours;
let minutes;
let seconds; 
let milliseconds; 
let fullDate;

// Function to format the date
function formatDate(date) {
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}