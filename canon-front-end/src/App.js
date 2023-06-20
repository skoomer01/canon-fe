import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage'
import TestDetailsPage from './pages/TestDetailsPage';
import OverViewPage from "./pages/OverViewPage";
import TestStepPage from "./pages/TestStepPage";
import SubTestPage from "./pages/SubTestPage";
import SearchPage from "./pages/SearchPage";
import SimilarErrorsPage from "./pages/SimilarErrorsPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/testdetailspage/:id" element={<TestDetailsPage />} />
          <Route path="/LogInPage" element={<LogInPage />} />
          <Route path="/SubTestPage/:id" element={<SubTestPage />} />
          <Route path="/OverViewPage" element={<OverViewPage />} />
          <Route path="/TestStep/:id" element={<TestStepPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/SimilarErrorsPage/:id" element={<SimilarErrorsPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
