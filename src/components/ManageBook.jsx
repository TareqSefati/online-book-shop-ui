import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ManageBook() {
    const bookBackendUrl = import.meta.env.VITE_BACKEND_BOOKS_URL;
    const categoryBackendUrl = import.meta.env.VITE_BACKEND_CATEGORY_URL;
    const [books, setBooks] = useState([]);
    const [category, setCategory] = useState([]);
    const [editableBook, setEditableBook] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetch(bookBackendUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setBooks(data);
            })
            .catch((err) => console.log("Error", err));

        fetch(categoryBackendUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCategory(data);
            })
            .catch((err) => console.log("Error", err));

    }, [])

    const handleDelete = (_id) => {
        fetch(`${bookBackendUrl}/${_id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.deletedCount) {
                    toast.success("User Deleted Successfully", {
                        position: "top-right",
                    });
                    const remainingBooks = books.filter((item) => item._id !== _id);
                    setBooks(remainingBooks);
                }
            });
    };

    const openEditModal = (_id) => {
        console.log(_id);
        // <button className="btn" onClick={() => document.getElementById('modal').showModal()}>open modal</button>
        const editableBookTmp = books.filter((book) => book._id === _id)[0];
        console.log("Editabel book: ", editableBookTmp);
        setEditableBook(editableBookTmp);
        setSelectedCategory(editableBook.category);
        document.getElementById('editModal').showModal();
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
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

    const editBook = async (event) => {
        event.preventDefault();
        console.log("Try to edit book");
        const form = new FormData(event.currentTarget);
        console.log("Form data", form);
        const name = form.get("name");
        const author = form.get("author");
        const photo = form.get("photo");
        const pages = form.get("pages");
        const rating = form.get("rating");
        const category = form.get("category");
        const publisher = form.get("publisher");
        const yearOfPublishing = form.get("yearOfPublishing");
        const synopsis = form.get("synopsis");
        const price = form.get("price");

        let photoUrl = "https://i.ibb.co.com/TYSgwLR/default-profile-img.jpg";
        if (photo) {
            const photoData = new FormData();
            photoData.append('image', photo);
            const url = await uploadImage(photoData);
            if (url) {
                photoUrl = url;
            }
        }
        const updatedBook = {
            name,
            author,
            photoUrl,
            pages,
            rating,
            category,
            publisher,
            yearOfPublishing,
            synopsis,
            price
        };
        console.log("Update Book: ", updatedBook);

        fetch(`${bookBackendUrl}/${editableBook._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedBook),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.modifiedCount) {
                toast.success("Book Updated Successfully", {
                    position: "top-right",
                });
                fetch(bookBackendUrl)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setBooks(data);
                })
            }
            document.getElementById('editModal').close();
            //event.target.reset(); //to clear inpur fields after submit- but it does not work here due to default value.
        })
        .catch((err)=>{
            toast.error("Book Update Failed!", {
                position: "top-right",
            });
            console.log("Error", err);
        })
    }

    return (
        <div>
            <div className="text-center mt-5 font-semibold text-2xl">
                <h1>Book Management</h1>
                <h3>Total Book {books.length}</h3>
            </div>
            <div className="flex justify-end mb-2">
                <button onClick={"openAddModal"} className="btn btn-sm btn-outline btn-primary">
                    <FontAwesomeIcon icon={faPlus} size="sm" />
                </button>
            </div>
            <hr />
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book) => {
                                return (
                                    <tr key={book._id} className="hover">
                                        <td>{book.name}</td>
                                        <td>{book.category}</td>
                                        <td className="space-x-2">
                                            <button onClick={() => openEditModal(book._id)} className="btn btn-sm btn-outline btn-info">
                                                <FontAwesomeIcon icon={faEdit} size="sm" />
                                            </button>
                                            <button onClick={() => handleDelete(book._id)} className="btn btn-sm btn-outline btn-error">
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

            {/*Edit Book modal start */}
            <dialog id="editModal" className="modal sm:modal-middle">
                <div className="modal-box">
                    <form
                        onSubmit={editBook} method="dialog"
                        className="flex flex-col gap-4 pb-4"
                    >
                        <h1 className="mb-4 text-2xl font-bold dark:text-white text-center">
                            Update Book
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
                                        defaultValue={editableBook.name}
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
                                    htmlFor="author"
                                >
                                    Author
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                    <input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                        id="author"
                                        type="text"
                                        name="author"
                                        defaultValue={editableBook.author}
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
                                    htmlFor="pages"
                                >
                                    Pages
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                    <input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                        id="pages"
                                        type="text"
                                        name="pages"
                                        defaultValue={editableBook.pages}
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
                                    htmlFor="rating"
                                >
                                    Rating
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                    <input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                        id="rating"
                                        type="text"
                                        name="rating"
                                        defaultValue={editableBook.rating}
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
                                    htmlFor="publisher"
                                >
                                    Publisher
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                    <input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                        id="publisher"
                                        type="text"
                                        name="publisher"
                                        defaultValue={editableBook.publisher}
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
                                    htmlFor="yearOfPublishing"
                                >
                                    Year of Publishing
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                    <input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                        id="yearOfPublishing"
                                        type="text"
                                        name="yearOfPublishing"
                                        defaultValue={editableBook.yearOfPublishing}
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
                                    htmlFor="price"
                                >
                                    Price
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                    <input
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                        id="price"
                                        type="text"
                                        name="price"
                                        defaultValue={editableBook.price}
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
                                    htmlFor="category"
                                >
                                    Category
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                    <select className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        name="category"
                                    >
                                        <option value="⬇️ Select a Category ⬇️">-- Select a Category --</option>
                                        {category.map((item) => (
                                            <option key={item._id} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2">
                                <label
                                    className="text-sm font-medium text-gray-900 dark:text-gray-300"
                                    htmlFor="synopsis"
                                >
                                    Synopsis
                                </label>
                            </div>
                            <div className="flex w-full rounded-lg pt-1">
                                <div className="relative w-full">
                                    <textarea
                                        className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
                                        id="synopsis"
                                        type="text"
                                        name="synopsis"
                                        defaultValue={editableBook.synopsis}
                                        autoComplete="on"
                                        required
                                    ></textarea>
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
                            <p className="btn btn-outline rounded-md" onClick={() => document.getElementById('editModal').close()}>
                                <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                    Cancel
                                </span>
                            </p>

                        </div>
                    </form>
                </div>
            </dialog>
            {/*Edit Book modal end */}
        </div>
    )
}
