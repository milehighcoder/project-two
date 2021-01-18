const firstNameField = document.getElementById("update-first-name");
const lastNameField = document.getElementById("update-last-name");
const phoneNumberField = document.getElementById("update-phone");
const emailField = document.getElementById("update-email");
let userId;

const showUpdateProfileButton = document.getElementById(
  "show-update-profile-button"
);
const updateProfileButton = document.getElementById("update-profile-button");

const getUserDetails = () => {
  fetch("/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-token": localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data: ", data);
      const { first_name, last_name, email, phone, userId: id } = data;
      firstNameField.value = first_name;
      // lastNameField.value = last_name;
      // phoneNumberField.value = phone;
      // emailField.value = email;
      userId = id;
      document.getElementById("manager-name-container").innerText =
        first_name + " " + last_name;
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
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
    });
};

// showUpdateProfileButton.addEventListener("click", );
getUserDetails();
updateProfileButton.addEventListener("click", updateUserDetails);
