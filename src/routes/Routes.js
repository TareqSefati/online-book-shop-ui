export const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    PRODUCTS: "/products",
    ABOUT: "/about",
    FAQ: "/faq",
    SINGLE_PRODUCT: {
        STATIC: "/products/:id",
        DYNAMIC: (id) => `/products/${id}`,
    },
    SINGLE_CATEGORY: {
        STATIC: "/categories/:name",
        DYNAMIC: (name) => `/categories/${name}`,
    },
  };
  