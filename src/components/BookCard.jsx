import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";

export default function BookCard({book}) {
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
        <div>
            <div className="card bg-base-100 shadow-xl">
                <figure className="">
                    <img
                        className="h-48 rounded-md mt-2"
                        src={photoUrl || "https://i.ibb.co.com/tPdbvPH/book-default-logo.png" }
                        alt="Book Img"
                    />
                </figure>
                <div className="card-body">
                    <div className="h-20">
                        <h2 className="card-title font-semibold text-3xl">
                            {name}
                            <div className="badge badge-accent">{rating}</div>
                        </h2>
                    </div>
                    <p className="font-semibold">Author: <span className="italic font-mono">{author}</span></p>
                    <p className="font-semibold">Publisher: <span className="italic font-mono">{publisher}</span></p>
                    
                    <p className="font-semibold">Price: <span className="italic font-mono">{price}$ </span></p>
                    <div className="card-actions justify-end">
                        <Link to={ROUTES.SINGLE_PRODUCT.DYNAMIC(_id)}>
                            <button className="btn btn-neutral btn-sm">
                                View Details
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
