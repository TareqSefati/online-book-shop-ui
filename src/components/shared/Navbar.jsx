import { Link, NavLink, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/Routes";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

export default function Navbar() {
    const navigate = useNavigate();
    const {user, logOut} = useContext(AuthContext);
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
		<header>
			<nav className="navbar bg-base-100">
				<div className="navbar-start">
					<div className="dropdown">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost lg:hidden"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
						>
							<li>
								<NavLink to={ROUTES.HOME}>Home</NavLink>
							</li>
							<li>
								<NavLink to={ROUTES.PRODUCTS}>Products</NavLink>
							</li>
							<li>
								<NavLink to={ROUTES.ABOUT}>About</NavLink>
							</li>
							<li>
								<NavLink to={ROUTES.FAQ}>FAQ</NavLink>
							</li>
						</ul>
					</div>
					<Link to={ROUTES.HOME}>
						<img
							className="size-8"
							src="/images/logo-2.jpg" //Need to be careful.
							alt="logo"
						/>
					</Link>
					<a className="font-bold text-sm ml-1 md:text-xl md:font-extrabold">
						Code Course Academy
					</a>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal space-x-2">
						<li>
							<NavLink to={ROUTES.HOME}>Home</NavLink>
						</li>
						<li>
							<NavLink to={ROUTES.PRODUCTS}>Products</NavLink>
						</li>
						<li>
							<NavLink to={ROUTES.ABOUT}>About</NavLink>
						</li>
						<li>
							<NavLink to={ROUTES.FAQ}>FAQ</NavLink>
						</li>
					</ul>
				</div>
				<div className="navbar-end space-x-2">
                    {
                        user ? (
                            <div className="flex flex-col items-end gap-1">
                                <div className="flex items-center gap-1">
                                    <img className="w-6 rounded-full" src={user.photoURL} />
                                    <span>{user.displayName || user.email || 'User'}</span>
                                </div>
                                <button onClick={handleSignOut}><a className="btn btn-sm btn-outline btn-error">Logout</a></button>
                            </div>
                        ):(
                            <div className="space-x-2 flex gap-1 flex-col items-center md:flex-row">
                                <Link to={ROUTES.LOGIN}><a className="btn btn-sm md:btn">Login</a></Link>
                                <Link to={ROUTES.REGISTER}><a className="btn btn-sm md:btn">Register</a></Link>
                            </div>
                        )
                    }
					
				</div>
			</nav>
		</header>
	);
}
