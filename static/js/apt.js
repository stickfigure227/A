const today = new Date();                                             console.log('Today: ' + today);
let dateOnSelect = new Date();
let daysOfTheWeek = [];
let monthsOfTheWeek = [];
let yearsOfTheWeek = [];
const pdayIdArray = ['pday1', 'pday2', 'pday3', 'pday4', 'pday5', 'pday6', 'pday0'];
const dayNumberIdArray = [
  ["apt1b2b", "apt1b2c", "apt1b2d", "apt1b2e", "apt1b2f", "apt1b2g", "apt1b2h"],
  ["apt1b3b", "apt1b3c", "apt1b3d", "apt1b3e", "apt1b3f", "apt1b3g", "apt1b3h"],
  ["apt1b4b", "apt1b4c", "apt1b4d", "apt1b4e", "apt1b4f", "apt1b4g", "apt1b4h"],
  ["apt1b5b", "apt1b5c", "apt1b5d", "apt1b5e", "apt1b5f", "apt1b5g", "apt1b5h"],
  ["apt1b6b", "apt1b6c", "apt1b6d", "apt1b6e", "apt1b6f", "apt1b6g", "apt1b6h"],
  ["apt1b7b", "apt1b7c", "apt1b7d", "apt1b7e", "apt1b7f", "apt1b7g", "apt1b7h"]
];
let dayNumberArray = Array.from({ length: 6 }, () => Array(6).fill(0));
let monthNumberArray = Array.from({ length: 6 }, () => Array(6).fill(0));
let yearNumberArray = Array.from({ length: 6 }, () => Array(6).fill(0));
const valueToMonthAbbreviations = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const valueToMonth = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];
let abbreviatedMonthsOfTheWeek = [];
let timeIntervalChoices = [
  '10', '15', '20', '30', '45', '60', '90' //ONLY IN MINUTES!! Some function may broke down otherwise
];
const divisor7Remainder = [
  0, 1, 2, 3, 4, 5, 6
];

function initializeApt () {
  dateOnSelect = new Date();
  console.log(dateOnSelect);
  aptWeekGenerator(dateOnSelect);
}

