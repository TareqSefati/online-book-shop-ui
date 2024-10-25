import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import toast from "react-hot-toast";

export default function ManageUser({ dbUser }) {
    const [users, setUsers] = useState([]);
    const [editableUser, setEditableUser] = useState({});
    const url = import.meta.env.VITE_BACKEND_USER_URL;
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setUsers(data);
            })
            .catch((err) => console.log("Error", err));
    }, [])

    const handleDelete = (uid) => {
        const url = import.meta.env.VITE_BACKEND_USER_URL;
        fetch(`${url}/${uid}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.deletedCount) {
                    toast.success("User Deleted Successfully", {
                        position: "top-right",
                    });
                    const remainingUsers = users.filter((user) => user.uid !== uid);
                    setUsers(remainingUsers);
                }
            });
    };

    const openEditModal = (uid) => {
        console.log(uid);
        // <button className="btn" onClick={() => document.getElementById('modal').showModal()}>open modal</button>
        document.getElementById('modal').showModal();
        const editableUserTmp = users.filter((user) => user.uid === uid)[0];
        console.log("Editabel user: ", editableUserTmp);
        setEditableUser(editableUserTmp);
    };

    const editUser = async (event) => {
        event.preventDefault();
        console.log("Trying to edit user.");
        //document.getElementById('modal').close(); // to close modal programatically
        const form = new FormData(event.currentTarget);
        console.log("Form data", form);
        const name = form.get("name");
        const photo = form.get("photo");
        const phoneNumber = form.get("phone");
        const address = form.get("address");

        // console.log(name, phone, address, email, password, photo);
        let photoUrl = editableUser.photoUrl;
        if (photo){
            const photoData = new FormData();
            photoData.append('image', photo);
            const url = await uploadImage(photoData);
            if(url){
                photoUrl = url;
            }
        }
        const updatedUser = { name, photoUrl, phoneNumber, address, isAdmin:editableUser.isAdmin, isEnabled:editableUser.isEnabled };
        console.log("UpdatedUser:", updatedUser);

        const dbUrl = `${import.meta.env.VITE_BACKEND_USER_URL}/${editableUser.uid}`;

        fetch(dbUrl, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.modifiedCount) {
                toast.success("User Updated Successfully", {
                    position: "top-right",
                });
                fetch(import.meta.env.VITE_BACKEND_USER_URL)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setUsers(data);
                })
            }
            document.getElementById('modal').close();
            //event.target.reset(); //to clear inpur fields after submit- but it does not work here due to default value.
        })
        .catch((err)=>{
            toast.error("User Update Failed!", {
                position: "top-right",
            });
            console.log("Error", err);
        })
    }

    const uploadImage = async(photoData)=>{
		//upload image to imagebb and get image url
		const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_BB_API_KEY}`;
		let displayUrl = await fetch(url, {
			method: 'POST',
			body: photoData,
		})
		.then((res)=>res.json())
		.then((result)=>{
			console.log("Image display url:", result.data.display_url);
			return result.data.display_url;
		})
		.catch((error)=>{
			console.log("Error while uploading image to imagebb: ", error);
			return null;
		});
		return displayUrl;
	}

    return (
        <div>
            <div className="text-center my-5 font-semibold text-2xl">
                <h1>User Management</h1>
                <h3>Total User {users.length - 1}</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {
                                if (user.uid === dbUser.uid) {
                                    return (
                                        // <tr key={user.uid} className="hover">
                                        //     <th>{user.name}</th>
                                        //     <th>{user.email}</th>
                                        //     <th>{user.isAdmin ? ("Admin") : ("User")}</th>
                                        //     <th>{user.isEnabled ? ("Active") : ("Blocked")}</th>
                                        //     <th>No Action</th>
                                        // </tr>
                                        console.log("This is user itself.")
                                    );
                                } else {
                                    return (
                                        <tr key={user.uid} className="hover">
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {user.isAdmin ? ("Admin") : ("User")}
                                                {/* todo: can toggle role in here and update db also */}

                                                {/* <input type="checkbox" checked={user.isAdmin} onChange={()=>user.isAdmin = !user.isAdmin} className="toggle toggle-success" /> */}
                                                {/* {user.isAdmin ? (
                                                    <input type="checkbox" checked="true" onChange={handleAdminChange} className="toggle toggle-success" />
                                                ) : (
                                                    <input type="checkbox" checked="true" onChange={handleAdminChange} className="toggle toggle-success" />
                                                )} */}

                                            </td>
                                            <td>{user.isEnabled ? ("Active") : ("Blocked")}</td>
                                            <td className="space-x-2">
                                                <button onClick={() => openEditModal(user.uid)} className="btn btn-sm btn-outline btn-info">
                                                    <FontAwesomeIcon icon={faEdit} size="sm" />
                                                </button>
                                                <button onClick={() => handleDelete(user.uid)} className="btn btn-sm btn-outline btn-error">
                                                    <FontAwesomeIcon icon={faTrash} size="sm" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>

            {/* modal */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="modal" className="modal sm:modal-middle">
                <div className="modal-box">
                    <form
                            onSubmit={editUser} method="dialog"
                            className="flex flex-col gap-4 pb-4"
                        >
                            <h1 className="mb-4 text-2xl font-bold dark:text-white text-center">
                                Update your Account
                            </h1>

                            <div>
                                <div className="mb-2">
                                    <label
                                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                        htmlFor="name"
                                    >
                                        Name
                                    </label>
                                </div>
                                <div className="flex w-full rounded-lg pt-1">
                                    <div className="relative w-full">
                                        <input
                                            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                            id="name"
                                            type="text"
                                            name="name"
                                            defaultValue={editableUser.name}
                                            autoComplete="on"
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-2">
                                    <label
                                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                        htmlFor="photo"
                                    >
                                        Photo
                                    </label>
                                </div>
                                <div className="flex w-full rounded-lg pt-1">
                                    <div className="relative w-full">
                                        <input
                                            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                            id="photo"
                                            type="file"
                                            name="photo"
                                            placeholder="Select prifile picture"
                                            autoComplete="on"
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-2">
                                    <label
                                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                        htmlFor="phone"
                                    >
                                        Phone Number
                                    </label>
                                </div>
                                <div className="flex w-full rounded-lg pt-1">
                                    <div className="relative w-full">
                                        <input
                                            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            defaultValue={editableUser.phoneNumber}
                                            autoComplete="on"
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-2">
                                    <label
                                        className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                        htmlFor="address"
                                    >
                                        Address
                                    </label>
                                </div>
                                <div className="flex w-full rounded-lg pt-1">
                                    <div className="relative w-full">
                                        <input
                                            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                            id="address"
                                            type="text"
                                            name="address"
                                            defaultValue={editableUser.address}
                                            autoComplete="on"
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button type="submit"
                                    className="btn btn-outline btn-info rounded-md"
                                >
                                    <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                        Update
                                    </span>
                                </button>
                                <p className="btn btn-outline rounded-md" onClick={()=>document.getElementById('modal').close()}>
                                    <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                        Cancel
                                    </span>
                                </p>
                                
                            </div>
                        </form>
                </div>
            </dialog>
        </div>
    )
}
