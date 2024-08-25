// Fused functionality! apt2 = timeGrid + aptSet



/* ------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------ */
/* ------------------------------------------------------------------------------------------------ */


//apt2c2
//Create Event
// Function to calculate and set the position of AptSetter
document.querySelector(".apt2c2").addEventListener("click", function(event) {
  if (event.target.tagName === 'p') { // Ensure the clicked element is a <p> tag
    showAptSetter(event);
    console.log();
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

  const popoutDiv = document.getElementById('popoutDiv');
  popoutDiv.style.display = 'block';
  popoutDiv.style.left = `${rect.left}px`;
  popoutDiv.style.top = `${rect.top}px`;
  popoutDiv.style.width = `${rect.width}px`;
  popoutDiv.style.height = `${rect.height}px`;
}

function CloseAptSetter() {
  document.getElementById("AptSetter").style.display = "none";
  const popoutDiv = document.getElementById('popoutDiv');
  popoutDiv.style.display = 'none';
}

// Add click event listener to apt2c2
document.querySelector(".apt2c2").addEventListener("click", function(event) {
  const popoutDiv = document.getElementById('popoutDiv');
  if (AptSetter.style.display === "flex" || popoutDiv.style.display === 'block') {
    AptSetter.style.display = "none"; // Hide if already visible
    popoutDiv.style.display = 'none';
  } else {
    showAptSetter(event); // Show and position the AptSetter
  }
});