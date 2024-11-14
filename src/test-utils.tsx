import React, { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { DiaryProvider, IHandleMessage } from './providers/Context'
import { IContext } from './providers/Context'

interface IProviderProps {
  entries?: Pick<IContext, "entries">["entries"],
  createMessage?: ({ text, password, title }: Pick<IHandleMessage, "text" | "password" | "title">) => void
}

const TestProviders = ({ children, providerProps }: { children: ReactNode, providerProps: IProviderProps }) => {
  const { entries } = providerProps;
  return (
    <DiaryProvider entries={entries}>
      {children}
    </DiaryProvider>
  )
}


const customRender = (
  ui: ReactElement,
  { providerProps, ...renderOptions }: Omit<RenderOptions, 'wrapper'> & { providerProps: IProviderProps },
) => render(<TestProviders providerProps={providerProps}>{ui}</TestProviders>, renderOptions)

export * from '@testing-library/react'
export { customRender as render }