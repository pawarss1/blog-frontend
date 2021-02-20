import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { postPageTableColumn } from "../GlobalData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./PostPage.css";

function UserPostTable(props) {
  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            {postPageTableColumn.map((column, index) => (
              <th key={`Col${index}`}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.userPostList.map((post, index) => (
            <tr key={`Row${index}`}>
              <td key={`Data1`}>{post["title"]}</td>
              <td key={`Data2`}>
                <Link to={`/postDetails/${post["id"]}`}>Post Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!props.userPostList.length && (
        <div className="noDataMsg-cls">
          <p style={{fontWeight:"700"}}>No Posts to display!</p>
        </div>
      )}
    </>
  );
}

export default UserPostTable;
