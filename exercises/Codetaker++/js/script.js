/**
Code Taker
CART 263 Exercise

-New Elements:
1. Change to a different text and secret message to make it my own
2. Rework the HTML and CSS to make this a more engaging presentation of the idea
3. Add some more effects to the dragging action

The user can uncover secret letters in the poem by mousing over them. Once found
they can drag the letters in the correct order to the answer area to find the
name of an amazing instrument (the theremin) and receive congratulations.
Uses:
jQuery
https://jquery.com
jQuery UI:
https://jqueryui.com
*/

"use strict";

// The secret answer we're looking for (including capitalization)
let secretMessage = `émilenelligan`;

// Turn the dialog div into an actual dialog
$(`#solved-dialog`).dialog({
  // Don't open it right away
  autoOpen: false,
  // Add a condescending button to close it
  buttons: {
    "I know": function() {
      $(this).dialog(`close`);
    }
  }
});

// When the user mouses over secret letters, highlight them
$(`.secret`).on(`mouseover`, function(event) {
  $(this).addClass(`found`, 500);
});

// Let the user drag secret letters via a clone helper
$(`.secret`).draggable({
  helper: `clone`
});
// Let the user drag answer section via a clone helper
$(`#answer`).draggable({
  helper: `clone`
});

// When the user drops a letter on the answer...
$(`#answer`).droppable({
  drop: function(event, ui) {
    // Get the letter in the dragged element
    let letter = ui.draggable.text();
    // Add it to the answer box
    $(this).append(letter);
    // Disable dragging for this letter
    ui.draggable.draggable(`disable`);
    // Remove the highlighting of this letter
    ui.draggable.removeClass(`found`, 500);
    // Disable mouseovers on this letter
    ui.draggable.off(`mouseover`);
    // Check if they got the answer right yet...
    if ($(`#answer`).text() === secretMessage) {
      // If they did, display the dialog!
      $(`#solved-dialog`).dialog(`open`);
    }
  }
});