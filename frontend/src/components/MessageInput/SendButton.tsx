import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";

interface SendButtonProps {
  disabled: boolean;
}

const SendButton = ({ disabled }: SendButtonProps) => {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={disabled}
      sx={{
        minWidth: "56px",
        height: "56px",
        borderRadius: "50%",
        background: !disabled
          ? "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)"
          : "rgba(255, 255, 255, 0.1)",
        boxShadow: !disabled ? "0 4px 20px rgba(99, 102, 241, 0.3)" : "none",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: !disabled ? "translateY(-2px)" : "none",
          boxShadow: !disabled ? "0 6px 25px rgba(99, 102, 241, 0.4)" : "none",
        },
        "&:disabled": {
          background: "rgba(255, 255, 255, 0.1)",
          color: "text.secondary",
        },
      }}
    >
      <SendIcon />
    </Button>
  );
};

export default SendButton;
