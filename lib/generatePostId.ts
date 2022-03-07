import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdefghijklmnoprstuvyzqw", 10);

export default function generatePostId() {
  return nanoid();
}
