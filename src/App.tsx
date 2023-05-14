import { Switch, Route, Link, useLocation } from "react-router-dom";
import "./App.scss";
import { HomePage } from "./components/HomePage";
import { SuperHeroesPage } from "./components/SuperHeroesPage";
import { RQSuperHeroesPage } from "./components/RQSuperHeroesPage";
import { RQSuperHeroPage } from './components/RQSuperHeroPage';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ParallelQueriesPage } from "./components/ParallelQueries.page";

function App() {
  const location = useLocation();
  const {pathname} =location;

  return (
    <QueryClientProvider client={new QueryClient()}>
      {/* <Router> */}
        <div>
          <nav
            style= {{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link to="/">
              <button
                style={{
                  backgroundColor: pathname === "/" ? "#4A50C0" : "",
                }}
              >
                Home
              </button>
            </Link>

            <Link to="/super-heroes">
              <button
                style={{
                  backgroundColor: pathname === "/super-heroes" ? "#4A50C0" : "",
                }}
              >
                Traditional Super Heroes</button>
            </Link>

            <Link to="/rq-super-heroes">
              <button
                style={{
                  backgroundColor: pathname === "/rq-super-heroes" ? "#4A50C0" : "",
                }}
              >
                RQ Super Heroes
              </button>
            </Link>
            <Link to="/rq-parallel">
              <button
                style={{
                  backgroundColor: pathname === "/rq-parallel" ? "#4A50C0" : "",
                }}
              >
                Parallel Queries
              </button>
            </Link>
          </nav>
          <Switch>
            
            <Route path="/super-heroes">
              <SuperHeroesPage />
            </Route>
            <Route path="/rq-parallel">
              <ParallelQueriesPage />
            </Route>
            <Route path={`/rq-super-heroes/:heroId`}>
              <RQSuperHeroPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      {/* </Router> */}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
