// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
//This was already given to me
$(function () {
  //Display the date
  var currentHour = dayjs().format('H');

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. 
  //HINT: What does `this` reference in the click listener
  // function? 
  // How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked?
    //How might the id be useful when saving the description in local storage?
    //created a function when the save button is clicked it saves the items in text box to local storage 
 
  function saveText() {
    $('.saveBtn').on('click', function() {
      var key = $(this).parent().attr('id');
      var value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);  
    
    });
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  $('.time-block').each(function() {
      var key = $(this).attr('id');
      var value = localStorage.getItem(key);
      $(this).children('.description').val(value); 
    });


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
    // get the number from the id of each timeblock and compare the number(the number is the time) to the current hour variable
    //  if it is larger or smaller than the current hour then give correct color this was very frustrating for me



    function colorChange() {
      $('.time-block').each(function() {
        var blockHour = parseInt(this.id); 
        $(this).toggleClass('past', blockHour < currentHour);
        $(this).toggleClass('present', blockHour === currentHour);
        $(this).toggleClass('future', blockHour > currentHour);
      });
    }
  
    //past = gray
    // future = green
    // present = red
    function refreshColor() {
      $('.time-block').each(function() {
        var blockHour = parseInt(this.id);
        if (blockHour == currentHour) {
          $(this).removeClass('past future').addClass('present');
        } else if (blockHour < currentHour) {
          $(this).removeClass('future present').addClass('past');
        } else {
          $(this).removeClass('past present').addClass('future');
        }
      });
    }
    
    
    
    // TODO: Add code to display the current date in the header of the page.
  //display time in header
    function displayTime() {
      var dateElement = $('#date');
      var timeElement = $('#time');
      var currentDate = dayjs().format('dddd, MMMM D, YYYY');
      var currentTime = dayjs().format('hh:mm');
      dateElement.text(currentDate);  
      timeElement.text(currentTime);
    }
    //Call on them at the end 
  saveText();
  colorChange();
  refreshColor();
  setInterval(displayTime);
});
