import React, { useState, useEffect } from "react";

const RecurringIncomeExpenses = ({ income, expenses, dateTime }) => {
  const [recurringIncome, setRecurringIncome] = useState(null);
  const [recurringExpenses, setRecurringExpenses] = useState(null);
  const [totalRecurringIncome, setTotalRecurringIncome] = useState(0);
  const [totalRecurringExpenses, setTotalRecurringExpenses] = useState(0);

  // State variable to track loading status
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Filter the recurring transactions
    const tempRecurringIncome = income.transactions.filter(
      (transaction) => transaction.frequency !== "Once"
    );

    const tempRecurringExpenses = expenses.transactions.filter(
      (transaction) => transaction.frequency !== "Once"
    );

    // Calculate the total amount of recurring transactions
    const tempTotalRecurringIncome = tempRecurringIncome.reduce(
      (acc, transaction) => acc + parseFloat(transaction.amount),
      0
    );
    const tempTotalRecurringExpenses = tempRecurringExpenses.reduce(
      (acc, transaction) => acc + parseFloat(transaction.amount),
      0
    );

    setRecurringIncome(tempRecurringIncome);
    setRecurringExpenses(tempRecurringExpenses);
    setTotalRecurringIncome(tempTotalRecurringIncome);
    setTotalRecurringExpenses(tempTotalRecurringExpenses);
    setIsLoading(false);
  }, [income, expenses]);

  return (
    <>
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
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <div className="card text-center mt-5">
              <div className="card-body">
                <h3 className="text-start p-1 mt-2 mb-2">
                  Recurring Income/Expenses Report
                </h3>
                <h6 className="border-bottom text-start p-1 mt-2 mb-5">
                  <i>Generated on: {dateTime}</i>
                </h6>
                <h5 className="border-bottom text-start text-bg-light p-1 ps-2 mt-5">
                  Recurring Income
                  <span className="badge bg-success ms-2">
                    Total: ${parseFloat(totalRecurringIncome).toLocaleString()}
                  </span>
                </h5>
                <table className="table table-sm table-striped table-hover mt-3">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Category</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Payment Method</th>
                      <th scope="col">Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recurringIncome.map((income) => (
                      <tr key={income.formId}>
                        <td>{income.date}</td>
                        <td>
                          {income.category.charAt(0).toUpperCase() +
                            income.category.slice(1)}
                        </td>
                        <td>{income.amount}</td>
                        <td>{income.paymentMethod}</td>
                        <td>{income.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h5 className="border-bottom text-start text-bg-light p-1 ps-2 mt-5">
                  Recurring Expenses
                  <span className="badge bg-danger ms-2">
                    Total: $
                    {parseFloat(totalRecurringExpenses).toLocaleString()}
                  </span>
                </h5>
                <table className="table table-sm table-striped table-hover mt-3">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Category</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Payment Method</th>
                      <th scope="col">Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recurringExpenses.map((expense) => (
                      <tr key={expense.formId}>
                        <td>{expense.date}</td>
                        <td>
                          {expense.category.charAt(0).toUpperCase() +
                            expense.category.slice(1)}
                        </td>
                        <td>{expense.amount}</td>
                        <td>{expense.paymentMethod}</td>
                        <td>{expense.frequency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div
                className={`card-footer text-white fw-bold ${
                  totalRecurringIncome - totalRecurringExpenses >= 0
                    ? "bg-success"
                    : "bg-danger"
                }`}
              >
                Net Balance:
                {totalRecurringIncome - totalRecurringExpenses < 0
                  ? `-$${Math.abs(
                      totalRecurringIncome - totalRecurringExpenses
                    ).toLocaleString()}`
                  : `$${(
                      totalRecurringIncome - totalRecurringExpenses
                    ).toLocaleString()}`}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecurringIncomeExpenses;
