import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import Dashboard from "./Dashboard";

export default function Charts() {
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser("User");
  }, []);

  return (
    <div className="flex flex-row h-full">
      <div className="w-1/4">
        <Dashboard user={user} currentTab={"Chart"} />
      </div>
      <div className="p-6 w-full">
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
