import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";

export default function ProductCard({ courseData }) {
	const {
		_id,
		title,
		lession,
		student,
		duration,
		price,
		author,
		level,
		ratings,
		author_img_url,
		img_url,
	} = courseData;
	return (
		<div>
			<div className="card bg-base-100 shadow-xl">
				<figure className="">
					<img
						className="h-80 rounded-md"
						src={img_url}
						alt={title + " - image"}
					/>
				</figure>
				<div className="card-body">
					<div className="h-20">
						<h2 className="card-title font-semibold text-3xl">
							{title}
							<div className="badge badge-accent">{ratings}</div>
						</h2>
					</div>
					<p className="font-semibold">Author: <span className="italic font-mono">{author}</span></p>
					<p className="font-semibold">Level: <span className="italic font-mono">{level}</span></p>
					<p className="font-semibold">Students: <span className="italic font-mono">{student}</span></p>
					<p className="font-semibold">Lesson: <span className="italic font-mono">{lession}</span></p>
					<p className="font-semibold">Duration: <span className="italic font-mono">{duration}</span></p>
					<p className="font-semibold">Price: <span className="italic font-mono">{price}$ </span></p>
					<div className="card-actions justify-end">
						<Link to={ROUTES.SINGLE_PRODUCT.DYNAMIC(_id)}>
							<button className="btn btn-neutral btn-sm">
								Course Details
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
