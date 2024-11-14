
// const SomeContext = createContext(defaultValue)
import { createContext, ReactNode, useState } from "react";


export interface IHandleMessage {
  text: string,
  password: string,
  title: string,
  id: string,
}

type Entry = {
  title: string, description: string, id: string
}

export interface IContext {
  entries: Entry[],
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>,
}
export const DiaryContext = createContext<IContext | null>(null);

export function DiaryProvider({
  children,
  entries: defaultEntries,
}: { children: ReactNode, entries?: Entry[] }) {
  const [entries, setEntries] = useState<Entry[]>(defaultEntries || []);

  return <DiaryContext.Provider 
  value={{
    entries,
    setEntries,
  }}>
    {children}
  </DiaryContext.Provider>
}


