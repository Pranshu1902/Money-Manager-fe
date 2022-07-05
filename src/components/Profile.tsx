import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { me } from "../api/ApiUtils";
import { user } from "../types/DataTypes";
import Dashboard from "./Dashboard";
import UpdatePassword from "./Modals/UpdatePassword";
import Popup from "./Popup";

export default function Profile() {
  const [user, setUser] = useState("");

  const sampleProfile: user = {
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
  };
  const [profile, setProfile] = useState(sampleProfile);

  const [changed, setChanged] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    me().then((currentUser) => {
      setUser(currentUser.username);
      setProfile(currentUser);
    });

    document.title = "Profile | Money Manager";
  }, []);

  // const updatePassword = (password: string) => {};

  const updateProfile = (event: any) => {
    event.preventDefault();
    setLoading(true);
    setChanged(false);
    // call api
    setLoading(false);
  };

  return (
    <html>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="flex flex-col">
        {/* For Mobile View */}
        <div className="block md:hidden bg-gray-200">
          {showDashboard ? (
            <Dashboard
              user={user}
              currentTab={"Profile"}
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
            currentTab={"Profile"}
            closeCB={() => setShowDashboard(false)}
            showCross={false}
          />
        </div>
        <div
          style={{ paddingLeft: "26%" }}
          className="p-6 bg-gray-200 w-full min-h-screen"
        >
          <div>
            <p className="text-5xl font-bold text-purple-500">Profile</p>
          </div>
          <div className="flex items-center" style={{ paddingLeft: "35%" }}>
            <i className="fa fa-user-circle-o fa-4x"></i>
          </div>
          <div className="p-4 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            <div>
              <p className="text-gray-500 font-semibold">Username:</p>
              <input
                className="py-2 rounded-lg p-2 border-2 border-blue-500 font-bold shadow-lg w-3/4"
                type="text"
                onChange={(e) => {
                  setProfile({ ...profile, username: e.target.value });
                  setChanged(true);
                }}
                value={profile.username}
              />
            </div>
            <div>
              <p className="text-gray-500 font-semibold">Email:</p>
              <input
                className="py-2 rounded-lg p-2 border-2 border-blue-500 font-bold shadow-lg w-3/4"
                type="text"
                onChange={(e) => {
                  setProfile({ ...profile, email: e.target.value });
                  setChanged(true);
                }}
                value={profile.email}
              />
            </div>
            <div>
              <p className="text-gray-500 font-semibold">First Name:</p>
              <input
                className="py-2 rounded-lg p-2 border-2 border-blue-500 font-bold shadow-lg w-3/4"
                type="text"
                onChange={(e) => {
                  setProfile({ ...profile, first_name: e.target.value });
                  setChanged(true);
                }}
                value={profile.first_name}
              />
            </div>
            <div>
              <p className="text-gray-500 font-semibold">Last Name:</p>
              <input
                className="py-2 rounded-lg p-2 border-2 border-blue-500 font-bold shadow-lg w-3/4"
                type="text"
                onChange={(e) => {
                  setProfile({ ...profile, last_name: e.target.value });
                  setChanged(true);
                }}
                value={profile.last_name}
              />
            </div>
          </div>
          <div className="mt-6 lg:mt-0 lg:p-12 flex flex-col lg:flex-row gap-4 lg:gap-6 w-full">
            <div>
              <button
                onClick={(e) => setUpdatePassword(true)}
                className="w-full text-white font-bold text-xl rounded-lg shadow-lg p-2 lg:p-4 bg-purple-500 hover:bg-purple-700"
              >
                Update Password
              </button>
            </div>
            <div>
              {loading ? (
                <div className="flex justify-center items-center w-full">
                  <TailSpin
                    color="lightgreen"
                    height={50}
                    width={50}
                    ariaLabel="loading-indicator"
                  />
                </div>
              ) : changed ? (
                <button
                  onClick={updateProfile}
                  className="text-white font-bold text-xl rounded-lg shadow-lg p-2 lg:p-4 bg-green-500 hover:bg-green-700"
                >
                  <i className="fa fa-check-square-o"></i>&nbsp;Save Changes
                </button>
              ) : (
                <button
                  disabled
                  className="w-full text-white font-bold text-xl rounded-lg shadow-lg p-2 lg:p-4 bg-green-400"
                >
                  <i className="fa fa-check-square-o"></i>&nbsp;Save Changes
                </button>
              )}
            </div>
          </div>
          <Popup open={updatePassword} onClose={() => setUpdatePassword(false)}>
            <UpdatePassword
              username={user}
              closeCB={() => setUpdatePassword(false)}
            />
          </Popup>
        </div>
      </div>
    </html>
  );
}
