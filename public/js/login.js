// public/js/login.js

/* global document, localStorage, window, updateNavigation */

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Login failed");

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      updateNavigation();
      window.location.href = "/";
    } else {
      throw new Error("No token received");
    }
  } catch (error) {
    console.error("Error during login:", error);
    // Afficher un message d'erreur à l'utilisateur
  }
});
