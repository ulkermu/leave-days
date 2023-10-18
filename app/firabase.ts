import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import toast from "react-hot-toast";
import { store } from "./redux/store";
import { loginHandle, logoutHandle } from "./redux/features/auth/authSlice";
import Cookies from "js-cookie";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { setEmployees } from "./redux/features/employee/employeeSlice";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const db = getFirestore(app);

export const signUp = async (email: string, password: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    await user.getIdToken().then((jwt) => Cookies.set("token", jwt));

    const serializableUser = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
    };

    return serializableUser;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    Cookies.remove("token");
    return true;
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const addEmployee = async (data: Object) => {
  try {
    addDoc(collection(db, "employees"), data);
  } catch (error: any) {
    toast.error(error.message);
    console.log(error);
  }
};

interface Employee {
  id: string;
  create_date: string;
  [key: string]: any;
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    const serializableUser = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
    };

    const isTokenExist = Cookies.get("token");

    if (!isTokenExist) {
      user.getIdToken().then((jwt) => {
        Cookies.set("token", jwt);
        window.location.reload();
      });
    }

    onSnapshot(
      query(collection(db, "employees"), where("uid", "==", user.uid)),
      (doc) => {
        const employeesArray: Employee[] = doc.docs.reduce<Employee[]>(
          (employees, employee) => {
            const data = employee.data();

            const { birth_date, start_date, ...restOfData } = data.values;

            const startDateString = start_date.toDate().toISOString();
            const birthDateString = birth_date.toDate().toISOString();
            const createDateString = data.create_date.toDate().toISOString();

            if (
              !(
                start_date.toDate() instanceof Date ||
                birth_date.toDate() instanceof Date ||
                data.create_date.toDate() instanceof Date
              )
            ) {
              console.error(
                "Converted date not a validated date object!",
                start_date.toDate(),
                birth_date.toDate(),
                data.create_date.toDate()
              );
              return employees;
            }

            return [
              ...employees,
              {
                values: {
                  ...restOfData,
                  start_date: startDateString,
                  birth_date: birthDateString,
                },
                id: employee.id,
                create_date: createDateString,
              },
            ];
          },
          []
        );
        store.dispatch(setEmployees(employeesArray));
      }
    );

    store.dispatch(loginHandle(serializableUser));
  } else {
    store.dispatch(logoutHandle());
  }
});

export default app;
