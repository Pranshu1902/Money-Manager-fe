import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { getTransactions, me } from "../api/ApiUtils";
import Dashboard from "./Dashboard";
import Moment from "moment";

export default function Transactions() {
  const [user, setUser] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    getTransactions().then((data) => {
      setTransactions(data.reverse());
      setIsLoading(false);
    });

    me().then((currentUser) => {
      setUser(currentUser.username);
    });

    document.title = "Transactions | Money Manager";
  }, []);

  return (
    <div className="flex flex-col">
      {/* For Mobile View */}
      <div className="block md:hidden bg-gray-200">
        {showDashboard ? (
          <Dashboard
            user={user}
            currentTab={"Transactions"}
            closeCB={() => setShowDashboard(false)}
            showCross={true}
          />
        ) : (
          <div className="pl-6 pt-6">
            <button onClick={() => setShowDashboard(true)}>
              <i className="fa fa-navicon"></i>
            </button>
          </div>
        )}
      </div>
      {/* For Desktop View */}
      <div className="hidden lg:block w-1/5 md:h-1/2 h-full fixed">
        <Dashboard
          user={user}
          currentTab={"Transactions"}
          closeCB={() => setShowDashboard(false)}
          showCross={false}
        />
      </div>
      <div
        style={{ paddingLeft: "26%" }}
        className="p-6 bg-gray-200 w-full h-full flex flex-col gap-4"
      >
        <div>
          <p className="text-4xl lg:text-5xl font-bold text-purple-500">
            Transactions
          </p>
        </div>
        <div className="p-4 lg:p-12 flex flex-col gap-4 h-full">
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
                  className="flex flex-col lg:flex-row gap-4 bg-white rounded-lg p-4 w-full shadow-lg"
                >
                  <div className="flex flex-row gap-2 w-full lg:w-1/2 items-center">
                    <p className="text-2xl text-gray-500">{index + 1}.</p>
                    <p className="text-semibold text-2xl text-red-500 justify-center lg:justify-start">
                      <b>- {transaction.amount}</b>
                      <br />
                      &nbsp;{transaction.description}
                    </p>
                  </div>
                  <div className="w-full flex items-center justify-center lg:justify-start">
                    <p className="w-1/2 text-gray-500 text-xl flex items-center justify-center">
                      {Moment(transaction.time).format("hh:mm, DD MMM YY")}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row gap-4 bg-white rounded-lg p-4 w-full shadow-lg"
                >
                  <div className="flex flex-row gap-2 lg:w-1/2">
                    <p className="text-2xl text-gray-500">{index + 1}.</p>
                    <p className="text-semibold text-2xl text-green-500">
                      <b>+ {transaction.amount}</b>
                      <br />
                      &nbsp;{transaction.description}
                    </p>
                  </div>
                  <div className="w-full flex items-center justify-center lg:justify-start">
                    <p className="w-1/2 text-gray-500 text-xl flex items-center justify-center">
                      {Moment(transaction.time).format("hh:mm, DD MMM YY")}
                    </p>
                  </div>
                </div>
              )
            )
          ) : isLoading === false ? (
            <div className="h-1/6 p-4 bg-white rounded-lg w-full shadow text-gray-500 text-3xl font-semibold flex justify-center items-center">
              No Transactions Found
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
