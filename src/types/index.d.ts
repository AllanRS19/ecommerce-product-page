interface Images {
    imageId: string;
    imageUrl: string;
    imageThumbnailUrl: string;
}

interface MobileGalleryTogglerProps {
    action: 'forward' | 'backward';
    images: Images[];
    currentImage: string;
    setCurrentImage: (imageId: SetStateAction<string>) => void;
}

interface ProductDetailsProps {
    title: string;
    description: string;
    price: number;
    discountPercent?: number;
}

interface ProductLightboxProps {
    isMainImageSelected: boolean;
    setIsMainImageSelected: SetStateAction<boolean>;
    productImages: Images[];
    currentImage: Images;
}

interface ProductAmountCounterProps {
    counter: number;
    setCounter: (count: number) => void;
    isAddingToCart: boolean;
}

interface AddToCartProps {
    productInfo: ProductDetailsProps;
}