// Here lies General Formulae that can be used anywhere


// Is The Year a LeapYear? returns True / False
function leapYear(year) {
  return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

// Calculate totalDaysToMonth
function totalDayz(date, month, year) {
  const daysInMonths = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const leapYearAdjustment = leapYear(year) && month > 2 ? 1 : 0;
  const dayz = daysInMonths[month - 1] + date + leapYearAdjustment;
  return dayz;
}

// Calculates the last date of a MM/YYYY
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

// Helper function to format time as HH:MM AM/PM
function formatTime(time) {
  // Create a new Date object if 'time' is not already a Date
  if (!(time instanceof Date)) {
    time = new Date(time);
  }
  
  // Format the time to HH:MM AM/PM
  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  // Split the formatted time into parts and remove leading zero from hour
  const [hour, minute, period] = formattedTime.split(/[:\s]/);
  const hourWithoutLeadingZero = parseInt(hour, 10); // Convert to number to remove leading zero
  
  // Return formatted time without leading zero
  return `${hourWithoutLeadingZero}:${minute} ${period}`;
}

// Creating html elements:
// Create P Elements
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

// Create Option Elements
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

// Create Table Elements
function createTableElements(tableId, row, column, contents) {
  const tbody = document.querySelector(`#${tableId} tbody`);
  for (let i = 0; i < row; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < column; j++) {
      const cell = document.createElement('td');
      cell.textContent = contents(i, j);
      cell.id = `${tableId}td${i}-${j}`;
      cell.style.width = `${100 / column}%`;
      tr.appendChild(cell);
    } 
   tbody.appendChild(tr);
  }
}