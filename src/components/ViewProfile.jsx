
export default function ViewProfile(props) {
    const { user } = props;
    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl">
                <figure>
                    <img className="rounded-full"
                        src={user.photoUrl}
                        alt="profile image" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Address: {user.address}</p>
                    <p>Address: {user.address}</p>
                    <p>Role: {user.isAdmin ? "Admin" : "User"}</p>
                    <p>Status: {user.isEnabled ? "Active" : "Blocked"}</p>
                </div>
            </div>
        </div>
    )
}
