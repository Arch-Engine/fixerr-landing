// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-storage.js";

// Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCh1RX8BSAtgGULDXEU-7RlFYPLru4THEI",
  authDomain: "fixerrappsa.firebaseapp.com",
  projectId: "fixerrappsa",
  storageBucket: "fixerrappsa.appspot.com",
  messagingSenderId: "397397274379",
  appId: "1:397397274379:web:17abd46ef77c70114f7c0e",
  measurementId: "G-FQTG8V7LB2"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Get form
const form = document.getElementById("bookingForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const device = form.device.value.trim();
    const file = form.file.files[0];

    try {
      // Upload file to Firebase Storage
      const filePath = `uploads/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, filePath);
      await uploadBytes(storageRef, file);

      // Save form data to Firestore
      await addDoc(collection(db, "bookings"), {
        name,
        email,
