
import { useContext } from "react"
import { DiaryContext, IHandleMessage, } from "../providers/Context";
import { IdecryptEntry } from "../external-utils";


interface IuseDiaryContext {
  encryptEntry: ({ text, password }: Pick<IHandleMessage, "text" | "password">) => string,
  decryptEntry: ({ encryptedText, password }: IdecryptEntry) => string,
  generateEntryId: () => string,
}


export const useDiary = ({
  encryptEntry,
  decryptEntry,
  generateEntryId,
}: IuseDiaryContext) => {
  
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error("useDiaryContext was used outside of its Provider");
  }

  function createEncryptedMessage({ text, password, title }: Pick<IHandleMessage, "text" | "password" | "title">) {
    const encryptedMessage = encryptEntry({ text, password });
    const id = generateEntryId();
    context!.setEntries((prevState) => ([
      ...prevState,
      { id, title, description: encryptedMessage }
    ]))
  }

  function decryptMessage({ id, password }: Pick<IHandleMessage, | "password" | "id">) {
    const entries = context!.entries;
    const entryIndex = entries.findIndex((entry) => entry.id === id);
    const entry = entries[entryIndex];
    const encryptedText = entry.description;
    return decryptEntry({ encryptedText, password })
  }

  return {
    createEncryptedMessage,
    decryptMessage,
    entries: context.entries,
  };
}