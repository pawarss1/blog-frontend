import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import { Container, Row, Col, Button } from "react-bootstrap";
import SearchBar from "../SearchBar";
import UserPostTable from "./UserPostTable";
import { pageSize } from "../GlobalData";

toast.configure();

function PostsPage() {
  const { userId } = useParams();
  const spinnerType = useRef("Grid");
  const [userPostList, setUserPostList] = useState([]);
  const [tempUserPostList, setTempUserPostList] = useState([]);
  const [spinnerFlag, setSpinnerFlag] = useState(true);
  const toBeSearchedIn = ["title"];
  const [curPage, setCurPage] = useState(1);
  const [lastPageNumber, setLastPageNumber] = useState(0);
  const [mainListLength, setMainListLength] = useState(0);
  const [bufferCurPage, setBufferCurPage] = useState(0);

  const limit = pageSize;
  const handleNavigation = (direction) => {
    setSpinnerFlag(true);
    spinnerType.current = "Puff";
    const tempPage = curPage;
    if (direction === "next") {
      getData(tempPage + 1, lastPageNumber);
    } else {
      getData(tempPage - 1, lastPageNumber);
    }
  };
  const getData = (pageNo, lastPageNumber) => {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_page=${pageNo}&_limit=${limit}`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(curPage + " " + lastPageNumber);
        setCurPage(pageNo);
        setBufferCurPage(pageNo);
        setUserPostList(res);
        setTempUserPostList(res);
        setSpinnerFlag(false);
      })
      .catch((err) => {
        toast.error("API not working, Please try again after sometime!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5 * 1000,
        });
        setSpinnerFlag(false);
      });
  };
  useEffect(() => {
    spinnerType.current = "Grid";
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((res) => res.json())
      .then((res) => {
        setMainListLength(res.length);
        const lastPageNumberSync = Math.ceil(res.length / limit);
        setLastPageNumber(lastPageNumberSync);
        return lastPageNumberSync;
      })
      .then((lastPageNumberSync) => getData(1, lastPageNumberSync))
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
      <>
        <Container>
          <Row>
            <Col></Col>
            <Col>
              <br />
              <SearchBar
                placeholder="Search within Post Title"
                setList={setUserPostList}
                list={userPostList}
                toBeSearchedIn={toBeSearchedIn}
                mainList={tempUserPostList}
                setCurPage={setCurPage}
                setLastPageNumber={setLastPageNumber}
                curPage={curPage}
                mainListLength={mainListLength}
                bufferCurPage={bufferCurPage}
              />
            </Col>
          </Row>
          <Row>
            {spinnerFlag === true ? (
              <div style={{ margin: "auto" }}>
                <br />
                <Loader
                  type={spinnerType.current}
                  color="rgba(228, 225, 225, 0.829)"
                  height={200}
                  width={200}
                />
                <br />
              </div>
            ) : (
              <UserPostTable userPostList={userPostList} />
            )}
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <Button
                className="leftBtn"
                onClick={() => handleNavigation("prev")}
                disabled={curPage <= 1}
              >
                Prev
              </Button>
            </Col>
            <Col>
              <Button
                className="rightBtn"
                onClick={() => handleNavigation("next")}
                disabled={curPage === lastPageNumber}
              >
                Next
              </Button>
            </Col>
          </Row>
        </Container>
      </>
    </div>
  );
}

export default PostsPage;
