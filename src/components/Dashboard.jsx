import { useContext, useState } from "react"
import { AuthContext } from "../provider/AuthProvider"
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../routes/Routes";
import EditProfileData from "./EditProfileData";
import ViewProfile from "./ViewProfile";

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
        <div className="drawer lg:drawer-open border rounded-md shadow-lg mt-3">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    Open drawer
                </label>
                <div className="">
                    { selectedMenuItem === 'view_profile' && <ViewProfile user={dbUser} /> }
                    { selectedMenuItem === 'edit' && <EditProfileData/> }
                    {selectedMenuItem === 'users' && <h1>users data edit in here</h1>}
                    {selectedMenuItem === 'category' && <h1>category data edit in here</h1>}
                    {selectedMenuItem === 'books' && <h1>books data edit in here</h1>}
                    {selectedMenuItem === 'my_books' && <h1>my_books data edit in here</h1>}
                    {selectedMenuItem === 'payment' && <h1>payment data edit in here</h1>}
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <div className="space-y-2">
                        <img className="w-16 rounded-full" src={dbUser?.photoUrl || "https://i.ibb.co.com/TYSgwLR/default-profile-img.jpg"} />
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
                        <hr/>
                    </div>

                    <div className="mt-2">
                        {
                            dbUser?.isAdmin ? (
                                <div>
                                    <Link onClick={() => handleMenuItemClick('users')}>
                                        <li>
                                            <a>Users</a>
                                        </li>
                                    </Link>
                                    <Link onClick={() => handleMenuItemClick('category')}>
                                        <li>
                                            <a>Category</a>
                                        </li>
                                    </Link>
                                    <Link onClick={() => handleMenuItemClick('books')}>
                                        <li>
                                            <a>Books</a>
                                        </li>
                                    </Link>
                                </div>
                            ):(
                                <div>
                                    <Link onClick={() => handleMenuItemClick('view_profile')}>
                                        <li>
                                            <a>My Profile</a>
                                        </li>
                                    </Link>
                                    <Link onClick={() => handleMenuItemClick('my_books')}>
                                        <li>
                                            <a>My Books</a>
                                        </li>
                                    </Link>
                                    <Link onClick={() => handleMenuItemClick('payment')}>
                                        <li>
                                            <a>Payment</a>
                                        </li>
                                    </Link>
                                </div>
                            )
                        }                        
                    </div>
                </ul>
            </div>
        </div>
    )
}

// <div className="flex flex-col items-end gap-1">
// 	<div className="flex items-center gap-1">
// 		<img className="w-6 rounded-full" src={user.photoURL} />
// 		<span>{user.displayName || user.email || 'User'}</span>
// 	</div>
// 	<div className="flex items-center gap-1">
// 		{
// 			dbUser ? (
// 				<Link to={ROUTES.DASHBOARD}>
// 					<button className="btn btn-sm btn-outline">
// 						<FontAwesomeIcon icon={faTableColumns} size="xl" />
// 					</button>
// 				</Link>
// 			):(
// 				<div></div>
// 			)
// 		}
// 		<button onClick={handleSignOut}><a className="btn btn-sm btn-outline btn-error">Logout</a></button>
// 	</div>
// </div>