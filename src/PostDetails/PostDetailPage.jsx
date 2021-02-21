import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { commentDataSlice } from "../Store/commentDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import TextMatcher from "./TextMatcher";
import CommentDetailPage from "./CommentDetailPage";
import Highlighter from "react-highlight-words";
import { API_URL } from "../GlobalData";
import "./PostDetails.css";

toast.configure();

function PostDetailPage() {
  const { postId } = useParams();
  //Get Post ID from the query parameter of the URL.
  const dispatch = useDispatch();
  const [postInfo, setPostInfo] = useState({});
  const [searchWordList, setSearchWordList] = useState([]);
  const [spinnerFlag, setSpinnerFlag] = useState(true);
  const [commentLoaderFlag, setCommentLoaderFlag] = useState(false);
  const [displayCommentsFlag, setDisplayCommentFlag] = useState(false);
  const [userId, setUserId] = useState(null);
  const [deleteBtnDisableFlag, setDeleteBtnDisable] = useState(false);
  const [processMsg, setProcessMsg] = useState("");

  const history = useHistory();
  const theme = useSelector((globalStore) => globalStore.theme);

  const getComments = () => {
    setDisplayCommentFlag(!displayCommentsFlag);
    setCommentLoaderFlag(true);
    const url = `${API_URL}/comments?postId=${postId}`;
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
        history.push("/");
      });
  };

  const handleDelete = () => {
    setProcessMsg("Deletion in Progress!");
    setSpinnerFlag(true);
    fetch(`${API_URL}/posts/${postId}`, {
      method: "DELETE",
    })
      .then(() => {
        setProcessMsg("");
        toast.info("Post Deleted Successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2 * 1000,
        });
        setSpinnerFlag(false);
        /*Not practically deleting the data from the frontend
          Reason Being- When the post is deleted, we are calling a DUMMY DELETE API,
          but in real world this API will delete the data originally from the backend and then
          the user is redirected to User posts page, where the initial 
          server call will be made and it will fetch the updated data from the backend.
        */
        history.push(`/userPosts/${userId}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("API not working, Please try again after sometime!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5 * 1000,
        });
        setProcessMsg("");
        setSpinnerFlag(false);
        history.push("/");
      });
  };

  useEffect(() => {
    const url = `${API_URL}/posts/${postId}`;
    setProcessMsg("Fetching Post Details!");
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setProcessMsg("");
        //Checking for empty reponse
        if (Object.keys(res).length === 0) {
          setProcessMsg("No Post found, check the Post Id");
          setDeleteBtnDisable(true);
        } else {
          setProcessMsg("");
          setDeleteBtnDisable(false);
        }
        setUserId(res.userId);
        setPostInfo(res);
        setSpinnerFlag(false);
      })
      .catch((err) => {
        toast.error("API not working, Please try again after sometime!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5 * 1000,
        });
        setSpinnerFlag(false);
        setProcessMsg("");
        history.push("/");
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
          <br />
          <p style={theme}>{processMsg}</p>
        </div>
      ) : (
        <>
          <Container>
            <Row>
              <Col>
                <br />
                <TextMatcher
                  placeholder="Search within Title or Body"
                  setSearchWordList={setSearchWordList}
                  searchWordList={searchWordList}
                />
              </Col>
              <Col>
                <br />
                <Button onClick={handleDelete} disabled={deleteBtnDisableFlag}>Delele Post</Button>
              </Col>
            </Row>
            <Row>
              <Container>
                <Row>
                  <Col>
                    <Container>
                      <Row>
                        <Col>
                          <h1 style={{ ...theme, marginTop: "6%" }}>Title</h1>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Highlighter
                            highlightClassName="highlight-cls"
                            searchWords={searchWordList}
                            autoEscape={true}
                            className={
                              theme.color === "white"
                                ? "dark-text-cls"
                                : "light-text-cls"
                            }
                            textToHighlight={postInfo.title}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                  <Col>
                    <Container>
                      <Row>
                        <Col>
                          <h1 style={{ ...theme, marginTop: "6%" }}>Body</h1>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Highlighter
                            highlightClassName="highlight-cls"
                            searchWords={searchWordList}
                            autoEscape={true}
                            className={
                              theme.color === "white"
                                ? "dark-text-cls"
                                : "light-text-cls"
                            }
                            textToHighlight={postInfo.body}
                          />
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
            <p style={{ ...theme, fontWeight: "900" }}>{processMsg}</p>
          </Container>
          <Container>
            <Row>
              <Col>{displayCommentsFlag && <CommentDetailPage />}</Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}

export default PostDetailPage;
