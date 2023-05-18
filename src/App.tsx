import { Switch, Route, Link, useLocation } from "react-router-dom";
import "./App.scss";
import { HomePage } from "./components/HomePage";
import { SuperHeroesPage } from "./components/SuperHeroesPage";
import { RQSuperHeroesPage } from "./components/RQSuperHeroesPage";
import { RQSuperHeroPage } from './components/RQSuperHeroPage';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ParallelQueriesPage } from "./components/ParallelQueries.page";
import { DynamicParallelQueriesPage } from "./components/DynamixParallelQueryes.page";
import { DependentQueriesPage } from "./components/DependentQueries.page";
import { PaginedQueriesPage } from "./components/PaginedQueries.page";
import { InfiniteQueriesPage } from "./components/InfiniteQueries.page";
import { InfiniteQueriesScrollPage } from "./components/InfiniteQueriesScroll.page";

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
              flexWrap: 'wrap',
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
            <Link to="/rq-dynamic-parallel">
              <button
                style={{
                  backgroundColor: pathname === "/rq-dynamic-parallel" ? "#4A50C0" : "",
                }}
              >
                Dynamic Parallel Queries
              </button>
            </Link>
            <Link to="/rq-dependent-queries">
              <button
                style={{
                  backgroundColor: pathname === "/rq-dependentQueries" ? "#4A50C0" : "",
                }}
              >
                Dependent Queries
              </button>
            </Link>
            <Link to="/rq-pagined-queries">
              <button
                style={{
                  backgroundColor: pathname === "/rq-pagined-queries" ? "#4A50C0" : "",
                }}
              >
                Pagined Queries
              </button>
            </Link>
            <Link to="/rq-infinite-queries">
              <button
                style={{
                  backgroundColor: pathname === "/rq-infinite-queries" ? "#4A50C0" : "",
                }}
              >
                Infinite Queries
              </button>
            </Link>
            <Link to="/rq-infinite-queries-scroll">
              <button
                style={{
                  backgroundColor: pathname === "/rq-infinite-queries-scroll" ? "#4A50C0" : "",
                }}
              >
                Infinite Queries Scroll
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
            <Route path="/rq-dynamic-parallel">
              <DynamicParallelQueriesPage heroIds={[1, 3]} />
            </Route>
            <Route path={`/rq-super-heroes/:heroId`}>
              <RQSuperHeroPage />
            </Route>
            <Route path="/rq-super-heroes">
              <RQSuperHeroesPage />
            </Route>
            <Route path="/rq-dependent-queries">
              <DependentQueriesPage email='henri.teinturier@gmail.com' />
            </Route>
            <Route path="/rq-pagined-queries">
              <PaginedQueriesPage />
            </Route>
            <Route path="/rq-infinite-queries">
              <InfiniteQueriesPage />
            </Route>
            <Route path="/rq-infinite-queries-scroll">
              <InfiniteQueriesScrollPage />
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
