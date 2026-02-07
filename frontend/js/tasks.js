const API_BASE_URL = "https://taskmanager-backend-kn46.onrender.com/api";
const token = localStorage.getItem("token");

if (!token) {
	window.location.href = "index.html";
}

async function fetchTasks() {
	const res = await fetch(`${API_BASE_URL}/tasks`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await res.json();
	const list = document.getElementById("taskList");
	list.innerHTML = "";

	data.data.forEach((task) => {
		const li = document.createElement("li");
		li.textContent = task.title;

		const delBtn = document.createElement("button");
		delBtn.textContent = "Delete";
		delBtn.onclick = () => deleteTask(task.id);

		li.appendChild(delBtn);
		list.appendChild(li);
	});
}

async function addTask() {
	const title = document.getElementById("title").value;

	if (!title) return;

	await fetch(`${API_BASE_URL}/tasks`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ title }),
	});

	document.getElementById("title").value = "";
	fetchTasks();
}

async function deleteTask(id) {
	await fetch(`${API_BASE_URL}/tasks/${id}`, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	fetchTasks();
}

fetchTasks();
