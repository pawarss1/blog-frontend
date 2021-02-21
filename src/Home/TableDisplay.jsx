import React from "react";
import Table from "react-bootstrap/Table";
import { homePageTableColumn, homePageTableRow } from "../GlobalData";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function TableDisplay(props) {
  const themeSync = useSelector((globalStore) => globalStore.theme);
  //Using theme from "REDUX STORE" to store the current theme chosen by the user, it can be light or dark.
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
              {homePageTableRow.map((rowKey, innerIndex) => {
                return (
                  <td key={`Data${index}${innerIndex}`}>
                    <p style={themeSync}>{user[rowKey]}</p>
                  </td>
                );
              })}
              <td key={`Data${index}${homePageTableRow.length}`}>
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
