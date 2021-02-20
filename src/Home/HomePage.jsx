import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableDisplay from "./TableDisplay";
import SearchBar from "../SearchBar";
import { Container, Row, Col } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";


toast.configure();

function HomePage() {
  const [userList, setUserList] = useState([]);
  const [tempUserList, setTempUserList] = useState([]);
  const [spinnerFlag, setSpinnerFlag] = useState(true);
  const toBeSearchedIn = ["name", "company"];
  const history = useHistory();
  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const storeArr = res.map((user) => {
          return {
            id: user.id,
            name: user.name,
            company: user.company.name,
            postUrl: `http://localhost:3000/posts/${user.id}`,
          };
        });
        setUserList(storeArr);
        setTempUserList(storeArr);
        setSpinnerFlag(false);
      })
      .catch((err) => {
        toast.error("API not working, Please try again after sometime!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5 * 1000,
        });
        setSpinnerFlag(false);
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
        </div>
      ) : (
        <Container>
          <Row>
            <Col></Col>
            <Col>
              <br />
              <SearchBar
                placeholder="Search within User Name or Company Name"
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
      )}
    </div>
  );
}

export default HomePage;
