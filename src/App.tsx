import { useState } from "react";
import MobileNav from "./components/MobileNav"
import Navbar from "./components/Navbar"
import AddToCart from "./components/AddToCart";
import { productDetails } from "./constants";
import { formatPrice } from "./lib/utils";

interface ProductDetailsProps {
    title: string;
    description: string;
    price: number;
    discountPercent?: number;
}

const App = () => {

    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const productInfo: ProductDetailsProps = productDetails;

    return (
        <main className="w-full h-full">
            <MobileNav open={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} />
            <Navbar setMobileNavOpen={setMobileNavOpen} />
            <section className="product-section">
                <div className="aspect-square bg-custom-orange" />
                <section className="product-details">
                    <h3 className="uppercase text-xs font-bold tracking-widest text-dark-grayish-blue">Sneaker Company</h3>
                    <div className="product-info">
                        <h1 className="product-title">{productInfo.title}</h1>
                        <p className="product-description">{productInfo.description}</p>
                        <div className="product-price">
                            <div className="flex-center gap-3">
                                <p className="text-xl text-black/85 font-bold">
                                    {productInfo.discountPercent
                                        ? formatPrice(productInfo.price * productInfo.discountPercent)
                                        : formatPrice(productInfo.price)
                                    }
                                </p>
                                {productDetails.discountPercent && (
                                    <p className="text-xs text-center font-bold text-white size-fit py-[3px] px-2 rounded-sm bg-black/85">
                                        {productDetails.discountPercent * 100}%
                                    </p>
                                )}
                            </div>
                            {productInfo.discountPercent && (
                                <p className="text-sm font-bold text-dark-grayish-blue line-through">
                                    {formatPrice(productInfo.price)}
                                </p>
                            )}
                        </div>
                    </div>
                    <AddToCart 
                        productName={productInfo.title}
                    />
                </section>
            </section>
        </main>
    )
}

export default App