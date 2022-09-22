import { useEffect, useState } from "react";

function Lookup() {
  var [wordSearch, setWordSearch] = useState();
  var [word, setWord] = useState(null);
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
      <h1>{wordSearch}</h1>
      <h3>{definition}</h3>
      <form>
        <lable>
          Enter Word:
          <input
            type="text"
            onChange={(e) => {
              setDefinitionNumber(0);
              setWordSearch(e.target.value);
            }}
          />
        </lable>
      </form>
      <button onClick={nextDefinition}>next</button>
      <div>
        {word.length != undefined && (
          <h2>
            {definitionNumber + 1} of {word[0].meanings[0].definitions.length}
          </h2>
        )}
      </div>
    </div>
  );
}

export default Lookup;
