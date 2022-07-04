import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { filterType } from "../types/DataTypes";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DropDown(props: { updateFilter: (e: string) => void }) {
  const filters: filterType[] = [
    { title: "All", active: true },
    { title: "Today", active: false },
    { title: "Last Week", active: false },
    { title: "Last Month", active: false },
    { title: "Last 6 Months", active: false },
    { title: "Last Year", active: false },
  ];
  const [filter, setFilter] = useState(filters);

  return (
    <Menu as="div" className="relative w-3/4 inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-start w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {filter.filter((field: filterType) => field.active)[0].title}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {filter.map((filterElement: filterType, index) => (
              <Menu.Item key={index}>
                {() => (
                  <button
                    className={classNames(
                      filterElement.active
                        ? "bg-gray-100 hover:bg-gray-200 text-gray-900 w-full flex justify-start font-bold"
                        : "text-gray-700 bg-white hover:bg-gray-200 w-full flex justify-start hover:font-bold",
                      "block px-4 py-2 text-sm"
                    )}
                    onClick={() => {
                      let newFilter: filterType[] = [];
                      filter.forEach((element: filterType) => {
                        if (element.title === filterElement.title) {
                          newFilter.push({
                            title: element.title,
                            active: true,
                          });
                        } else {
                          newFilter.push({
                            title: element.title,
                            active: false,
                          });
                        }
                      });
                      setFilter(newFilter);

                      // sending the data to the parent component
                      props.updateFilter(filterElement.title);
                    }}
                  >
                    {filterElement.title}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
