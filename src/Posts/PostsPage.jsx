import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function PostsPage() {
  const { userId } = useParams();
  useEffect(() => {
    console.log(userId);
  }, []);
  return <div>Posts Page</div>;
}

export default PostsPage;
