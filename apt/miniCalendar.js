const dayNumberIdArray = [
  ["apt1b2b", "apt1b2c", "apt1b2d", "apt1b2e", "apt1b2f", "apt1b2g", "apt1b2h"],
  ["apt1b3b", "apt1b3c", "apt1b3d", "apt1b3e", "apt1b3f", "apt1b3g", "apt1b3h"],
  ["apt1b4b", "apt1b4c", "apt1b4d", "apt1b4e", "apt1b4f", "apt1b4g", "apt1b4h"],
  ["apt1b5b", "apt1b5c", "apt1b5d", "apt1b5e", "apt1b5f", "apt1b5g", "apt1b5h"],
  ["apt1b6b", "apt1b6c", "apt1b6d", "apt1b6e", "apt1b6f", "apt1b6g", "apt1b6h"],
  ["apt1b7b", "apt1b7c", "apt1b7d", "apt1b7e", "apt1b7f", "apt1b7g", "apt1b7h"]
];
const weekNumberIdArray = ["apt1b2a", "apt1b3a", "apt1b4a", "apt1b5a", "apt1b6a", "apt1b7a"];
const colorForMiniCalendar = ['#a3a3a3', '#007bff', '#000000', '#ffffff'];
const bgColorForMiniCalendar = ['', 'rgba(0, 123, 255, 0.3)', '', '#007bff'];

function initializeMiniCalendar(input) {
  loadMonthHeader(input);
  weekNumberArrayGenerator(input);
  miniCalendarNumberArrayGenerator(input);
}

// Load Month's Header
function loadMonthHeader(input) {
  const defineMonth = input.getMonth() + 1;
  const defineYear = input.getFullYear();
  const valueToMonth = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monYear = document.getElementById('monYear');
  monYear.textContent = valueToMonth[defineMonth - 1] + ' ' + defineYear;
  return monYear.textContent
}

// Create weekNumberArray for the miniCalendar
function weekNumberArrayGenerator(input) {
  const defineMonth = input.getMonth() + 1;
  const defineYear = input.getFullYear();
  const previousYear = defineYear - 1;
  const totalDaysToMonth = totalDayz(1, defineMonth, defineYear);
  const firstDayOfYear = new Date(defineYear, 0, 1).getDay();
  const isLeapYear = leapYear(defineYear);
  const prevFirstDayOfYear = new Date(previousYear, 0, 1).getDay();
  const prevIsLeapYear = leapYear(previousYear);
  const startWeekOfMonth = Math.floor(totalDaysToMonth / 7) + Math.floor((totalDaysToMonth % 7 + (firstDayOfYear + 2) % 7 + 4) / 7);
  const totalWeekNumber = (isLeapYear && [3, 4].includes(firstDayOfYear)) || firstDayOfYear === 4 ? 53 : 52;
  const prevTotalWeekNumber = (prevIsLeapYear && [3, 4].includes(prevFirstDayOfYear)) || prevFirstDayOfYear === 4 ? 53 : 52;
  const weekNumberArray = [];
  for (let i = 0; i < 6; i++) {
    weekNumberArray[i] = startWeekOfMonth + i;
    // handle January
    weekNumberArray[i] = (i === 0 && startWeekOfMonth === 0) ? prevTotalWeekNumber : weekNumberArray[i];
    // handle December
    weekNumberArray[i] = (startWeekOfMonth + i > totalWeekNumber) ? startWeekOfMonth + i - totalWeekNumber : weekNumberArray[i];
    let elementID = document.getElementById(weekNumberIdArray[i]);
    elementID.textContent = weekNumberArray[i];
    elementID.style.padding = '8px';
  }
  return weekNumberArray
}

// Create the dayNumber, monthNumber, yearNumber for the miniCalendar
function miniCalendarNumberArrayGenerator(input) {
  const defineDate = input.getDate();
  const defineMonth = input.getMonth() + 1;
  const defineYear = input.getFullYear();
  const previousMonth = defineMonth - 1 === 0 ? 12 : defineMonth - 1;
  const defineMonthLastDate = getLastDateOfMonth(defineMonth, defineYear);
  const previousMonthLastDate = getLastDateOfMonth(previousMonth, defineYear);
  const firstDayOfDefineMonth = new Date(defineYear, defineMonth - 1, 1).getDay();
  const dayNumberArray = Array.from({ length: 6 }, () => Array(6).fill(0));
  const monthNumberArray = Array.from({ length: 6 }, () => Array(6).fill(0));
  const yearNumberArray = Array.from({ length: 6 }, () => Array(6).fill(0));
  const colorDayNumberArray = Array.from({ length: 6 }, () => Array(6).fill(0));
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      const firstWeekValues = j - firstDayOfDefineMonth + 1;
      const overCurrentMonth = firstWeekValues + i * 7;
      dayNumberArray[i][j] = overCurrentMonth;
      monthNumberArray[i][j] = defineMonth;
      yearNumberArray[i][j] = defineYear;

      if (i === 0) {
        dayNumberArray[i][j] = j >= firstDayOfDefineMonth ? firstWeekValues : previousMonthLastDate + firstWeekValues;
        monthNumberArray[i][j] = j >= firstDayOfDefineMonth ? defineMonth : previousMonth;
        yearNumberArray[i][j] = (monthNumberArray[i][j] === previousMonth) && (monthNumberArray[i][j] === 12) ? defineYear - 1 : defineYear;
      }

      if (overCurrentMonth > defineMonthLastDate) {
        dayNumberArray[i][j] = overCurrentMonth - defineMonthLastDate;
        monthNumberArray[i][j] = defineMonth === 12 ? 1 : defineMonth + 1;
        yearNumberArray[i][j] = defineMonth === 12 ? defineYear + 1 : defineYear;
      }

      colorDayNumberArray[i][j] = didYouSelectThisDate(dayNumberArray[i][j], monthNumberArray[i][j], yearNumberArray[i][j]);

      const elementID = document.getElementById(dayNumberIdArray[i][j]);
      elementID.textContent = dayNumberArray[i][j];
      elementID.style.color = colorForMiniCalendar[colorDayNumberArray[i][j] + 2];
      elementID.style.backgroundColor = bgColorForMiniCalendar[colorDayNumberArray[i][j] + 2];
      elementID.style.margin = '3px';
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
  // When click miniCalendar dates
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
  //Color the generated Days, if dateInput = -1, today = 1, else = 0, outside of Month = -2
  return [dayNumberArray, monthNumberArray, yearNumberArray, colorDayNumberArray];
}

// Month Count
let monthCount = 0;

// When click next Month / previous Month buttons
function prevMonth() {
  dateOnSelect.setMonth(dateOnSelect.getMonth() - 1);
  console.log(dateOnSelect);
  aptWeekGenerator(dateOnSelect);
  monthCount --;
  ballDisappearOrReappear();
}
function nextMonth() {
  dateOnSelect.setMonth(dateOnSelect.getMonth() + 1);
  console.log(dateOnSelect);
  aptWeekGenerator(dateOnSelect);
  monthCount ++;
  ballDisappearOrReappear();
}