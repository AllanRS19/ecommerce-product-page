import { useState } from "react";
import MobileNav from "./components/MobileNav"
import Navbar from "./components/Navbar"
import ProductImageGallery from "./components/ProductImageGallery";
import ProductDetails from "./components/ProductDetails";

const App = () => {

    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    return (
        <main className="w-full h-full">
            <MobileNav open={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} />
            <Navbar setMobileNavOpen={setMobileNavOpen} />
            <section className="product-section">
                <ProductImageGallery />
                <section className="product-details">
                    <ProductDetails />
                </section>
            </section>
        </main>
    )
}

export default App