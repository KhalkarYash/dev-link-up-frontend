import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";
import ChangePassword from "./components/ChangePassword";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            {/* Public / unauthenticated routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* Protected / app layout routes */}
            <Route path="/" element={<Body />}>
              <Route path="/feed" element={<Feed />} />
              <Route path="profile" element={<Profile />} />
              <Route path="premium" element={<Premium />} />
              <Route path="requests" element={<Requests />} />
              <Route path="connections" element={<Connections />} />
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="chat/:targetUserId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
