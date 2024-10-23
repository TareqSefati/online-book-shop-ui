import { useLoaderData } from "react-router-dom";
import BookCard from "./BookCard";

export default function AllBooks() {
    const loaderData = useLoaderData();
    let books = [];
    if (loaderData instanceof Array) {
        books = loaderData;
    }
    return (
        <section>
            <div className="mb-5 mt-10">
                <h1
                    className="text-center font-semibold text-5xl mb-5"
                >
                    All Books <br />
                    <span className="text-xl">Total {books?.length} books found </span>
                </h1>
                <hr className="w-3/4 mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-base-200 shadow-xl rounded-lg p-2">
                {books?.map((book) => {
                    return (
                        <BookCard
                            key={book._id}
                            book={book}
                        ></BookCard>
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
