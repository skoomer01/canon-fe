import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import TestDetailPage from './components/TestDetail';
import OverViewPage from "./pages/OverViewPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/testdetailspage/:testBatchId/:testSetId/:testId" element={<TestDetailPage />} />
          <Route path="/LogInPage" element={<LogInPage />} />
          <Route path="/OverViewPage" element={<OverViewPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
