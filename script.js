import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCh1RX8BSAtgGULDXEU-7RlFYPLru4THEI",
  authDomain: "fixerrappsa.firebaseapp.com",
  projectId: "fixerrappsa",
  storageBucket: "fixerrappsa.appspot.com",
  messagingSenderId: "397397274379",
  appId: "1:397397274379:web:17abd46ef77c70114f7c0e",
  measurementId: "G-FQTG8V7LB2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Form handling
document.getElementById("booking-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const item = document.getElementById("item").value.trim();
  const location = document.getElementById("location").value;
  const file = document.getElementById("file").files[0];

  try {
    const bookingRef = await addDoc(collection(db, "bookings"), {
      name,
      email,
      item,
      location,
      timestamp: new Date()
    });

    if (file) {
      const fileRef = ref(storage, `uploads/${bookingRef.id}/${file.name}`);
      await uploadBytes(fileRef, file);
    }

    document.getElementById("booking-form").reset();
    document.getElementById("confirmation").style.display = "block";
  } catch (error) {
    console.error("Error submitting booking:", error);
    alert("Something went wrong. Please try again.");
  }
});
