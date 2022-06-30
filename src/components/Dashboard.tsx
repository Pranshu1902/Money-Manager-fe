import { Link } from "raviger";
import { logout } from "../api/ApiUtils";

type tabList = { name: string; url: string };

export default function Dashboard(props: { user: any; currentTab: string }) {
  const currentTabClass: string =
    "rounded-lg bg-blue-700 hover:bg-blue-900 py-2 p-2 text-gray-100 text-white";
  const tabClass: string =
    "rounded-lg hover:bg-blue-900 py-2 p-2 text-gray-100 hover:text-white";

  const allTabs: tabList[] = [
    { name: "Home", url: "/home" },
    { name: "Transactions", url: "/transactions" },
    { name: "History", url: "/history" },
    { name: "Chart", url: "/chart" },
  ];

  return (
    <div className="relative flex flex-col h-screen p-6 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-400 text-white space-y-12 font-bold">
      <div className="inset-x-0 top-0">
        <Link href="/" className="text-3xl text-white">
          Money Manager
        </Link>
      </div>
      <div className="flex flex-col gap-2 text-xl w-full">
        {allTabs.map((Tab: tabList) =>
          Tab.name === props.currentTab ? (
            <Link href={Tab.url} className={currentTabClass}>
              {Tab.name}
            </Link>
          ) : (
            <Link href={Tab.url} className={tabClass}>
              {Tab.name}
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
  );
}
