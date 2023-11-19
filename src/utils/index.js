export const navOptions = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "listing",
    label: "All Products",
    path: "/product/listing/all-products",
  },
  {
    id: "listingMen",
    label: "Men",
    path: "/product/listing/men",
  },
  {
    id: "listingWomen",
    label: "Women",
    path: "/product/listing/women",
  },
  {
    id: "listingKids",
    label: "kids",
    path: "/product/listing/kids",
  },
];
  
export const adminNavOptions = [
  {
    id: "adminListing",
    label: "Manage All Products",
    path: "/admin-view/all-products",
  },
  {
    id: "adminNewProduct",
    label: "Add New Product",
    path: "/admin-view/add-product",
  },
];

export const registrationFormControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Ingresa tu nombre",
    label: "Nombre",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Ingresa tu email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Ingresa una contraseña",
    label: "Contraseña",
    componentType: "input",
  },
  {
    id: "role",
    type: "",
    placeholder: "",
    label: "Rol",
    componentType: "select",
    options: [
      {
        id: "admin",
        label: "Admin",
      },
      {
        id: "customer",
        label: "customer",
      },
    ],
  },
];

export const loginFormControls = [
  {
    id: "email",
    type: "email",
    placeholder: "Ingresa tu email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "ingresa tu contraseña",
    label: "Password",
    componentType: "input",
  },
];

export const adminAddProductformControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter price",
    label: "Price",
    componentType: "input",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Enter description",
    label: "Description",
    componentType: "input",
  },
  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Category",
    componentType: "select",
    options: [
      {
        id: "men",
        label: "Men",
      },
      {
        id: "women",
        label: "Women",
      },
      {
        id: "kids",
        label: "Kids",
      },
    ],
  },
  {
    id: "deliveryInfo",
    type: "text",
    placeholder: "Enter deliveryInfo",
    label: "Delivery Info",
    componentType: "input",
  },
  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "On Sale",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      {
        id: "no",
        label: "No",
      },
    ],
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Enter Price Drop",
    label: "Price Drop",
    componentType: "input",
  },
];

export const AvailableSizes = [
  {
    id: "s",
    label: "S",
  },
  {
    id: "m",
    label: "M",
  },
  {
    id: "l",
    label: "L",
  },
];

export const addNewAddressFormControls = [
  {
    id: "fullName",
    type: "input",
    placeholder: "Introduce tu nombre completo",
    label: "Nombre",
    componentType: "input",
  },
  {
    id: "address",
    type: "input",
    placeholder: "Ingresa tu dirección",
    label: "Dirección",
    componentType: "input",
  },
  {
    id: "city",
    type: "input",
    placeholder: "Ingresa tu ciudad",
    label: "Ciudad",
    componentType: "input",
  },
  {
    id: "country",
    type: "input",
    placeholder: "Ingresa tu país",
    label: "País",
    componentType: "input",
  },
  {
    id: "postalCode",
    type: "input",
    placeholder: "Ingresa tu codigo postal",
    label: "Codigo postal",
    componentType: "input",
  },
];

export const firebaseConfig = {
  apiKey: "AIzaSyANxSJs0fWQMUtx-zlfLZ9jN2T2TfbUHJw",
  authDomain: "vfit-store.firebaseapp.com",
  projectId: "vfit-store",
  storageBucket: "vfit-store.appspot.com",
  messagingSenderId: "955136781061",
  appId: "1:955136781061:web:f931aeb5e8d4940963a56c",
  measurementId: "G-L6MJJHP5LE"
};

export const firebaseStorageURL = "gs://vfit-store.appspot.com"

