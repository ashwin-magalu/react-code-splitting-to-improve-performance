import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import "./App.css";

// Use lazy loading only after importing all default imports like above or else it will fail
// for default exports
const Home = lazy(() => import("./components/Home"));
const Store = lazy(() => wait(1000).then(() => import("./components/Store")));
// for named exports
const About = lazy(() =>
  import("./components/About").then((module) => {
    return { default: module.About };
  })
);

export function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<NavWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

const NavWrapper = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/store">Store</Link>
        <Link to="/about">About</Link>
      </nav>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    </>
  );
};

const wait = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};
