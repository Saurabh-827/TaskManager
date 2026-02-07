const API_BASE_URL = "https://taskmanager-backend-kn46.onrender.com/api";

async function register(event) {
	event.preventDefault();

	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const role = document.getElementById("role").value;
	const errorEl = document.getElementById("error");
	const successEl = document.getElementById("success");

	errorEl.textContent = "";
	successEl.textContent = "";

	try {
		const res = await fetch(`${API_BASE_URL}/auth/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, email, password, role }),
		});

		const data = await res.json();

		if (!res.ok) {
			errorEl.textContent = data.message || "Registration failed";
			return;
		}

		successEl.textContent = "Registration successful! Redirecting to login...";
		setTimeout(() => {
			window.location.href = "index.html";
		}, 2000);
	} catch (err) {
		errorEl.textContent = "Server error. Please try again.";
	}
}
