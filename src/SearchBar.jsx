import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { pageSize } from "./GlobalData";

function SearchBar(props) {
  const isNullOrUndefined = (val) => {
    return val === null || val === undefined || val === "";
  };
  const handleSearchValueChange = (value) => {
    //Searching / Filtering Logic
    if (isNullOrUndefined(value)) {
      props.setList(props.mainList);
      if (
        !isNullOrUndefined(props.mainListLength) &&
        !isNullOrUndefined(props.setCurPage) &&
        !isNullOrUndefined(props.bufferCurPage)
      ) {
        props.setCurPage(props.bufferCurPage);
        props.setLastPageNumber(Math.ceil(props.mainListLength / pageSize));
      }
      return;
    }
    let filteredList = [];
    props.mainList.forEach((iterationObj) => {
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
    if (
      !isNullOrUndefined(props.setLastPageNumber) &&
      !isNullOrUndefined(props.setCurPage) &&
      !isNullOrUndefined(props.curPage) &&
      filteredList.length !== pageSize
    ) {
      props.setCurPage(1);
      props.setLastPageNumber(1);
    }
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
      </InputGroup>
    </div>
  );
}

export default SearchBar;
