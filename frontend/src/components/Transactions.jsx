// display a list of all income/expense transactions and provide actions to edit and remove individual transactions
import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useUserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import RemoveTransaction from "./RemoveTransaction";

const Transactions = ({ transactionType }) => {
  /********************Authentication and state variables********************/
  useAuth("/login");
  const { user } = useUserContext();
  const navigate = useNavigate();
  /********************Authentication and state variables********************/

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add a loading state

  // State variables to manage the alert
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  /****************************Hook and functions****************************/
  useEffect(() => {
    setIsLoading(true); // Set loading state to true while data is fetched
    // Fetch all transcations from Firestore for the current user
    const fetchTransactions = async () => {
      try {
        const response = await axios.post("/getAllTransactions", {
          userId: user.uid,
          type: transactionType,
        });

        if (response.data.success) {
          setTransactions(response.data.userTransactions);
        } else {
          setAlertType("error");
          setAlertMessage("Transactions could not be retrieved.");
        }

        setIsLoading(false);
      } catch (error) {
        setAlertType("error");
        setAlertMessage("Transactions could not be retrieved.");
        setIsLoading(false); // Set loading state to false if there's an error
      }
    };
    fetchTransactions();
  }, [user, transactionType]);

  const handleEditTransaction = (transaction) => {
    // Generate the URL for the EditTransaction component with the income/expense data as a parameter
    let editTransactionUrl = `/edit${transactionType}?id=${transaction.id}`;

    // Navigate to the EditIncome component
    navigate(editTransactionUrl);
  };

  const handleRemoveTransaction = (transaction) => {
    setTransactions((prevIncome) =>
      // Filter out the transaction to be removed from the transactions list
      prevIncome.filter((tran) => tran.id !== transaction.id)
    );
  };

  /****************************Hook and functions****************************/

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
        ) : alertMessage ? (
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
        ) : (
          <>
            <h2>{transactionType === "income" ? "Income" : "Expenses"}</h2>
            <Link
              to={`/add${transactionType}`}
              className="btn btn-outline-secondary mt-3 mb-4"
            >
              Add {transactionType === "income" ? "Income" : "Expense"}
            </Link>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Frequency</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>
                    <td>
                      {transaction.category.charAt(0).toUpperCase() +
                        transaction.category.slice(1)}
                    </td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.paymentMethod}</td>
                    <td>{transaction.frequency}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-success me-2"
                        onClick={() => handleEditTransaction(transaction)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <RemoveTransaction
                        transactionType={transactionType}
                        transaction={transaction}
                        onRemove={handleRemoveTransaction}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Transactions;
