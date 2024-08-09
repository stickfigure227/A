

document.addEventListener('DOMContentLoaded', () => {
  const apt2c2 = document.getElementById('apt2c2');

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
    }
  });
});





/* ------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------ */


//apt2c2
//Create Event
// Function to calculate and set the position of AptSetter
document.querySelector(".apt2c2").addEventListener("click", function(event) {
  if (event.target.tagName === 'p') { // Ensure the clicked element is a <p> tag
    showAptSetter(event);
  }
});

function showAptSetter(event) {
  const AptSetter = document.getElementById("AptSetter");
  const apt2c1 = document.querySelector(".apt2c1"); // timeColumn
  const rect = event.target.getBoundingClientRect(); // Position of the clicked cell
  const timeColumn = apt2c1.getBoundingClientRect(); // timeColumn properties
  const AptSetterRect = AptSetter.getBoundingClientRect(); //AptSetter properties
  
  // Debug logs
  console.log(AptSetterRect.width);

  let unitPosition = (rect.right - timeColumn.width - 290) / rect.width

  if (unitPosition < 4) {
    left = 10 + rect.right
  } else {
    left = rect.left - 10 - 430
  }

  let top = (window.innerHeight + 208 - 560) / 2;

  if (top < 0) {
    top = 0;
  }

  if (left < 0) {
    left = 0;
  }

  if (left > window.innerWidth - AptSetterRect.width) {
    left = window.innerWidth - AptSetterRect.width;
  }

  // Position AptSetter
  AptSetter.style.position = 'absolute';
  AptSetter.style.left = `${left}px`;
  AptSetter.style.top = `${top}px`;
  AptSetter.style.display = 'flex'; // Show the AptSetter
}

function CloseAptSetter() {
  document.getElementById("AptSetter").style.display = "none";
}

// Add click event listener to apt2c2
document.querySelector(".apt2c2").addEventListener("click", function(event) {
  if (AptSetter.style.display === "flex") {
    AptSetter.style.display = "none"; // Hide if already visible
  } else {
    showAptSetter(event); // Show and position the AptSetter
  }
});
