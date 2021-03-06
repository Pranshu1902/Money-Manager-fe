import { useState } from "react";
import { postTransaction } from "../../api/ApiUtils";
import { TailSpin } from "react-loader-spinner";

export default function CreateTransaction(props: { closeCB: () => void }) {
  const [amount, setAmount] = useState(0);
  const [spent, setSpent] = useState(true);
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    await postTransaction(amount, description, spent);
    props.closeCB();
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-semibold text-blue-500 flex items-center justify-center">
        Make New Transaction
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-gray-500 font-semibold text-xl">Amount:</p>
          <input
            value={amount}
            type="number"
            onChange={(e) => setAmount(Number(e.target.value))}
            className="py-2 p-2 border-2 border-green-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-gray-500 font-semibold text-xl">Description:</p>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="py-2 p-2 border-2 border-green-300 rounded-lg"
          />
        </div>
        <div className="flex flex-row gap-6">
          <div className="flex flex-row gap-2">
            <p className="text-gray-500 font-semibold text-xl">Spent:</p>
            <input
              checked={spent}
              onClick={() => setSpent(!spent)}
              type="checkbox"
              className="py-2 border-2 border-green-300 rounded-lg"
            />
          </div>
          <div className="flex flex-row gap-2">
            <p className="text-gray-500 font-semibold text-xl">Received:</p>
            <input
              checked={!spent}
              onClick={() => setSpent(!spent)}
              type="checkbox"
              className="py-2 border-2 border-green-300 rounded-lg"
            />
          </div>
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
          <button className="bg-green-500 hover:bg-green-700 py-2 text-white font-bold px-16 rounded-md">
            Make Transaction
          </button>
        )}
      </form>
    </div>
  );
}
