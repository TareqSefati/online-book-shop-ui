import AboutUs from "../components/AboutUs";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import ContactUs from "../components/ContactUs";
import CourseGallery from "../components/CourseGallery";

export default function HomePage() {
	return (
        <div>
            <Banner />
            {/* <Guidelines /> */}
            <Categories />
            <CourseGallery />
            <ContactUs />
            <AboutUs />
        </div>
    );
}
