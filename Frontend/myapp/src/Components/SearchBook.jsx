import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../Util";

function SearchBook() {
  const [form, setForm] = useState({
    capacityRequired: "",
    fromPincode: "",
    toPincode: "",
    startTime: "",
  });

  const [vehicles, setVehicles] = useState([]);

  const handlechange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    const { capacityRequired, fromPincode, toPincode, startTime } = form;

    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return handleError("Please fill all the fields");
    }

    try {
      const query = new URLSearchParams(form).toString();
      const response = await fetch(
        `http://localhost:9000/api/vehicel/avilable?${query}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
      const result = await response.json();

      if (!Array.isArray(result)) {
        handleError(result.message);
        setVehicles([]);
      } else {
        setVehicles(result);
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  // Book a vehicle

  const handleBook = async (vehicleId) => {
    try {
      const bookingData = {
        vehicleId,
        fromPincode: form.fromPincode,
        toPincode: form.toPincode,
        startTime: form.startTime,
        customerId: "CUST001", // hardcoded customerId
      };

      const response = await fetch(
        "http://localhost:9000/api/booking/vehicle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError(error);
    }
  };

  return (
    <>
      <div className="register-container">
        <Link
          to="/page"
          className="submit-button-back"
          style={{ textDecoration: "none", marginTop: "10px" }}
        >
          Back to Page Form
        </Link>
        <h2 className="register-title">Search & Book Vehicles</h2>
        <form className="register-form" onSubmit={handlesubmit}>
          <div className="form-group">
            <input type="text" id="capacityRequired" name="capacityRequired" placeholder="Enter Capacity Required" value={form.capacityRequired} onChange={handlechange} autoComplete='off' />
          </div>

          <div className="form-group">
            <input
              type="text" id="fromPincode" name="fromPincode" placeholder="Enter From Pincode"  onChange={handlechange} value={form.fromPincode}  autoComplete='off' />
          </div>

          <div className="form-group">
            <input type="text"  id="toPincode"  name="toPincode" placeholder="Enter To Pincode"  onChange={handlechange} value={form.toPincode}  autoComplete='off' />
          </div>

          <div className="form-group">
            <input type="datetime-local" id="startTime" name="startTime" placeholder="Enter Start Time"  onChange={handlechange}   value={form.startTime}  autoComplete='off' />
          </div>

          <button type="submit" className="submit-button">  Submit </button>
        </form>
      </div>


     <div style={{ marginTop: "20px", padding: "20px" }}>
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      border: "1px solid #dee2e6",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
    }}
  >
    <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
      <tr>
        <th className="tablepadtext">S.No</th>
        <th className="tablepadtext">Name</th>
        <th className="tablepadtext">Capacity (Kg)</th>
        <th className="tablepadtext">Tyres</th>
        <th className="tablepadtext">Action</th>
      </tr>
    </thead>
    <tbody>
      {vehicles.length === 0 ? (
        <tr>
          <td colSpan="5" className="headingoftable">
            No vehicles available
          </td>
        </tr>
      ) : (
        vehicles.map((item, index) => (
          <tr
            key={item._id}
            style={{borderBottom: "1px solid #dee2e6", backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#fff",}}>
            <td className="tablepadtext">{index + 1}</td>
            <td className="tablepadtext">{item.name}</td>
            <td className="tablepadtext">{item.capacityKg}</td>
            <td className="tablepadtext">{item.tyres}</td>
            <td className="tablepadtext">
            <button className="submit-button-back" onClick={() => handleBook(item._id)}> Book Now </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

      <ToastContainer />
    </>
  );
}

export default SearchBook;
