import { AppContent, ChatWrapper } from "./components/App/AppLayout";
import AppContainer from "./components/AppContainer";
import Chat from "./components/Chat/Chat";
import Header from "./components/Header/Header";
import UsernameModal from "./components/UsernameModal";

function App() {
  return (
    <AppContainer>
      <AppContent>
        <Header />
        <ChatWrapper>
          <Chat />
        </ChatWrapper>
        <UsernameModal />
      </AppContent>
    </AppContainer>
  );
}

export default App;
