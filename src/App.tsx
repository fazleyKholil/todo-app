import "./App.css";
import { Routes, Route } from "react-router-dom";
import Viewtodo from "./Components/Pages/ViewTodo";
import CreateTodo from "./Components/Pages/CreateTodo";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Viewtodo />} />
        <Route path="create" element={<CreateTodo />} />
      </Routes>
    </div>
  );
};

export default App;
