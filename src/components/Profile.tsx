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

  useEffect(() => {
    me().then((currentUser) => {
      setUser(currentUser.username);
      setProfile(currentUser);
    });
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
      <div className="flex md:flex-row flex-col h-full">
        <div className="md:w-1/5 w-full md:h-1/2 h-full fixed">
          <Dashboard user={user} currentTab={"Profile"} />
        </div>
        <div
          style={{ paddingLeft: "26%" }}
          className="p-6 bg-gray-100 h-screen w-full"
        >
          <div>
            <p className="text-5xl font-bold text-purple-500">Profile</p>
          </div>
          <div className="flex items-center" style={{ paddingLeft: "35%" }}>
            <i className="fa fa-user-circle-o fa-4x"></i>
          </div>
          <div className="p-12 grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 font-semibold">Username:</p>
              <input
                className="py-2 rounded-lg p-2 border-2 border-blue-500 font-bold shadow-lg"
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
                className="py-2 rounded-lg p-2 border-2 border-blue-500 font-bold shadow-lg"
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
                className="py-2 rounded-lg p-2 border-2 border-blue-500 font-bold shadow-lg"
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
                className="py-2 rounded-lg p-2 border-2 border-blue-500 font-bold shadow-lg"
                type="text"
                onChange={(e) => {
                  setProfile({ ...profile, last_name: e.target.value });
                  setChanged(true);
                }}
                value={profile.last_name}
              />
            </div>
          </div>
          <div className="p-12 flex flex-row gap-6">
            <div>
              <button
                onClick={(e) => setUpdatePassword(true)}
                className="m t-12 text-white font-bold text-xl rounded-lg shadow-lg p-4 py-2 bg-purple-500 hover:bg-purple-700"
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
                  className="m t-12 text-white font-bold text-xl rounded-lg shadow-lg p-4 py-2 bg-green-500 hover:bg-green-700"
                >
                  <i className="fa fa-check-square-o"></i>&nbsp;Save Changes
                </button>
              ) : (
                <button
                  disabled
                  className="m t-12 text-white font-bold text-xl rounded-lg shadow-lg p-4 py-2 bg-green-400"
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
