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

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.firestore();

// Form logic
document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const item = document.getElementById("item").value;
  const file = document.getElementById("photo").files[0];

  try {
    const storageRef = storage.ref('uploads/' + file.name);
    await storageRef.put(file);
    const photoURL = await storageRef.getDownloadURL();

    await db.collection("bookings").add({
      name,
      item,
      photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    document.getElementById("status").innerText = "✅ Booking submitted!";
    document.getElementById("bookingForm").reset();
  } catch (error) {
    console.error("❌ Booking failed:", error);
    document.getElementById("status").innerText = "❌ Error submitting booking.";
  }
});
