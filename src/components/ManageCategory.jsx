import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ManageCategory() {
    const [category, setCategory] = useState([]);
    const categoryBackendUrl = import.meta.env.VITE_BACKEND_CATEGORY_URL;
    useEffect(() => {
        fetch(categoryBackendUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCategory(data);
            })
            .catch((err) => console.log("Error", err));
    }, [])

    const openAddModal = () => {
        document.getElementById('modal').showModal();
    }

    const uploadImage = async (photoData) => {
        //upload image to imagebb and get image url
        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_BB_API_KEY}`;
        let displayUrl = await fetch(url, {
            method: 'POST',
            body: photoData,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("Image display url:", result.data.display_url);
                return result.data.display_url;
            })
            .catch((error) => {
                console.log("Error while uploading image to imagebb: ", error);
                return null;
            });
        return displayUrl;
    }

    const addCategory = async (event) => {
        event.preventDefault();
        console.log("Trying to add category.");
        const form = new FormData(event.currentTarget);
        console.log("Form data", form);
        const name = form.get("name");
        const photo = form.get("photo");

        let photoUrl = "https://i.ibb.co.com/48qDqXZ/book-category-default-logo.png";
        if (photo) {
            const photoData = new FormData();
            photoData.append('image', photo);
            const url = await uploadImage(photoData);
            if (url) {
                photoUrl = url;
            }
        }
        const categoryData = {
            name: name,
            photoUrl: photoUrl,
        };

        fetch(categoryBackendUrl, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(categoryData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data?.insertedId) {
                    toast.success("Category is Added.", {
                        position: "top-right",
                    });
                    fetch(categoryBackendUrl)
                        .then((res) => res.json())
                        .then((data) => {
                            setCategory(data);
                        })
                    document.getElementById('modal').close();
                    event.target.reset();
                }
            })
            .catch((err) => {
                console.log("Error to create category in database: ", err);
                toast.error("Failed to add category!", {
                    position: "top-right",
                });
            });
    }

    const handleDelete = (_id) => {
        fetch(`${categoryBackendUrl}/${_id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.deletedCount) {
                    toast.success("User Deleted Successfully", {
                        position: "top-right",
                    });
                    const remainingCategory = category.filter((item) => item._id !== _id);
                    setCategory(remainingCategory);
                }
            });
    };
    return (
        <div>
            <div className="text-center my-5 font-semibold text-2xl">
                <h1>Book Category Management</h1>
                <h3>Total User {category.length}</h3>
            </div>
            <div className="flex justify-end">
                <button onClick={openAddModal} className="btn btn-sm btn-outline btn-primary">
                    <FontAwesomeIcon icon={faPlus} size="sm" />
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Category Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category.map((ctg) => {
                                return (
                                    <tr key={ctg._id} className="hover">
                                        <td>{ctg.name}</td>
                                        <td>
                                            <img className="size-10" src={ctg.photoUrl || "https://i.ibb.co.com/48qDqXZ/book-category-default-logo.png"} alt="Img" />
                                        </td>
                                        <td className="space-x-2">
                                            <button onClick={() => toast.success("Will be implemented soon.", { position: "top-right" })} className="btn btn-sm btn-outline btn-info">
                                                <FontAwesomeIcon icon={faEdit} size="sm" />
                                            </button>
                                            <button onClick={() => handleDelete(ctg._id)} className="btn btn-sm btn-outline btn-error">
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

            {/* modal */}
            <dialog id="modal" className="modal sm:modal-middle">
                <div className="modal-box">
                    <form
                        onSubmit={addCategory} method="dialog"
                        className="flex flex-col gap-4 pb-4"
                    >
                        <h1 className="mb-4 text-2xl font-bold dark:text-white text-center">
                            Add New Book Category
                        </h1>

                        <div>
                            <div className="mb-2">
                                <label
                                    className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                    htmlFor="name"
                                >
                                    Category Name
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                    <input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                        id="name"
                                        type="text"
                                        name="name"
                                        placeholder="Enter Category name"
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
                                    Category Photo
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                    <input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                        id="photo"
                                        type="file"
                                        name="photo"
                                        autoComplete="on"
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button type="submit"
                                className="btn btn-outline btn-info rounded-md"
                            >
                                <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                    Add
                                </span>
                            </button>
                            <p className="btn btn-outline rounded-md" onClick={() => document.getElementById('modal').close()}>
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
