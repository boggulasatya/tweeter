/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/* eslint-env jquery*/
//accepting jquery --above comment//
$(document).ready(function () {
  const handleFormSubmit = function (event) {
    event.preventDefault();
    const tweetText = $('#tweet-text').val();

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
  //Even listener for form submission
  $('form').submit(handleFormSubmit);

  //rendertweets
  const renderTweets = function(tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

    const $tweetsContainer = $('.tweets');
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
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

  const createTweetElement = function (tweet) {
    // console.log(tweet);
    const $tweet = $(`
      <article class="tweet">
        <header>
          <img src="${tweet.user.avatars}" alt="Profile Image">
          <div class="tweet-header">
            <h3 class="tweet-author">${tweet.user.name}</h3>
            <p class="tweet-username">${tweet.user.handle}</p>
          </div>
        </header>
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

    return $tweet;
  };
  
  loadTweets();
});
