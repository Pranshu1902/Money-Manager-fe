import { useEffect, useState } from "react";
import { getTransactions } from "../api/ApiUtils";
import Dashboard from "./Dashboard";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from "react-loader-spinner";
import Popup from "./Popup";
import CreateTransaction from "./Modals/CreateTransaction";
import Moment from "moment";

export default function Home() {
  const [user, setUser] = useState("");
  const [spent, setSpent] = useState(0);
  const [gained, setGained] = useState(0);
  const [net, setNet] = useState(0);
  const [count, setCount] = useState(0);

  Moment.locale("en");

  // make transaction
  const [newTransaction, setNewTransaction] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [loadingNet, setLoadingNet] = useState(true);

  const [transactions, setTransactions] = useState([]);

  const [netClass, setNetClass] = useState("");

  useEffect(() => {
    // Get the user's data from the API
    // me().then((currentUser) => {
    //   setUser(currentUser);
    // });

    setUser("User");

    getTransactions().then((data) => {
      data.length > 3
        ? setTransactions(data.reverse().slice(0, 3))
        : setTransactions(data.reverse());
      setCount(data.count);
      setIsLoading(false);

      // Calculate the net amount
      let received = 0;
      let given = 0;
      data.forEach((transaction: any) => {
        transaction.spent
          ? (given += Number(transaction.amount))
          : (received += Number(transaction.amount));
      });
      setSpent(Number(given));
      setGained(Number(received));
      setNet(Number(received - given));
      setCount(data.length);

      received - given >= 0
        ? setNetClass("text-green-500 font-bold text-5xl")
        : setNetClass("text-red-500 font-bold text-5xl");

      setLoadingNet(false);
    });

    document.title = "Home | Money Manager";
  }, [setSpent, setGained, setNet, setCount]);

  return (
    <div className="flex md:flex-row flex-col h-full">
      <div className="md:w-1/4 w-full md:h-1/2 h-full">
        <Dashboard user={user} currentTab={"Home"} />
      </div>
      <div className="p-6 w-screen flex flex-col gap-4 bg-gray-200">
        <div className="gap-24 items-center justify-center">
          <div className="float-left bg-white rounded-lg w-1/4 p-6 shadow-lg mb-6">
            <p className="text-gray-500">Total Transactions</p>
            {loadingNet ? (
              <TailSpin
                color="purple"
                height={60}
                width={60}
                ariaLabel="loading-indicator"
              />
            ) : (
              <p className="text-blue-500 font-bold text-5xl">{count}</p>
            )}
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
              {loadingNet ? (
                <TailSpin
                  color="red"
                  height={60}
                  width={60}
                  ariaLabel="loading-indicator"
                />
              ) : (
                <p className="text-red-500 font-bold text-5xl truncate">
                  {spent}
                </p>
              )}
            </div>
            <div className="w-1/4 flex flex-col bg-purple-200 p-6 rounded-lg shadow-lg">
              <p className="text-gray-500 font-semibold">Total Gained:</p>
              {loadingNet ? (
                <TailSpin
                  color="lightgreen"
                  height={60}
                  width={60}
                  ariaLabel="loading-indicator"
                />
              ) : (
                <p className="text-green-500 font-bold text-5xl truncate">
                  {gained}
                </p>
              )}
            </div>
            <div className="w-1/4 flex flex-col bg-purple-200 p-6 rounded-lg shadow-lg">
              <p className="text-gray-500 font-semibold truncate">Net:</p>
              {loadingNet ? (
                <TailSpin
                  color="blue"
                  height={60}
                  width={60}
                  ariaLabel="loading-indicator"
                />
              ) : (
                <p className={netClass}>{net}</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <p className="text-4xl font-semibold text-purple-500 pt-6">
            Recent Transactions:
          </p>
          {isLoading && (
            <div className="flex justify-center pl-24 pt-6">
              <TailSpin
                color="#00BFFF"
                height={60}
                width={60}
                ariaLabel="loading-indicator"
              />
            </div>
          )}
          <div className="flex flex-col gap-4 pl-12 pr-12 pt-6 h-full">
            {transactions.length ? (
              transactions.map((transaction: any, index: number) =>
                transaction.spent ? (
                  <div
                    key={index}
                    className="flex flex-row gap-4 bg-white rounded-lg p-2 w-full shadow-lg"
                  >
                    <p className="text-2xl text-gray-500">{index + 1}.</p>
                    <p className="text-semibold text-2xl text-red-500">
                      <b>- {transaction.amount}</b>
                      <br />
                      {transaction.description}
                    </p>
                    <p className="w-1/2 text-gray-500 text-xl flex items-center justify-center">
                      {Moment(transaction.time).format("hh:mm, d MMM YY")}
                    </p>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="flex flex-row gap-4 bg-white rounded-lg p-2 w-full shadow-lg"
                  >
                    <p className="text-2xl text-gray-500">{index + 1}.</p>
                    <p className="text-semibold text-2xl text-green-500">
                      <b>+ {transaction.amount}</b>
                      <br />
                      {transaction.description}
                    </p>
                    <p className="w-1/2 text-gray-500 text-xl flex items-center justify-center">
                      {Moment(transaction.time).format("hh:mm, d MMM YY")}
                    </p>
                  </div>
                )
              )
            ) : isLoading === false ? (
              <div className="h-2/3 bg-white rounded-lg w-full shadow text-gray-500 text-xl font-semibold flex justify-center items-center">
                No Transactions Found
              </div>
            ) : (
              <div></div>
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
