import { Route, Routes } from "react-router-dom";
import "./App.css";
import Top from "./routes/Top";
import NoMatch from "./routes/NoMatch";
import TweetList from "./routes/TweetList";
import TweetDetailPage from "./routes/TweetDetailPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProfilePage from "./routes/ProfilePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/top" element={<Top />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/index" element={<TweetList />} />
          <Route path="/tweet/:id" element={<TweetDetailPage />} />
          <Route path="/users/:id" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
