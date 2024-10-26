import { faEdit, faMoneyBillTransfer, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

export default function Payment() {
    const [buyBooks, setBuyBooks] = useState([]);
    const { dbUser } = useContext(AuthContext);

    const buyBookBackendUrl = import.meta.env.VITE_BACKEND_BUY_BOOK_URL;
    useEffect(() => {
        fetch(`${buyBookBackendUrl}/uid/${dbUser.uid}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setBuyBooks(data);
            })
            .catch((err) => console.log("Error", err));
    }, []);
    return (
        <div>
            <div className="text-center mt-5 font-semibold text-2xl">
                <h1>Payment Management</h1>
                <h3>Total Transaction: {buyBooks.length}</h3>
            </div>

            <div className="overflow-x-auto mt-5">
                <hr />
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Book Name</th>
                            <th>Quantity</th>
                            <th>Total Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            buyBooks.map((buyBook) => {
                                return (
                                    <tr key={buyBook._id} className="hover">
                                        <td>{buyBook.username}</td>
                                        <td>{buyBook.bookName}</td>
                                        <td>{buyBook.quantity}</td>
                                        <td>{`${buyBook.totalPrice}$`}</td>
                                        <td className="space-x-2">
                                            <button onClick={()=>toast.success("Payment Successfull!", {position: "top-right"})} className="btn btn-sm btn-outline btn-info">
                                                <FontAwesomeIcon icon={faMoneyBillTransfer} size="sm" />
                                            </button>
                                            <button className="btn btn-sm btn-outline btn-info">
                                                <FontAwesomeIcon icon={faEdit} size="sm" />
                                            </button>
                                            <button className="btn btn-sm btn-outline btn-error">
                                                <FontAwesomeIcon icon={faTrash} size="sm" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
