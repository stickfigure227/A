const wYear = document.getElementById('wYear');
const pdayIdArray = ['pday1', 'pday2', 'pday3', 'pday4', 'pday5', 'pday6', 'pday0'];
const dayIdArray = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day0'];
const monIdArray = ['mon1', 'mon2', 'mon3', 'mon4', 'mon5', 'mon6', 'mon0'];
let daysOfTheWeek = [];
let monthsOfTheWeek = [];
let yearsOfTheWeek = [];

function initializeOneWeekViewer (input) {
  oneWeekViewer(input);
  positioningWeekViewer();
}

function oneWeekViewer(input) {
  const defineDay = input.getDay();  
  const defineDate = input.getDate();
  const defineMonth = input.getMonth() + 1;
  const defineYear = input.getFullYear();
  const previousMonth = defineMonth - 1 === 0 ? 12 : defineMonth - 1;
  const defineMonthLastDate = getLastDateOfMonth(defineMonth, defineYear);
  const previousMonthLastDate = getLastDateOfMonth(previousMonth, defineYear);
  let abbreviatedMonthsOfTheWeek = [];
  let colorOfTheWeek = [];
  const valueToMonthAbbreviations = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const colorForWeek = ['#a3a3a3', '#ffffff', '#000000'];
  const redColorForWeek = ['rgba(254, 97, 90, 0.6)', '#ffffff', 'rgba(254, 97, 90)'];
  const bgColorForWeek = ['', '#007bff', ''];
  const bgRedColorForWeek = ['', 'rgba(254, 97, 90)', ''];
  const blueArray = ['rgba(0, 123, 255, 0.3)', 'rgb(255, 255, 255)', 'rgb(0, 123, 255)'];
  const redArray = ['rgba(254, 97, 90, 0.3)', 'rgb(255, 255, 255)', 'rgb(254, 97, 90)'];

  // Generating array for this week
  const a = defineDay || 7;

  for (let i = 0; i < 7; i++) {  
    let g = defineDate - a + i + 1;
    const isPreviousMonth = a - i > defineDate;
    const isNextMonth = g > defineMonthLastDate;

    daysOfTheWeek[i] = isPreviousMonth ? previousMonthLastDate + g : isNextMonth ? g - defineMonthLastDate : g;
    monthsOfTheWeek[i] = isPreviousMonth ? previousMonth : isNextMonth ? (defineMonth % 12) + 1 : defineMonth;
    yearsOfTheWeek[i] = isPreviousMonth ? defineYear - (previousMonth === 12 ? 1 : 0) : isNextMonth ? defineYear + (defineMonth === 12 ? 1 : 0) : defineYear;
    abbreviatedMonthsOfTheWeek[i] = valueToMonthAbbreviations[monthsOfTheWeek[i] - 1];

    //Array for ColorOfTheWeek
    let dy = yearsOfTheWeek[i] - today.getFullYear();
    let dm = monthsOfTheWeek[i] - today.getMonth() - 1;
    let dd = daysOfTheWeek[i] - today.getDate();
    colorOfTheWeek[i] = Math.sign(dy) || Math.sign(dm) || Math.sign(dd) || 0;
  }

  // This Part Updates The Header
  const setUniqueYearsOfTheWeek = new Set(yearsOfTheWeek);
  const uniqueYearsOfTheWeek = Array.from(setUniqueYearsOfTheWeek);
  const setUniqueMonthsOfTheWeek = new Set(monthsOfTheWeek);
  const uniqueMonthsOfTheWeek = Array.from(setUniqueMonthsOfTheWeek);
  const weekHeaderArray = [
    valueToMonthAbbreviations[uniqueMonthsOfTheWeek[0] - 1] + " " + uniqueYearsOfTheWeek[0] + " - " +  valueToMonthAbbreviations[uniqueMonthsOfTheWeek[1] - 1] + " " + uniqueYearsOfTheWeek[1],
    valueToMonthAbbreviations[uniqueMonthsOfTheWeek[0] - 1] + " - " + valueToMonthAbbreviations[uniqueMonthsOfTheWeek[1] - 1] + " " + uniqueYearsOfTheWeek[0],
    valueToMonthAbbreviations[uniqueMonthsOfTheWeek[0] - 1] + " " + uniqueYearsOfTheWeek[0]
  ];
  const longWeekHeader = setUniqueYearsOfTheWeek.size != 2 && setUniqueMonthsOfTheWeek.size === 2 ? weekHeaderArray[1] : weekHeaderArray[0];
  const weekHeader = setUniqueYearsOfTheWeek.size === 2 || setUniqueMonthsOfTheWeek.size === 2 ? longWeekHeader : weekHeaderArray[2];
  wYear.textContent = weekHeader;

  // This Part Colors The Week's Elements
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

// Next / Previous Week Button
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

// Positioning the WeekViewer
window.addEventListener('resize', positioningWeekViewer);
function positioningWeekViewer() {
  const apt2b1 = document.getElementById('apt2b1');
  const apt2b2 = document.getElementById('apt2b2');
  const apt2c1 = document.getElementById('apt2c1');
  const apt2c0 = document.getElementById('apt2c0');
  const rectApt2c1 = apt2c1.getBoundingClientRect();
  const rectApt2c0 = apt2c0.getBoundingClientRect();
  console.log(rectApt2c1.width);
  console.log(rectApt2c0.width);
  const totalWidth = rectApt2c1.width + rectApt2c0.width;
  apt2b1.style.width = `${totalWidth}px`;
}