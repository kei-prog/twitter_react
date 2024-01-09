import { Route, Routes } from "react-router-dom";
import "./App.css";
import Top from "./routes/Top";
import NoMatch from "./routes/NoMatch";
import TweetList from "./routes/TweetList";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/top" element={<Top />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/index" element={<TweetList />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
