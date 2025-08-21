import Box from "@mui/material/Box";

const EmptyState: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        color: "text.secondary",
        textAlign: "center",
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          opacity: 0.6,
        }}
      >
        💬
      </Box>
      <Box sx={{ fontSize: "18px", fontWeight: 500 }}>
        Start the conversation
      </Box>
      <Box sx={{ fontSize: "14px", opacity: 0.7 }}>
        Send a message to begin chatting
      </Box>
    </Box>
  );
};

export default EmptyState;
