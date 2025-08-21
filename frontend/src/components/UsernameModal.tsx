import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { userActions } from "../store/user";
import websocket from "../websocket";

const UsernameModal: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [usernameInput, setUsernameInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    websocket.setUsername(usernameInput.trim(), (result) => {
      if (result.success && result.username) {
        dispatch(userActions.addName(result.username));
        setError(null);
        setUsernameInput("");
      } else {
        setError(result.error || "Unknown error");
      }
    });
  };

  return (
    <Dialog open={user.name === undefined}>
      <DialogTitle>Enter user name</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            margin="dense"
            label="User Name"
            type="text"
            variant="outlined"
            onChange={(e) => setUsernameInput(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <DialogActions>
            <Button type="submit" disabled={usernameInput.trim() === ""}>
              OK
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UsernameModal;
