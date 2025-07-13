document.getElementById("fixerrForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const itemType = document.getElementById("itemType").value;
  const file = document.getElementById("photo").files[0];

  try {
    // Upload photo to Firebase Storage
    const storageRef = firebase.storage().ref('uploads/' + file.name);
    await storageRef.put(file);
    const photoURL = await storageRef.getDownloadURL();

    // Save form data to Firestore
    await firebase.firestore().collection("bookings").add({
      name,
      phone,
      address,
      itemType,
      photoURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert("✅ Booking submitted successfully!");
    document.getElementById("fixerrForm").reset();
  } catch (error) {
    console.error("❌ Error submitting booking:", error);
    alert("Something went wrong. Please try again.");
  }
});
