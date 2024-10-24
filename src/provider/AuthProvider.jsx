import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
    signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/Firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);

export default function AuthProvider({ children }) {
	const [user, setUser] = useState([]);
	const [dbUser, setDbUser] = useState([]);
	const [loading, setLoading] = useState(true);

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const googleSignIn = (provider) => {
		setLoading(true);
		return signInWithPopup(auth, provider);
	};

	const githubSignIn = (provider) => {
		setLoading(true);
		return signInWithPopup(auth, provider);
	};

	const updateUserProfile = (profile) => {
		setLoading(true);
        return updateProfile(auth.currentUser, profile);
    }

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	const getUserFromDb = async(firebaseUser)=>{
		const url = `${import.meta.env.VITE_BACKEND_USER_BY_UID_URL}/${firebaseUser.uid}`;
		console.log("User from db url: ", url);
		const user = await fetch(url)
					.then((res)=>res.json())
					.then((data)=>{
						// console.log("User data from DB: ", data);
						return data;
					})
					.catch((err)=>{
						console.log("Error: ", err);
						return null;
					});
		return user;
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
			console.log(currentUser);
			setUser(currentUser);
			const userFromDb = await getUserFromDb(currentUser);
			console.log("User data from DB: ", userFromDb);
			setDbUser(userFromDb);
			setLoading(false);
		});
		return () => {
			unsubscribe();
		};
	}, []);
	const authInfo = {
		user,
		dbUser,
		loading,
		createUser,
		signIn,
		googleSignIn,
		githubSignIn,
		updateUserProfile,
		logOut,
	};
	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
}