function aptWeekGenerator (dateInput) {
  // Define variables
  const defineDay = dateInput.getDay();                               console.log("defineDay: " + defineDay); // [0, 1, 2, 3, 4, 5, 6] starting with Sunday
  const defineDate = dateInput.getDate();                             console.log("defineDate: " + defineDate);
  const defineMonth = dateInput.getMonth() + 1;                       console.log("defineMonth: " + defineMonth ); // [1, 2, ... , 12] starting with Jan
  const defineYear = dateInput.getFullYear();                         console.log("defineYear: " + defineYear );
  const defineHour = dateInput.getHours();                            console.log("defineHour: " + defineHour );
  const defineMinute = dateInput.getMinutes();                        console.log("defineMinute: " + defineMinute );
  const defineSecond = dateInput.getSeconds();                        console.log("defineSecond: " + defineSecond );
  const defineTimeZone = dateInput.getTimezoneOffset();               console.log("defineTimeZone: " + defineTimeZone );
  const previousMonth = defineMonth - 1 === 0 ? 12 : defineMonth - 1; console.log("previousMonth: " + previousMonth );
  const previousYear = defineYear - 1;
  const defineMonthLastDate = getLastDateOfMonth(defineMonth, defineYear);        console.log("defineMonthLastDate: " + defineMonthLastDate );
  const previousMonthLastDate = getLastDateOfMonth(previousMonth, defineYear);    console.log("previousMonthLastDate: " + previousMonthLastDate );
  let colorOfTheWeek = []; // determines textColor by => {-1 = washed-out; 0 = today = blue; 1 = black}
  let weekHeader;
  let longWeekHeader;         
  
  // Generating array for this week
  let a = defineDay === 0 ? 7 : defineDay; console.log("a: " + a);

  for (let i = 0; i < 7; i++) {    
    if (a - i > defineDate) {
      daysOfTheWeek[i] = previousMonthLastDate - a + i + defineDate + 1;
      monthsOfTheWeek[i] = previousMonth;
      if (previousMonth === 12) {
        yearsOfTheWeek[i] = defineYear - 1;
      } else {
        yearsOfTheWeek[i] = defineYear;
      }
    } else {
      if (defineDate - a + i + 1 > defineMonthLastDate) {
        daysOfTheWeek[i] = i - (defineMonthLastDate - defineDate + a - 1);
        
        if (defineMonth === 12) {
          yearsOfTheWeek[i] = defineYear + 1;
          monthsOfTheWeek[i] = 1;
        } else {
          yearsOfTheWeek[i] = defineYear;
          monthsOfTheWeek[i] = defineMonth + 1;
        }
      } else {
        daysOfTheWeek[i] = defineDate - a + i + 1;
        monthsOfTheWeek[i] = defineMonth;
        yearsOfTheWeek[i] = defineYear;
      }
    }

    abbreviatedMonthsOfTheWeek[i] = valueToMonthAbbreviations[monthsOfTheWeek[i] - 1];

    //Array for ColorOfTheWeek
    if (yearsOfTheWeek[i] < today.getFullYear()) {
      colorOfTheWeek[i] = -1;
    } else if (yearsOfTheWeek[i] > today.getFullYear()) {
      colorOfTheWeek[i] = 1;
    } else {
      if (monthsOfTheWeek[i] < today.getMonth() + 1) {
        colorOfTheWeek[i] = -1;
      } else if (monthsOfTheWeek[i] > today.getMonth() + 1) {
        colorOfTheWeek[i] = 1;
      } else {
        if (daysOfTheWeek[i] < today.getDate()) {
          colorOfTheWeek[i] = -1;
        } else if (daysOfTheWeek[i] > today.getDate()) {
          colorOfTheWeek[i] = 1;
        } else {
          colorOfTheWeek[i] = 0;
        }
      }
    }
  }
  
  console.log("daysOfTheWeek: " + daysOfTheWeek );
  console.log("monthsOfTheWeek: " + monthsOfTheWeek );
  console.log("yearsOfTheWeek: " + yearsOfTheWeek );
  console.log("colorOfTheWeek: " + colorOfTheWeek );
  console.log("abbreviatedMonthsOfTheWeek: " + abbreviatedMonthsOfTheWeek );

/*
  // Defining MiniCalendar
  let totalWeekNumber;
  let prevTotalWeekNumber;
  let firstWeekNumber;
  let totalDaysToMonth;
  let startWeekOfMonth;
  let weekNumberArray = [];
  let colorDayNumberArray = Array.from({ length: 6 }, () => Array(6).fill(0));

  // If the year starts before or on Thursday, and ends after or on Thursday, it has 53 weeks 
  if ((defineYear % 4 === 0 && (defineYear % 100 !== 0 || defineYear % 400 === 0) && (new Date(defineYear, 0, 1).getDay() === 3 || new Date(defineYear, 0, 1).getDay() === 4)) || new Date(defineYear, 0, 1).getDay() === 4) {
    totalWeekNumber = 53;
  } else {
    totalWeekNumber = 52;
  }

  if ((previousYear % 4 === 0 && (previousYear % 100 !== 0 || previousYear % 400 === 0) && (new Date(previousYear, 0, 1).getDay() === 3 || new Date(previousYear, 0, 1).getDay() === 4)) || new Date(previousYear, 0, 1).getDay() === 4) {
    prevTotalWeekNumber = 53;
  } else {
    prevTotalWeekNumber = 52;
  }

  console.log("totalWeekNumber: " + totalWeekNumber );

  // Calculate firstWeekNumber
  if (new Date(defineYear, 0, 1).getDay() >= 5) {
    firstWeekNumber = 0;
  } else {
    firstWeekNumber = 1;
  }

  console.log("firstWeekNumber: " + firstWeekNumber );

  // Calculate totalDaysToMonth
  function totalDayz(date, month, year) {
    const daysInMonths = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  
    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

    const leapYearAdjustment = isLeapYear && month > 2 ? 1 : 0;
  
    const dayz = daysInMonths[month - 1] + date + leapYearAdjustment;
  
    return dayz;
  }

  totalDaysToMonth = totalDayz(1, defineMonth, defineYear);
  console.log("totalDaysToMonth: " + totalDaysToMonth );

  // Calculate startWeekOfMonth
  const b = new Date(defineYear, 0, 1).getDay();
  let c = b >= 5 ? b - 5 : b + 2;
  if (totalDaysToMonth % 7 + c <= 2) {
    startWeekOfMonth = Math.floor(totalDaysToMonth / 7);
  } else if (totalDaysToMonth % 7 + c >= 10) {
    startWeekOfMonth = Math.floor(totalDaysToMonth / 7) + 2;
  } else {
    startWeekOfMonth = Math.floor(totalDaysToMonth / 7) + 1;
  }

  console.log("startWeekOfMonth: " + startWeekOfMonth );

  for (let i = 0; i < 7; i++) {
    if (i === 0 && startWeekOfMonth === 0) {
      weekNumberArray[i] = prevTotalWeekNumber;
    } else if (startWeekOfMonth + i > totalWeekNumber) {
      weekNumberArray[i] = i - totalWeekNumber + startWeekOfMonth;
    } else {
      weekNumberArray[i] = startWeekOfMonth + i;
    }
  }

  console.log("weekNumberArray: " + weekNumberArray );

  //Generate the days
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const d = new Date(defineYear, defineMonth - 1, 1).getDay();
      const f = j - d + 1;

      if (i === 0) {
        dayNumberArray[i][j] = j >= d ? f : previousMonthLastDate + f;
        monthNumberArray[i][j] = j >= d ? defineMonth : previousMonth;
        yearNumberArray[i][j] = (monthNumberArray[i][j] === previousMonth) && (monthNumberArray[i][j] === 12) ? defineYear - 1 : defineYear;
      } else if (f + i * 7 > defineMonthLastDate) {
        dayNumberArray[i][j] = f + i * 7 - defineMonthLastDate;
        monthNumberArray[i][j] = defineMonth === 12 ? 1 : defineMonth + 1;
        yearNumberArray[i][j] = defineMonth === 12 ? defineYear + 1 : defineYear;
      } else {
        dayNumberArray[i][j] = f + i * 7;
        monthNumberArray[i][j] = defineMonth;
        yearNumberArray[i][j] = defineYear;
      }

      colorDayNumberArray[i][j] = didYouSelectThisDate(dayNumberArray[i][j], monthNumberArray[i][j], yearNumberArray[i][j]);
    }
  }

  function didYouSelectThisDate(date, month, year) {
    let value;

    if (date === today.getDate() && month === today.getMonth() + 1 && year === today.getFullYear()) {
      value = 1;
    } else if (date === defineDate && month === defineMonth && year === defineYear) {
      value = -1;
    } else {
      value = month != defineMonth ? -2 : 0;
    }

    return value;
  }

  console.log("dayNumberArray: " + dayNumberArray );
  console.log("monthNumberArray: " + monthNumberArray );
  console.log("yearNumberArray: " + yearNumberArray );
  console.log("colorDayNumberArray: " + colorDayNumberArray );
  //Color the generated Days, if dateInput = -1, today = 1, else = 0
  */
  // Week 'apt2b2'
  // Week Header
  const wYear = document.getElementById('wYear');
  const setUniqueYearsOfTheWeek = new Set(yearsOfTheWeek);
  const uniqueYearsOfTheWeek = Array.from(setUniqueYearsOfTheWeek); console.log("uniqueYearsOfTheWeek: " + uniqueYearsOfTheWeek );
  const setUniqueMonthsOfTheWeek = new Set(monthsOfTheWeek);
  const uniqueMonthsOfTheWeek = Array.from(setUniqueMonthsOfTheWeek); console.log("uniqueMonthsOfTheWeek: " + uniqueMonthsOfTheWeek );
  const weekHeaderArray = [
    valueToMonthAbbreviations[uniqueMonthsOfTheWeek[0] - 1] + " " + uniqueYearsOfTheWeek[0] + " - " +  valueToMonthAbbreviations[uniqueMonthsOfTheWeek[1] - 1] + " " + uniqueYearsOfTheWeek[1],
    valueToMonthAbbreviations[uniqueMonthsOfTheWeek[0] - 1] + " - " + valueToMonthAbbreviations[uniqueMonthsOfTheWeek[1] - 1] + " " + uniqueYearsOfTheWeek[0],
    valueToMonthAbbreviations[uniqueMonthsOfTheWeek[0] - 1] + " " + uniqueYearsOfTheWeek[0]
  ];
  longWeekHeader = setUniqueYearsOfTheWeek.size != 2 && setUniqueMonthsOfTheWeek.size === 2 ? weekHeaderArray[1] : weekHeaderArray[0];
  weekHeader = setUniqueYearsOfTheWeek.size === 2 || setUniqueMonthsOfTheWeek.size === 2 ? longWeekHeader : weekHeaderArray[2];
  console.log(weekHeader);
  wYear.textContent = weekHeader;


  // Week Coloring
  const dayIdArray = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day0'];
  const monIdArray = ['mon1', 'mon2', 'mon3', 'mon4', 'mon5', 'mon6', 'mon0'];
  const colorForWeek = ['#a3a3a3', '#ffffff', '#000000'];
  const redColorForWeek = ['rgba(254, 97, 90, 0.6)', '#ffffff', 'rgba(254, 97, 90)'];
  const bgColorForWeek = ['', '#007bff', ''];
  const bgRedColorForWeek = ['', 'rgba(254, 97, 90)', ''];
  const weekNumberIdArray = ["apt1b2a", "apt1b3a", "apt1b4a", "apt1b5a", "apt1b6a", "apt1b7a"];
  const blueArray = ['rgba(0, 123, 255, 0.3)', 'rgb(255, 255, 255)', 'rgb(0, 123, 255)'];
  const redArray = ['rgba(254, 97, 90, 0.3)', 'rgb(255, 255, 255)', 'rgb(254, 97, 90)'];

  for (let i = 0; i < 7; i++) {
    const elementID = document.getElementById(dayIdArray[i]);
    const monElementID = document.getElementById(monIdArray[i]);
    const parentElement = document.getElementById(pdayIdArray[i]);
    elementID.textContent = daysOfTheWeek[i];
    monElementID.textContent = abbreviatedMonthsOfTheWeek[i];
    //Coloring f(x)
    function parentElementStyler (backgroundColor, color, borderRadius, paddingLeft) {
      parentElement.style.backgroundColor = backgroundColor;
      parentElement.style.color = color;
      parentElement.style.borderRadius = borderRadius;
      parentElement.style.paddingLeft = paddingLeft;
    }
    //Blue
    parentElementStyler (bgColorForWeek[colorOfTheWeek[i] + 1], colorForWeek[colorOfTheWeek[i] + 1], "8px", "10px");
    if (defineDate === daysOfTheWeek[i] && defineMonth === monthsOfTheWeek[i] && defineYear === yearsOfTheWeek[i]) {
      let bgC = colorOfTheWeek[i] === 0 ? blueArray[2] : blueArray[0];
      let txC = colorOfTheWeek[i] === 1 ? blueArray[2] : blueArray[1];
      parentElementStyler(bgC, txC);
    }
    //Red
    if (i === 6) {
      parentElementStyler (bgRedColorForWeek[colorOfTheWeek[i] + 1], redColorForWeek[colorOfTheWeek[i] + 1], "8px", "10px");
      if (defineDate === daysOfTheWeek[i] && defineMonth === monthsOfTheWeek[i] && defineYear === yearsOfTheWeek[i]) {
        parentElementStyler (redArray[0]);
        if(colorOfTheWeek[i] === 0) {
          parentElementStyler (redArray[2], redArray[1]);
        }
      }
    }
  }

  // MiniCalendar ('apt1a' && 'apt1b')
  const monYear = document.getElementById('monYear');
  monYear.textContent = valueToMonth[defineMonth - 1] + ' ' + defineYear;                         console.log("miniCalendarHeader: " + monYear.textContent );

  for (let i = 0; i < 6; i++) {
    let elementID = document.getElementById(weekNumberIdArray[i]);
    elementID.textContent = weekNumberArray[i];
    elementID.style.padding = '8px';
  }

  const colorForMiniCalendar = ['#a3a3a3', '#007bff', '#000000', '#ffffff']
  const bgColorForMiniCalendar = ['', 'rgba(0, 123, 255, 0.3)', '', '#007bff']

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      let elementID = document.getElementById(dayNumberIdArray[i][j]);
      elementID.textContent = dayNumberArray[i][j];
      elementID.style.color = colorForMiniCalendar[colorDayNumberArray[i][j] + 2];
      elementID.style.backgroundColor = bgColorForMiniCalendar[colorDayNumberArray[i][j] + 2];
      elementID.style.margin = '3px';
    }
  }

  day.textContent = formatDate(dateOnSelect);
  hours = dateOnSelect.getHours();
  minutes = String(dateOnSelect.getMinutes()).padStart(2, '0');
  seconds = String(dateOnSelect.getSeconds()).padStart(2, '0');
  milliseconds = String(dateOnSelect.getMilliseconds()).padStart(3, '0');
  // Determine AM or PM
  const period = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  twelveHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM

  time.textContent = `${String(twelveHours).padStart(2, '0')}:${minutes} ${period}`;

}

