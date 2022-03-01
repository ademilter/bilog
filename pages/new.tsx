import React, { useState } from "react";
import Router from "next/router";
import { TextareaMarkdownRef } from "textarea-markdown-editor";
import TextareaAutosize from "react-textarea-autosize";

import { markdownToHtml } from "lib/editor";

import Layout from "components/Layout";
import Button from "components/Button";
import Editor from "components/Editor/Editor";
import Toolbar from "components/Editor/Toolbar";

const Draft: React.FC = () => {
  const refForm = React.useRef<HTMLFormElement>(null);
  const refEditor = React.useRef<TextareaMarkdownRef>(null);

  const [editorState, setEditorState] = useState("0");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async () => {
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

  if (editorState === "1") {
    return (
      <Layout>
        <div className="flex items-center">
          <Button size="small" onClick={() => setEditorState("0")}>
            Editor
          </Button>
        </div>

        <div className="mt-10 prose prose-zinc max-w-none">
          <div className="text-4xl leading-normal font-bold">
            {title ? title : "Title..."}
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(content || "Tell your story..."),
            }}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <Button size="small" onClick={() => setEditorState("1")}>
          Preview
        </Button>

        <div className="flex items-center gap-2">
          <Button
            size="small"
            onClick={() => {
              if (confirm("Are you sure you want to cancel?")) {
                Router.push("/");
              }
            }}
          >
            Cancel
          </Button>
          <Button
            size="small"
            className="bg-blue-600 text-white"
            onClick={() => submitData()}
          >
            Save
          </Button>
        </div>
      </div>

      <Toolbar
        className="mt-10"
        onBold={() => refEditor.current?.trigger("bold")}
        onItalic={() => refEditor.current?.trigger("italic")}
        onBlockQuotes={() => refEditor.current?.trigger("block-quotes")}
        onCodeInline={() => refEditor.current?.trigger("code-inline")}
        onLink={() => refEditor.current?.trigger("link")}
        onUnorderedList={() => refEditor.current?.trigger("unordered-list")}
        onOrderedList={() => refEditor.current?.trigger("ordered-list")}
      />

      <div className="mt-10">
        <div>
          <form ref={refForm} onSubmit={submitData}>
            <TextareaAutosize
              name="title"
              placeholder="Title..."
              value={title}
              className="text-4xl leading-normal bg-transparent font-bold w-full border-0 outline-0 resize-none placeholder-gray-400"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Editor
              ref={refEditor}
              name="content"
              value={content}
              placeholder="Tell your story..."
              className="mt-4 text-[inherit] bg-transparent w-full border-0 outline-0 resize-none placeholder-gray-400"
              onChange={(e) => setContent(e.target.value)}
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Draft;
