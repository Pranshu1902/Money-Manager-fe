import { Link } from "raviger";
import { logout } from "../api/ApiUtils";
import logo from "../logo.png";

type tabList = { name: string; url: string; icon: string };

export default function Dashboard(props: {
  user: any;
  currentTab: string;
  closeCB: () => void;
  showCross: boolean;
}) {
  const currentTabClass: string =
    "rounded-lg bg-blue-800 hover:bg-blue-900 py-2 p-2 text-white";
  const tabClass: string =
    "rounded-lg hover:bg-blue-900 py-2 p-2 text-gray-300 hover:text-white";

  const allTabs: tabList[] = [
    { name: "Home", url: "/home", icon: "fa fa-home" },
    { name: "Transactions", url: "/transactions", icon: "fa fa-book" },
    { name: "History", url: "/history", icon: "fa fa-history" },
    { name: "Chart", url: "/chart", icon: "fa fa-bar-chart" },
    { name: "Profile", url: "/profile", icon: "fa fa-user-circle-o" },
  ];

  return (
    <html>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="relative flex flex-col h-screen p-6 bg-blue-700 text-white space-y-12 font-bold">
        <div className="inset-x-0 top-0 flex gap-2">
          <Link href="/" className="text-3xl text-white flex gap-2 w-full">
            <img src={logo} alt="logo" className="w-2/5" />
            <p>Money Manager</p>
          </Link>
          {props.showCross && (
            <button onClick={props.closeCB}>
              <i className="fa fa-window-close"></i>
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2 text-xl w-full">
          {allTabs.map((Tab: tabList, index) =>
            Tab.name === props.currentTab ? (
              <Link key={index} href={Tab.url} className={currentTabClass}>
                <i className={Tab.icon}></i>&nbsp;{Tab.name}
              </Link>
            ) : (
              <Link key={index} href={Tab.url} className={tabClass}>
                <i className={Tab.icon}></i>&nbsp;{Tab.name}
              </Link>
            )
          )}
        </div>
        <div className="absolute p-6 inset-x-0 bottom-0">
          <p className="text-3xl">{props.user}</p>
          <button
            onClick={logout}
            className="text-red-500 hover:text-red-800 text-xl"
          >
            Logout
          </button>
        </div>
      </div>
    </html>
  );
}