//Some buttons
function goToToday() {
  initializeApt();
}

function prevWeek() {
  dateOnSelect.setDate(dateOnSelect.getDate() - 7);
  console.log(dateOnSelect);
  aptWeekGenerator(dateOnSelect);
}

function nextWeek() {
  dateOnSelect.setDate(dateOnSelect.getDate() + 7);
  console.log(dateOnSelect);
  aptWeekGenerator(dateOnSelect);
}

function prevMonth() {
  dateOnSelect.setMonth(dateOnSelect.getMonth() - 1);
  console.log(dateOnSelect);
  aptWeekGenerator(dateOnSelect);
}

function nextMonth() {
  dateOnSelect.setMonth(dateOnSelect.getMonth() + 1);
  console.log(dateOnSelect);
  aptWeekGenerator(dateOnSelect);
}

// When click week number
for (let i = 0; i < 7; i++) {
  let elementID = document.getElementById(pdayIdArray[i]);
  elementID.addEventListener('click', function() {
    dateOnSelect.setDate(daysOfTheWeek[i]);
    dateOnSelect.setMonth(monthsOfTheWeek[i] - 1);
    dateOnSelect.setFullYear(yearsOfTheWeek[i]);
    console.log(dateOnSelect);
    aptWeekGenerator(dateOnSelect);
    CloseAptSetter();
    flipFlopAptSetter();
  });
}

