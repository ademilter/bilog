import React from "react";
import cx from "classnames";
import Button from "../Button";
import Container from "../Container";

type Props = {
  onBold: () => void;
  onItalic: () => void;
  onBlockQuotes: () => void;
  onCodeInline: () => void;
  onLink: () => void;
  onUnorderedList: () => void;
  onOrderedList: () => void;
  className?: string;
};

const EditorToolbar: React.FC<Props> = ({
  onBold = () => {},
  onItalic = () => {},
  onBlockQuotes = () => {},
  onCodeInline = () => {},
  onLink = () => {},
  onUnorderedList = () => {},
  onOrderedList = () => {},
  className = "",
}) => {
  return (
    <div className={cx("", className)}>
      <Container>
        <div className="flex items-center gap-1">
          <Button onClick={onBold} size="small">
            <svg
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              className="fill-gray-600"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 00-1 1v10a1 1 0 001 1h5.5a3.5 3.5 0 001.852-6.47A3.5 3.5 0 008.5 2H4zm4.5 5a1.5 1.5 0 100-3H5v3h3.5zM5 9v3h4.5a1.5 1.5 0 000-3H5z"
              />
            </svg>
          </Button>
          <Button onClick={onItalic} size="small">
            <svg
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              className="fill-gray-600"
            >
              <path
                fillRule="evenodd"
                d="M6 2.75A.75.75 0 016.75 2h6.5a.75.75 0 010 1.5h-2.505l-3.858 9H9.25a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5h2.505l3.858-9H6.75A.75.75 0 016 2.75z"
              />
            </svg>
          </Button>
          <Button onClick={onBlockQuotes} size="small">
            <svg
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              className="fill-gray-600"
            >
              <path
                fillRule="evenodd"
                d="M1.75 2.5a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H1.75zm4 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm0 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zM2.5 7.75a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6z"
              />
            </svg>
          </Button>
          <Button onClick={onCodeInline} size="small">
            <svg
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              className="fill-gray-600"
            >
              <path
                fillRule="evenodd"
                d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z"
              />
            </svg>
          </Button>
          <Button onClick={onLink} size="small">
            <svg
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              className="fill-gray-600"
            >
              <path
                fillRule="evenodd"
                d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
              />
            </svg>
          </Button>
          <Button onClick={onUnorderedList} size="small">
            <svg
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              className="fill-gray-600"
            >
              <path
                fillRule="evenodd"
                d="M2 4a1 1 0 100-2 1 1 0 000 2zm3.75-1.5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm0 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm0 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zM3 8a1 1 0 11-2 0 1 1 0 012 0zm-1 6a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
          </Button>
          <Button onClick={onOrderedList} size="small">
            <svg
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              className="fill-gray-600"
            >
              <path
                fillRule="evenodd"
                d="M2.003 2.5a.5.5 0 00-.723-.447l-1.003.5a.5.5 0 00.446.895l.28-.14V6H.5a.5.5 0 000 1h2.006a.5.5 0 100-1h-.503V2.5zM5 3.25a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 3.25zm0 5a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 8.25zm0 5a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 01-.75-.75zM.924 10.32l.003-.004a.851.851 0 01.144-.153A.66.66 0 011.5 10c.195 0 .306.068.374.146a.57.57 0 01.128.376c0 .453-.269.682-.8 1.078l-.035.025C.692 11.98 0 12.495 0 13.5a.5.5 0 00.5.5h2.003a.5.5 0 000-1H1.146c.132-.197.351-.372.654-.597l.047-.035c.47-.35 1.156-.858 1.156-1.845 0-.365-.118-.744-.377-1.038-.268-.303-.658-.484-1.126-.484-.48 0-.84.202-1.068.392a1.858 1.858 0 00-.348.384l-.007.011-.002.004-.001.002-.001.001a.5.5 0 00.851.525zM.5 10.055l-.427-.26.427.26z"
              />
            </svg>
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default EditorToolbar;
