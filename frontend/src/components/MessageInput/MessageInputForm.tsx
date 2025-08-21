import { Stack } from "@mui/material";
import { useState } from "react";
import MessageTextField from "./MessageTextField";
import SendButton from "./SendButton";

interface MessageInputFormProps {
  onSendMessage: (message: string) => void;
}

const MessageInputForm = ({ onSendMessage }: MessageInputFormProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2}>
        <MessageTextField value={input} onChange={setInput} />
        <SendButton disabled={!input.trim()} />
      </Stack>
    </form>
  );
};

export default MessageInputForm;
