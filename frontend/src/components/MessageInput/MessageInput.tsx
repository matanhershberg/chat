import { Box, Stack } from "@mui/material";
import MessageInputForm from "./MessageInputForm";
import MessageInputLabel from "./MessageInputLabel";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  return (
    <Box>
      <Stack spacing={2}>
        <MessageInputLabel />
        <MessageInputForm onSendMessage={onSendMessage} />
      </Stack>
    </Box>
  );
};

export default MessageInput;
