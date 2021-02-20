import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { commentDataSlice } from "../Store/commentDataSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import CommentDetailPage from "./CommentDetailPage";

toast.configure();

function PostDetailPage() {
  const { postId, userId } = useParams();
  const dispatch = useDispatch();
  const [postInfo, setPostInfo] = useState({});
  const [tempPostInfo, setTempPostInfo] = useState({});
  const [spinnerFlag, setSpinnerFlag] = useState(true);
  const [commentLoaderFlag, setCommentLoaderFlag] = useState(false);
  const [displayCommentsFlag, setDisplayCommentFlag] = useState(false);

  const getComments = () => {
    setDisplayCommentFlag(!displayCommentsFlag);
    setCommentLoaderFlag(true);
    const url = `https://jsonplaceholder.typicode.com/comments?postId=${postId}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        let commentList = [];
        res.forEach((comment) => {
          commentList.push({
            name: comment.name,
            email: comment.email,
            body: comment.body,
          });
        });
        console.log(commentList);
        const payload = {
          commentList: commentList,
        };
        //Add the comments globally to the REDUX-STORE.
        dispatch(commentDataSlice.actions.addNewCommentList(payload));
        setCommentLoaderFlag(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("API not working, Please try again after sometime!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5 * 1000,
        });
        setCommentLoaderFlag(false);
      });
  };
  useEffect(() => {
    const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setPostInfo(res);
        setTempPostInfo(res);
        setSpinnerFlag(false);
      })
      .catch((err) => {
        toast.error("API not working, Please try again after sometime!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5 * 1000,
        });
        setSpinnerFlag(false);
      });
  }, []);
  return (
    <div>
      {spinnerFlag === true ? (
        <div>
          <br />
          <Loader
            type="Grid"
            color="rgba(228, 225, 225, 0.829)"
            height={200}
            width={200}
          />
        </div>
      ) : (
        <Container>
          <Row>
            <Col></Col>
            <Col>
              <br />
              <SearchBar placeholder="Search within Title or Body" />
            </Col>
          </Row>
          <Row>
            <Container>
              <Row>
                <Col>
                  <Container>
                    <Row>
                      <Col>
                        <h1 style={{ marginTop: "6%" }}>Title</h1>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h3>{postInfo.title}</h3>
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col>
                  <Container>
                    <Row>
                      <Col>
                        <h1 style={{ marginTop: "6%" }}>Body</h1>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h3>{postInfo.body}</h3>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Link>
                    <div onClick={getComments}>
                      <h3>Comments</h3>
                      {commentLoaderFlag && (
                        <Loader
                          type="Circles"
                          color="rgba(228, 225, 225, 0.829)"
                          height={100}
                          width={100}
                        />
                      )}
                    </div>
                  </Link>
                </Col>
                <Col></Col>
              </Row>
            </Container>
          </Row>
        </Container>
      )}
      <Container>
        <Row>
          <Col>{displayCommentsFlag && <CommentDetailPage />}</Col>
        </Row>
      </Container>
    </div>
  );
}

export default PostDetailPage;
