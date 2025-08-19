import AddToCart from "./AddToCart";
import { productDetails } from "../constants";
import { formatPrice } from "../lib/utils";

const ProductDetails = () => {

    const productInfo: ProductDetailsProps = productDetails;
    
    return (
        <div className="product-details-wrapper">
            <h3 className="uppercase text-xs font-bold tracking-widest text-dark-grayish-blue">Sneaker Company</h3>
            <div className="product-info">
                <h1 className="product-title">{productInfo.title}</h1>
                <p className="product-description">{productInfo.description}</p>
                <div className="product-price">
                    <div className="flex-center gap-3">
                        <p className="text-xl lg:text-2xl text-black/85 font-bold">
                            {productInfo.discountPercent
                                ? formatPrice(productInfo.price - (productInfo.price * productInfo.discountPercent))
                                : formatPrice(productInfo.price)
                            }
                        </p>
                        {productDetails.discountPercent && productDetails.discountPercent > 0 && (
                            <p className="text-xs text-center font-bold text-white size-fit py-[3px] px-2 rounded-sm bg-black/85">
                                {(productDetails.discountPercent * 100).toFixed(0)}%
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
                productInfo={productInfo}
            />
        </div>
    )
}

export default ProductDetails;