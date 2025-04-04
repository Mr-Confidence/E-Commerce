// Instead of default export, export each one individually
export const HighlightsType = {
    _id: "",
    _base: "",
    title: "",
    name: "",
    image: "",
    color: "",
    buttonTitle: ""
};

export const CategoryProps = {
    _id: "",
    image: "",
    name: "",
    _base: "",
    description: ""
};

export const ProductProps = {
    _id: "",
    _base: "",
    reviews: 0,
    rating: 0,
    quantity: 0,
    overView: "",
    name: "",
    isStock: false,
    isNew: false,
    images: [],
    discountedPrice: 0,
    regularPrice: 0,
    description: "",
    colors: [],
    category: "",
    brand: ""
};

export const BlogProps = {
    _id: "",
    image: "",
    title: "",
    description: "",
    _base: ""
};

export const UserTypes = {
    currentUser: {
        firstName: "",
        lastName: "",
        email: "",
        avatar: "", // Optional
        id: ""
    }
};

export const OrderTypes = {
    orderItems: [],
    paymentId: "",
    paymentMethod: "",
    userEmail: ""
};
