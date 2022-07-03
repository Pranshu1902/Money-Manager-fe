import { Link, navigate } from "raviger";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { login } from "../api/ApiUtils";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [invalidLogin, setInvalidLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }

    document.title = "Login | Money Manager";
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const data = await login(username, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        setLoading(false);
        navigate(`/home`);
      } else {
        setInvalidLogin(true);
        setLoading(false);
        setUsername("");
        setPassword("");
      }
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
          Login
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-6 pt-24"
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
          {invalidLogin && (
            <p className="text-red-500">Invalid Login Credentials</p>
          )}
          <br />
          {loading ? (
            <TailSpin
              color="#00BFFF"
              height={50}
              width={50}
              ariaLabel="loading-indicator"
            />
          ) : username && password ? (
            <button className="py-2 px-12 text-white font-bold mt-4 text-xl rounded-lg bg-blue-500 hover:bg-blue-800">
              Login
            </button>
          ) : (
            <button
              className="py-2 px-12 text-white font-bold mt-4 text-xl rounded-lg bg-gray-500"
              disabled
            >
              Login
            </button>
          )}
        </form>
        <p className="text-xl text-gray-500 flex justify-center items-center pt-4">
          New User?&nbsp;
          <Link
            href="/signup"
            className="font-bold text-blue-500 hover:text-blue-700"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
