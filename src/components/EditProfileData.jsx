import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

export default function EditProfileData({setSelectedMenuItem}) {
    const { dbUser, updateDbUser } = useContext(AuthContext);
    const editUser = async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        console.log("Form data", form);
        const name = form.get("name");
        const photo = form.get("photo");
        const phoneNumber = form.get("phone");
        const address = form.get("address");

        // console.log(name, phone, address, email, password, photo);
        let photoUrl = dbUser.photoUrl;
        if (photo){
            const photoData = new FormData();
            photoData.append('image', photo);
            const url = await uploadImage(photoData);
            if(url){
                photoUrl = url;
            }
        }
        const updatedUser = { name, photoUrl, phoneNumber, address, isAdmin:dbUser.isAdmin, isEnabled:dbUser.isEnabled };
        console.log("UpdatedUser:", updatedUser);

        const dbUrl = `${import.meta.env.VITE_BACKEND_USER_URL}/${dbUser.uid}`;

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
                const newDbUser = {
                    ...dbUser,
                    name,
                    photoUrl,
                    phoneNumber,
                    address
                };
                updateDbUser(newDbUser);
                setSelectedMenuItem("view_profile");
            }
            //event.target.reset(); //this is for clear the input text fields after submit- but it does not work here due to default value.
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
			// displayUrl = result.data.display_url;
			console.log("Image display url:", result.data.display_url);
			return result.data.display_url;
			//console.log("Image delete url:", result.data.delete_url);
		})
		.catch((error)=>{
			console.log("Error while uploading image to imagebb: ", error);
			return null;
		});
		return displayUrl;
	}

    return (
        <div className="py-8 flex h-full items-center justify-center">
            <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900 flex-col flex h-full items-center justify-center sm:px-4">
                <div className="flex h-full flex-col justify-center gap-4 p-6">
                    <div className="left-0 right-0 inline-block border-gray-200 px-2 py-2.5 sm:px-4">
                        <form
                            onSubmit={editUser}
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
                                            defaultValue={dbUser.name}
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
                                            defaultValue={dbUser.phoneNumber}
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
                                            defaultValue={dbUser.address}
                                            autoComplete="on"
                                            required
                                        ></input>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <button
                                    type="submit"
                                    className="btn btn-outline btn-info rounded-md"
                                >
                                    <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                        Update
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
