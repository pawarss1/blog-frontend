import React from "react";
import { Table } from "react-bootstrap";
import { postPageTableColumn, postPageTableRow } from "../GlobalData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./PostPage.css";

function UserPostTable(props) {
  const themeSync = useSelector((globalStore) => globalStore.theme);

  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            {postPageTableColumn.map((column, index) => (
              <th key={`Col${index}`}>
                <p style={themeSync}>{column}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.userPostList.map((post, index) => (
            <tr key={`Row${index}`}>
              {postPageTableRow.map((rowKey, innerIndex) => {
                return (
                  <td key={`Data${index}${innerIndex}`}>
                    <p style={themeSync}>{post[rowKey]}</p>
                  </td>
                );
              })}
              <td key={`Data${index}${postPageTableRow.length}`}>
                <Link to={`/postDetails/${post["id"]}`}>Post Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!props.userPostList.length && (
        <div className="noDataMsg-cls">
          <p style={{ ...themeSync, fontWeight: "700" }}>
            No Posts to display!
          </p>
        </div>
      )}
    </>
  );
}

export default UserPostTable;
