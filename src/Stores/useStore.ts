/** Firebase import */
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';

// Import axios
import axios from 'axios';

/** Firebase config */
const firebaseConfig: any = {
  apiKey: 'AIzaSyBuxrMxC-HoQfuHkJzOYn78eLEm5QjwNKU',
  authDomain: 'e-commerce-7f174.firebaseapp.com',
  projectId: 'e-commerce-7f174',
  storageBucket: 'e-commerce-7f174.appspot.com',
  messagingSenderId: '1079602433649',
  appId: '1:1079602433649:web:8ce879e0b94249808bd5d0',
  measurementId: 'G-V0859364WH'
};

/** Init firebase */
initializeApp(firebaseConfig);

/** Init consts for db functions */
const db: any = getFirestore();
const colRefProducts: any = collection(db, 'products');
const colRefUsers: any = collection(db, 'users');

// Import zustand store
import create from 'zustand';

// init interface for Products item
interface Products {
  uid: number;
  title: string;
  desc: string;
  price: number;
  priceRub: number;
  count: number;
}

/** Interface for users */
interface Users {
  uid: string;
  products: any;
}

// init interface for Products store
interface Store {
  products: Products[];
  productsInCart: Products[];
  users: Users[];
  addUser: () => void;
  setUsers: () => void;
  setProducts: () => void;
  getCartProducts: (user: any) => void;
  addToCartDB: (product: any, user: any) => void;
  removeFromCartDB: (product: any, user: any) => void;
  applyPayment: (products: any, user: any) => void;
}

/** Create Products Store */
const useStore = create<Store>((set, get) => ({
  products: [] as any,
  productsInCart: [] as any,
  users: [] as any,
  setUsers: async () => {
    const data: any = await getDocs(colRefUsers);
    const users: any = data.docs.map((doc: any, index: number) => ({ ...doc.data() }));

    set({
      users: users
    });
  },
  addUser: async () => {
    const data: any = await getDocs(colRefUsers);
    const users: any = data.docs.map((doc: any, index: number) => ({
      ...doc.data(),
      uid: doc.id,
      products: []
    }));

    set({
      users: users
    });
  },
  setProducts: async () => {
    const data: any = await getDocs(colRefProducts);
    const promises: any = [];
    const convertedPrices: any = [];

    if (promises.length || convertedPrices.length) {
      promises.length = 0;
      convertedPrices.length = 0;
    }

    data.docs.map((doc: any, index: number) => {
      promises.push(
        axios
          .get(
            `https://api.fastforex.io/convert?from=USD&to=RUB&amount=${
              doc.data().price
            }&api_key=32fd4daa3a-8781b1839a-rbhw5l`
          )
          .then((response: any) => convertedPrices.push(response.data.result))
          .catch((error: any) => console.error(error))
      );
    });

    const result: any = await Promise.all(promises).then(() => convertedPrices);
    const products: any = data.docs.map((doc: any, index: number) => {
      updateDoc(doc.ref, {
        priceRub: result[index].RUB,
        uid: doc.id
      });

      return { ...doc.data() };
    });

    set({
      products: products
    });
  },
  getCartProducts: async (user: any) => {
    /** user */
    const docRefU: any = doc(db, 'users', user.uid);
    const dataUser: any = await getDoc(docRefU);
    const userProducts: any = dataUser.data().products;

    /** products */
    const data: any = await getDocs(colRefProducts);
    const products: any = data.docs;
    const productsInCart: any = [];

    products.map((doc: any, index: number) => {
      userProducts.map((userProduct: any) => {
        if (doc.data().uid === userProduct) {
          if (userProduct) {
            productsInCart.push({
              ...doc.data()
            });
          }
        }
      });
    });

    set({
      productsInCart: productsInCart
    });
  },
  addToCartDB: async (product: any, user: any) => {
    const docRef: any = doc(db, 'products', product.uid);
    const docRefU: any = doc(db, 'users', user.uid);

    updateDoc(docRef, {
      count: product.count - 1
    });

    updateDoc(docRefU, {
      products: arrayUnion(product.uid)
    });

    const data: any = await getDocs(colRefProducts);
    const products: any = data.docs.map((doc: any, index: number) => ({ ...doc.data() }));

    set({
      products: products
    });
  },
  removeFromCartDB: async (product: any, user: any) => {
    /** products */
    const docRef: any = doc(db, 'products', product.uid);

    updateDoc(docRef, {
      count: product.count + 1
    });

    const data: any = await getDocs(colRefProducts);
    const products: any = data.docs.map((doc: any, index: number) => ({ ...doc.data() }));

    set({
      products: products
    });

    /** user and cart Products of user */
    const docRefU: any = doc(db, 'users', user.uid);
    const dataUser: any = await getDoc(docRefU);
    const userProducts: any = dataUser.data().products;
    const deleteProductFromCart: any = userProducts.filter(
      (userProduct: any) => userProduct !== product.uid
    );

    updateDoc(docRefU, {
      products: deleteProductFromCart
    });

    set({
      productsInCart: deleteProductFromCart
    });
  },
  applyPayment: (products: any, user: any) => {
    const docRefU: any = doc(db, 'users', user.uid);

    updateDoc(docRefU, {
      products: []
    });

    set({
      productsInCart: []
    });
  }
}));

/** Export User Store */
export default useStore;
