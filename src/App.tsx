import { AppRoutes } from "./routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ScrollToTop from "./components/Commons/ScrollToTop";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <AppRoutes />
      </Router>
    </Provider>
  );
}

export default App;