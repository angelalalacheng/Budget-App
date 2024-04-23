import React from "react";

const BudgetSummary = ({ income, budgetSummary, dateTime }) => {
  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <div className="card text-center mt-5">
          <div className="card-body">
            <h3 className="text-start p-1 mt-2 mb-2">
              Budget Expenditure Report
            </h3>
            <h6 className="border-bottom text-start p-1 mt-2 mb-5">
              <i>Generated on: {dateTime}</i>
            </h6>
            <table className="table table-sm table-striped table-hover mt-3">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Amount Allocated</th>
                  <th scope="col">Amount Spent</th>
                  <th scope="col">Amount Remaining</th>
                </tr>
              </thead>
              <tbody>
                {budgetSummary.map((item) => (
                  <tr key={item.key}>
                    <td>
                      {item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                    </td>
                    <td>
                      ${parseFloat(item.amountAllocated).toLocaleString()}
                    </td>
                    <td>${parseFloat(item.amountSpent).toLocaleString()}</td>
                    <td>
                      {item.amountRemaining < 0
                        ? `-$${Math.abs(item.amountRemaining).toLocaleString()}`
                        : `$${item.amountRemaining.toLocaleString()}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card-footer bg-body-secondary fw-bold">
            Total Income: ${parseFloat(income.totalAmount).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;
