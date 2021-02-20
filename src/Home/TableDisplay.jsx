import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { homePageTableColumn } from "../GlobalData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function TableDisplay(props) {
  //const reduxUserList = useSelector((globalStore) => globalStore.users);
  //const [userList, setUserList] = useState([]);
  //   useEffect(() => {
  //     setUserList(reduxUserList);
  //   }, [reduxUserList]);

  return (
    <Table responsive>
      <thead>
        <tr>
          {homePageTableColumn.map((column, index) => (
            <th key={`Col${index}`}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.userList.map((user, index) => (
          <tr key={`Row${index}`}>
            <td key={`Data1`}>{user["name"]}</td>
            <td key={`Data2`}>{user["company"]}</td>
            <td key={`Data3`}>
              <Link to={`/posts/${user["id"]}`}>Blog Posts</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableDisplay;
