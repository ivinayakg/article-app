import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./services";
import Login from "./views/login";
import Register from "./views/register";
import Header from "./views/components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Create from "./views/create";
import MyBlog from "./views/my-blogs";
import Home from "./views/home";
import SingleBlog from "./views/singleBlog";
import Update from "./views/update";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3500}
        newestOnTop={true}
      />
      <Header />
      <Routes>
        {/* private routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/create">
            <Route path="/create/:_id" element={<Update />} />
            <Route index element={<Create />} />
          </Route>
          <Route path="/my-blogs" element={<MyBlog />} />
          <Route path="/" element={<Home />} />
          <Route path="/blog/:_id" element={<SingleBlog />} />
        </Route>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