// When click miniCalendar
for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 7; j++) {
    let elementID = document.getElementById(dayNumberIdArray[i][j]);
    elementID.addEventListener('click', function() {
      dateOnSelect.setDate(dayNumberArray[i][j]);
      dateOnSelect.setMonth(monthNumberArray[i][j] - 1);
      dateOnSelect.setFullYear(yearNumberArray[i][j]);
      console.log(dateOnSelect);
      aptWeekGenerator(dateOnSelect);
    });
  }
}

// Open AptSetter
let isInitializeAptSetter = true;

function initializeAptSetter() {
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
      let left = i < 3 ? 10 + (rect.width * (i + 1)) + apt1Rect.width + timeColumn.width : rect.width * (i) - 10 - 430 + apt1Rect.width + timeColumn.width;
      left = left < 0 ? 0 : left;
      left = left > window.innerWidth - AptSetterRect.width ?  left = window.innerWidth - AptSetterRect.width : left;
    
      let top = (window.innerHeight + 208 - 560) / 2;
      top = top < 0 ? 0 : top;
    
      // Position AptSetter
      AptSetter.style.position = 'absolute';
      AptSetter.style.left = `${left}px`;
      AptSetter.style.top = `${top}px`;
      AptSetter.style.display = 'flex'; // Show the AptSetter
    }
  }
}

