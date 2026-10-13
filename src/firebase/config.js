import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  setDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp,
  deleteDoc
} from 'firebase/firestore';
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { INITIAL_PRODUCTS, INITIAL_USER_SEED } from './initialSeed';
import { compressImage } from '../utils/imageCompressor';

// Production Firebase Configuration for Project 'kampusthrift' (100% Spark Plan Free Compatible)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBVhOwdyog2vCqMYl2kGZbG2GNze1rGMSE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kampusthrift.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kampusthrift",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kampusthrift.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "742229495801",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:742229495801:web:e4c426a82a566d49143728",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-HZLSBNYBEZ"
};

// Initialize Firebase App, Firestore Database & Auth
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Configure Firebase Auth to use Permanent Browser Local Persistence
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn("Firebase Auth persistence config warning:", err);
});

/**
 * 5-Second Timeout Promise Wrapper
 */
export function withTimeout(promise, ms = 5000, errorMsg = 'Firestore Connection Timed Out (5s)') {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(errorMsg));
    }, ms);
  });

  return Promise.race([
    promise.finally(() => clearTimeout(timeoutId)),
    timeoutPromise
  ]);
}

/**
 * Convert & Compress Image File to Base64 String (Client-Side)
 */
export async function convertImageToBase64(imageInput) {
  try {
    const compressedBase64 = await compressImage(imageInput, 800, 800, 0.7);
    return compressedBase64;
  } catch (error) {
    console.warn("Base64 compression fallback:", error);
    return typeof imageInput === 'string' ? imageInput : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
  }
}

/**
 * Save Product Document Directly to Firestore Collection 'products'
 */
export async function saveProductToFirestore(productData) {
  let imageBase64 = productData.images?.[0] || '';
  if (imageBase64 && !imageBase64.startsWith('http') && !imageBase64.startsWith('data:image/jpeg;base64')) {
    imageBase64 = await convertImageToBase64(imageBase64);
  }

  const payload = {
    ...productData,
    images: [imageBase64],
    createdAtServer: serverTimestamp(),
    createdTimestamp: Date.now()
  };

  const firestoreSaveDoc = async () => {
    const productsRef = collection(db, 'products');
    if (productData.id) {
      await setDoc(doc(db, 'products', productData.id), payload, { merge: true });
      return productData.id;
    } else {
      const docRef = await addDoc(productsRef, payload);
      return docRef.id;
    }
  };

  try {
    const docId = await withTimeout(
      firestoreSaveDoc(),
      5000,
      "Timeout 5s menyimpan ke Firestore. Otomatis menyimpan ke LocalStorage."
    );
    syncProductToLocalStorage(payload);
    return docId;
  } catch (error) {
    console.warn("Firestore save fallback to LocalStorage:", error);
    syncProductToLocalStorage(payload);
    return productData.id;
  }
}

function syncProductToLocalStorage(productData) {
  try {
    const localProducts = JSON.parse(localStorage.getItem('kampusthrift_firestore_products') || '[]');
    const updated = [productData, ...localProducts.filter(p => p.id !== productData.id)];
    localStorage.setItem('kampusthrift_firestore_products', JSON.stringify(updated));
  } catch (e) {}
}

/**
 * Delete Product Document from Firestore
 */
export async function deleteProductFromFirestore(productId) {
  try {
    await withTimeout(
      deleteDoc(doc(db, 'products', productId)),
      5000,
      "Timeout 5s deleting from Firestore"
    );
  } catch (error) {
    console.warn("Firestore delete Product fallback:", error);
  } finally {
    try {
      const localProducts = JSON.parse(localStorage.getItem('kampusthrift_firestore_products') || '[]');
      const updated = localProducts.filter(p => p.id !== productId);
      localStorage.setItem('kampusthrift_firestore_products', JSON.stringify(updated));
    } catch (e) {}
  }
}

/**
 * Save User Document to Firestore Collection 'users'
 */
export async function saveUserToFirestore(userData) {
  try {
    const userDocRef = doc(db, 'users', userData.userId || userData.email || `user_${Date.now()}`);
    await withTimeout(
      setDoc(userDocRef, {
        ...userData,
        updatedAtServer: serverTimestamp()
      }, { merge: true }),
      5000,
      "Sync user 5s timeout"
    );
  } catch (error) {
    console.warn("Firestore saveUser warning:", error);
  }
}

/**
 * Subscribe to Firestore Collection 'products' in Real-Time
 */
export function subscribeFirestoreProducts(onUpdate) {
  try {
    const productsQuery = query(collection(db, 'products'), orderBy('createdTimestamp', 'desc'));
    
    return onSnapshot(productsQuery, (snapshot) => {
      if (!snapshot.empty) {
        const firestoreListings = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        const localSaved = JSON.parse(localStorage.getItem('kampusthrift_firestore_products') || '[]');
        const combined = mergeProductsListings(firestoreListings, localSaved);
        onUpdate(combined);
      } else {
        seedFirestoreInitialProducts().then(() => {
          const localSaved = JSON.parse(localStorage.getItem('kampusthrift_firestore_products') || '[]');
          const combined = mergeProductsListings(INITIAL_PRODUCTS, localSaved);
          onUpdate(combined);
        });
      }
    }, (error) => {
      console.warn("Firestore snapshot warning (using LocalStorage backup):", error);
      const savedLocal = JSON.parse(localStorage.getItem('kampusthrift_firestore_products') || 'null');
      onUpdate(savedLocal || INITIAL_PRODUCTS);
    });
  } catch (error) {
    console.warn("Firestore subscription fallback:", error);
    const savedLocal = JSON.parse(localStorage.getItem('kampusthrift_firestore_products') || 'null');
    onUpdate(savedLocal || INITIAL_PRODUCTS);
    return () => {};
  }
}

function mergeProductsListings(firestoreList, localList) {
  const map = new Map();
  localList.forEach(item => map.set(item.id, item));
  firestoreList.forEach(item => map.set(item.id, item));
  return Array.from(map.values()).sort((a, b) => (b.createdTimestamp || 0) - (a.createdTimestamp || 0));
}

async function seedFirestoreInitialProducts() {
  try {
    for (const prod of INITIAL_PRODUCTS) {
      await setDoc(doc(db, 'products', prod.id), {
        ...prod,
        createdTimestamp: Date.now() - Math.floor(Math.random() * 10000000)
      });
    }
    for (const user of INITIAL_USER_SEED) {
      await setDoc(doc(db, 'users', user.userId), user);
    }
  } catch (e) {
    console.warn("Seed Firestore error:", e);
  }
}

export { app, db, auth, onAuthStateChanged, signOut };
