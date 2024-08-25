// This file loads the Apt contents

const today = new Date();                                             console.log('Today: ' + today);
let dateOnSelect = new Date();

function aptWeekGenerator (dateInput) {   

  // MiniCalendar ('apt1a' && 'apt1b')
  initializeMiniCalendar(dateInput);

  // OneWeekViewer
  initializeOneWeekViewer(dateInput);

  // Register Date details
  registerDate(dateInput);
}

//Some buttons
function goToToday() {
  dateOnSelect = new Date();
  aptWeekGenerator(dateOnSelect);
  CloseAptSetter();
  weekCount = 0;
  monthCount = 0;
  ballDisappearOrReappear();
}

// Listen to any window resizing
window.addEventListener('resize', ballAndLinePosition);
window.addEventListener('resize', positioningWeekViewer);

window.onload = function() {
  loadTimeIntervalChoices();
  aptWeekGenerator(today);
}