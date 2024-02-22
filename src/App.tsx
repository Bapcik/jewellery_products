import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Containers/HomePage/HomePage.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
