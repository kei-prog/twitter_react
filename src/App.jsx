import { Route, Routes } from "react-router-dom";
import "./App.css";
import Top from "./routes/Top";
import NoMatch from "./routes/NoMatch";
import TweetList from "./routes/TweetList";
import TweetDetailPage from "./routes/TweetDetailPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProfilePage from "./routes/ProfilePage";
import { UserProvider } from "./contexts/UserContext";
import NotificationList from "./routes/NotificationList";
import Group from "./routes/Group";
import Bookmark from "./routes/Bookmark";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/top" element={<Top />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/index" element={<TweetList />} />
          <Route path="/notifications" element={<NotificationList />} />
          <Route path="/tweet/:id" element={<TweetDetailPage />} />
          <Route path="/users/:id" element={<ProfilePage />} />
          <Route path="/group" element={<Group />} />
          <Route path="/message" element={<Group />} />
          <Route path="/bookmark" element={<Bookmark />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
