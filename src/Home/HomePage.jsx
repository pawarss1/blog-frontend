import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableDisplay from "./TableDisplay";
import SearchBar from "../SearchBar";
import { Container, Row, Col } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { API_URL } from "../GlobalData";
import { useSelector } from "react-redux";

toast.configure();
//Toast Configuration.

function HomePage() {
  const theme = useSelector((globalStore) => globalStore.theme);
  //Using theme from "REDUX STORE" to store the current theme chosen by the user, it can be light or dark.
  const [userList, setUserList] = useState([]);
  const [tempUserList, setTempUserList] = useState([]);
  const [spinnerFlag, setSpinnerFlag] = useState(true);
  const toBeSearchedIn = ["name", "company"];
  const history = useHistory();

  const getUserData = () => {
    //Get all the User Data.
    const url = `${API_URL}/users`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const storeArr = res.map((user) => {
          return {
            id: user.id,
            name: user.name,
            company: user.company.name,
          };
        });
        setUserList(storeArr);
        //Temporary list on which the search will take place
        setTempUserList(storeArr);
        setSpinnerFlag(false);
      })
      .catch((err) => {
        toast.error("API not working, Please try again after sometime!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5 * 1000,
        });
        setSpinnerFlag(false);
        //If any error occurs, redirect user to the home page, for better UX.
        history.push("/");
      });
  };

  useEffect(() => {
    getUserData();
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
          <p style={theme}>User Data Loading!</p>
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
