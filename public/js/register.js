document.addEventListener("DOMContentLoaded", (e) => {
  const registerButton = document.getElementById("sign-up-form-register-btn");

  const firstNameField = document.getElementById("sign-up-form-first-name");
  const lastNameField = document.getElementById("sign-up-form-last-name");
  const phoneField = document.getElementById("sign-up-form-phone");
  const emailField = document.getElementById("sign-up-form-email");
  const passwordField = document.getElementById("sign-up-form-password");
  const confirmPasswordField = document.getElementById(
    "sign-up-form-confirm-password"
  );
  const isManagerField = document.getElementById("sign-up-form-is-manager");

  const clearForm = () => {
    firstNameField.value = null;
    lastNameField.value = null;
    phoneField.value = null;
    emailField.value = null;
    passwordField.value = null;
    confirmPasswordField.value = null;
    isManagerField.value = null;
    firstNameField.focus();
  };

  const register = () => {
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;

    if (password !== confirmPassword) {
      alert("Password and Confirm Password don't match");
      passwordField.value = null;
      confirmPasswordField.value = null;
      passwordField.focus();
      return;
    }

    const first_name = firstNameField.value;
    const last_name = lastNameField.value;
    const phone = phoneField.value;
    const email = emailField.value;
    const isManager = isManagerField.checked;

    fetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        first_name,
        last_name,
        phone,
        email,
        password,
        isManager,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          return response.json().then((res) => {
            throw new Error(res.message);
          });
        }
      })
      .then((response) => {
        alert(response.message);
        location.href = "/login";
      })
      .catch((error) => {
        alert(error.message);
        clearForm();
        return;
      });
  };

  registerButton.addEventListener("click", (event) => {
    event.preventDefault();
    register();
  });
});
