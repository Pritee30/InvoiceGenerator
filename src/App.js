import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([
    { id: 1, name: "", MRP: 0, salePrice: 0, total: 0 },
  ]);

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    mobile: "",
    credit: 0,
  });

  const [billDate, setBillDate] = useState("");

  const [paymentDetails, setPaymentDetails] = useState({
    cash: 0,
    remaining: 0,
  });

  const [totalAmount, setTotalAmount] = useState(0);

  // useEffect for getting the date dynamically
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    setBillDate(formattedDate);
  }, []);

  const handleInputChange = (e, id) => {
    const { name, value } = e.target;
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: value };
      }
      return item;
    });

    const updatedItems = newItems.map((item) => {
      if (item.id === id) {
        return { ...item, total: item.qty * item.salePrice };
      }
      return item;
    });
    setItems(updatedItems);
    updateTotalAmount(updatedItems);
  };

  const updateTotalAmount = (items) => {
    const total = items.reduce((acc, item) => acc + item.total, 0);
    setTotalAmount(total);
    setPaymentDetails((prev) => ({
      ...prev,
      remaining: total - paymentDetails.cash,
    }));
  };

  const handleCustomerDetailsChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    if (name === "cash") {
      setPaymentDetails((prev) => ({
        ...prev,
        remaining: totalAmount - value,
      }));
    }
  };

  const addNewItem = () => {
    const newItem = {
      id: items.length + 1,
      itemName: "",
      qty: 0,
      MRP: 0,
      salePrice: 0,
      total: 0,
    };
    setItems([...items, newItem]);
  };

  const handleSaveBill = () => {
    // Logic to save the bill
    console.log("Saving bill", {
      items,
      customerDetails,
      billDate,
      paymentDetails,
      totalAmount,
    });
  };

  // handle for reset the values
  const handleReset = () => {
    setItems([{ id: 1, itemName: "", qty: 0, MRP: 0, salePrice: 0, total: 0 }]);
    setCustomerDetails({ name: "", address: "", mobile: "", credit: 0 });
    setBillDate("");
    setPaymentDetails({ cash: 0, remaining: 0 });
    setTotalAmount(0);
  };

  return (
    <>
      <h1 className="text-center mt-3">Invoice</h1>
      <div className="container-fluid mt-4 overflow-hidden">
        <div className="row">
          <div className="col-8">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Qty</th>
                  <th scope="col">MRP</th>
                  <th scope="col">Sale Price</th>
                  <th scope="col">Total</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <input
                        type="text"
                        name="itemName"
                        value={item.itemName}
                        onChange={(e) => handleInputChange(e, item.id)}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="qty"
                        value={item.qty}
                        onChange={(e) => handleInputChange(e, item.id)}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="MRP"
                        value={item.MRP}
                        onChange={(e) => handleInputChange(e, item.id)}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="salePrice"
                        value={item.salePrice}
                        onChange={(e) => handleInputChange(e, item.id)}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="total"
                        value={item.total}
                        readOnly
                        className="form-control"
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          setItems(items.filter((i) => i.id !== item.id))
                        }
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              className="btn btn-primary rounded capsule"
              onClick={addNewItem}
            >
              Add Item
            </button>
          </div>

          <div className="col-4 px-2 overflow-hidden">
            <h4 className="text-center">Customer Details</h4>
            <div className="container-fluid">
              <ul className="list-group mt-3">
                <li className="list-group-item">
                  Customer Name:{" "}
                  <input
                    type="text"
                    name="name"
                    value={customerDetails.name}
                    onChange={handleCustomerDetailsChange}
                    className="form-control"
                  />
                </li>
                <li className="list-group-item">
                  Customer Address:{" "}
                  <input
                    type="text"
                    name="address"
                    value={customerDetails.address}
                    onChange={handleCustomerDetailsChange}
                    className="form-control"
                  />
                </li>
                <li className="list-group-item">
                  Customer Mobile:{" "}
                  <input
                    type="text"
                    name="mobile"
                    value={customerDetails.mobile}
                    onChange={handleCustomerDetailsChange}
                    className="form-control"
                  />
                </li>
                <li className="list-group-item">
                  Customer Credit:{" "}
                  <input
                    type="number"
                    name="credit"
                    value={customerDetails.credit}
                    onChange={handleCustomerDetailsChange}
                    className="form-control"
                  />
                </li>
              </ul>
              <h6 className="mt-2">Bill Date :</h6>
              <div className="input-group date" id="datepicker">
                <input
                  type="date"
                  value={billDate}
                  onChange={(e) => setBillDate(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="mt-2">
                <h6>Payment Details :</h6>
                <div className="input-group mt-2">
                  <input
                    type="number"
                    name="cash"
                    value={paymentDetails.cash}
                    onChange={handlePaymentChange}
                    className="form-control"
                    placeholder="Cash"
                    aria-label="Cash"
                  />
                </div>
                <div className="d-flex gap-2 mt-2">
                  <h6>RS: {totalAmount}</h6>
                  <h6>Remaining Amount: {paymentDetails.remaining}</h6>
                </div>
              </div>

              <div className="mt-3">
                <h5>Bill Details :</h5>
                <div className="d-flex gap-2">
                  <h6>Total Amount</h6>
                  <h6> Rs: {totalAmount}</h6>
                </div>
              </div>

              <div className="mt-3 d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSaveBill}
                >
                  Save Bill
                </button>
                <button
                  type="reset"
                  className="btn btn-info"
                  onClick={handleReset}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
