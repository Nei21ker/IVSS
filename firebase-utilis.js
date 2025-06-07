import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import firebaseConfig from './firebase-config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Firebase Authentication
export const initializeAuth = async (initialAuthToken) => {
    try {
        if (initialAuthToken) {
            const userCredential = await signInWithCustomToken(auth, initialAuthToken);
            return userCredential.user.uid;
        } else {
            const userCredential = await signInAnonymously(auth);
            return userCredential.user.uid;
        }
    } catch (error) {
        console.error("Firebase authentication error:", error);
        return crypto.randomUUID();
    }
};

// Firestore Operations
export const savePatientDailyRecord = async (userId, patientId, date, medicationsStatus, notes) => {
    const dailyRecordRef = doc(db, `artifacts/${appId}/users/${userId}/patientDailyRecords`, `${patientId}_${date}`);
    const dataToSave = {
        patientBedId: patientId,
        date: date,
        medicationsStatus: medicationsStatus,
        dailyNotes: notes
    };
    
    try {
        await setDoc(dailyRecordRef, dataToSave, { merge: true });
        return true;
    } catch (error) {
        console.error("Error saving daily record:", error);
        return false;
    }
};

export const getPatientDailyRecord = async (userId, patientId, date) => {
    const dailyRecordRef = doc(db, `artifacts/${appId}/users/${userId}/patientDailyRecords`, `${patientId}_${date}`);
    try {
        const docSnap = await getDoc(dailyRecordRef);
        if (docSnap.exists()) {
            return docSnap.data();
        }
        return null;
    } catch (error) {
        console.error("Error fetching daily record:", error);
        return null;
    }
};

export const updatePatientMasterData = async (userId, patientId, masterData) => {
    const patientDocRef = doc(db, `artifacts/${appId}/users/${userId}/patients`, patientId);
    try {
        await setDoc(patientDocRef, masterData, { merge: true });
        return true;
    } catch (error) {
        console.error("Error updating patient master data:", error);
        return false;
    }
};

export const getAllPatients = async (userId) => {
    const patientsCollectionRef = collection(db, `artifacts/${appId}/users/${userId}/patients`);
    try {
        const querySnapshot = await getDocs(patientsCollectionRef);
        const patients = [];
        querySnapshot.forEach((doc) => {
            patients.push({ id: doc.id, ...doc.data() });
        });
        return patients;
    } catch (error) {
        console.error("Error fetching all patients:", error);
        return [];
    }
};

export { db, auth }; 