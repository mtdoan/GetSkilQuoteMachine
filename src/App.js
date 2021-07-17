import React, { useEffect, useState } from 'react';
import './App.scss';
import COLOR_ARRAY from './ColorArray'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'


let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("When I stand before God at the end of my life, I would hope that I would not have a single bit of talent left and could say, I used everything you gave me.")
  const [author, setAuthor] = useState("Erma Bombeck");
  const [quoteArray, setQuoteArray] = useState(null);

  const [accentColor, setAccentColor] = useState("#916988");

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parseJSON = await response.json()
    setQuoteArray(parseJSON.quotes);
  }

  useEffect(() => {
    fetchQuotes(quoteDBUrl)
  }, [quoteDBUrl]
  )

  const [randomNumber, setRandomNumber] = useState(0);
  const getRandomQuote = () => {
    let rand = Math.floor(Math.random() * quoteArray.length);
    setRandomNumber(rand);
    setAccentColor(COLOR_ARRAY[rand])
    setQuote(quoteArray[rand].quote);
    setAuthor(quoteArray[rand].author);
  }

  return (
    <div className="App">
      <header 
        className="App-header" 
        style={{backgroundColor: accentColor, color: accentColor }}
      >
        <div id="quote-box" style={{color: accentColor}}>
          <h2 id="text">
            <span id="quote-icon">
              <FontAwesomeIcon icon={faQuoteLeft} />
            </span>
            {quote}
          </h2>
          <div id="author">
            - {author}
          </div>
          
          <div className="button">
            <a 
              id="tweet-quote" 
              
              href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} ${author}&hashtags=quote`)} 
              style={{backgroundColor: accentColor}}
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>

            <button 
              id="new-quote" 
              style={{backgroundColor: accentColor}}
              onClick={() => getRandomQuote()}
            >
              New Quote
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
