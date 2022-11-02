import { useState } from "react";
import { deleteTransaction } from "../../api/ApiUtils";
import { TailSpin } from "react-loader-spinner";

export default function DeleteTransaction(props: {
  id: number;
  name: string;
  closeCB: () => void;
}) {
  const [loading, setLoading] = useState(false);

  console.log(props.id);
  console.log(props.name);

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    await deleteTransaction(props.id);
    props.closeCB();
    setLoading(false);
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-6">
        <div className="flex flex-col gap-2 justify-center items-center">
          <p>
            Are you sure you want to delete transaction: <b>{props.name}</b>?
          </p>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <TailSpin
              color="lightgreen"
              height={50}
              width={50}
              ariaLabel="loading-indicator"
            />
          </div>
        ) : (
          <div className="flex gap-2 flex-col justify-between md:flex-row">
            <button
              onClick={props.closeCB}
              className="flex justify-center bg-gray-500 hover:bg-gray-700 py-2 text-white font-bold px-16 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex justify-center bg-red-500 hover:bg-red-700 py-2 text-white font-bold px-16 rounded-md"
            >
              Delete
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
