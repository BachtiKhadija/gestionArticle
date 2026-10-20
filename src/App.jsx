import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ArticleList from "./Components/ArticleList";
import ArticleForm from "./Components/ArticleForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/add" element={<ArticleForm />} />
          <Route path="/articles/edit/:id" element={<ArticleForm />} />

          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;