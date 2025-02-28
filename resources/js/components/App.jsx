import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../Layouts/Layout";
import Home from "../Pages/Home";
import "../../css/app.css"; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Home inside the Layout */}
        </Route>
      </Routes>
    </Router>
  );
}