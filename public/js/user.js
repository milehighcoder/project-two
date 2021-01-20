document.addEventListener("DOMContentLoaded", (e) => {
  const firstNameField = document.getElementById("update-first-name");
  const lastNameField = document.getElementById("update-last-name");
  const phoneNumberField = document.getElementById("update-phone");
  const emailField = document.getElementById("update-email");

  const currentPasswordField = document.getElementById("current-password");
  const newPasswordField = document.getElementById("new-password");
  const confirmNewPasswordField = document.getElementById(
    "confirm-new-password"
  );

  let userId;

  const showUpdateProfileButton = document.getElementById(
    "show-update-profile-button"
  );
  const updateProfileButton = document.getElementById("update-profile-button");
  const updatePasswordButton = document.getElementById(
    "update-password-button"
  );
  const changePasswordModalCloseButton = document.getElementById(
    "change-password-modal-close-btn"
  );

  const getUserDetails = () => {
    fetch("/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem("token"),
      },
    })
      .then((response) => {
        console.log("Response Status: ", response.status);
        if (response.status === 200) {
          return response.json();
        } else {
          console.log("Throwing Error");
          throw new Error("UnAuthorized");
        }
      })
      .then((data) => {
        console.log("data: ", data);
        const { first_name, last_name, email, phone, userId: id } = data;
        console.log(
          firstNameField,
          lastNameField,
          phoneNumberField,
          emailField
        );
        firstNameField.value = first_name;
        lastNameField.value = last_name;
        phoneNumberField.value = phone;
        emailField.value = email;
        userId = id;
        document.getElementById("manager-name-container").innerText =
          first_name + " " + last_name;
      })
      .catch((error) => {
        if (error.message === "UnAuthorized") {
          location.href = "/";
        }
      });
  };

  const updateUserDetails = () => {
    const first_name = firstNameField.value;
    const last_name = lastNameField.value;
    const phone = phoneNumberField.value;
    const email = emailField.value;

    fetch("/updateDetails", {
      method: "POST",
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        phone,
        userId,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-token": localStorage.getItem("token"),
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
        alert(data.message);
      })
      .catch((error) => (location.href = "/"));
    window.location.href = "/portal";
  };

  const resetPasswordForm = () => {
    currentPasswordField.value = null;
    newPasswordField.value = null;
    confirmNewPasswordField.value = null;
    currentPasswordField.focus();
  };

  const changePassword = () => {
    const oldPassword = currentPasswordField.value;
    const newPassword = newPasswordField.value;
    const confirmNewPassword = confirmNewPasswordField.value;

    if (oldPassword && newPassword && confirmNewPassword) {
      if (newPassword !== confirmNewPassword) {
        alert("New Password and Confirm New Password don't match");
        resetPasswordForm();
        return;
      }

      fetch("/changePassword", {
        method: "POST",
        body: JSON.stringify({
          oldPassword,
          newPassword,
          userId,
        }),
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
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
          alert(data.message);
          changePasswordModalCloseButton.click();
        })
        .catch((error) => {
          alert(error.message);
          resetPasswordForm();
          return;
        });
    } else {
      alert("Please make sure to fill in all the details");
      resetPasswordForm();
      return;
    }
    window.location.href = "/portal";
  };

  // showUpdateProfileButton.addEventListener("click", );
  getUserDetails();
  updateProfileButton.addEventListener("click", updateUserDetails);
  updatePasswordButton.addEventListener("click", changePassword);
});
