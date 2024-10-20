import AboutUs from "../components/AboutUs";
import Banner from "../components/Banner";
import ContactUs from "../components/ContactUs";
import CourseGallery from "../components/CourseGallery";
import Guidelines from "../components/Guidelines";

export default function HomePage() {
	return (
        <div>
            <Banner />
            <Guidelines />
            <CourseGallery />
            <ContactUs />
            <AboutUs />
        </div>
    );
}
