import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { getTransactions } from "../api/ApiUtils";
import Dashboard from "./Dashboard";

export default function History() {
  const [user, setUser] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then((data) => {
      setTransactions(data.reverse());
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-row h-full">
      <div className="w-1/4">
        <Dashboard user={user} currentTab={"History"} />
      </div>
      <div className="p-4">
        <div>
          <p className="text-5xl font-bold text-purple-500">History</p>
        </div>
        <div className="p-12 flex flex-col gap-4">
          {isLoading && (
            <TailSpin
              color="#00BFFF"
              height={50}
              width={50}
              ariaLabel="loading-indicator"
            />
          )}
          {transactions.map((transaction: any, index: number) =>
            transaction.spent ? (
              <div className="flex flex-row gap-4">
                <p className="text-3xl text-gray-500">{index + 1}.</p>
                <p className="text-semibold text-3xl text-red-500">
                  <b>- {transaction.amount}</b>
                  <br />
                  {transaction.description}
                </p>
              </div>
            ) : (
              <div className="flex flex-row gap-4">
                <p className="text-3xl text-gray-500">{index + 1}.</p>
                <p className="text-semibold text-3xl text-green-500">
                  <b>+ {transaction.amount}</b>
                  <br />
                  {transaction.description}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
