import { useState } from "react";
import { productImages } from "../constants";
import { cn } from "../lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductLightbox from "./ProductLightbox";

const MobileGalleryToggler = ({ action, images, currentImage, setCurrentImage }: MobileGalleryTogglerProps) => {

    const handleImageSwitch = () => {
        const findCurrentImageIndex = images.findIndex((image) => image.imageId === currentImage);
        if (findCurrentImageIndex < 0) return;

        if (action === 'forward') {
            if (findCurrentImageIndex === images.length - 1) {
                return setCurrentImage(images[0].imageId);
            }
            setCurrentImage(images[findCurrentImageIndex + 1].imageId);
        } else if (action === 'backward') {
            if (findCurrentImageIndex === 0) {
                return setCurrentImage(images[images.length - 1].imageId);
            }
            setCurrentImage(images[findCurrentImageIndex - 1].imageId);
        }
    }

    return (
        <div
            className={cn(
                "absolute size-8 bg-white flex-center justify-center rounded-full top-1/2 -translate-y-1/2 z-30 cursor-pointer lg:hidden",
                action === 'forward' ? "right-4" : "left-4"
            )}
            onClick={handleImageSwitch}
        >
            {action === 'forward' ? (
                <ChevronRight className="size-4.5" />
            ) : (
                <ChevronLeft className="size-4.5" />
            )}
        </div>
    )
}

const MobileProductImageGallery = () => {

    const images: Images[] = productImages;
    const [currentImage, setCurrentImage] = useState<string>(images[0].imageId);

    // In case you want to implement the automatic slider, you can uncomment the code below

    // setInterval(() => {
    //     const findCurrentImageIndex = images.findIndex((image) => image.imageId === currentImage);
    //     if (findCurrentImageIndex < 0) return;

    //     if (findCurrentImageIndex === images.length - 1) {
    //         console.log("Es la última");
    //         return setCurrentImage(images[0].imageId);
    //     }
    //     else if (findCurrentImageIndex === 0 || findCurrentImageIndex < images.length) {
    //         console.log("Es la primera o no es la ultima");
    //         return setCurrentImage(images[findCurrentImageIndex + 1].imageId);
    //     }
    // }, 5000);

    return (
        <section className="mobile-product-gallery">
            <MobileGalleryToggler action="backward" images={images} currentImage={currentImage} setCurrentImage={setCurrentImage} />
            <MobileGalleryToggler action="forward" images={images} currentImage={currentImage} setCurrentImage={setCurrentImage} />
            {productImages.map((image) => (
                <img
                    key={image.imageId}
                    src={image.imageUrl}
                    alt="Image"
                    className={cn(
                        "size-full absolute opacity-0 transition-all ease-in-out duration-500 pointer-events-none object-cover md:object-top",
                        currentImage === image.imageId && "opacity-100"
                    )}
                />
            ))}
        </section>
    )
}

const DesktopProductImageGallery = () => {

    const [isMainImageSelected, setIsMainImageSelected] = useState(false);
    const [currentImage, setCurrentImage] = useState<Images>(productImages[0]);

    const handleSetCurrentImage = (image: Images) => {
        if (currentImage.imageId === image.imageId) return;
        setCurrentImage(image);
    }

    return (
        <div className="hidden w-full lg:block lg:flex-1">
            <ProductLightbox
                isMainImageSelected={isMainImageSelected}
                setIsMainImageSelected={setIsMainImageSelected}
                productImages={productImages}
                currentImage={currentImage}
            />
            <div className="desktop-gallery-wrapper">
                <div
                    className="desktop-gallery-current-image"
                    onClick={() => setIsMainImageSelected(true)}
                >
                    <img src={currentImage.imageUrl} alt="This is an image" className="rounded-2xl size-full" />
                </div>
                <section className="desktop-images-bottom">
                    {productImages.map((image) => (
                        <div
                            className={cn(
                                "image-bottom-container",
                                currentImage.imageId === image.imageId && "active-bottom-image-container"

                            )}
                            key={image.imageId}
                        >
                            <div
                                className={cn(
                                    "image-bottom",
                                    currentImage.imageId === image.imageId && "active-bottom-image"

                                )}
                                style={{
                                    background: `url(${image.imageThumbnailUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'
                                }}
                                onClick={() => handleSetCurrentImage(image)}
                            />
                        </div>
                    ))}
                </section>
            </div>
        </div>
    )
}

const ProductImageGallery = () => {
    return (
        <>
            <DesktopProductImageGallery />
            <MobileProductImageGallery />
        </>
    )
}

export default ProductImageGallery;