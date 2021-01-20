document.addEventListener("DOMContentLoaded", (e) => {
  const emailField = document.getElementById("sign-in-form-username");
  const passwordField = document.getElementById("sign-in-form-password");
  const loginButton = document.getElementById("sign-in-form-login-btn");

  const clearForm = () => {
    emailField.value = null;
    passwordField.value = null;
    emailField.focus();
  };

  const login = () => {
    const email = emailField.value;
    const password = passwordField.value;
    fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return response.json().then((res) => {
            throw new Error(res.message);
          });
        }
      })
      .then((data) => {
        const {
          token,
          // user: { isManager },
        } = data;
        localStorage.setItem("token", token);
        // location.href = isManager ? "/manager" : "/user";
        location.href = "/portal";
      })
      .catch((error) => {
        alert(error.message);
        clearForm();
        return;
      });
  };

  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    login();
  });
});
