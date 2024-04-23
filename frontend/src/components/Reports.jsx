import React, { useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import BudgetSummary from "./BudgetSummary";
import IncomeExpenses from "./IncomeExpenses";
import RecurringIncomeExpenses from "./RecurringIncomeExpenses";

const Reports = () => {
  /********************Authentication and state variables*******************/
  useAuth("/login");
  const { user } = useUserContext();
  const navigate = useNavigate();
  /********************Authentication and state variables*******************/

  const [showReport, setShowReport] = useState(false);

  // State variable to track loading status
  const [isLoading, setIsLoading] = useState(false);

  // State variables to manage the alert
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const [incomeData, setIncomeData] = useState(null);
  const [expensesData, setExpensesData] = useState(null);
  const [budgetSummary, setBudgetSummary] = useState(null);
  const [dateTime, setDateTime] = useState(null);

  const initialState = {
    startDate: "",
    endDate: "",
    reportType: "",
  };

  const [formData, setFormData] = useState(initialState);
  const { startDate, endDate, reportType } = formData;

  /*********************************Functions*******************************/

  const handleReportsLinkClick = () => {
    setFormData(initialState);
    setShowReport(false);
    setIsLoading(false);
    setAlertType(null);
    setAlertMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/getReportsData", {
        userId: user.uid,
        startDate: formData.startDate,
        endDate: formData.endDate,
      });

      if (response.data.success) {
        // Update the state with the fetched data
        setIncomeData(response.data.income);
        setExpensesData(response.data.expenses);
        setBudgetSummary(response.data.budgetSummary);

        // Get the current date and time
        setDateTime(
          new Date().toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );

        // After processing the form, set showReport to true
        setShowReport(true);
        setIsLoading(false);
      } else {
        setAlertType("error");
        setAlertMessage("Reports data could not be retrieved.");
        setIsLoading(false);
      }
    } catch (error) {
      setAlertType("error");
      setAlertMessage("Reports data could not be retrieved.");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Redirect to the home page on cancel
    navigate("/");
  };

  /*********************************Functions*******************************/

  return (
    <div>
      <NavBar onReportsLinkClick={handleReportsLinkClick} />
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
        ) : showReport ? (
          formData.reportType === "incomeexpenses" ? (
            <IncomeExpenses
              income={incomeData}
              expenses={expensesData}
              dateTime={dateTime}
            />
          ) : formData.reportType === "recurringincomeexpenses" ? (
            <RecurringIncomeExpenses
              income={incomeData}
              expenses={expensesData}
              dateTime={dateTime}
            />
          ) : (
            <BudgetSummary
              income={incomeData}
              budgetSummary={budgetSummary}
              dateTime={dateTime}
            />
          )
        ) : (
          <>
            <h2>Reports</h2>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      name="startDate"
                      value={startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      name="endDate"
                      value={endDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="reportType" className="form-label">
                      Report Type
                    </label>
                    <select
                      className="form-select"
                      id="reportType"
                      name="reportType"
                      value={reportType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Report</option>
                      <option value="budgetsummary">
                        Budget Summary Report
                      </option>
                      <option value="incomeexpenses">
                        Income/Expenses Report
                      </option>
                      <option value="recurringincomeexpenses">
                        Recurring Income/Expenses Report
                      </option>
                    </select>
                  </div>
                  <div className="mb-3 text-center">
                    <button
                      type="submit"
                      className="btn btn-outline-success me-2"
                    >
                      <i className="bi bi-save me-2"></i>Generate
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

export default Reports;
