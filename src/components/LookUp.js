import { useEffect, useState } from "react";

function Lookup() {
  var [word, setWord] = useState([]);
  var [definition, setDefinition] = useState(null);
  var [definitionNumber, setDefinitionNumber] = useState(0);
  function loadSearch() {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/test")
      .then((response) => response.json())
      .then((data) => setWord(data))
      .then(function () {
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
      console.log("here");
      console.log(definitionNumber);
    } else {
      setDefinitionNumber(0);
      console.log("here2");
    }
  }

  useEffect(() => {
    loadSearch();
  }, [definitionNumber]);

  return (
    <div>
      <h1>{definition}</h1>
      <button onClick={loadSearch}>Search</button>
      <button onClick={nextDefinition}>next</button>
    </div>
  );
}

export default Lookup;
