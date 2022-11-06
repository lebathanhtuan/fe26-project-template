export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  USER: {
    HOME: "/",
    PRODUCT_LIST: "/products",
    PRODUCT_DETAIL: "/products/:id",
    CHECKOUT: "/checkout",
    ABOUT: "/about",
    PROFILE: "/profile",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    PRODUCT_LIST: "/admin/products",
    CREATE_PRODUCT: "/admin/products/create",
    UPDATE_PRODUCT: "/admin/products/:id/update",
    USER_LIST: "/admin/users",
  },
};
