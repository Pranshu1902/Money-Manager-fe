import { useState } from "react";
import { TailSpin } from "react-loader-spinner";

export default function UpdatePassword(props: { closeCB: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);
    // call the api
    props.closeCB();
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold text-blue-500 flex items-center justify-center">
        Update Password
      </h1>
      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-2 w-full">
        <p className="text-gray-500 font-semibold">New Password:</p>
        <input
          className="py-2 rounded-lg p-2 border-2 border-blue-500 font-bold shadow-lg"
          type="text"
        />
        <p className="text-gray-500 font-semibold">Confirm New Password:</p>
        <input
          className="py-2 rounded-lg p-2 border-2 border-blue-500 font-bold shadow-lg"
          type="text"
        />
        <div className="w-full flex flex-row gap-4 justify-center items-center pt-4">
          {loading ? (
            <div className="flex justify-center items-center w-full">
              <TailSpin
                color="lightgreen"
                height={50}
                width={50}
                ariaLabel="loading-indicator"
              />
            </div>
          ) : (
            <div className="flex flex-row gap-4">
              <button
                onClick={() => props.closeCB()}
                type="submit"
                className="bg-red-500 hover:bg-red-700 p-4 py-2 font-bold text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 p-4 py-2 font-bold text-white rounded-lg"
              >
                Update
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
