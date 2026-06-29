// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBBinpc369ITfoZ-3Q8-zIczHXnr5SVWvY",
  authDomain: "jharkhand-jobs-solution-47382.firebaseapp.com",
  projectId: "jharkhand-jobs-solution-47382",
  storageBucket: "jharkhand-jobs-solution-47382.firebasestorage.app",
  messagingSenderId: "155478614596",
  appId: "1:155478614596:web:274c4bd34320c858dd1211",
  measurementId: "G-7N6MQGBNDP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase Connected");
// ===== LOAD JOBS =====
async function loadJobs() {
  const jobList = document.getElementById("jobList");
  jobList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "jobs"));

  querySnapshot.forEach((docSnap) => {
    const job = docSnap.data();

    jobList.innerHTML += `
      <div class="job">
        <h3>${job.title}</h3>
        <p>${job.desc}</p>
        ${
          isAdmin
            ? `<button onclick="deleteJob('${docSnap.id}')">Delete</button>`
            : ""
        }
      </div>
    `;
  });
}

// ===== ADD JOB =====
window.addJob = async function () {
  const title = document.getElementById("jobTitle").value;
  const desc = document.getElementById("jobDesc").value;

  if (!title) {
    alert("Job Title Required");
    return;
  }

  await addDoc(collection(db, "jobs"), {
    title: title,
    desc: desc
  });

  document.getElementById("jobTitle").value = "";
  document.getElementById("jobDesc").value = "";

  loadJobs();
};

// ===== DELETE JOB =====
window.deleteJob = async function (id) {
  await deleteDoc(doc(db, "jobs", id));
  loadJobs();
};

loadJobs();
// ===== ADMIN LOGIN =====
let isAdmin = false;

window.loginAdmin = function () {
    const pass = document.getElementById("pass").value;

    if (pass === "admin123") {
        isAdmin = true;
        document.getElementById("adminForm").style.display = "block";
        alert("Admin Login Success");
        loadJobs();
    } else {
        alert("Wrong Password");
    }
};

// ===== LOGOUT =====
window.logoutAdmin = function () {
    isAdmin = false;
    document.getElementById("adminForm").style.display = "none";
    loadJobs();
};
