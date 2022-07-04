import { useCallback, useEffect, useState } from "react";
import { getTransactions, me } from "../api/ApiUtils";
import Dashboard from "./Dashboard";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from "react-loader-spinner";
import Popup from "./Popup";
import CreateTransaction from "./Modals/CreateTransaction";
import Moment from "moment";
import DropDown from "./DropDown";
import { transactionType } from "../types/DataTypes";
import moment from "moment";

export default function Home() {
  const [user, setUser] = useState("");
  const [spent, setSpent] = useState(0);
  const [gained, setGained] = useState(0);
  const [net, setNet] = useState(0);
  const [count, setCount] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);
  const [filter, setFilter] = useState("All");

  Moment.locale("en");

  // make transaction
  const [newTransaction, setNewTransaction] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingNet, setLoadingNet] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [netClass, setNetClass] = useState("");

  // filter data based on the duration selected
  const getFilteredData = useCallback(
    (data: transactionType[]) => {
      const currentDate = new Date();

      if (filter === "All") {
        return data;
      } else if (filter === "Today") {
        return data.filter((transaction: transactionType) => {
          const transactionDate = new Date(transaction.time);
          return (
            transactionDate.getDate() >= currentDate.getDate() - 1 &&
            transactionDate.getMonth() === currentDate.getMonth() &&
            transactionDate.getFullYear() === currentDate.getFullYear()
          );
        });
      } else if (filter === "Last Week") {
        return data.filter((transaction: transactionType) => {
          const transactionDate = new Date(transaction.time);
          return (
            transactionDate.getDate() >= currentDate.getDate() - 7 &&
            transactionDate.getMonth() === currentDate.getMonth() &&
            transactionDate.getFullYear() === currentDate.getFullYear()
          );
        });
      } else if (filter === "Last Month") {
        return data.filter((transaction: transactionType) => {
          const transactionDate = new Date(transaction.time);
          return (
            transactionDate.getMonth() >= currentDate.getMonth() - 1 &&
            transactionDate.getFullYear() === currentDate.getFullYear()
          );
        });
      } else if (filter === "Last 6 Months") {
        return data.filter((transaction: transactionType) => {
          const transactionDate = new Date(transaction.time);
          return (
            transactionDate.getMonth() >= currentDate.getMonth() - 6 &&
            transactionDate.getFullYear() === currentDate.getFullYear()
          );
        });
      } else if (filter === "Last Year") {
        return data.filter((transaction: transactionType) => {
          const transactionDate = new Date(transaction.time);
          return transactionDate.getFullYear() >= currentDate.getFullYear() - 1;
        });
      } else {
        return data;
      }
    },
    [filter]
  );

  // fetch data from API
  const fetchData = useCallback(() => {
    getTransactions().then((data) => {
      data = getFilteredData(data);

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
  }, [getFilteredData]);

  useEffect(() => {
    me().then((currentUser) => {
      setUser(currentUser.username);
    });

    fetchData();

    document.title = "Home | Money Manager";
  }, [setSpent, setGained, setNet, setCount, fetchData]);

  const closeModalCB = () => {
    setNewTransaction(false);
    fetchData();
  };

  return (
    <html>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="flex flex-col">
        {/* For Mobile View */}
        <div className="w-full md:h-1/2 h-full block md:hidden bg-gray-200">
          {showDashboard ? (
            <Dashboard
              user={user}
              currentTab={"Home"}
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
            currentTab={"Home"}
            closeCB={() => setShowDashboard(false)}
            showCross={false}
          />
        </div>
        <div
          style={{ paddingLeft: "26%" }}
          className="p-6 w-screen flex flex-col gap-4 bg-gray-200 h-full"
        >
          <div className="gap-24 items-center justify-center">
            <div className="lg:float-left bg-white rounded-lg w-full lg:w-1/4 p-6 shadow-lg mb-6">
              <p className="text-gray-500 font-semibold">Total Transactions</p>
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
            <div className="flex flex-col gap-4 lg:float-right w-1/4">
              <div className="flex items-center justify-center h-1/3 w-full">
                <button
                  className="p-2 lg:p-3 bg-purple-500 hover:bg-purple-700 w-2/3 lg:w-full h-full rounded-lg font-bold text-white"
                  onClick={() => setNewTransaction(true)}
                >
                  <span className="fa fa-plus"></span>&nbsp;Add new transaction
                </button>
              </div>
              <div className="flex flex-col gap-2 w-full justify-center lg:justify-start items-center">
                <div className="w-full">
                  <p className="font-medium text-xl text-blue-700">Duration:</p>
                </div>
                <div className="w-full">
                  <DropDown updateFilter={(e) => setFilter(e)} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col lg:flex-row gap-12 w-full">
              <div className="w-full lg:w-1/4 flex flex-col bg-purple-200 p-6 rounded-lg shadow-lg">
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
              <div className="w-full lg:w-1/4 flex flex-col bg-purple-200 p-6 rounded-lg shadow-lg">
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
              <div className="w-full lg:w-1/4 flex flex-col bg-purple-200 p-6 rounded-lg shadow-lg">
                <p className="text-gray-500 font-semibold truncate">Net:</p>
                {loadingNet ? (
                  <TailSpin
                    color="blue"
                    height={60}
                    width={60}
                    ariaLabel="loading-indicator"
                  />
                ) : (
                  <p className={netClass}>
                    {net > 0 ? "+" : ""}
                    {net}
                  </p>
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
            <div className="flex flex-col gap-4 lg:pl-12 lg:pr-12 pt-6 h-full">
              {transactions.length ? (
                getFilteredData(transactions).map(
                  (transaction: any, index: number) =>
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
                            {moment(transaction.time).format(
                              "hh:mm, DD MMM YY"
                            )}
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
                            {Moment(transaction.time).format(
                              "hh:mm, DD MMM YY"
                            )}
                          </p>
                        </div>
                      </div>
                    )
                )
              ) : isLoading === false ? (
                <div className="h-2/3 p-4 bg-white rounded-lg w-full shadow text-gray-500 text-xl font-semibold flex justify-center items-center">
                  No Transactions Found
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <Popup open={newTransaction} onClose={() => setNewTransaction(false)}>
            <CreateTransaction closeCB={() => closeModalCB()} />
          </Popup>
        </div>
      </div>
    </html>
  );
}
