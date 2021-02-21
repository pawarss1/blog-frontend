import "./App.css";
import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./Home/HomePage";
import PostsPage from "./Posts/PostsPage";
import PostsDetailPage from "./PostDetails/PostDetailPage";
import Toggle from "react-toggle";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { themeSwitchSlice } from "./Store/themeSwitchSlice";
import RouteNotFound from './RouteNotFound';

function App() {
  const [appStyle, setAppStyle] = useState({
    textAlign: "center",
    backgroundColor: "white",
    height: "auto",
    minHeight: "100vh",
  });
  const dispatch = useDispatch();
  //This will dispatch a update theme event that will in return update the REDUX STORE with proper theme
  useEffect(() => {
    const textColor = appStyle.backgroundColor === "white" ? "black" : "white";
    const payload = {
      theme: { color: textColor },
    };
    //Add the Theme globally to the REDUX-STORE.
    dispatch(themeSwitchSlice.actions.updateTheme(payload));
  }, [appStyle]);

  const handleThemeChange = () => {
    if (appStyle.backgroundColor === "white") {
      setAppStyle({ ...appStyle, backgroundColor: "black" });
    } else {
      setAppStyle({ ...appStyle, backgroundColor: "white" });
    }
  };
  return (
    <div style={appStyle}>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <br />
            <div style={{ float: "right" }}>
              <Toggle
                className="DarkToggle"
                onChange={handleThemeChange}
                aria-label="Dark mode"
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Switch>
        <Route path="/userPosts/:userId" exact>
          <PostsPage />
        </Route>
        <Route path="/postDetails/:postId" exact>
          <PostsDetailPage />
        </Route>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route>
          <RouteNotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
