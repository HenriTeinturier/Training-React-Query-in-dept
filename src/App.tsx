import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";
import { HomePage } from "./components/HomePage";
import { SuperHeroesPage } from "./components/SuperHeroesPage";
import { RQSuperHeroesPage } from "./components/RQSuperHeroesPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Router>
        <div>
          <nav>
            <Link to="/">
              <button>Home</button>
            </Link>

            <Link to="/super-heroes">
              <button>Traditional Super Heroes</button>
            </Link>

            <Link to="/rq-super-heroes">
              <button>RQ Super Heroes</button>
            </Link>
          </nav>
          <Switch>
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
