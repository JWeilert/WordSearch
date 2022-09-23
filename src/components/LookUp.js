import { useEffect, useState } from "react";
import "../CSS/lookUp.css";

function Lookup() {
  var [wordSearch, setWordSearch] = useState("Example");
  var [word, setWord] = useState({});
  var [definition, setDefinition] = useState(null);
  var [definitionNumber, setDefinitionNumber] = useState(0);
  var [audio, setAudio] = useState("");
  var [error, setError] = useState(false);
  function loadSearch() {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordSearch}`)
      .then((response) => response.json())
      .then((data) => {
        word = data;
        setWord(word);
        setError(false);
      })
      .then(console.log(word))
      .then(function () {
        setText();
      })
      .catch((error) => {
        setDefinition(
          "We couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead."
        );
        setError(true);
      })
      .then(function () {
        setAud();
      });
  }

  function setText() {
    setDefinition(word[0].meanings[0].definitions[definitionNumber].definition);
  }

  function setAud() {
    setAudio("");
    audio = word[0].phonetics[0].audio;
    setAudio(audio);
    console.log(audio);
  }

  function playAud() {
    let playAudio = new Audio(audio);
    playAudio.play();
  }

  function nextDefinition() {
    if (definitionNumber < word[0].meanings[0].definitions.length - 1) {
      setDefinitionNumber((definitionNumber += 1));
    } else {
      setDefinitionNumber(0);
    }
  }

  function prevDefinition() {
    if (definitionNumber > 0) {
      setDefinitionNumber((definitionNumber -= 1));
    } else {
      setDefinitionNumber(word[0].meanings[0].definitions.length - 1);
    }
  }

  useEffect(() => {
    loadSearch();
  }, [definitionNumber, wordSearch, setWord, audio]);

  return (
    <div>
      <form>
        <lable>
          <input
            type="text"
            placeholder="Enter Word..."
            onChange={(e) => {
              setDefinitionNumber(0);
              setWordSearch(e.target.value);
            }}
          />
        </lable>
      </form>
      <div id="flex">
        <div className="buttonContainer">
          <button className="defButton" onClick={prevDefinition}>
            Prev Definition
          </button>
        </div>
        <div className="box">
          <div id="searchedWord">
            {wordSearch !== "" && (
              <h1>{wordSearch[0].toUpperCase() + wordSearch.substring(1)}</h1>
            )}{" "}
            <hr />
          </div>
          <div id={error ? "error" : "definition"}>
            <h2>{definition}</h2>
          </div>
          <div id="outOf">
            {word.length !== undefined && (
              <out>
                Definition: {definitionNumber + 1} of{" "}
                {word[0].meanings[0].definitions.length}
              </out>
            )}
          </div>
          <br />
          <hr />
          <div>
            {audio !== "" && (
              <button
                id="audio"
                onClick={() => {
                  setAud();
                  playAud();
                }}
              >
                Play Audio
              </button>
            )}
            {audio === "" && word.length !== undefined && (
              <p id="ANF">Sorry, there is currently audio for this word.</p>
            )}
          </div>
        </div>
        <div className="buttonContainer">
          <button className="defButton" onClick={nextDefinition}>
            Next Definition
          </button>
        </div>
      </div>
    </div>
  );
}

export default Lookup;
