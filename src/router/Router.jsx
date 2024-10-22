import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import ProductDetails from "../components/ProductDetails";
import Products from "../components/Products";
import Register from "../components/Register";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import { ROUTES } from "../routes/Routes";
import PrivateRouter from "./PrivateRouter";
import AboutUs from "../components/AboutUs";
import Faq from "../components/Faq";
import Error from "../components/Error";
import CategorizedBooks from "../components/CategorizedBooks";
import AllBooks from "../components/AllBooks";
import BookDetails from "../components/BookDetails";
const router = createBrowserRouter([
	{
		path: `${ROUTES.HOME}`,
		element: <MainLayout />,
		errorElement: <Error />,
		children: [
			{
				path: `${ROUTES.HOME}`,
				element: <HomePage />,
			},
			{
				path: `${ROUTES.LOGIN}`,
				element: <Login />,
			},
			{
				path: `${ROUTES.REGISTER}`,
				element: <Register />,
			},
			// {
			// 	path: `${ROUTES.PRODUCTS}`,
			// 	element: (
			// 		<PrivateRouter>
			// 			<Products />
			// 		</PrivateRouter>
			// 	),
			// 	loader: () =>
			// 		fetch(
			// 			`https://code-course-academy-server.vercel.app/api/products`
			// 		),
            //     errorElement: <Error />,
			// },
			{
				path: `${ROUTES.BOOKS}`,
				element: (
					<AllBooks />
				),
				loader: () =>
					fetch(
						`${import.meta.env.VITE_BACKEND_ALL_BOOKS_URL}`
					),
                errorElement: <Error />,
			},
			// {
			// 	path: `${ROUTES.SINGLE_PRODUCT.STATIC}`,
			// 	element: (
			// 		<PrivateRouter>
			// 			<ProductDetails />
			// 		</PrivateRouter>
			// 	),
			// 	loader: ({ params }) =>
			// 		fetch(
			// 			`https://code-course-academy-server.vercel.app/api/products/${params.id}`
			// 		),
            //     errorElement: <Error />,
			// },
			{
				path: `${ROUTES.SINGLE_BOOK.STATIC}`,
				element: (
					//<PrivateRouter>
						<BookDetails />
					//</PrivateRouter>
				),
				loader: ({ params }) =>
					fetch(
						`${import.meta.env.VITE_BACKEND_ALL_BOOKS_URL}/${params.id}`
					),
                errorElement: <Error />,
			},
			{
				path: `${ROUTES.SINGLE_CATEGORY.STATIC}`,
				element: (
					<CategorizedBooks />
				),
				loader: ({ params }) =>
					fetch(
						`${import.meta.env.VITE_BACKEND_BOOKS_BY_CATEGORY_URL}/${params.name}`
					),
                errorElement: <Error />,
			},
            {
				path: `${ROUTES.ABOUT}`,
				element: <AboutUs />,
			},
            {
				path: `${ROUTES.FAQ}`,
				element: <Faq />,
			},
		],
	},
	// {
	//     path: "*",
	//     element: <NotFoundPage />,
	// },
]);

export default router;
