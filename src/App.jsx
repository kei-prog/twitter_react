import { Route, Routes } from "react-router-dom";
import "./App.css";
import Top from "./routes/Top";
import NoMatch from "./routes/NoMatch";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/top" element={<Top />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
