import AppSubtitle from "./AppSubtitle";
import AppTitle from "./AppTitle";
import HeaderContainer from "./HeaderContainer";

const Header = () => {
  return (
    <HeaderContainer>
      <AppTitle variant="h3">Chat App</AppTitle>
      <AppSubtitle variant="body1">
        Connect with people around the world
      </AppSubtitle>
    </HeaderContainer>
  );
};

export default Header;
