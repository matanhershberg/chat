import Typography from "@mui/material/Typography";

interface UsernameDisplayProps {
  username: string;
  isOwnMessage: boolean;
}

const UsernameDisplay: React.FC<UsernameDisplayProps> = ({
  username,
  isOwnMessage,
}) => {
  return (
    <Typography
      variant="caption"
      sx={{
        display: "block",
        fontWeight: "bold",
        color: isOwnMessage ? "primary.contrastText" : "info.light",
        mb: 0.5,
        pb: 0.5,
        fontSize: "0.75rem",
        letterSpacing: "0.5px",
      }}
    >
      {username}
    </Typography>
  );
};

export default UsernameDisplay;
