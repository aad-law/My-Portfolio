
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// Hardcoded config - double check these values!
const firebaseConfig = {
    apiKey: "AIzaSyAuxOfVxVoriPyVWtX6mjEhZ6_LuijiCbI",
    authDomain: "aadlaw-f55d9.firebaseapp.com",
    projectId: "aadlaw-f55d9",
    storageBucket: "aadlaw-f55d9.firebasestorage.app",
    messagingSenderId: "709218674050",
    appId: "1:709218674050:web:e42f0c8db26c14caf51b9b"
};

console.log("Initializing Firebase with project:", firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testConnection() {
    console.log("--- Starting Connection Test ---");

    // 1. Try to read a non-existent document (should succeed if connection/rules work)
    try {
        console.log("1. Testing Read...");
        const docRef = doc(db, "debug", "test_read");
        const docSnap = await getDoc(docRef);
        console.log("   Read successful! Exists:", docSnap.exists());
    } catch (e) {
        console.error("   Read FAILED:", e.message);
    }

    // 2. Try to write a simple document
    try {
        console.log("2. Testing Write (Simple)...");
        await setDoc(doc(db, "debug", "test_write"), {
            timestamp: new Date().toISOString(),
            msg: "Hello Firestore"
        });
        console.log("   Write successful!");
    } catch (e) {
        console.error("   Write FAILED:", e.message);
    }

    console.log("--- Test Complete ---");
}

testConnection()
    .then(() => {
        console.log("Script finished.");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Script crashed:", err);
        process.exit(1);
    });
