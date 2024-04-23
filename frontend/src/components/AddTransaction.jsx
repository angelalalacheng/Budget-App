import React, { useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const AddTransaction = ({ transactionType }) => {
  /********************Authentication and state variables********************/
  useAuth("/login");
  const { user } = useUserContext();
  const navigate = useNavigate();
  /********************Authentication and state variables********************/

  // State variables to manage the alert
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const initialState = {
    date: "",
    category: "",
    amount: 0,
    frequency: "Once",
    paymentMethod: "",
    notes: "",
  };

  const [transactionData, setTransactionData] = useState(initialState);

  const { date, category, amount, frequency, paymentMethod, notes } =
    transactionData;

  /*********************************Functions********************************/

  const handleChange = (e) => {
    // e is the event object (usually on <input>, <select>, <textarea> elements onChange event)
    const { name, value } = e.target;
    setTransactionData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/addTransaction", {
        transactionData,
        userId: user.uid,
        type: transactionType,
      });

      if (response.data.success) {
        setAlertType("success");

        // Redirect to the income/expenses page after successful submission
        navigate(transactionType === "income" ? "/income" : "/expenses");
      } else {
        setAlertType("error");
        setAlertMessage(
          transactionType === "income"
            ? "Income could not be added."
            : "Expense could not be added."
        );
      }
    } catch (error) {
      setAlertType("error");
      setAlertMessage(
        transactionType === "income"
          ? "Income could not be added."
          : "Expense could not be added."
      );
    }
  };

  const handleCancel = () => {
    // Redirect to the income/expenses page on cancel
    navigate(transactionType === "income" ? "/income" : "/expenses");
  };

  /*********************************Functions********************************/

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h2>{transactionType === "income" ? "Add Income" : "Add Expense"}</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="paymentMethod" className="form-label">
                  Payment Method
                </label>
                <select
                  className="form-select"
                  id="paymentMethod"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Method</option>
                  <option value="Cash">Cash</option>
                  {transactionType === "expense" && (
                    <option value="Card">Card</option>
                  )}
                  <option value="Cheque">Cheque</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="notes" className="form-label">
                  Notes
                </label>
                <textarea
                  className="form-control"
                  id="notes"
                  name="notes"
                  value={notes}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  name="category"
                  value={category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {transactionType === "income" ? (
                    <>
                      <option value="salary">Salary</option>
                      <option value="freelance">Freelance</option>
                      <option value="loan">Loan</option>
                    </>
                  ) : (
                    <>
                      <option value="groceries">Groceries</option>
                      <option value="health">Health</option>
                      <option value="transport">Transport</option>
                      <option value="accommodation">Accommodation</option>
                    </>
                  )}
                  <option value="gift">Gift</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="frequency" className="form-label">
                  Frequency
                </label>
                <select
                  className="form-select"
                  id="frequency"
                  name="frequency"
                  value={frequency}
                  onChange={handleChange}
                  required
                >
                  <option value="Once">Once</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-Annually">Semi-Annually</option>
                  <option value="Annually">Annually</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button type="submit" className="btn btn-outline-success me-2">
                <i className="bi bi-save me-2"></i>Add
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleCancel}
              >
                <i className="bi bi-x-square me-2"></i>Cancel
              </button>
            </div>
          </div>
        </form>
        {alertMessage && (
          <div
            className={`alert ${
              alertType === "success" ? "alert-success" : "alert-danger"
            } mt-5`}
            role="alert"
          >
            <div>
              <i
                className={`bi ${
                  alertType === "success"
                    ? "bi-check-circle-fill"
                    : "bi-exclamation-triangle-fill"
                } m-2`}
              ></i>
              {alertMessage}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTransaction;
