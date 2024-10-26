import { useContext, useState } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import EditProfileData from "./EditProfileData";
import ViewProfile from "./ViewProfile";
import ManageUser from "./ManageUser";
import ManageCategory from "./ManageCategory";
import ManageBook from "./ManageBook";
import Payment from "./Payment";
import { Helmet } from "react-helmet-async";

export default function Dashboard() {
    const [selectedMenuItem, setSelectedMenuItem] = useState("view_profile");
    const { dbUser, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleMenuItemClick = (itemId) => {
        setSelectedMenuItem(itemId);
    };

    const handleSignOut = () => {
        logOut()
            .then(() => {
                navigate(ROUTES.LOGIN);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            <div className="drawer lg:drawer-open border rounded-md shadow-lg mt-3">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                        Open drawer
                    </label>
                    <div className="w-full px-5">
                        {selectedMenuItem === 'view_profile' && <ViewProfile user={dbUser} />}
                        {selectedMenuItem === 'edit' && <EditProfileData setSelectedMenuItem={setSelectedMenuItem} />}
                        {selectedMenuItem === 'users' && <ManageUser dbUser={dbUser} />}
                        {selectedMenuItem === 'category' && <ManageCategory />}
                        {selectedMenuItem === 'books' && <ManageBook />}
                        {selectedMenuItem === 'my_books' && <h1>my_books data edit in here</h1>}
                        {selectedMenuItem === 'payment' && <Payment />}
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <div className="space-y-2">
                            <img className="size-20 rounded-full" src={dbUser?.photoUrl || "https://i.ibb.co.com/TYSgwLR/default-profile-img.jpg"} />
                            <p>{dbUser?.name || "USER"}</p>
                            <p>{dbUser?.email || ""}</p>
                            <div className="flex justify-between">
                                <button onClick={() => handleMenuItemClick('edit')}
                                ><a className="btn btn-xs btn-outline">Edit Profile</a>
                                </button>
                                <button onClick={handleSignOut}>
                                    <a className="btn btn-xs btn-outline btn-error">Logout</a>
                                </button>
                            </div>
                            <hr />
                        </div>

                        <div className="mt-2">
                            {
                                dbUser?.isAdmin ? (
                                    <div>
                                        <NavLink onClick={() => handleMenuItemClick('view_profile')}>
                                            <li>
                                                <a>My Profile <span className="font-semibold text-green-800">(Admin)</span></a>
                                            </li>
                                        </NavLink>
                                        <NavLink onClick={() => handleMenuItemClick('users')}>
                                            <li>
                                                <a>Users</a>
                                            </li>
                                        </NavLink>
                                        <NavLink onClick={() => handleMenuItemClick('category')}>
                                            <li>
                                                <a>Category</a>
                                            </li>
                                        </NavLink>
                                        <NavLink onClick={() => handleMenuItemClick('books')}>
                                            <li>
                                                <a>Books</a>
                                            </li>
                                        </NavLink>
                                    </div>
                                ) : (
                                    <div>
                                        <NavLink onClick={() => handleMenuItemClick('view_profile')}>
                                            <li>
                                                <a>My Profile</a>
                                            </li>
                                        </NavLink>
                                        <NavLink onClick={() => handleMenuItemClick('my_books')}>
                                            <li>
                                                <a>My Books</a>
                                            </li>
                                        </NavLink>
                                        <NavLink onClick={() => handleMenuItemClick('payment')}>
                                            <li>
                                                <a>Payment</a>
                                            </li>
                                        </NavLink>
                                    </div>
                                )
                            }
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}