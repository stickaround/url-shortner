import "./Form.css";

import { Clipboard, Link as LucideLink } from "lucide-react";
import React, { FormEvent, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const Form = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copiedMessageVisible, setCopiedMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  // Handling Submit Button

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) {
      setErrorMessage("Please enter a URL");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }

    // API Request For Fetching Data

    try {
      const response = await fetch(API_URL + "/short", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ origUrl: url }),
      });
      if (response.ok) {
        const data = await response.json();
        setShortUrl(data.shortUrl);
        setErrorMessage("");
      } else {
        throw new Error("Failed to shorten URL");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handling Copy Icon

  const handleCopy = () => {
    navigator.clipboard
      .writeText(shortUrl)
      .then(() => {
        setCopiedMessageVisible(true);
        setTimeout(() => setCopiedMessageVisible(false), 2000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <div>
      <div className="main-form-div">
        <div className="inner-div">
          <div className="form-begin">
            <div className="circles"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>

          <div className="content">
            <h2 className="heading">
              URL SHORTENER
              <LucideLink size={24} className="icon-url" />
            </h2>
          </div>

          <h4 className="enter-url-heading">Enter the URL to Shorten</h4>

          <form onSubmit={handleSubmit}>
            <div className="input-url-box">
              <h4>URL</h4>
              <input
                type="text"
                value={url}
                onChange={handleChange}
                placeholder="Enter URL"
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="url-btn">
              <button type="submit" className="shorten-button">
                Shorten
              </button>
            </div>
          </form>

          {shortUrl && (
            <>
              <div className="success-message">
                <p>Success! Here is your short URL:</p>
              </div>
              <div className="copy-url">
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  {shortUrl}
                </a>
                <Clipboard className="copy-icon" onClick={handleCopy} />
                {copiedMessageVisible && (
                  <p className="copied-message">Copied!</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
