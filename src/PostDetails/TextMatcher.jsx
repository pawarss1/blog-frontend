import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

function TextMatcher(props) {
  const handleChange = (value) => {
      const wordList = [];
      wordList.push(value);
      props.setSearchWordList(wordList)
  };
  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          aria-describedby="basic-addon1"
          placeholder={props.placeholder}
          onChange={(evt) => handleChange(evt.target.value)}
        />
      </InputGroup>
    </div>
  );
}

export default TextMatcher;
