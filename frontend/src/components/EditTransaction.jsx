import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const EditTransaction = ({ transactionType }) => {
  /********************Authentication and state variables*******************/
  useAuth("/login");
  const navigate = useNavigate();
  const location = useLocation();
  /********************Authentication and state variables*******************/

  const initialState = {
    id: null,
    date: "",
    category: "",
    amount: 0,
    frequency: "",
    paymentMethod: "",
    notes: "",
  };

  const [transactionData, setTransactionData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false); // Add a loading state

  // State variables to manage the alert
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const { date, category, amount, frequency, paymentMethod, notes } =
    transactionData;

  /****************************Hook and functions***************************/

  useEffect(() => {
    setIsLoading(true);
    const fetchTransaction = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get("id");

        const response = await axios.get(
          `/getTransaction?type=${transactionType}&id=${id}`
        );

        if (response.data.success) {
          // Populate the form with the fetched transaction data
          setTransactionData({ ...response.data.transaction, id });
          setIsLoading(false);
        } else {
          setAlertType("error");
          setAlertMessage(
            transactionType === "income"
              ? "Income could not be retrieved."
              : "Expense could not be retrieved."
          );
          setIsLoading(false);
        }
      } catch (error) {
        setAlertType("error");
        setAlertMessage(
          transactionType === "income"
            ? "Income could not be retrieved."
            : "Expense could not be retrieved."
        );
        setIsLoading(false);
      }
    };
    fetchTransaction();
  }, [transactionType, location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { id, ...updatedTransactionData } = transactionData;
      const response = await axios.put("/editTransaction", {
        type: transactionType,
        id,
        transactionData: updatedTransactionData,
      });
      if (response.data.success) {
        // Redirect to the income/expenses page after a successful update
        navigate(transactionType === "income" ? "/income" : "/expenses");
      } else {
        setAlertType("error");
        setAlertMessage(
          transactionType === "income"
            ? "Income could not be updated."
            : "Expense could not be updated."
        );
      }
    } catch (error) {
      setAlertType("error");
      setAlertMessage(
        transactionType === "income"
          ? "Income could not be updated."
          : "Expense could not be updated."
      );
    }
  };

  const handleCancel = () => {
    // Redirect to the income/expenses page on cancel
    navigate(transactionType === "income" ? "/income" : "/expenses");
  };

  /****************************Hook and functions***************************/

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        {isLoading ? (
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "80vh" }}
          >
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h2>
              {transactionType === "income" ? "Edit Income" : "Edit Expense"}
            </h2>
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
                          <option value="Salary">Salary</option>
                          <option value="Freelance">Freelance</option>
                          <option value="Loan">Loan</option>
                        </>
                      ) : (
                        <>
                          <option value="Groceries">Groceries</option>
                          <option value="Health">Health</option>
                          <option value="Transport">Transport</option>
                          <option value="Accommodation">Accommodation</option>
                        </>
                      )}
                      <option value="Gift">Gift</option>
                      <option value="Other">Other</option>
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
                  <button
                    type="submit"
                    className="btn btn-outline-success me-2"
                  >
                    <i className="bi bi-save me-2"></i>Update
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
          </>
        )}
      </div>
    </div>
  );
};

export default EditTransaction;
