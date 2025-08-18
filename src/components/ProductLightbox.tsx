import { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { ChevronLeft, ChevronRight, XIcon, type LucideIcon } from 'lucide-react';

const MainImageSelectArrows = ({ 
    type, 
    icon: Icon, 
    onClick 
}: { 
    type: 'forward' | 'backward', 
    icon: LucideIcon ,
    onClick: (type: string) => void;
}) => (
    <div
        className={cn(
            'size-10 bg-white flex-center justify-center absolute top-1/2 -translate-y-1/2 rounded-full cursor-pointer transition hover:text-custom-orange',
            type === 'backward' ? "-left-5" : "-right-5"
        )}
        onClick={() => onClick(type)}
    >
        <Icon className='size-6' />
    </div>
)

const ProductLightbox = ({
    isMainImageSelected,
    setIsMainImageSelected,
    productImages,
    currentImage
}: ProductLightboxProps) => {

    const [currentLightboxImage, setCurrentLightboxImage] = useState<Images>(currentImage);

    const handleCurrentLightboxImageChange = (image: Images) => {
        if (currentLightboxImage.imageId === image.imageId) return;
        setCurrentLightboxImage(image);
    }

    const handleImageSwitch = (type: string) => {
        const findCurrentImageIndex = productImages.findIndex((image) => image.imageId === currentLightboxImage.imageId);
        if (findCurrentImageIndex < 0) return;

        if (type === 'forward') {
            if (findCurrentImageIndex === productImages.length - 1) {
                return setCurrentLightboxImage(productImages[0]);
            }
            setCurrentLightboxImage(productImages[findCurrentImageIndex + 1]);
        } else if (type === 'backward') {
            if (findCurrentImageIndex === 0) {
                return setCurrentLightboxImage(productImages[productImages.length - 1]);
            }
            setCurrentLightboxImage(productImages[findCurrentImageIndex - 1]);
        }
    }

    useEffect(() => {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

        if (isMainImageSelected) {
            document.body.classList.add("no-scroll");
            document.body.style.paddingRight = `${scrollBarWidth}px`;
        } else {
            document.body.classList.remove("no-scroll");
            document.body.style.paddingRight = "";
        }
    }, [isMainImageSelected]);

    return (
        <dialog
            className={cn(
                "product-lightbox",
                isMainImageSelected && "active-lightbox"
            )}
        >
            <div className="product-lightbox-content">
                <XIcon
                    className="size-7 text-custom-orange cursor-pointer self-end"
                    onClick={() => setIsMainImageSelected(false)}
                />
                <div className="lightbox-main-image-container">
                    <MainImageSelectArrows
                        type="backward"
                        icon={ChevronLeft}
                        onClick={handleImageSwitch}
                    />
                    <img src={currentLightboxImage.imageUrl} alt="Image" className='size-full rounded-xl object-cover' />
                    <MainImageSelectArrows
                        type="forward"
                        icon={ChevronRight}
                        onClick={handleImageSwitch}
                    />
                </div>
                <div className="lightbox-bottom-images">
                    {productImages.map((image) => (
                        <div
                            key={image.imageId}
                            className={cn(
                                "lightbox-bottom-image-selector",
                                currentLightboxImage.imageId === image.imageId && "active-bottom-image-container"
                            )}
                            onClick={() => handleCurrentLightboxImageChange(image)}
                        >
                            <div
                                className={cn(
                                    "size-full bg-white opacity-0 absolute inset-0 transition duration-300",
                                    currentLightboxImage.imageId === image.imageId && "opacity-70"
                                )}
                            />
                            <div
                                className={cn(
                                    "lightbox-bottom-image-inner"
                                )}
                                style={{
                                    background: `url(${image.imageThumbnailUrl})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: 'center',
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </dialog>
    )
}

export default ProductLightbox;