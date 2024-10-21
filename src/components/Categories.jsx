import { useState } from "react";
import { useEffect } from "react";
import CategoryCard from "./CategoryCard";

export default function Categories() {
    const url = `${import.meta.env.VITE_BACKEND_CATEGORY_URL}`;
    console.log("Category backend url: ", url);
    const [categories, SetCategories] = useState([]);
    useEffect(()=>{
        fetch(url) 
        .then((res)=>res.json())
        .then((data)=>{
            console.log("Categories Data: ", data);
            SetCategories(data);
        })
        .catch((error)=>console.log("Error: ", error));
    }, [url]);
    return (
        <section>
            <div className="mb-5 mt-10">
                <h1
                    className="text-center font-semibold text-5xl mb-5"
                >
                    Book Categories
                </h1>
                <hr className="w-3/4 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-base-200 shadow-xl rounded-lg p-2">
				{categories?.map((category) => {
					return (
						<CategoryCard
							key={category._id}
							category={category}
						></CategoryCard>
					);
				})
                || 
                <>
                    <div className="text-center col-span-full">
                        <p>No data found. Could not load data from database!</p>
                    </div>
                </>
                }
			</div>
        </section>
    )
}
