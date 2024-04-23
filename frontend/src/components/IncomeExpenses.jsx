import React from "react";

const IncomeExpenses = ({ income, expenses, dateTime }) => {
  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <div className="card text-center mt-5">
          <div className="card-body">
            <h3 className="text-start p-1 mt-2 mb-2">Income/Expenses Report</h3>
            <h6 className="border-bottom text-start p-1 mt-2 mb-5">
              <i>Generated on: {dateTime}</i>
            </h6>
            <h5 className="border-bottom text-start text-bg-light p-1 ps-2 mt-5">
              Income
              <span className="badge bg-success ms-2">
                Total: ${parseFloat(income.totalAmount).toLocaleString()}
              </span>
            </h5>
            <table className="table table-sm table-striped table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(income.transactionsByCategory).map(
                  ([category, data]) => (
                    <tr key={category}>
                      <td>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </td>
                      <td>${parseFloat(data.sum).toLocaleString()}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <h5 className="border-bottom text-start text-bg-light p-1 ps-2 mt-5">
              Expenses
              <span className="badge bg-danger ms-2">
                Total: ${parseFloat(expenses.totalAmount).toLocaleString()}
              </span>
            </h5>
            <table className="table table-sm table-striped table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(expenses.transactionsByCategory).map(
                  ([category, data]) => (
                    <tr key={category}>
                      <td>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </td>
                      <td>${parseFloat(data.sum).toLocaleString()}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div
            className={`card-footer text-white fw-bold ${
              income.totalAmount - expenses.totalAmount >= 0
                ? "bg-success"
                : "bg-danger"
            }`}
          >
            Net Balance:
            {income.totalAmount - expenses.totalAmount < 0
              ? `-$${Math.abs(
                  income.totalAmount - expenses.totalAmount
                ).toLocaleString()}`
              : `$${(
                  income.totalAmount - expenses.totalAmount
                ).toLocaleString()}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenses;
