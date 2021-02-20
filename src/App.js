import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import HomePage from "./Home/HomePage";
import PostsPage from "./Posts/PostsPage";
import PostsDetailPage from "./PostDetails/PostDetailPage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/posts/:userId" exact>
          <PostsPage />
        </Route>
        <Route path="/postDetails/:postId" exact>
          <PostsDetailPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
