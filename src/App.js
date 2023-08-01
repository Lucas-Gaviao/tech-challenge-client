import "./App.css";
import PhonesList from "./components/PhonesList";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PhonesList />} />
      </Routes>
    </div>
  );
}

export default App;
