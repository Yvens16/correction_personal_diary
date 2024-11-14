import CreateMessageComponent from "./CreateMessageComponent";
import { render, screen } from "../../test-utils";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { IHandleMessage } from "../../providers/Context";

// entries: [{ title: "Test", description: "Test", id: "123" }],
// createMessage: function ({ text, password }: { text: string; password: string; }): void {
//   throw new Error("Function not implemented.");
// },
// encryptMessage: function ({ text, password }: { text: string; password: string; }): void {
//   throw new Error("Function not implemented.");
// },
// decryptMessage: function ({ text, password }: { text: string; password: string; }): void {
//   throw new Error("Function not implemented.");
// }

describe("Create Message Component", () => {
  test("Component renders right", async () => {
    render(<CreateMessageComponent createMessage={function ({ text, password, title }: Pick<IHandleMessage, "text" | "password" | "title">): void {
      throw new Error("Function not implemented.");
    }} />, {
      providerProps: {}
    })
    expect(screen.getByText("Create a message")).toBeInTheDocument();
  });


  test("Create a message", async () => {
    const mockCreateEntry = jest.fn();
    render(<CreateMessageComponent createMessage={mockCreateEntry} />, {
      providerProps: {}
    });
    const user = userEvent.setup()
    const titleInput = screen.getByPlaceholderText("Enter title");
    const messageInput = screen.getByPlaceholderText("Enter message");
    const passwordInput = screen.getByPlaceholderText("Enter password");
    const submitButton = screen.getByText("Create message");

    expect(submitButton).toBeDisabled();

    await user.type(messageInput, "My fist message");
    await user.type(passwordInput, "password");
    await user.type(titleInput, "My title")
    await user.click(submitButton);
    expect(mockCreateEntry).toHaveBeenCalledWith({
      text: "My fist message",
      password: "password",
      title: "My title"
    })
  })
})