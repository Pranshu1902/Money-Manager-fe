import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { getTransactions, me } from "../api/ApiUtils";
import Dashboard from "./Dashboard";
import Moment from "moment";

export default function History() {
  const [user, setUser] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    me().then((currentUser) => {
      setUser(currentUser.username);
    });

    getTransactions().then((data) => {
      setTransactions(data.reverse());
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-row">
      <div className="w-1/5 fixed">
        <Dashboard user={user} currentTab={"History"} />
      </div>
      <div
        style={{ paddingLeft: "26%" }}
        className="p-6 bg-gray-100 w-full h-full"
      >
        <div>
          <p className="text-5xl font-bold text-purple-500">History</p>
        </div>
        <div className="p-12 flex flex-col gap-4 w-full h-full">
          {isLoading && (
            <div className="flex justify-center">
              <TailSpin
                color="#00BFFF"
                height={60}
                width={60}
                ariaLabel="loading-indicator"
              />
            </div>
          )}
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
            <div className="h-1/6 bg-white rounded-lg w-full shadow text-gray-500 text-3xl font-semibold flex justify-center items-center">
              No History Found
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
