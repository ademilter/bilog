import React from "react";
import Post from "./Post";
import type { PostProps } from "./Post";

export type Props = {
  data: PostProps[];
  hideAuthor?: boolean;
};

const PostList: React.FC<Props> = ({ data = [], hideAuthor = false }) => {
  return (
    <div className="divide-y divide-gray-200">
      {data.map((post) => (
        <Post key={post.id} hideAuthor={hideAuthor} {...post} />
      ))}
    </div>
  );
};

export default PostList;
