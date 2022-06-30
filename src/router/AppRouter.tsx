import { useRoutes } from "raviger";
import Intro from "../Intro";
import Login from "../User/Login";
import Signup from "../User/Signup";
import AppContainer from "../AppContainer";
import Home from "../components/Home";
import Transactions from "../components/Transactions";
import History from "../components/History";
import Charts from "../components/Charts";

const routes = {
  "/": () => <Intro />,
  "/login": () => <Login />,
  "/signup": () => <Signup />,
  // "/dashboard": () => <Dashboard user={"Pranshu"} />,
  "/home": () => <Home />,
  "/transactions": () => <Transactions />,
  "/history": () => <History />,
  "/chart": () => <Charts />,
};

export default function AppRouter(props: { user: any }) {
  let route = useRoutes(routes);
  return <AppContainer>{route}</AppContainer>;
}