const createAptSetter = document.getElementById('createAptSetter');
function flipFlopAptSetter() {
  isInitializeAptSetter = !isInitializeAptSetter;
}

createAptSetter.addEventListener('click', function() {
  if (isInitializeAptSetter) {
    initializeAptSetter();
  } else {
    CloseAptSetter();
  }
  flipFlopAptSetter();
});

// I like creating <p> elements
let timeInterval = document.getElementById('timeInterval');
let timeIntervalSaved = 60;

function createPs(parentId, numOfPs, contents) {
  const parent = document.getElementById(parentId);
  parent.innerHTML = '';

  for (let i = 0; i < numOfPs; i++) {
    const newPp = document.createElement('p');
    newPp.textContent = contents(i);
    newPp.id = parentId + 'p' + i;
    parent.appendChild(newPp);
    
  }
}

let timeSetArrayID = [];

function iLoadTimeInterval() {
  console.log(localStorage.getItem('timeIntervalSaved'));
  let timeIntervalsavedValue = localStorage.getItem('timeIntervalSaved');
  console.log(timeIntervalsavedValue);

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

  createPs('apt2c1', numberOfTimeIWant, (index) =>  {
    const interval = timeIntervalsavedValue; // Get interval value
    const time = addTimeInterval(startTime, index * interval); // Calculate the time
    return time.toTimeString().slice(0, 5); // Format the time to HH:MM
  });

  const apt2c1 = document.getElementById('apt2c1');
  apt2c1.style.gridTemplateRows = `repeat(${numberOfTimeIWant}, 60px)`;

  // creating the grid
  createPs('apt2c2', numberOfTimeIWant * 7, (index) => {const time = ''; return time;});
  const apt2c2 = document.getElementById('apt2c2');
  apt2c2.style.gridTemplateRows = `repeat(${numberOfTimeIWant}, 60px)`;

  function newTimeSetArray (frontWord, howMuch) {
    for (let i = 0; i < howMuch; i++) {
      timeSetArrayID[i] = frontWord + i;
    }
  }

  newTimeSetArray ('apt2c2p', numberOfTimeIWant * 7);
  console.log(timeSetArrayID);
}

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
})

