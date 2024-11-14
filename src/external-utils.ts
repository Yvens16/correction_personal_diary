import aes from "crypto-js/aes";
import { v4 as uuidv4 } from "uuid";
import { IHandleMessage } from "./providers/Context";

export function encryptEntry({
  text,
  password,
}: Pick<IHandleMessage, "text" | "password">) {
  const encryptedMessage = aes.encrypt(text, password).toString();
  return encryptedMessage;
}
export interface IdecryptEntry {
  encryptedText: string;
  password: string;
}
export function decryptEntry({
  encryptedText,
  password,
}: {
  encryptedText: string;
  password: string;
}) {
  var bytes = CryptoJS.AES.decrypt(encryptedText, password);
  var decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
}

export function generateEntryId() {
  const id = uuidv4();
  return id;
}
