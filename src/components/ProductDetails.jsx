import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

export default function ProductDetails() {
	const data = useLoaderData();
	console.log("loader data", data);
	const course = data?.[0];
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
		details,
	} = course;
	return (
		<div className="card  bg-base-200 shadow-xl mt-10 p-4 border">
			<div className="card lg:card-side">
				<figure className="lg:w-1/2">
					<img
						className="rounded-lg"
						src={img_url}
						alt="course-image"
					/>
				</figure>
				<div className="card-body lg:w-1/2">
					<h2 className="text-3xl font-bold">
						{title || "No Book found!"}
					</h2>
					<div className="flex items-center gap-4">
						<img
							className="w-14 rounded-full"
							src={author_img_url}
						/>
						<p className="text-xl font-semibold">{author || ""} </p>
					</div>
					<div className="space-y-2">
						<p>Lesson: {lession || "0"} </p>
						<p>Student: {student || "0"} </p>
						<p>Duration: {duration || "--:--"} </p>
						<p>Price: {price || "0"}$</p>
						<p>Level: {level || ""} </p>
						<p>Rating: {ratings || ""} </p>
					</div>
					<div className="rounded-lg py-3 px-2 bg-base-300 shadow-lg">
						<p>
							Details: <br /> {details}
						</p>
					</div>
					<div className="card-actions justify-end mt-10">
						<button
							onClick={() =>
								toast.success(
									`${title} course is added to your wish list.`,
									{
										position: "top-right",
									}
								)
							}
							className="btn btn-neutral"
						>
							Add to Wish List
						</button>
						<button className="btn btn-primary">Enroll</button>
					</div>
				</div>
			</div>
		</div>
	);
}
