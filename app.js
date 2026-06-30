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
  apiKey: "YOUR_API_KEY",
  authDomain: "jharkhand-jobs-solution-47382.firebaseapp.com",
  projectId: "jharkhand-jobs-solution-47382",
  storageBucket: "jharkhand-jobs-solution-47382.appspot.com",
  messagingSenderId: "155478614596",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let isAdmin = false;

async function renderJobs() {
  const list = document.getElementById("jobList");
  if (!list) return;

  list.innerHTML = "";

  const snap = await getDocs(collection(db, "jobs"));

  snap.forEach((d) => {
    const job = d.data();

    list.innerHTML += `
      <div class="job">
        <h3>${job.title}</h3>
        <h3>${job.title}</h3>
<p>${job.desc}</p>

<p><b>Salary:</b> ${job.salary}</p>
<p><b>Location:</b> ${job.location}</p>

<button onclick="document.getElementById('applyForm').scrollIntoView({behavior:'smooth'})">
Apply
</button>
        <button onclick="document.getElementById('applyForm').scrollIntoView({behavior:'smooth'})">Apply</button>
        ${
          isAdmin
            ? `<button onclick="deleteJob('${d.id}')">Delete</button>`
            : ""
        }
      </div>
    `;
  });
}// ADD JOB
window.addJob = async function () {
  const title = document.getElementById("jobTitle").value;
  const desc = document.getElementById("jobDesc").value;

  if (!title) {
    alert("Job title required");
    return;
  }

  await addDoc(collection(db, "jobs"), {
    title,
    desc
  });

  document.getElementById("jobTitle").value = "";
  document.getElementById("jobDesc").value = "";

  renderJobs();
};

// DELETE JOB
window.deleteJob = async function (id) {
  await deleteDoc(doc(db, "jobs", id));
  renderJobs();
};

// APPLY FORM
const form = document.getElementById("applyForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "applications"), {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      skills: document.getElementById("skills").value,
      createdAt: new Date()
    });

    alert("Application Submitted Successfully!");
    form.reset();
  });
}

// ADMIN LOGIN
window.loginAdmin = function () {
  const pass = document.getElementById("pass").value;

  if (pass === "admin123") {
    isAdmin = true;
    document.getElementById("adminForm").style.display = "block";
    alert("Admin Login Success");
    renderJobs();
  } else {
    alert("Wrong Password");
  }
};

// LOGOUT
window.logoutAdmin = function () {
  isAdmin = false;
  document.getElementById("adminForm").style.display = "none";
  renderJobs();
};

renderJobs();
