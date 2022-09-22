import { useEffect, useState } from "react";

function Lookup() {
  var [wordSearch, setWordSearch] = useState("hello");
  var [word, setWord] = useState([]);
  var [definition, setDefinition] = useState(null);
  var [definitionNumber, setDefinitionNumber] = useState(0);
  function loadSearch() {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordSearch}`)
      .then((response) => response.json())
      .then((data) => setWord(data))
      .then("here")
      .then(function () {
        console.log(word);
        setText();
      });
  }

  function setText() {
    console.log(word);
    setDefinition(word[0].meanings[0].definitions[definitionNumber].definition);
    console.log(definition);
  }

  function nextDefinition() {
    if (definitionNumber < word[0].meanings[0].definitions.length - 1) {
      setDefinitionNumber((definitionNumber += 1));
      console.log(definitionNumber);
    } else {
      setDefinitionNumber(0);
    }
  }

  useEffect(() => {
    loadSearch();
  }, [definitionNumber, wordSearch]);

  return (
    <div>
      <h1>{wordSearch}</h1>
      <h1>{definition}</h1>
      <form>
        <lable>
          Enter Word:
          <input
            type="text"
            onChange={(e) => {
              setWordSearch(e.target.value);
            }}
          />
        </lable>
      </form>
      <button
        onClick={() => {
          setDefinitionNumber(0);
          loadSearch();
        }}
      >
        Search
      </button>
      <button onClick={nextDefinition}>next</button>
    </div>
  );
}

export default Lookup;
