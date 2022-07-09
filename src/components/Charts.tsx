import { useCallback, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { getTransactions, me } from "../api/ApiUtils";
import Dashboard from "./Dashboard";
import { Chart } from "react-google-charts";
import { transactionType } from "../types/DataTypes";
import DropDown from "./DropDown";
// import Moment from "moment";

export default function Charts() {
  const [user, setUser] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);

  let myData: any = [[]];
  const [data, setData] = useState(myData);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

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

  useEffect(() => {
    me().then((currentUser) => {
      setUser(currentUser.username);
    });

    setLoading(true);
    getTransactions().then((data) => {
      data = getFilteredData(data);

      let history: any[] = [];
      let spent = 0,
        gained = 0;
      data.forEach((element: transactionType) => {
        element.spent
          ? (spent += Number(element.amount))
          : (gained += Number(element.amount));

        // element.spent
        //   ? history.push([
        //       Moment(element.time).format("d MMM YY"),
        //       element.amount,
        //       0,
        //       -element.amount,
        //     ])
        //   : history.push([
        //       Moment(element.time).format("d MMM YY"),
        //       0,
        //       element.amount,
        //       element.amount,gained
        //     ]);
      });
      let net = gained - spent;
      history.push(["Today", spent, gained, net]);
      let allData = [["Date", "Spent", "Received", "Net"], ...history];

      setData(allData);
      setLoading(false);
    });

    document.title = "Chart | Money Manager";
  }, [getFilteredData]);

  const options = {
    title: "Transactions History",
    curveType: "function",
    legend: { position: "bottom" },
    series: {
      0: { color: "#00FF00" },
      1: { color: "red" },
      2: { color: "blue" },
    },
  };

  return (
    <div className="flex flex-col">
      {/* For Mobile View */}
      <div className="block md:hidden bg-gray-200">
        {showDashboard ? (
          <Dashboard
            user={user}
            currentTab={"Chart"}
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
          currentTab={"Chart"}
          closeCB={() => setShowDashboard(false)}
          showCross={false}
        />
      </div>
      {/* Main Div */}
      <div
        style={{ paddingLeft: "26%" }}
        className="p-6 bg-gray-200 w-full min-h-screen flex flex-col gap-12"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div>
            <p className="text-5xl font-bold text-purple-500">Chart</p>
          </div>
          <div className="flex flex-col gap-2 h-full w-full justify-center lg:justify-end items-end">
            <div className="w-full lg:w-1/3">
              <p className="font-medium text-xl text-blue-700">Duration:</p>
            </div>
            <div className="w-full lg:w-1/3">
              <DropDown updateFilter={(e) => setFilter(e)} />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center w-full h-full pt-12">
          {loading ? (
            <Audio height="250" width="250" color="red" ariaLabel="loading" />
          ) : (
            <div className="flex justify-center">
              <Chart
                chartType="Bar"
                data={data}
                width="100%"
                height="400px"
                options={options}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
