import React from "react";
import Post from "./Post";
import type { PostProps } from "./Post";

export type Props = {
  data: PostProps[];
};

const PostList: React.FC<Props> = ({ data }) => {
  return (
    <div className="divide-y divide-gray-200">
      {data.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
};

export default PostList;
