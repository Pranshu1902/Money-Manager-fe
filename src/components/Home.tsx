import { useEffect, useState } from "react";
import { getTransactions } from "../api/ApiUtils";
import Dashboard from "./Dashboard";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from "react-loader-spinner";
import Popup from "./Popup";
import CreateTransaction from "./Modals/CreateTransaction";

export default function Home() {
  const [user, setUser] = useState("");
  const [spent, setSpent] = useState(0);
  const [gained, setGained] = useState(0);
  const [net, setNet] = useState(0);
  const [count, setCount] = useState(0);

  // make transaction
  const [newTransaction, setNewTransaction] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [transactions, setTransactions] = useState([]);

  const [netClass, setNetClass] = useState("");

  useEffect(() => {
    // Get the user's data from the API
    // me().then((currentUser) => {
    //   setUser(currentUser);
    // });

    setUser("User");

    net >= 0
      ? setNetClass("text-green-500 font-bold text-5xl")
      : setNetClass("text-red-500 font-bold text-5xl");

    getTransactions().then((data) => {
      setTransactions(data.reverse());
      setCount(data.count);
      setIsLoading(false);
    });

    transactions.map((transaction: any) => {
      transaction.spent
        ? setSpent(spent + transaction.amount)
        : setGained(gained + transaction.amount);
    });

    console.log(spent, gained);

    setNet(gained - spent);

    document.title = "Home | Money Manager";
  }, [setGained, setSpent, setNet, gained, net, spent, transactions]);

  console.log(spent, gained);

  return (
    <div className="flex flex-row h-full">
      <div className="w-1/4">
        <Dashboard user={user} currentTab={"Home"} />
      </div>
      <div className="w-full p-4 flex flex-col gap-4 bg-gray-200">
        <div className="gap-24 items-center justify-center">
          <div className="float-left bg-white rounded-lg w-1/4 p-6 shadow-lg mb-6">
            <p className="text-gray-500">Total Transactions</p>
            <p className="text-blue-500 font-bold text-5xl">
              {count ? count : 0}
            </p>
          </div>
          <div className="float-right flex items-center justify-center h-1/3 w-1/5">
            <button
              className="bg-purple-500 hover:bg-purple-700 w-full h-full rounded-lg font-bold text-white"
              onClick={() => setNewTransaction(true)}
            >
              + Add new transaction
            </button>
          </div>
        </div>
        <div>
          <div className="flex flex-row gap-12 w-full">
            <div className="w-1/4 flex flex-col bg-purple-200 p-6 rounded-lg shadow-lg">
              <p className="text-gray-500 font-semibold">Total Spent:</p>
              <p className="text-red-500 font-bold text-5xl truncate">
                {spent}
              </p>
            </div>
            <div className="w-1/4 flex flex-col bg-purple-200 p-6 rounded-lg shadow-lg">
              <p className="text-gray-500 font-semibold">Total Gained:</p>
              <p className="text-green-500 font-bold text-5xl truncate">
                {gained}
              </p>
            </div>
            <div className="w-1/4 flex flex-col bg-purple-200 p-6 rounded-lg shadow-lg">
              <p className="text-gray-500 font-semibold truncate">Net:</p>
              <p className={netClass}>{net}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-4xl font-semibold text-purple-500 pt-6">
            Recent Transactions:
          </p>
          {isLoading && (
            <div className="flex pl-24 pt-6">
              <TailSpin
                color="#00BFFF"
                height={50}
                width={50}
                ariaLabel="loading-indicator"
              />
            </div>
          )}
          <div className="flex flex-col gap-2 pl-12 pt-6">
            {transactions.map((transaction: any, index: number) =>
              transaction.spent ? (
                <div className="flex flex-row gap-4">
                  <p className="text-2xl text-gray-500">{index + 1}.</p>
                  <p className="text-semibold text-2xl text-red-500">
                    <b>- {transaction.amount}</b>
                    <br />
                    {transaction.description}
                  </p>
                </div>
              ) : (
                <div className="flex flex-row gap-4">
                  <p className="text-2xl text-gray-500">{index + 1}.</p>
                  <p className="text-semibold text-2xl text-green-500">
                    <b>+ {transaction.amount}</b>
                    <br />
                    {transaction.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
        <Popup open={newTransaction} onClose={() => setNewTransaction(false)}>
          <CreateTransaction closeCB={() => setNewTransaction(false)} />
        </Popup>
      </div>
    </div>
  );
}
