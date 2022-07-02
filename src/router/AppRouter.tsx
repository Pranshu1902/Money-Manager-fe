import { useRoutes } from "raviger";
import Intro from "../Intro";
import Login from "../User/Login";
import Signup from "../User/Signup";
import AppContainer from "../AppContainer";
import Home from "../components/Home";
import Transactions from "../components/Transactions";
import History from "../components/History";
import Charts from "../components/Charts";
import Profile from "../components/Profile";

const routes = {
  "/": () => <Intro />,
  "/login": () => <Login />,
  "/signup": () => <Signup />,
  "/home": () => <Home />,
  "/transactions": () => <Transactions />,
  "/history": () => <History />,
  "/chart": () => <Charts />,
  "/profile": () => <Profile />,
};

export default function AppRouter(props: { user: any }) {
  let route = useRoutes(routes);
  return <AppContainer>{route}</AppContainer>;
}
