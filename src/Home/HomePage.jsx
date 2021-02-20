import React, { useEffect, useState } from "react";
import { userDataSlice } from "../Store/userDataSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableDisplay from "./TableDisplay";
import SearchBar from "../SearchBar";
import { Container, Row, Col } from "react-bootstrap";

toast.configure();

function HomePage() {
  const [userList, setUserList] = useState([]);
  const [tempUserList, setTempUserList] = useState([]);
  const toBeSearchedIn = ["name", "company"]
  const dispatch = useDispatch();
  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const storeArr = res.map((user) => {
          return {
            "id": user.id,
            "name":user.name,
            "company": user.company.name,
            "postUrl": `http://localhost:3000/posts/${user.id}`,
          };
        });
        setUserList(storeArr);
        setTempUserList(storeArr);
        const payload = {
          userList: storeArr,
        };
        //Storing the data on the Redux Store.
        dispatch(userDataSlice.actions.addNewUserList(payload));
      })
      .catch((err) => {
        toast.error("API not working, Please try again after sometime!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5 * 1000,
        });
      });
  }, []);
  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <br />
            <SearchBar
              placeholder="Search within UserName and Company Name"
              setList={setUserList}
              list={userList}
              toBeSearchedIn={toBeSearchedIn}
              mainList={tempUserList}
            />
          </Col>
        </Row>
        <Row>
          <TableDisplay userList={userList} />
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
