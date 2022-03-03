import React from "react";
import { useRouter } from "next/router";
import { TextareaMarkdownRef } from "textarea-markdown-editor";
import TextareaAutosize from "react-textarea-autosize";

import { markdownToHtml } from "lib/editor";
import useDebounce from "hooks/useDebounce";

import Layout from "components/Layout";
import Button from "components/Button";
import Editor from "components/Editor/Editor";
import Toolbar from "components/Editor/Toolbar";
import Container from "components/Container";

export enum EditorState {
  Edit = 0,
  Preview = 1,
}

const NewPost: React.FC = () => {
  const refEditor = React.useRef<TextareaMarkdownRef>(null);
  const [editorState, setEditorState] = React.useState<EditorState>(
    EditorState.Edit
  );

  const router = useRouter();
  const postId = router.query.id || null;

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [published, setPublished] = React.useState(false);

  const debouncedTitle = useDebounce(title, 1000);
  const debouncedContent = useDebounce(content, 1000);

  const getPost = async () => {
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setContent(data.content);
      setTitle(data.title);
      setPublished(data.published);
    } catch (error) {
      return router.push("/drafts");
    }
  };

  const createPost = async () => {
    try {
      const response = await fetch(`/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      await router.push(`draft/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const updatePost = async () => {
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return router.push(`/p/${postId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const publishPost = async () => {
    try {
      const response = await fetch(`/api/publish/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      return router.push(`/p/${postId}`);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (published || postId) return;
    createPost();
  }, [debouncedTitle, debouncedContent]);

  React.useEffect(() => {
    if (!postId) return;
    getPost();
  }, [postId]);

  return (
    <Layout
      header={
        <header className="fixed inset-0 bottom-auto bg-gray-100 py-4">
          <Container>
            <div className="flex items-center space-x-2">
              <Button
                size="small"
                className="!bg-blue-600 text-white"
                onClick={publishPost}
              >
                Publish
              </Button>
              {!published && (
                <Button
                  size="small"
                  className="!bg-blue-100"
                  onClick={updatePost}
                >
                  Save as Draft
                </Button>
              )}
            </div>
          </Container>
        </header>
      }
    >
      <div className="mt-20">
        <div>
          <form>
            <TextareaAutosize
              name="title"
              placeholder="Title..."
              value={title}
              className="text-4xl leading-none bg-transparent font-bold w-full border-0 outline-0 resize-none placeholder-gray-400"
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="my-4 flex items-center gap-1">
              <Button
                size="small"
                onClick={() =>
                  setEditorState((state) =>
                    state === EditorState.Edit
                      ? EditorState.Preview
                      : EditorState.Edit
                  )
                }
              >
                {editorState === EditorState.Edit ? "Preview" : "Edit"}
              </Button>
              <Toolbar
                onBold={() => refEditor.current?.trigger("bold")}
                onItalic={() => refEditor.current?.trigger("italic")}
                onBlockQuotes={() => refEditor.current?.trigger("block-quotes")}
                onCodeInline={() => refEditor.current?.trigger("code-inline")}
                onLink={() => refEditor.current?.trigger("link")}
                onUnorderedList={() =>
                  refEditor.current?.trigger("unordered-list")
                }
                onOrderedList={() => refEditor.current?.trigger("ordered-list")}
              />
            </div>

            <div className="mt-2">
              {editorState === EditorState.Preview ? (
                <div
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: markdownToHtml(content || "Tell your story..."),
                  }}
                />
              ) : (
                <Editor
                  ref={refEditor}
                  name="content"
                  value={content}
                  placeholder="Tell your story..."
                  className="text-[inherit] bg-transparent w-full border-0 outline-0 resize-none placeholder-gray-400"
                  onChange={(e) => setContent(e.target.value)}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewPost;
