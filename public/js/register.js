// public/js/register.js

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (!response.ok) throw new Error("Registration failed");

    const data = await response.json();
    console.log("Registration successful:", data);

    // Rediriger vers la page de connexion ou connecter directement l'utilisateur
    window.location.href = "/login.html";
  } catch (error) {
    console.error("Error during registration:", error);
    // Afficher un message d'erreur à l'utilisateur
  }
});
