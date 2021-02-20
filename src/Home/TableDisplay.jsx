import React from "react";
import Table from "react-bootstrap/Table";
import { homePageTableColumn } from "../GlobalData";
import { Link } from "react-router-dom";

function TableDisplay(props) {
  return (
    <>
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
                <Link to={`/userPosts/${user["id"]}`}>Blog Posts</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!props.userList.length && (
        <div className="noDataMsg-cls">
          <p style={{ fontWeight: "700" }}>No Users to display!</p>
        </div>
      )}
    </>
  );
}

export default TableDisplay;
