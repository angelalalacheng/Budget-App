import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home.jsx";
import Budget from "./components/Budget";
import Reports from "./components/Reports";
import BudgetSummary from "./components/BudgetSummary";
import IncomeExpenses from "./components/IncomeExpenses";
import RecurringIncomeExpenses from "./components/RecurringIncomeExpenses";
import Transactions from "./components/Transactions";
import AddTransaction from "./components/AddTransaction";
import EditTransaction from "./components/EditTransaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="budget" element={<Budget />} />
        <Route path="reports" element={<Reports />} />
        <Route path="incomeexpenses" element={<IncomeExpenses />} />
        <Route
          path="recurringincomeexpenses"
          element={<RecurringIncomeExpenses />}
        />
        <Route path="budgetsummary" element={<BudgetSummary />} />
        <Route
          path="income"
          element={<Transactions transactionType={"income"} />}
        />
        <Route
          path="expenses"
          element={<Transactions transactionType={"expense"} />}
        />
        <Route
          path="addincome"
          element={<AddTransaction transactionType={"income"} />}
        />
        <Route
          path="addexpense"
          element={<AddTransaction transactionType={"expense"} />}
        />
        <Route
          path="editincome"
          element={<EditTransaction transactionType={"income"} />}
        />
        <Route
          path="editexpense"
          element={<EditTransaction transactionType={"expense"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
