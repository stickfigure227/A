//This part updates the MySql by connecting to PHP
const day = document.getElementById('day');
const time = document.getElementById('time');
const endTime = document.getElementById('endTime');
const durationHr = document.getElementById('durationHr');
const durationMin = document.getElementById('durationMin');
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

// Register Date details
function registerDate(input) {
  let timeIntervalsavedValue = localStorage.getItem('timeIntervalSaved');

  day.textContent = formatDate(input);
  hours = input.getHours();
  minutes = String(input.getMinutes()).padStart(2, '0');
  seconds = String(input.getSeconds()).padStart(2, '0');
  milliseconds = String(input.getMilliseconds()).padStart(3, '0');
  hoursEndTime = hours + Math.floor(timeIntervalsavedValue / 60);
  minutesEndTime = input.getMinutes() + timeIntervalsavedValue % 60;
  // Determine AM or PM
  const period = hours >= 12 ? 'PM' : 'AM';
  // Convert to 12-hour format
  twelveHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  twelveHoursEndTime = hoursEndTime % 12 || 12; // Convert 0 to 12 for 12 AM
  time.textContent = `${String(twelveHours).padStart(2, '0')}:${minutes} ${period}`;
  endTime.textContent = `- ${String(twelveHoursEndTime).padStart(2, '0')}:${minutesEndTime} ${period}`;
  durationHr.textContent = `${Math.floor(timeIntervalsavedValue / 60)} hr`;
  durationMin.textContent = `${timeIntervalsavedValue % 60} min`;
}

// Open AptSetter
function initializeAptSetter() {
  startAptSetter();
}

function startAptSetter() {
  const AptSetter = document.getElementById("AptSetter");
  const apt2c1 = document.querySelector(".apt2c1"); // timeColumn
  const apt1 = document.querySelector(".apt1");
  const p = document.querySelector(".apt2c2 p"); // Correctly selecting the <p> inside .apt2c2
  if (!p) {
    console.error("Element with class 'apt2c2' and a <p> tag not found.");
    return;
  }
  const rect = p.getBoundingClientRect(); // Position of the clicked cell
  const timeColumn = apt2c1.getBoundingClientRect(); // timeColumn properties
  const AptSetterRect = AptSetter.getBoundingClientRect(); //AptSetter properties
  const apt1Rect = apt1.getBoundingClientRect();
  
  for (let i = 0; i < 7; i++) {
    if (dateOnSelect.getDate() === daysOfTheWeek[i]) {
      let left = i < 3 ? (rect.width * (i + 1)) + apt1Rect.width + timeColumn.width : rect.width * (i) - 10 - 430 + apt1Rect.width + timeColumn.width;
      left = left < 0 ? 0 : left;
      left = left > window.innerWidth - AptSetterRect.width ?  left = window.innerWidth - AptSetterRect.width : left;
      let popoutDivLeft = i < 3 ? left - rect.width : left + AptSetterRect.width + 10;
    
      let top = (window.innerHeight + 208 - 560) / 2;
      top = top < 0 ? 0 : top;
    
      // Position AptSetter
      AptSetter.style.position = 'absolute';
      AptSetter.style.left = `${left}px`;
      AptSetter.style.top = `${top}px`;
      AptSetter.style.display = 'flex'; // Show the AptSetter

      let timeIntervalsavedValue = Number(localStorage.getItem('timeIntervalSaved'));
      const td = document.querySelector(".apt2c2a tbody tr td")
      const tdRect = td.getBoundingClientRect();
      const cellWidth = tdRect.width;
      const cellHeight = tdRect.height;
      const c = dateOnSelect.getDay();
      const e = c - 1;
      const newleft = e * cellWidth;
      const m = dateOnSelect.getHours();
      const n = dateOnSelect.getMinutes();
      const b = m + n / 60;
      const d = b * 60 / timeIntervalsavedValue;
      const f = Math.ceil(d);
      const newtop = f * cellHeight;
      const scrollLocation = top - (window.innerHeight - cellHeight) / 2
      const popoutDiv = document.getElementById('popoutDiv');
      const apt2c2a = document.getElementById('apt2c2a');
      popoutDiv.style.display = 'block';
      popoutDiv.style.paddingLeft = `${newleft}px`;
      popoutDiv.style.paddingTop = `${newtop}px`;
      popoutDiv.style.width = `${cellWidth}px`;
      popoutDiv.style.height = `${cellHeight}px`;
      apt2c2a.scrollBy(0, scrollLocation);
    }
  }
}

function positioningSticker () {

}