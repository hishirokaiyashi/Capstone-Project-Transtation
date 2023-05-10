import app from "./index.js";
import {
  GoogleAuthProvider,
  EmailAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { store } from "../redux/store.js";
import {
  setUser,
  setLoading,
  setError,
  setToken,
  logout,
} from "../redux/user.slice.js";

import { toast } from "react-toastify";
import axios from "axios";

import { convertFromTimestamp } from "../utils/convertDatetime.js";

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Show toasts already
/**
 * CONSOLE LOG VỀ CÁC RESPONSE PROMISE MỌI FUNCTION MÀ FIREBASE HỖ TRỢ ĐỂ BIẾT
 * NÓ TRẢ VỀ CÁC GÌ -> BIẾT ĐƯỢC CÓ NÊN LƯU DỮ LIỆU NÓ TRẢ VỀ HAY KHÔNG,
 * HOẶC LÀ LƯU DỮ LIỆU GÌ VÀO FIRESTORE
 */

/*** CÁC LỖI BẮT ĐƯỢC BÊN DƯỚI CẦN PHẢI THỬ XEM VÀ THÔNG BÁO RA LỖI CÓ NGHĨA
 * CHO NGƯỜI DÙNG BIẾT, CÓ THỂ LÊN SEARCH MÃ VÀ GIẢI THÍCH RỒI TỰ DÙNG
 * SWITCH CASE VIẾT RA NGỮ NGHĨA ĐÚNG */

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    store.dispatch(setLoading(true));
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      const newUser = {
        uid: user.uid,
        displayName: user.displayName,
        authProvider: "google",
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: "",
        gender: null,
        dateOfBirth: null,
        createdAt: serverTimestamp(),
        userName: user.email,
        photoURL: user.photoURL,
        isVerified: true,
      };
      await setDoc(doc(db, "users", user.uid), newUser);
      const createdAt = convertFromTimestamp(newUser.createdAt);
      store.dispatch(setUser({ ...newUser, createdAt }));
      store.dispatch(setLoading(false));
      store.dispatch(setToken(res.user.accessToken));
      toast.success(`Welcome to Capstone, ${user.displayName}!`);
    } else {
      const userDoc = await getDoc(doc(db, "users", res.user.uid));
      const userData = userDoc.data();
      const createdAt = convertFromTimestamp(userData.createdAt);
      store.dispatch(setUser({ ...userData, createdAt }));
      store.dispatch(setLoading(false));
      store.dispatch(setToken(res.user.accessToken));
      toast.success(`Welcome back to Capstone, ${user.displayName}!`);
    }
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

const checkUserExists = async (user) => {
  // if (user.uid) {
  //    const userDoc = await getDoc(doc(db, "users", user.uid));
  //    console.
  // }
  if (user.userName) {
    const q = query(
      collection(db, "users"),
      where("userName", "==", user.userName)
    );
    const docs = await getDocs(q);
    if (docs.docs.length !== 0) {
      return false;
    }
    return true;
  }

  if (user.email) {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const docs = await getDocs(q);
    if (docs.docs.length !== 0) {
      return false;
    }
    return true;
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    store.dispatch(setLoading(true));
    const res = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", res.user.uid));
    const userData = userDoc.data();

    if (!res.user.emailVerified) {
      signout();
      return "Please verify your email before signing in.";
    }

    if (!userData.isVerified) {
      await updateDoc(doc(db, "users", res.user.uid), {
        isVerified: true,
      });
    }

    const createdAt = convertFromTimestamp(userData.createdAt);
    store.dispatch(setUser({ ...userData, createdAt }));
    store.dispatch(setLoading(false));
    const userToken = await res.user.getIdToken();
    // console.log("user token from login", typeof userToken, userToken);
    store.dispatch(setToken(userToken));
    // return userToken;
    return null;
  } catch (err) {
    // return false;
    return err.message;
  }
};

const logInWithToken = async (token) => {
  try {
    // const res = await signInWithCustomToken(auth, token);
    const verifyToken = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${
      import.meta.env.VITE_FIREBASE_API_KEY
    }`;
    const res = await axios.post(verifyToken, {
      idToken: token,
    });
    if (res.status === 200) {
      const userDoc = await getDoc(doc(db, "users", res.data.users[0].localId));
      return userDoc;
    }
    return res;
  } catch (error) {
    console.error(error);
    toast.error(error);
  }
};

const registerWithEmailAndPassword = async (user, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    // Get created user
    const currentUser = res.user;
    const verify = await sendEmailVerification(currentUser, {
      // url: "http://localhost:5173/login",

      url: "https://capstone-project-transtation.vercel.app/login",
      handleCodeInApp: true,
    });
    // Set a new user to users collection
    await setDoc(doc(db, "users", currentUser.uid), {
      uid: currentUser.uid,
      displayName: user.firstName + " " + user.lastName,
      firstName: user.firstName,
      lastName: user.lastName,
      authProvider: "email",
      email,
      dateOfBirth: user.dateOfBirth,
      createdAt: serverTimestamp(),
      photoURL: user.avatar,
      admin: false,
      isVerified: false,
      idCard: user.idCard,
    });
    toast.success(
      "Please verify your account for logging in Vietnam Road Trip!"
    );
    logout();
  } catch (err) {
    console.error(err);
    toast.error(err.message);
  }
};

// This send to spam section of email
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.error(err);
  }
};

const signout = async () => {
  await signOut(auth);
  store.dispatch(logout());
};

//Update password
const updateProfilePassword = async (currentPassword, newPassword) => {
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    // Re-authenticate the user
    const response = await reauthenticateWithCredential(user, credential);
    toast.success("Your password is updated successfully 😋!");

    // Update the password
    await updatePassword(user, newPassword);
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  logInWithToken,
  checkUserExists,
  registerWithEmailAndPassword,
  sendPasswordReset,
  signout,
  updateProfilePassword,
};
