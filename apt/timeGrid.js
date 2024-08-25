let timeIntervalChoices = [
  '10', '15', '20', '30', '45', '60', '90' //ONLY IN MINUTES!! Some function may broke down otherwise
];
const divisor7Remainder = [
  0, 1, 2, 3, 4, 5, 6
];

// Update Ball and Line
let timeIntervalsavedValue = localStorage.getItem('timeIntervalSaved');
setInterval(ballAndLinePosition, 600 * timeIntervalsavedValue);
console.log(600 * timeIntervalsavedValue);

// I like creating <p> elements
let timeInterval = document.getElementById('timeInterval');
let timeIntervalSaved = 60;
let timeSetArrayID = [];

function iLoadTimeInterval() {
  let timeIntervalsavedValue = localStorage.getItem('timeIntervalSaved');
  const apt2c = document.getElementById('apt2c');

  function loadSelection() {
    const savedValue = localStorage.getItem('timeIntervalSaved');
    if (savedValue) {
      timeInterval.value = savedValue;
    }
  }

  loadSelection();

  const numberOfTimeIWant = 24 * 60 / timeIntervalsavedValue;
  let startTime = new Date();
  startTime.setHours(0, 0, 0, 0);

  function addTimeInterval(startTime, interval) {
    const newTime = new Date(startTime.getTime()); // Create a copy of the base time
    newTime.setMinutes(newTime.getMinutes() + interval); // Add interval
    return newTime;
  }

  // Clear existing table content
  function clearTable(tableId) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  clearTable('apt2c1a');
  createTableElements('apt2c1a', numberOfTimeIWant, 1, (i) => {
    const interval = timeIntervalsavedValue; // Get interval value
    const time = addTimeInterval(startTime, i * interval); // Calculate the time
    return formatTime(time); // Format the time to HH:MM AM/PM
  });
  
  clearTable('apt2c0a');
  createTableElements('apt2c0a', numberOfTimeIWant, 1, (i) => '');
  
  clearTable('apt2c2a');
  createTableElements('apt2c2a', numberOfTimeIWant, 7, (i) => '');
  const apt2c1atd00 = document.getElementById('apt2c1atd0-0');
  apt2c1atd00.style.color = 'transparent';

  // Scrolling
  const apt2cRectHeight = apt2c.getBoundingClientRect().height;
  const minOnSelect = dateOnSelect.getHours() * 60 + dateOnSelect.getMinutes() + dateOnSelect.getSeconds() / 60;
  const roundingTime = Math.floor(minOnSelect / timeIntervalsavedValue);
  const scrollDeterminant = roundingTime * 62.8 - (apt2cRectHeight - 62.8) / 5;
  scrollToFunction('apt2c', scrollDeterminant);

  ballAndLinePosition();
}

// Ball disappears or reappears
function ballDisappearOrReappear() {
  if (weekCount === 0 && monthCount === 0) {
    ball.style.display = 'block';
    line.style.display = 'block';
  } else {
    ball.style.display = 'none';
    line.style.display = 'none';
  }
}

function ballAndLinePosition() {
  // Ball & Line Position
  let timeIntervalsavedValue = localStorage.getItem('timeIntervalSaved');
  const minOnSelect = new Date().getHours() * 60 + new Date().getMinutes() + new Date().getSeconds() / 60;
  const apt2cCell0 = document.getElementById('apt2c2atd0-0'); 
  const apt2cCell0Width = apt2cCell0.getBoundingClientRect().width;
  const todayDay = new Date().getDay();
  const todayDay1 = todayDay || 7;
  const ball = document.getElementById('ball');
  ball.style.top = `${minOnSelect * 62.8 / timeIntervalsavedValue - 6}px`;
  ball.style.left = `${(todayDay1 - 1) * apt2cCell0Width}px`;
  const line = document.getElementById('line');
  line.style.top = `${minOnSelect * 62.8 / timeIntervalsavedValue - 1}px`;
  line.style.width = `${apt2cCell0Width}px`;
  line.style.left = `${(todayDay1 - 1) * apt2cCell0Width}px`;
}

