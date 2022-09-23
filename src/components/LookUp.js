import { useEffect, useState } from "react";
import "../CSS/lookUp.css";

function Lookup() {
  var [wordSearch, setWordSearch] = useState("Example");
  var [word, setWord] = useState({});
  var [definition, setDefinition] = useState(null);
  var [definitionNumber, setDefinitionNumber] = useState(0);
  function loadSearch() {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordSearch}`)
      .then((response) => response.json())
      .then((data) => {
        word = data;
        setWord(word);
      })
      .then(console.log(word))
      .then(function () {
        setText();
      })
      .catch((error) =>
        setDefinition(
          "We couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead."
        )
      );
  }

  function setText() {
    console.log(word.length);
    setDefinition(word[0].meanings[0].definitions[definitionNumber].definition);
  }

  function nextDefinition() {
    if (definitionNumber < word[0].meanings[0].definitions.length - 1) {
      setDefinitionNumber((definitionNumber += 1));
    } else {
      setDefinitionNumber(0);
    }
  }

  useEffect(() => {
    loadSearch();
  }, [definitionNumber, wordSearch, setWord]);

  return (
    <div>
      <div className="box">
        <div id="searchedWord">
          {wordSearch != "" && (
            <h1>{wordSearch[0].toUpperCase() + wordSearch.substring(1)}</h1>
          )}{" "}
          <hr />
        </div>
        <div id="definition">
          <h2>{definition}</h2>
        </div>
        <div id="outOf">
          {word.length != undefined && (
            <out>
              Definition: {definitionNumber + 1} of{" "}
              {word[0].meanings[0].definitions.length}
            </out>
          )}
        </div>
      </div>
      <div>
        <p>Enter Word:</p>
        <form>
          <lable>
            <input
              type="text"
              onChange={(e) => {
                setDefinitionNumber(0);
                setWordSearch(e.target.value);
              }}
            />
          </lable>
        </form>
      </div>
      <button onClick={nextDefinition}>Next Definition</button>
    </div>
  );
}

export default Lookup;
