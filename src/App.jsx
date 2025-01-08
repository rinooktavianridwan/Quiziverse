import Footer from "./assets/component/footer/Footer";
import Home from "./assets/page/home/Home";
import Navbar from "./assets/component/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./assets/page/login/Login";
import Quiz from "./assets/page/quiz/Quiz";
import QuizDetail from "./assets/component/detail quiz page/QuizDetail";
import Resume from "./assets/page/resume/Resume";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/quiz/:id" element={<QuizDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
