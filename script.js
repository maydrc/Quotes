function getQuote () {
  // JSON API to get random quotes
  $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=?", function(response) {

    var author = response[0].title;
    var quote = response[0].content;
    var twitterLink = "";
    var quoteElement = $("blockquote");
    var newQuoteElement = quoteElement.clone(true);
    var hexColor = randomColor({luminosity: 'dark'});

    quote = quote.substring(3, quote.length-5);
    twitterLink = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent(quote) + ' - ' + author;

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
