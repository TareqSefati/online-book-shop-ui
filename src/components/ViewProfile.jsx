
export default function ViewProfile(props) {
    const { user } = props;
    // card card-side
    return (
        <div>
            <div className="bg-base-100 shadow-xl mt-10 flex flex-col md:flex-row lg:flex-row items-center justify-center gap-10 rounded-lg">
                <div>
                    <img className="rounded-full size-52 mb-2 shadow-xl"
                    src={user.photoUrl}
                    alt="profile image" />
                    <hr />
                </div>
                <div className="mb-4">
                    <h2 className="card-title">{user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Address: {user.address}</p>
                    <p>Role: {user.isAdmin ? "Admin" : "User"}</p>
                    <p>Status: {user.isEnabled ? "Active" : "Blocked"}</p>
                </div>
            </div>
        </div>
    )
}
