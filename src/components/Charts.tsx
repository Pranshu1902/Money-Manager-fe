import { useCallback, useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { getTransactions, me } from "../api/ApiUtils";
import Dashboard from "./Dashboard";
import { Chart } from "react-google-charts";
import { transactionType } from "../types/DataTypes";
import DropDown from "./DropDown";
import Moment from "moment";

export default function Charts() {
  const [user, setUser] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);

  let myData: any = [[]];
  const [data, setData] = useState(myData);
  const [lineChartData, setLineChartData] = useState(myData);
  const [barData, setBarData] = useState(myData);
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

      // line chart data
      let lineData: any[] = [];
      let length = 0;
      lineData.push(["Date", "Spent", "Received"]);

      // bar chart data
      let history: any[] = [];
      let spent = 0,
        gained = 0;

      // date wise bar chart data
      let dateWiseData: any[] = [];
      let dateBarLength = 0;
      dateWiseData.push(["Date", "Spent", "Received", "Net"]);

      data.forEach((element: transactionType) => {
        if (element.spent) {
          // amount is spent

          // filter data for bar chart
          spent += Number(element.amount);

          // filter data based on dates for Line Chart
          if (
            length > 0 &&
            lineData[length][0] ===
              String(Moment(element.time).format("MMM DD"))
          ) {
            lineData[length][1] += Number(element.amount);
          } else {
            lineData.push([
              String(Moment(element.time).format("MMM DD")),
              Number(element.amount),
              0,
            ]);
            length += 1;
          }

          // filter data based on dates for Date wise Bar Chart

          // barData.push([
          //   String(Moment(element.time).format("MMM DD")),
          //   Number(element.amount),
          //   0,
          //   -Number(element.amount),
          // ]);
          if (
            dateBarLength > 0 &&
            dateWiseData[dateBarLength][0] ===
              String(Moment(element.time).format("MMM DD"))
          ) {
            dateWiseData[dateBarLength][1] += Number(element.amount);
            dateWiseData[dateBarLength][3] -= Number(element.amount);
          } else {
            dateWiseData.push([
              String(Moment(element.time).format("MMM DD")),
              Number(element.amount),
              0,
              -Number(element.amount),
            ]);
            dateBarLength += 1;
          }
        } else {
          // amount is received

          // filter data for bar chart
          gained += Number(element.amount);

          // filter data based on dates for Line Chart
          if (
            length > 0 &&
            lineData[length][0] ===
              String(Moment(element.time).format("MMM DD"))
          ) {
            lineData[length][2] += Number(element.amount);
          } else {
            lineData.push([
              String(Moment(element.time).format("MMM DD")),
              0,
              Number(element.amount),
            ]);
            length += 1;
          }

          // filter data based on dates for Date wise Bar Chart
          // barData.push([
          //   String(Moment(element.time).format("MMM DD")),
          //   0,
          //   Number(element.amount),
          //   Number(element.amount),
          // ]);
          if (
            dateBarLength > 0 &&
            dateWiseData[dateBarLength][0] ===
              String(Moment(element.time).format("MMM DD"))
          ) {
            dateWiseData[dateBarLength][1] += Number(element.amount);
            dateWiseData[dateBarLength][3] += Number(element.amount);
          } else {
            dateWiseData.push([
              String(Moment(element.time).format("MMM DD")),
              0,
              Number(element.amount),
              Number(element.amount),
            ]);
            dateBarLength += 1;
          }
        }
      });

      // data for bar chart
      let net = gained - spent;
      history.push(["Total", spent, gained, net]);
      let allData = [["Date", "Spent", "Received", "Net"], ...history];

      // handling edge case
      if (length === 0) {
        lineData.push([String("No Transactions Found"), 0, 0]);
      }
      if (dateBarLength === 0) {
        dateWiseData.push([String("No Transactions Found"), 0, 0, 0]);
      }

      setData(allData);
      setLineChartData(lineData);
      setBarData(dateWiseData);
      setLoading(false);
    });

    document.title = "Chart | Money Manager";
  }, [getFilteredData]);

  const options = {
    title: "Transactions History",
    curveType: "function",
    legend: { position: "bottom" },
    series: {
      0: { color: "red" },
      1: { color: "#00FF00" },
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
            <div className="w-full">
              <div className="flex justify-center">
                <Chart
                  chartType="ColumnChart"
                  data={data}
                  width="70%"
                  height="400px"
                  options={options}
                />
              </div>

              <div className="flex justify-center items-center w-full h-full pt-12">
                <Chart
                  chartType="LineChart"
                  data={lineChartData}
                  width="100%"
                  height="400px"
                  options={options}
                />
              </div>

              <div className="flex justify-center items-center w-full h-full pt-12">
                <Chart
                  chartType="Bar"
                  data={barData}
                  width="100%"
                  height="400px"
                  options={options}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
