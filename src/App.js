import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.png';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-60456041-5', { testMode: process.env.NODE_ENV === 'test' });



// URLModifier is a functional component that allows the user to input a URL and display it in an iframe
function URLModifier() {
  // Declare state variables to store the input URL and the modified URL that will be displayed in the iframe
  const [url, setUrl] = useState('');
  const [modifiedUrl, setModifiedUrl] = useState('');

  // handleUrlChange is a function that updates the url state variable when the input value changes
  function handleUrlChange(event) {
    setUrl(event.target.value);
  }

  // useEffect hook is used to update the iframe's title whenever the url state variable changes
  useEffect(() => {
    document.getElementById('urlFrame').title = `${url} - ArchiveFinder iframe`;
  }, [url]);

  // displayUrl is a function that updates the site icon, title, and modifiedUrl state variable when the "Display URLs" button is clicked
  function displayUrl() {
    document.querySelector('link[rel="icon"]').href = logo;
    document.title = `ArchiveFinder - ${url}`;
    
    // Modify the input URL by adding it to the base URL and url suffix, then encode the resulting URL and set it as the modifiedUrl state variable
    const baseUrl = 'https://web.archive.org/cdx/search/cdx?url=';
    const urlSuffix = '*&output=text&fl=original&collapse=urlkey&from=';
    const modifiedUrl = baseUrl + encodeURIComponent(url) + urlSuffix;
    setModifiedUrl(modifiedUrl);
  }

  return (
    <div className="container">
      <img className="logo" src={logo} alt="Logo" />
      <div className="text-input">
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter Your URL"
          id="urlInput"
        />
        <label htmlFor="urlInput" onClick={displayUrl}>
          Display URLs
        </label>
      </div>
      <iframe id="urlFrame" src={modifiedUrl} title="ArchiveFinder iframe" />
      <p className="test">Learn React</p>
    </div>
  );
}
export default URLModifier;
