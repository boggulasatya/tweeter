$(document).ready(function () {
  function countCharacters() {
    var composer = $(this);
    var counter = composer.closest('.new-tweet').find('.counter');
    var remainingChars = 140 - composer.val().length;

    counter.text(remainingChars);

    if (remainingChars < 0 || remainingChars > 140) {
      counter.addClass('invalid');
    } else {
      counter.removeClass('invalid');
    }
  }

  $('#tweet-text').on('input', countCharacters);
});
