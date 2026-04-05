/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
import UsePayment from "../../../hooks/usepayment";
const MyOrder = () => {
  const [payments] = UsePayment();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center mb-10">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">#</th>
              <th className="border p-2">Transaction ID</th>
              <th className="border p-2">User Email</th>
              <th className="border p-2">Total Amount</th>
              <th className="border p-2">Paid Status</th>
              <th className="border p-2">Items Count</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map(
              (
                payment: {
                  _id: Key | null | undefined;
                  transaction:
                    | string
                    | number
                    | boolean
                    | ReactElement<unknown, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                  userEmail:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | ReactPortal
                    | null
                    | undefined;
                  totalAmount: number;
                  paidStatus: any;
                  items: string | any[];
                },
                index: number,
              ) => (
                <tr key={payment._id} className="text-center hover:bg-gray-100">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{payment.transaction}</td>
                  <td className="border p-2">{payment.userEmail}</td>
                  <td className="border p-2">
                    ${payment.totalAmount.toFixed(2)}
                  </td>
                  <td
                    className={`border p-2 font-bold ${payment.paidStatus ? "text-green-600" : "text-red-600"}`}
                  >
                    {payment.paidStatus ? "Paid ✅" : "Not Paid ❌"}
                  </td>
                  <td className="border p-2">{payment?.items?.length}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
