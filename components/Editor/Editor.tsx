import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import TextareaMarkdown from "textarea-markdown-editor";

// const markCommandHandler: CommandHandler = ({ element, options }) => {
//   console.log(options);
//   new Cursor(element).wrapSelected("<mark>", {
//     placeholder: options.boldPlaceholder,
//   });
// };

type TextareaProps = React.ComponentPropsWithoutRef<"textarea">;

const Editor = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ ...rest }, forwardedRef) => {
    return (
      <TextareaMarkdown.Wrapper
        ref={forwardedRef as undefined}
        commands={[
          { name: "indent", enable: false },
          // { name: "mark", handler: markCommandHandler },
        ]}
      >
        {/* @ts-ignore */}
        <TextareaAutosize {...rest} />
      </TextareaMarkdown.Wrapper>
    );
  }
);

export default Editor;
