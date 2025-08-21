import { TextField } from "@mui/material";

interface MessageTextFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const MessageTextField = ({ value, onChange }: MessageTextFieldProps) => {
  return (
    <TextField
      placeholder="What's on your mind?"
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      multiline
      maxRows={4}
      sx={{
        "& .MuiOutlinedInput-root": {
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 3,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            borderColor: "primary.main",
            background: "rgba(255, 255, 255, 0.08)",
          },
          "&.Mui-focused": {
            borderColor: "primary.main",
            background: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
          },
          "& .MuiOutlinedInput-input": {
            color: "text.primary",
            "&::placeholder": {
              color: "text.secondary",
              opacity: 0.7,
            },
          },
        },
      }}
    />
  );
};

export default MessageTextField;
