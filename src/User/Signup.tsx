import { Link, navigate } from "raviger";
import { useEffect, useState } from "react";
import { signup } from "../api/ApiUtils";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  useEffect(() => {
    document.title = "Sign up | Money Manager";
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // localStorage.setItem("token", data.token);
      signup(username, password, confirmPass).then(() => navigate(`/login`));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex md:flex-row flex-col gap-4">
      <div className="bg-gradient-to-l from-blue-400 to-blue-600 md:w-1/2 w-full md:p-4 flex flex-col gap-4 justify-center items-center">
        <h1 className="font-bold text-white text-7xl flex justify-center items-center">
          Money Manager
        </h1>
        <p className="text-white font-semibold text-xl">
          Manage money efficiently and know where it is going
        </p>
      </div>
      <div className="md:w-1/2 w-full md:p-4 flex flex-col items-center justify-center">
        <p className="flex items-center justify-center text-5xl font-bold text-blue-500">
          Sign up
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-4 pt-12"
        >
          <div>
            <p className="font-bold text-gray-500">Username:</p>
            <input
              type="text"
              className="p-1 border-2 border-blue-300 py-2 rounded-lg"
              name=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id=""
            />
          </div>
          <div>
            <p className="font-bold text-gray-500">Password:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-1 border-2 border-blue-300 py-2 rounded-lg"
              name=""
              id="pass"
            />
          </div>
          <div>
            <p className="font-bold text-gray-500">Confirm Password:</p>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="p-1 border-2 border-blue-300 py-2 rounded-lg"
              name=""
              id="pass"
            />
          </div>
          <br />
          {username && password && confirmPass ? (
            <button className="py-2 px-12 text-white text-xl font-bold mt-4 rounded-lg bg-blue-600 hover:bg-blue-800">
              Submit
            </button>
          ) : (
            <button
              className="py-2 px-12 text-white text-xl font-bold mt-4 rounded-lg bg-gray-500"
              disabled
            >
              Submit
            </button>
          )}
        </form>
        <p className="text-xl text-gray-500 flex justify-center items-center pt-4">
          Already have an account?&nbsp;
          <Link
            href="/login"
            className="font-bold text-blue-500 hover:text-blue-700"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
