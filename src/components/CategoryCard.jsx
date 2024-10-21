import { Link } from "react-router-dom";
import { ROUTES } from "../routes/Routes";

export default function CategoryCard(props) {
  const { category } = props;
  return (
    <div>
      <div className="card bg-base-100 shadow-xl">
        <figure className="">
          <img
            className="h-52 rounded-md mt-2"
            src={category?.photoUrl || "https://i.ibb.co.com/48qDqXZ/book-category-default-logo.png"}
            alt="Category Image"
          />
        </figure>
        <div className="card-body">
          <div className="h-20">
            <h2 className="font-semibold text-3xl text-center">
              {category?.name}
            </h2>
          </div>
          <div className="card-actions justify-end">
            <Link to={ROUTES.SINGLE_PRODUCT.DYNAMIC(category?.name)} target="_blank">
              <button className="btn btn-neutral btn-sm">
                See All Book
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