// Create Options Element
function createOptions(parentId, contents) {
  const parent = document.getElementById(parentId);
  parent.innerHTML = '';
  const arrayLength = contents.length;
  console.log(arrayLength);

  for (let i = 0; i < arrayLength; i++) {
    const newOptions = document.createElement('option');
    newOptions.textContent = contents[i] + ' min';
    newOptions.id = contents[i];
    newOptions.value = contents[i];
    parent.appendChild(newOptions);
  }
}

// Define monthLastDates
function getLastDateOfMonth(month, year) {
  let lastDate;

  if ([4, 6, 9, 11].includes(month)) {
    lastDate = 30;
  } else if (month === 2) {
    lastDate = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
  } else {
    lastDate = 31;
  }

  return lastDate;
}

// Setting the time
function handleClick(event) {
  let timeIntervalsavedValue = localStorage.getItem('timeIntervalSaved');
  console.log(timeIntervalsavedValue);

  const clickedElement = event.target;
  // Extracting the X value from the ID
  const id = clickedElement.id;
  const match = id.match(/^apt2c2p(\d+)$/);
  let xValue;
  if (match) {
      xValue = match[1];
      console.log(`Clicked element ID: ${id}, X value: ${xValue}`);

      const newTime = Math.floor(xValue / 7);
      console.log(newTime);
    
      dateOnSelect.setHours(0);
      dateOnSelect.setMinutes(0);
      dateOnSelect.setMinutes(newTime * timeIntervalsavedValue);
    
      for (let i = 0; i < 7; i++) {
        if (xValue % 7 === divisor7Remainder[i]) {
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

function loadApt() {
  initializeApt();
  loadTimeIntervalChoices();
}

window.onload = function() {}
  