// Scroll Apt2c
function scrollToFunction(id, scrollAmount = 0) {
  const element = document.getElementById(id);
  element.scrollTop += scrollAmount; // Scroll down by the specified amount
}

// Extract Selected TimeInterval Value
timeInterval.addEventListener('change', function() {
  function getTimeIntervalValue() {
    const selectedOption = timeInterval.options[timeInterval.selectedIndex];
    return parseInt(selectedOption.value, 10);
  }

  console.log(getTimeIntervalValue()); // returns the timeInterval value

  timeIntervalSaved = getTimeIntervalValue();
  const stringifyingTIS = String(timeIntervalSaved);
  console.log(timeIntervalSaved);
  console.log(stringifyingTIS);
  localStorage.setItem('timeIntervalSaved', stringifyingTIS);

  iLoadTimeInterval();
  CloseAptSetter();
})

// Setting the time
function handleClick(event) {
  let timeIntervalsavedValue = localStorage.getItem('timeIntervalSaved');
  console.log(timeIntervalsavedValue);

  const clickedElement = event.target;
  // Extracting the X value from the ID
  const id = clickedElement.id;
  const match = id.match(/^apt2c2atd(\d+)-(\d+)$/);
  let xValue;
  let yValue;
  if (match) {
      xValue = match[1];
      yValue = match[2];
    
      dateOnSelect.setHours(0);
      dateOnSelect.setMinutes(0);
      dateOnSelect.setMinutes(xValue * timeIntervalsavedValue);
    
      for (let i = 0; i < 7; i++) {
        if (yValue % 7 === divisor7Remainder[i]) {
          dateOnSelect.setDate(daysOfTheWeek[i]);
          dateOnSelect.setMonth(monthsOfTheWeek[i] - 1);
          dateOnSelect.setFullYear(yearsOfTheWeek[i]);
        }
      }
    
      console.log(dateOnSelect);
      aptWeekGenerator(dateOnSelect);
  } else {
      console.log(`Clicked element ID: ${id}, no X value found`);
  }
}

// Add event listeners to all <p> elements
document.getElementById('apt2c2').addEventListener('click', handleClick);

function loadTimeIntervalChoices() {
  createOptions('timeInterval', timeIntervalChoices);
  iLoadTimeInterval();
}

// Horizontal Scrolling
document.addEventListener('DOMContentLoaded', () => {
  const apt2c2 = document.getElementById('apt2c2');
  const wYear = document.getElementById('wYear');
  const monYear = document.getElementById('monYear');
  const apt1b = document.getElementById('apt1b');
  apt2c2.addEventListener('wheel', (event) => {
    // Check if Shift key is pressed
    if (event.shiftKey) {
      // Prevent default scroll behavior
      event.preventDefault();

      // Trigger prevWeek or nextWeek button clicks based on scroll direction
      if (event.deltaY < 0) {
        console.log('Scrolled up with Shift key pressed');
        prevWeek(); // Trigger the click event for the 'prevWeek' button
      } else if (event.deltaY > 0) {
        console.log('Scrolled down with Shift key pressed');
        nextWeek(); // Trigger the click event for the 'nextWeek' button
      }
    } else {
      CloseAptSetter();
    }
  });
  wYear.addEventListener('wheel', (event) => {
    if (event.shiftKey) {
      event.preventDefault();
      if (event.deltaY < 0) {
        prevWeek();
      } else if (event.deltaY > 0) {
        nextWeek();
      }
    }
  })
  monYear.addEventListener('wheel', (event) => {
    if (event.shiftKey) {
      event.preventDefault();
      if (event.deltaY < 0) {
        prevMonth();
      } else if (event.deltaY > 0) {
        nextMonth();
      }
      CloseAptSetter();
    }
  })
  apt1b.addEventListener('wheel', (event) => {
    if (event.shiftKey) {
      event.preventDefault();
      if (event.deltaY < 0) {
        prevMonth();
      } else if (event.deltaY > 0) {
        nextMonth();
      }
      CloseAptSetter();
    }
  })
});