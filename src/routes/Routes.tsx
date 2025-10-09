import { Routes as Switch, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { ProgramView } from "../pages/ProgramView";
import { NotFound } from "../pages/NotFound";
import CourseView from "../pages/CourseView";
import MicroLearningView from "../pages/MicroLearningView";
import SearchResults from "../pages/SearchResults";

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/course/:name" element={<CourseView />} />
      <Route path="/microlearning/:name" element={<MicroLearningView />} />
      <Route path="/program/:name" element={<ProgramView />} />
      <Route path="/*" element={<NotFound />} />
    </Switch>
  );
};
