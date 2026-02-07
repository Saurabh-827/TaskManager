const API_BASE_URL = "https://taskmanager-backend-kn46.onrender.com/api";
const token = localStorage.getItem("token");

if (!token) {
	window.location.href = "index.html";
}

// Edit task
function editTask(id) {
	fetch(`${API_BASE_URL}/tasks/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	})
		.then((res) => res.json())
		.then((data) => {
			const task = data.data;

			document.getElementById("title").value = task.title;
			document.getElementById("description").value = task.description || "";
			document.getElementById("priority").value = task.priority;
			document.getElementById("status").value = task.status;
			document.getElementById("due_date").value = task.due_date
				? task.due_date.split("T")[0]
				: "";

			const form = document.getElementById("taskForm");
			const submitBtn = form.querySelector('button[type="submit"]');
			submitBtn.textContent = "Update Task";
			submitBtn.onclick = (e) => updateTask(e, id);

			if (!document.getElementById("cancelBtn")) {
				const cancelBtn = document.createElement("button");
				cancelBtn.id = "cancelBtn";
				cancelBtn.type = "button";
				cancelBtn.className = "btn btn-secondary";
				cancelBtn.textContent = "Cancel";
				cancelBtn.onclick = resetForm;
				submitBtn.after(cancelBtn);
			}
		});
}

// Update task
async function updateTask(event, id) {
	event.preventDefault();

	const title = document.getElementById("title").value;
	const description = document.getElementById("description").value;
	const priority = document.getElementById("priority").value;
	const status = document.getElementById("status").value;
	const due_date = document.getElementById("due_date").value;

	try {
		const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ title, description, priority, status, due_date }),
		});

		if (res.ok) {
			resetForm();
			fetchTasks();
		}
	} catch (err) {
		console.error("Error updating task:", err);
	}
}

// Reset form
function resetForm() {
	const form = document.getElementById("taskForm");
	form.reset();
	form.onsubmit = addTask;

	const submitBtn = form.querySelector('button[type="submit"]');
	submitBtn.textContent = "Add Task";
	submitBtn.onclick = null;

	const cancelBtn = document.getElementById("cancelBtn");
	if (cancelBtn) cancelBtn.remove();
}

// Fetch and display tasks
async function fetchTasks() {
	try {
		const res = await fetch(`${API_BASE_URL}/tasks`, {
			headers: { Authorization: `Bearer ${token}` },
		});

		const data = await res.json();
		const taskList = document.getElementById("taskList");
		taskList.innerHTML = "";

		if (data.data.length === 0) {
			taskList.innerHTML = "<p>No tasks yet. Create your first task!</p>";
			return;
		}

		data.data.forEach((task) => {
			const taskItem = document.createElement("div");
			taskItem.className = "task-item";
			taskItem.innerHTML = `
                <div class="task-info">
                    <h3>${task.title}</h3>
                    <p>${task.description || "No description"}</p>
                    <div class="task-meta">
                        <span class="badge badge-priority-${task.priority}">${
				task.priority
			}</span>
                        <span class="badge badge-status">${task.status.replace(
													"_",
													" "
												)}</span>
                        ${
													task.due_date
														? `<span class="badge">Due: ${new Date(
																task.due_date
														  ).toLocaleDateString()}</span>`
														: ""
												}
                    </div>
                </div>
               <div class="task-actions">
    <button onclick="editTask('${
			task.id
		}')" class="btn btn-edit btn-small">Edit</button>
    <button onclick="deleteTask('${
			task.id
		}')" class="btn btn-danger btn-small">Delete</button>
</div>


                </div>
            `;
			taskList.appendChild(taskItem);
		});
	} catch (err) {
		console.error("Error fetching tasks:", err);
	}
}

// Add new task
async function addTask(event) {
	event.preventDefault();

	const title = document.getElementById("title").value;
	const description = document.getElementById("description").value;
	const priority = document.getElementById("priority").value;
	const status = document.getElementById("status").value;
	const due_date = document.getElementById("due_date").value;

	try {
		const res = await fetch(`${API_BASE_URL}/tasks`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ title, description, priority, status, due_date }),
		});

		if (res.ok) {
			document.getElementById("taskForm").reset();
			fetchTasks();
		}
	} catch (err) {
		console.error("Error adding task:", err);
	}
}

// Delete task
async function deleteTask(id) {
	if (!confirm("Are you sure you want to delete this task?")) return;

	try {
		await fetch(`${API_BASE_URL}/tasks/${id}`, {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` },
		});
		fetchTasks();
	} catch (err) {
		console.error("Error deleting task:", err);
	}
}

// Logout
function logout() {
	localStorage.removeItem("token");
	window.location.href = "index.html";
}

fetchTasks();
