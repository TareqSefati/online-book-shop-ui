import { Helmet } from "react-helmet-async";
import AboutUs from "../components/AboutUs";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import ContactUs from "../components/ContactUs";
import CourseGallery from "../components/CourseGallery";
import Features from "../components/Features";
import UserReview from "../components/UserReview";

export default function HomePage() {
    return (
        <>
            <Helmet>
                <title>Online Book Shop</title>
            </Helmet>
            <div>
                <Banner />
                {/* <Guidelines /> */}
                <Categories />
                <Features />
                <UserReview />
                {/* <CourseGallery />
            <ContactUs />
            <AboutUs /> */}
            </div>
        </>

    );
}
