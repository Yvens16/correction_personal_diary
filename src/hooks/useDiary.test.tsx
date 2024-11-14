import { renderHook, act } from '@testing-library/react-hooks'
import { DiaryProvider } from '../providers/Context'
import { ReactNode } from 'react'
import { useDiary } from './useDiary'


describe("Diary Custom Hook", () => {
  let id = 0;
  test("Should create message", () => {
    const wrapper = ({ children }: { children: ReactNode }) => <DiaryProvider >{children}</DiaryProvider>
    const { result } = renderHook(() => useDiary({
      encryptEntry: () => "encryptedMessage",
      decryptEntry: () => "decryptedMessage",
      generateEntryId: () => {
        let idToReturn = id;
        id++;
        return idToReturn.toString()
      }
    }), {wrapper})
    act(() => {
      result.current.createEncryptedMessage({ text: "text", password: "password", title: "title" })
    })

    expect(result.current.entries).toHaveLength(1);
  })
})