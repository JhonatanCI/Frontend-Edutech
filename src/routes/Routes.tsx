import { Routes as Switch, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { ProgramView } from "../pages/ProgramView";
import { NotFound } from "../pages/NotFound";
import { Register } from "../pages/Register";
import CourseView from "../pages/CourseView";
import MicroLearningView from "../pages/MicroLearningView";
import { Login } from "../pages/Login";
import SearchResults from "../pages/SearchResults";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" element={<Home/>} />
      <Route path="/search" element={<SearchResults/>} />
      <Route path="/course/:name" element={<CourseView/>} />
      <Route path="/microlearning/:name" element={<MicroLearningView/>} />
      <Route path="/program/:name" element={<ProgramView/>} />
      <Route path="/*" element={<NotFound/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Switch>
  );
};