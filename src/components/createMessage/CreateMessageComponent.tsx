
import { useState } from "react";
import { IHandleMessage } from "../../providers/Context";

export default function CreateMessageComponent({ createMessage }:
  { createMessage: ({text, password, title}: Pick<IHandleMessage, "text" | "password" | "title">) => void}) {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [password, setpassword] = useState("");


  return <section>
    <h1>Create a message</h1>
    <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter title" />
    <input onChange={(e) => setMessage(e.target.value)} value={message} type="text" placeholder="Enter message" />
    <input onChange={(e) => setpassword(e.target.value)} value={password} type="text" placeholder="Enter password" />
    <button disabled={!message || !password} onClick={() => createMessage({ text: message, password, title })}>Create message</button>
  </section>
}