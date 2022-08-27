import GlobalStyle from "./components/GlobalStyle";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddNewPatient from "./pages/AddNewPatient";
import { QuestionProvider } from "./context/questionContext";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
        <QuestionProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddNewPatient />} />
          </Routes>
        </QuestionProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
