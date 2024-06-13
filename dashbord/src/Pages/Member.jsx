import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Member = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8888/get-all-member"
        );
        setCustomers(response.data.data); // Assuming response.data is an array of customer objects
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  let clickButtonForNavigate = () => {
    navigate("add-member");
  };

  const clickEditButton = (customerId) => {
    const customerToEdit = customers.find(customer => customer._id === customerId);
    navigate("add-member", { state: { editData: customerToEdit } });
  };


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

  return (
    <div className="bg-[#ECF5FF] w-full flex flex-col justify-center rounded items-center h-[70vh]">
      <div className="bg-white w-[85vw] border ">
        <div className="flex justify-between items-center mb-6 m-4 p-4 px-8">
          <h1 className="text-2xl font-bold">
            Team Leader : <span>Jane Cooper</span>
          </h1>
          <button
            onClick={clickButtonForNavigate}
            className="bg-[#5932EA] hover:bg-blue-600 text-white font-bold  w-[155.37px] h-[34.71px]"
          >
            + Add new Member
          </button>
          <div>
            <input
              type="search"
              name=""
              id=""
              className="border border-gray-300 rounded px-4 py-2"
              placeholder="Search"
            />
          </div>
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

        <div className="mt-8 w-full text-center flex flex-col justify-center items-center">
          <table className="w-full">
            <thead className="border-b p-0">
              <tr className="text-[#B5B7C0] text-sm">
                <th className="py-2">Team Member Name</th>
                <th className="py-2">Number of customer added</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody
              className="text-[#292D32] text-[14px] leading-5	font-medium"
              style={{ fontFamily: "Poppins" }}
            >
              {currentCustomers.map((customer) => (
                <tr
                  key={customer._id}
                  className="font-['Poppin] text-[14px] text-[#292D32]  px-4 border-b"
                >
                  <td>
                    {customer.name.firstName} {customer.name.middleName}{" "}
                    {customer.name.lastName}
                  </td>
                  <td>{customer.numberOfMember}</td>
                  <td className="py-2 text-center">
                    <button
                      onClick={() => clickEditButton(customer._id)}
                    className="hover:bg-blue-600 hover:text-white border-[1px] border-[#787486] text-[#787486] text-[16px] font-['Inter'] py-1 px-2 rounded w-28 h-11">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex px-4 w-full justify-between text-[#B5B7C0] mt-6 mb-4">
            <div>
              <p>
                Showing data {indexOfFirstCustomer + 1} to{" "}
                {Math.min(indexOfLastCustomer, customers.length)} of{" "}
                {customers.length} entries
              </p>
            </div>
            <div>
              {Array.from({
                length: Math.ceil(customers.length / itemsPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`mr-2 py-1 px-2  text-sm ${
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
  );
};

export default Member;
