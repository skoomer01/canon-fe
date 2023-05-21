import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import TestDetailsPage from './pages/TestDetailsPage';
import OverViewPage from "./pages/OverViewPage";
import TestStepPage from "./pages/TestStepPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/testdetailspage" element={<TestDetailsPage />} />
          <Route path="/LogInPage" element={<LogInPage />} />
          <Route path="/OverViewPage" element={<OverViewPage />} />
          <Route path="/TestStep/:id" element={<TestStepPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
