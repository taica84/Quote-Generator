//Variables
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


 // Loading function
 function loading() {
     loader.hidden = false;
     quoteContainer.hidden = true;
 };

 function complete() {
     if(!loader.hidden) {
         quoteContainer.hidden = false
         loader.hidden = true;
     }
 }


//Get quote API
async function getQuote() {
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json' ;
    
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
         // if Author is blank , add "unknown"
        if( data.quoteText === '') {
            authorText.innerText ='Unknown'
        }else {
            authorText.innerText = data.quoteAuthor;
        }

        if(data.quoteText.length > 120) {
             quoteText.classList.add('long-quote')
        }else {
             quoteText.classList.remove('long-quote')
        }
        
        quoteText.innerText = data.quoteText;
       complete();
    }catch(error) {
        getQuote();
        
    }

}


//Tweet Quote

  function tweetQuote() {
      const quote = quoteText.innerText;
      const author = authorText.innerText;
      const twittertUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
      window.open(twittertUrl , '_blank');
  }

//Add Event Listener
 newQuoteBtn.addEventListener('click' , getQuote);
 twitterBtn.addEventListener('click' , tweetQuote);


//call function on Load page
getQuote();