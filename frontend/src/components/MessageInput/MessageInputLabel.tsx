import { Typography } from "@mui/material";

const MessageInputLabel = () => {
  return (
    <Typography
      variant="caption"
      sx={{
        color: "text.secondary",
        fontSize: "0.75rem",
        fontWeight: 500,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
      }}
    >
      Type your message
    </Typography>
  );
};

export default MessageInputLabel;
