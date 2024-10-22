import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

export default function BookDetails() {
    const book = useLoaderData();
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
	return (
		<div className="card  bg-base-200 shadow-xl mt-10 p-4 border">
			<div className="card lg:card-side">
				<figure className="lg:w-1/2">
					<img
						className="rounded-lg w-2/3"
						src={photoUrl || "https://i.ibb.co.com/tPdbvPH/book-default-logo.png" }
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
						<button className="btn btn-primary">Buy Now</button>
					</div>
				</div>
			</div>
		</div>
	);
}
