import { useSelector } from "react-redux";
import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations.jsx";
import BalanceDisplay from "./features/accounts/BalanceDisplay.jsx";
export default function App() {
  const customer = useSelector((state) => state.customer.fullName);
  console.log("customer:", customer);
  return (
    <main>
      {customer ? (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      ) : (
        <>
          <CreateCustomer />
        </>
      )}
    </main>
  );
}
