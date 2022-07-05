import { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import { getTransactions, me } from "../api/ApiUtils";
import Dashboard from "./Dashboard";
import { Chart } from "react-google-charts";
import { transactionType } from "../types/DataTypes";
// import Moment from "moment";

export default function Charts() {
  const [user, setUser] = useState("");
  const [showDashboard, setShowDashboard] = useState(false);

  let myData: any = [[]];
  const [data, setData] = useState(myData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    me().then((currentUser) => {
      setUser(currentUser.username);
    });

    getTransactions().then((data) => {
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
  }, []);

  const options = {
    title: "Transactions History",
    curveType: "function",
    legend: { position: "bottom" },
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
        className="p-6 bg-gray-200 w-full min-h-screen"
      >
        <div>
          <p className="text-5xl font-bold text-purple-500">Chart</p>
        </div>
        <div className="flex justify-center items-center w-full h-full pt-12">
          {loading ? (
            <Audio height="250" width="250" color="red" ariaLabel="loading" />
          ) : (
            <Chart
              chartType="Bar"
              data={data}
              width="100%"
              height="400px"
              options={options}
            />
          )}
        </div>
      </div>
    </div>
  );
}
