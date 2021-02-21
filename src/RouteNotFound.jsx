import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function RouteNotFound() {
  const theme = useSelector((globalStore) => globalStore.theme);
  return (
    <div>
      <h1 style={theme}>404 - Not Found!</h1>
      <Link to="/">
        <h2>Go Home</h2>
      </Link>
    </div>
  );
}

export default RouteNotFound;
