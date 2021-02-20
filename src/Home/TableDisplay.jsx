import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { homePageTableColumn } from "../GlobalData";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function TableDisplay(props) {
  const themeSync = useSelector((globalStore) => globalStore.theme);

  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            {homePageTableColumn.map((column, index) => (
              <th key={`Col${index}`}>
                <p style={themeSync}>{column}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.userList.map((user, index) => (
            <tr key={`Row${index}`}>
              <td key={`Data1`}>
                <p style={themeSync}>{user["name"]}</p>
              </td>
              <td key={`Data2`}>
                <p style={themeSync}>{user["company"]}</p>
              </td>
              <td key={`Data3`}>
                <Link to={`/userPosts/${user["id"]}`}>Blog Posts</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!props.userList.length && (
        <div className="noDataMsg-cls">
          <p style={{ ...themeSync, fontWeight: "700" }}>
            No Users to display!
          </p>
        </div>
      )}
    </>
  );
}

export default TableDisplay;
