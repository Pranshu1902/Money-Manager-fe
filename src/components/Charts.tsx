import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { me } from "../api/ApiUtils";
import Dashboard from "./Dashboard";

export default function Charts() {
  const [user, setUser] = useState("");

  useEffect(() => {
    me().then((currentUser) => {
      setUser(currentUser.username);
    });
  }, []);

  return (
    <div className="flex flex-row">
      <div className="w-1/5 fixed">
        <Dashboard user={user} currentTab={"Chart"} />
      </div>
      <div
        style={{ paddingLeft: "26%" }}
        className="p-6 bg-gray-100 w-full h-screen"
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
