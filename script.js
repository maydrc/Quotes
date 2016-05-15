function getQuote () {
  // JSON API to get random quotes
  $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?", function(response) {
    console.log(response);

    var author = response.quoteAuthor || "anonymous";
    var quote = response.quoteText;
    var twitterLink = "";
    var quoteElement = $("blockquote");
    var newQuoteElement = quoteElement.clone(true);
    var hexColor = randomColor({luminosity: 'dark'});

    // compose the Link which will post the quote in Twitter
    twitterLink = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent(quote) + ' — ' + author;

    // assing the quote and author to the HTML elements
    newQuoteElement.find("#spanQuote").html(quote);
    newQuoteElement.find("#author").html(author);

    // restarting the css animation
    quoteElement.before(newQuoteElement);
    quoteElement.remove();

    // Twitter's <a> tag gets set with the Link which is pointing to the new quote
    $("#TwitterQuote").attr("href", twitterLink);

    // "background-color" in the html body will get set with a random color
    $("body").css("background-color", hexColor);

  });
}

$(document).ready(function() {
  getQuote(); // it sets the initial state of the page
  $("#getQuote").on("click", function(){
    getQuote(); // get's a new quote everytime the user clicks at the "New Quote" link
  });
});
