import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";

export default function BookDetails() {
	const book = useLoaderData();
	const { dbUser } = useContext(AuthContext);
	const buyBookBackendUrl = import.meta.env.VITE_BACKEND_BUY_BOOK_URL;
	console.log("book data: ", book);
	const {
		_id,
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
	} = book;

	const openModal = () => {
		document.getElementById('modal').showModal();
	}

	const handleBuyBook = (event) => {
		event.preventDefault();
		console.log("Trying buy book.");
		const form = new FormData(event.currentTarget);
		console.log("Form data", form);

		const uid = dbUser.uid;
		const username = dbUser.name;
		const email = dbUser.email;
		const unitPrice = price;
		const quantity = form.get("quantity");
		const phoneNumber = dbUser.phoneNumber;
		const totalPrice = (unitPrice * quantity).toString();
		const status = "Payable";
		const timeStamp = new Date();

		const buyBookData = {
			uid,
			bookId: _id,
			bookName: name,
			username,
			email,
			unitPrice,
			quantity,
			phoneNumber,
			totalPrice,
			status,
			timeStamp
		};
		console.log("Buy book data: ", buyBookData);

		fetch(buyBookBackendUrl, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(buyBookData),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data?.insertedId) {
                toast.success("Book Buy Successfull!", {
                    position: "top-right",
                });
            }
            document.getElementById('modal').close();
            event.target.reset(); //to clear inpur fields after submit- but it does not work here due to default value.
        })
        .catch((err)=>{
            toast.error("Failed to Buy Book!", {
                position: "top-right",
            });
            console.log("Error", err);
        })
	}
	return (
		<section>
			<div className="card  bg-base-200 shadow-xl mt-10 p-4 border">
				<div className="card lg:card-side">
					<figure className="lg:w-1/2">
						<img
							className="rounded-lg w-2/3"
							src={photoUrl || "https://i.ibb.co.com/tPdbvPH/book-default-logo.png"}
							alt="Book Img"
						/>
					</figure>
					<div className="card-body lg:w-1/2">
						<h2 className="text-3xl font-bold">
							{name || "No Book found!"}
						</h2>
						<div className="flex items-center gap-4">
							{/* <img
							className="w-14 rounded-full"
							src={author_img_url}
						/> */}
							<p className="text-xl font-semibold">{author || ""} </p>
						</div>
						<div className="space-y-2">
							<p>Category: {category || ""} </p>
							<p>Publisher: {publisher || ""} </p>
							<p>Year: {yearOfPublishing || ""} </p>
							<p>Pages: {pages || ""} </p>
							<p>Rating: {rating || ""} </p>
							<p>Price: {price || "0"}$</p>
						</div>
						<div className="rounded-lg py-3 px-2 bg-base-300 shadow-lg">
							<p>
								Synopsis: <br /> {synopsis}
							</p>
						</div>
						<div className="card-actions justify-end mt-10">
							<button
								onClick={() =>
									toast.success(
										`${name} - book is added to your wish list.`,
										{
											position: "top-right",
										}
									)
								}
								className="btn btn-neutral"
							>
								Add to Wish List
							</button>
							<button onClick={openModal} className="btn btn-primary">Buy Now</button>
						</div>
					</div>
				</div>
			</div>

			{/* modal for buy book */}
			<dialog id="modal" className="modal sm:modal-middle">
				<div className="modal-box">
					<form
						onSubmit={handleBuyBook} method="dialog"
						className="flex flex-col gap-4 pb-4"
					>
						<h1 className="mb-4 text-2xl font-bold dark:text-white text-center">
							Buy New Book
						</h1>

						<div>
							<div className="mb-2">
								<label
									className="text-sm font-medium text-gray-900 dark:text-gray-300"
									htmlFor="name"
								>
									Username
								</label>
							</div>
							<div className="flex w-full rounded-lg pt-1">
								<div className="relative w-full">
									<input
										className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
										id="name"
										type="text"
										name="username"
										defaultValue={dbUser.name}
										autoComplete="on"
										disabled
									></input>
								</div>
							</div>
						</div>
						<div>
							<div className="mb-2">
								<label
									className="text-sm font-medium text-gray-900 dark:text-gray-300"
									htmlFor="name"
								>
									Email
								</label>
							</div>
							<div className="flex w-full rounded-lg pt-1">
								<div className="relative w-full">
									<input
										className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
										id="name"
										type="text"
										name="email"
										defaultValue={dbUser.email}
										autoComplete="on"
										disabled
									></input>
								</div>
							</div>
						</div>
						<div>
							<div className="mb-2">
								<label
									className="text-sm font-medium text-gray-900 dark:text-gray-300"
									htmlFor="name"
								>
									Unit Price
								</label>
							</div>
							<div className="flex w-full rounded-lg pt-1">
								<div className="relative w-full">
									<input
										className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
										id="name"
										type="text"
										name="unitPrice"
										defaultValue={`${price}$`}
										autoComplete="on"
										disabled
									></input>
								</div>
							</div>
						</div>
						<div>
							<div className="mb-2">
								<label
									className="text-sm font-medium text-gray-900 dark:text-gray-300"
									htmlFor="name"
								>
									Quantity
								</label>
							</div>
							<div className="flex w-full rounded-lg pt-1">
								<div className="relative w-full">
									<input
										className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
										id="name"
										type="number"
										name="quantity"
										defaultValue={1}
										autoComplete="on"
									></input>
								</div>
							</div>
						</div>
						<div>
							<div className="mb-2">
								<label
									className="text-sm font-medium text-gray-900 dark:text-gray-300"
									htmlFor="name"
								>
									Phone Number
								</label>
							</div>
							<div className="flex w-full rounded-lg pt-1">
								<div className="relative w-full">
									<input
										className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-md"
										id="name"
										type="text"
										name="phoneNumber"
										defaultValue={dbUser.phoneNumber}
										autoComplete="on"
										disabled
									></input>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<button type="submit"
								className="btn btn-outline btn-info rounded-md"
							>
								<span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
									Confirm
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
		</section>
	);
}
