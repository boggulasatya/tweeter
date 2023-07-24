/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/* eslint-env jquery*/
//accepting jquery --above comment//
$(document).ready(function() {
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Hide the error message
  const hideErrorMessage = function() {
    const $errorMessage = $('#error-message');
    $errorMessage.slideUp();
  };
  const handleFormSubmit = function(event) {
    event.preventDefault();
    const tweetText = $('#tweet-text').val();
    hideErrorMessage();
   
    // validation messages
    if (tweetText === "" || tweetText === 'null') {
      displayErrorMessage('Tweet content cannot be empty');
      return;
    }
    if (tweetText.length > 140) {
      displayErrorMessage('Tweet content exceeeds the maximum length of 140 characters');
      return;
    }
    
   
    //Send the tweet data using AJAX
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
      success: function(response) {
        //handle response forms server
        console.log(response);
        $('#tweet-text').val('');
        loadTweets();
      },
    });
  };

  // Display the error message
  const displayErrorMessage = function(message) {
    $('#error-message').text(message).slideDown();
  };
  //rendertweets
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    const $tweetsContainer = $('.tweets');
    $tweetsContainer.empty();
    for (let i = tweets.length - 1; i >= 0; i--) {
      let $tweet = createTweetElement(tweets[i]);
      $tweetsContainer.append($tweet);
    }
  };


  //Load tweets to fetch the tweets from server
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(response) {
        renderTweets(response);
      }
    });
  };
 
  const createTweetElement = function(tweet) {
    //Escape function to re-encode text so that unsafe characters are converted into a safe "encoded" representation//
   
    // console.log(tweet);
    const safeContent = escape(tweet.content.text);
    const safeName = escape(tweet.user.name);
    const safeHandle = escape(tweet.user.handle);

    const $tweet = $(`
      <article class="tweet">
        <div class="article-header">
          <img src="${tweet.user.avatars}" alt="Profile Image">
          <div class="tweet-header">
            <h3 class="tweet-author">${tweet.user.name}</h3>
            <p class="tweet-username">${tweet.user.handle}</p>
          </div>
        </div>
        <div class="tweet-content">
          <p>${tweet.content.text}</p>
        </div>
        <footer>
        <p class="timeago">${timeago.format(tweet.created_at)}</p>
          <div class="tweet-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    console.log(escape('<script>alert("hello")</script>'));
    return $tweet;
  };
  
  //Even listener for form submission
  $('form').submit(handleFormSubmit);

  loadTweets();
});
