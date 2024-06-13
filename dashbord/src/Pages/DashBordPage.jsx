import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DashBordPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Rajnish",
      company: "Microsoft",
      target: "25",
      salesGen: "25L",
      updated: "25-4-2024",
    },
    {
      id: 1,
      name: "Mukesh",
      company: "Nexgen",
      target: "55",
      salesGen: "85L",
      updated: "15-4-2024",
    },
    {
      id: 1,
      name: "Yogesh",
      company: "Infosys",
      target: "25",
      salesGen: "25L",
      updated: "25-4-2024",
    },
  ]);

  const navigate = useNavigate();
  // Pagination
  const itemsPerPage = 6;
  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function handleClick() {
    navigate("/customer/add-customer");
  }

  return (
    <div className="bg-[#ECF5FF] border ">
      <div>
        <div className="flex justify-between items-center mb-6 m-4 p-4 px-8">
          <div className="flex">
            <h1 className="text-xl font-semibold">Hello Tanmay 👋🏼,</h1>
          </div>
          <div>
            <input
              type="search"
              name=""
              id=""
              className="border border-gray-300 rounded px-4 py-2"
              placeholder="Search"
            />
          </div>
          {/* Show short list */}
        </div>
        <div className="mb-8 mx-8">
          <h2 className="text-lg font-semibold mb-2">Chart</h2>
          <p className="text-lg font-semibold">
            All chart (if required like sales, user added etc, if you wanted)
          </p>
        </div>
      </div>
      <div className="mt-60 rounded w-full flex flex-col items-center justify-center">
        <div className="bg-white rounded w-[85vw]">
          <div className="flex justify-between items-center mb-6 m-4 p-4 px-8">
            <div className="flex">
              <h1 className="text-xl  font-bold">Sales Report</h1>
            </div>
            <div>
              <input
                type="search"
                name=""
                id=""
                className="border border-gray-300 rounded px-4 py-2"
                placeholder="Search"
              />
            </div>
            {/* Show short list */}
            <div className="bg-[#F9FBFF] p-2 rounded flex gap-2">
              <label htmlFor="">Short by :</label>
              <select name="" id="" className="bg-[#F9FBFF]">
                <option className="font-bold" value="">
                  Month
                </option>
                <option className="font-bold" value="">
                  year
                </option>
              </select>
            </div>
          </div>
          <div className="mt-8 mx-8">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-sm text-[#B5B7C0]">
                  <th className="py-2">Team Leader</th>
                  <th className="py-2">Target</th>
                  <th className="py-2">Sales Generated</th>
                  <th className="py-2">Last Updated</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody className="text-[#292D32] text-[14px] leading-5	font-medium" style={{ fontFamily: "Poppins" }}>
                {currentCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                  className="font-['Poppin] text-center text-[14px] text-[#292D32] px-4 border-b"
                  >
                    <td className="py-2">{customer.name}</td>
                    <td className="py-2">{customer.company}</td>
                    <td className="py-2">{customer.salesGen}</td>
                    <td className="py-2">{customer.updated}</td>
                    <td className="py-2">
                      <button className="hover:bg-blue-600 hover:text-white border-[1px] border-[#787486] text-[#787486] text-[16px] font-['Inter'] py-1 px-2 rounded w-28 h-11">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex text-[#B5B7C0] justify-between mt-6">
              <p>
                Showing data {indexOfFirstCustomer + 1} to{" "}
                {Math.min(indexOfLastCustomer, customers.length)} of{" "}
                {customers.length} entries
              </p>

              <div className="mt-4 flex items-center justify-center">
                {Array.from({
                  length: Math.ceil(customers.length / itemsPerPage),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`mr-2 py-1 px-2  text-sm
             ${
               currentPage === index + 1
                 ? "bg-blue-500 text-white"
                 : "bg-gray-200 text-gray-700"
             }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBordPage;
