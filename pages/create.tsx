import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";
import Button from "../components/Button";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <main className="max-w-4xl m-auto">
        <form onSubmit={submitData}>
          <div className="grid grid-cols-1 gap-4">
            <h1>New Draft</h1>

            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={title}
            />

            <textarea
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={8}
              value={content}
            />

            <input disabled={!content || !title} type="submit" value="Create" />

            <Button onClick={() => Router.push("/")}>or Cancel</Button>
          </div>
        </form>
      </main>
    </Layout>
  );
};

export default Draft;
