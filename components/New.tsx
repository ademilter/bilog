import React from "react";
import { useRouter } from "next/router";
import { TextareaMarkdownRef } from "textarea-markdown-editor";
import TextareaAutosize from "react-textarea-autosize";
import useFetch from "use-http";

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
  const router = useRouter();
  const postId = router.query.id || null;

  const refEditor = React.useRef<TextareaMarkdownRef>(null);

  const [editorState, setEditorState] = React.useState<EditorState>(
    EditorState.Edit
  );

  const [post, setPost] = React.useState({
    title: "",
    content: "",
    published: false,
  });

  const debouncedPost = useDebounce(post, 1000);

  const {
    get: getPost,
    post: createPost,
    put: updatePost,
    response: responsePost,
    loading: loadingPost,
  } = useFetch("/post");

  const {
    put: publishPost,
    response: responsePublish,
    loading: loadingPublish,
  } = useFetch("/publish");

  const onGet = async () => {
    try {
      const data = await getPost(postId as string);
      if (!responsePost.ok) throw new Error(responsePost.data.message);
      setPost(data);
    } catch (error) {
      return router.push("/drafts");
    }
  };

  const onCreate = async () => {
    try {
      const data = await createPost(post);
      if (!responsePost.ok) throw new Error(responsePost.data.message);
      await router.push(`draft/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdate = async () => {
    try {
      await updatePost(postId, post);
      if (!responsePost.ok) throw new Error(responsePost.data.message);
      return router.push(`/p/${postId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onPublish = async () => {
    try {
      await publishPost(postId, post);
      if (!responsePublish.ok) throw new Error(responsePublish.data.message);
      return router.push(`/p/${postId}`);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (post.published || postId) return;
    onCreate();
  }, [debouncedPost]);

  React.useEffect(() => {
    if (!postId) return;
    onGet();
  }, [postId]);

  return (
    <Layout
      header={
        <header className="fixed inset-0 bottom-auto bg-gray-100 py-4">
          <Container>
            <div className="flex items-center space-x-2">
              <Button
                size="small"
                disabled={loadingPublish}
                className="bg-blue-600 text-white"
                onClick={onPublish}
              >
                Publish
              </Button>
              {!post.published && (
                <Button
                  size="small"
                  disabled={loadingPost}
                  className="bg-blue-100"
                  onClick={onUpdate}
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
              value={post.title}
              className="text-4xl leading-none bg-transparent font-bold w-full border-0 outline-0 resize-none placeholder-gray-400"
              onChange={(e) =>
                setPost((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
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
                    __html: markdownToHtml(
                      post.content || "Tell your story..."
                    ),
                  }}
                />
              ) : (
                <Editor
                  ref={refEditor}
                  name="content"
                  value={post.content}
                  placeholder="Tell your story..."
                  className="text-[inherit] bg-transparent w-full border-0 outline-0 resize-none placeholder-gray-400"
                  onChange={(e) =>
                    setPost((prevState) => ({
                      ...prevState,
                      content: e.target.value,
                    }))
                  }
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
