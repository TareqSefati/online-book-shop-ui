import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function Products() {
	const courseList = useLoaderData();
	console.log(courseList);
	return (
		<div >
			<div className="mb-5 mt-10">
				<h1 className="text-center font-semibold text-5xl mb-5">
					Our Latest Courses
				</h1>
				<hr className="w-3/4 mx-auto" />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-base-200 shadow-xl rounded-lg p-2">
				{courseList.map((course) => {
					return (
						<ProductCard
							key={course._id}
							courseData={course}
						></ProductCard>
					);
				})}
			</div>
		</div>
	);
}
