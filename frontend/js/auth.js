const API_BASE_URL = "https://taskmanager-backend-kn46.onrender.com/api";

async function login(event) {
	event.preventDefault();

	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const errorEl = document.getElementById("error");

	errorEl.textContent = "";

	try {
		const res = await fetch(`${API_BASE_URL}/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});

		const data = await res.json();

		if (!res.ok) {
			errorEl.textContent = data.message || "Login failed";
			return;
		}

		localStorage.setItem("token", data.data.token);
		window.location.href = "dashboard.html";
	} catch (err) {
		errorEl.textContent = "Server error. Please try again.";
	}
}
