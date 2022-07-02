import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { me } from "../api/ApiUtils";
import Dashboard from "./Dashboard";

export default function Charts() {
  const [user, setUser] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    me().then((currentUser) => {
      setUser(currentUser.username);
    });

    document.title = "Chart | Money Manager";
  }, []);

  return (
    <div className="flex flex-col">
      {/* For Mobile View */}
      <div className="block md:hidden bg-gray-200">
        {showDashboard ? (
          <Dashboard
            user={user}
            currentTab={"Chart"}
            closeCB={() => setShowDashboard(false)}
            showCross={true}
          />
        ) : (
          <div className="pl-6 pt-6">
            <button onClick={() => setShowDashboard(true)}>
              <i className="fa fa-navicon"></i>
            </button>
          </div>
        )}
      </div>
      {/* For Desktop View */}
      <div className="hidden lg:block w-1/5 md:h-1/2 h-full fixed">
        <Dashboard
          user={user}
          currentTab={"Chart"}
          closeCB={() => setShowDashboard(false)}
          showCross={false}
        />
      </div>
      <div
        style={{ paddingLeft: "26%" }}
        className="p-6 bg-gray-200 w-full h-screen"
      >
        <div>
          <p className="text-5xl font-bold text-purple-500">Charts</p>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <Audio height="250" width="250" color="red" ariaLabel="loading" />
        </div>
      </div>
    </div>
  );
}
