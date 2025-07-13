import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCh1RX8BSAtgGULDXEU-7RlFYPLru4THEI",
  authDomain: "fixerrappsa.firebaseapp.com",
  projectId: "fixerrappsa",
  storageBucket: "fixerrappsa.appspot.com",
  messagingSenderId: "397397274379",
  appId: "1:397397274379:web:17abd46ef77c70114f7c0e",
  measurementId: "G-FQTG8V7LB2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  if (!form) return console.error("⛔ Form not found!");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("✅ Form submitted");

    const name = form.name.value;
    const email = form.email.value;
    const location = form.location.value;
    const device = form.device.value;
    const file = form.file.files[0];

    console.log({ name, email, location, device, file });

    try {
      let fileURL = "";
      if (file) {
        const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
        const uploadResult = await uploadBytes(storageRef, file);
        fileURL = await getDownloadURL(uploadResult.ref);
        console.log("📁 File uploaded:", fileURL);
      }

      const docRef = await addDoc(collection(db, "bookings"), {
        name,
        email,
        location,
        device,
        fileURL,
        timestamp: new Date().toISOString()
      });

      console.log("📦 Booking added to Firestore:", docRef.id);
      alert("Booking successful!");
      form.reset();
    } catch (err) {
      console.error("❌ Firebase error:", err);
      alert("Error submitting booking.");
    }
  });
});
