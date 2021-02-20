import React, { useEffect, useState } from "react";
import {
  commentDetailsPageTableColumn,
  commentDetailsPageTableRow,
} from "../GlobalData";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

function CommentDetailPage() {
  const commentListSync = useSelector((globalStore) => globalStore.comments);
  const theme = useSelector((globalStore) => globalStore.theme);
  const [commentList, setCommentList] = useState([]);
  useEffect(() => {
    setCommentList(commentListSync);
  }, [commentListSync]);
  return (
    <Table responsive>
      <thead>
        <tr>
          {commentDetailsPageTableColumn.map((column, index) => (
            <th key={`Col${index}`}>
              <p style={theme}>{column}</p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {commentList.map((comment, index) => (
          <tr key={`Row${index}`}>
            {commentDetailsPageTableRow.map((row, index) => {
              return <td key={`Data${index}`}><p style={theme}>{comment[row]}</p></td>;
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CommentDetailPage;
