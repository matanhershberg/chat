import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import UsersList from "../UsersList";

const SidebarContainer = styled(Box)({
  display: "none",
  "@media (min-width: 1200px)": {
    display: "block",
  },
});

const UsersSidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <UsersList />
    </SidebarContainer>
  );
};

export default UsersSidebar;
