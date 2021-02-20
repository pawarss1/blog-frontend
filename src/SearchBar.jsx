import React from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";

function SearchBar(props) {
  const isNullOrUndefined = (val) => {
    return val === null || val === undefined || val === "";
  };
  const handleSearchValueChange = (value) => {
    if (isNullOrUndefined(value)) {
      props.setList(props.mainList);
      return;
    }
    let filteredList = [];
    props.list.forEach((iterationObj) => {
      let alreadyInsertedCheckFlag = false;
      props.toBeSearchedIn.forEach((key) => {
        if (
          !alreadyInsertedCheckFlag &&
          iterationObj[key].toLowerCase().indexOf(value.toLowerCase()) !== -1
        ) {
          alreadyInsertedCheckFlag = true;
          filteredList.push(iterationObj);
        }
      });
    });
    console.log(filteredList);
    props.setList(filteredList);
  };
  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          aria-describedby="basic-addon1"
          placeholder={props.placeholder}
          onChange={(evt) => handleSearchValueChange(evt.target.value)}
        />
        <InputGroup.Prepend>
          <Button variant="outline-secondary">Search</Button>
        </InputGroup.Prepend>
      </InputGroup>
    </div>
  );
}

export default SearchBar;
