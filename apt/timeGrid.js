let timeIntervalChoices = [
  '10', '15', '20', '30', '45', '60', '90' //ONLY IN MINUTES!! Some function may broke down otherwise
];
const divisor7Remainder = [
  0, 1, 2, 3, 4, 5, 6
];

// I like creating <p> elements
let timeInterval = document.getElementById('timeInterval');
let timeIntervalSaved = 60;
let timeSetArrayID = [];

function iLoadTimeInterval() {
  let timeIntervalsavedValue = localStorage.getItem('timeIntervalSaved');

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

  /*
  // Creating the Time Grid
  createPs('apt2c1', numberOfTimeIWant, (index) =>  {
    const interval = timeIntervalsavedValue; // Get interval value
    const time = addTimeInterval(startTime, index * interval); // Calculate the time
    return formatTime(time); // Format the time to HH:MM AM/PM
  });

  const apt2c1 = document.getElementById('apt2c1');
  apt2c1.style.gridTemplateRows = `repeat(${numberOfTimeIWant}, 60px)`;
  const apt2c1p0 = document.getElementById('apt2c1p0');
  apt2c1p0.style.color = 'transparent';
  apt2c1p0.style.marginTop = '0';
  apt2c1p0.style.marginLeft = '16px';
  apt2c1p0.style.borderTop = '1px solid #ddd';
  
  // Clear existing table content
  function clearTable(tableId) {
    const tbody = document.querySelector(`#${tableId} tbody`);
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  // Clear and recreate the tables
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

  console.log("happy");
  
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