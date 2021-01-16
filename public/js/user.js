// document.addEventListener("DOMContentLoaded", (e) => {
//   const loginButton = document.getElementById("sign-in-form-login-btn");

//   const getUserSchedule = () => {
//     console.log("logging in");
//     const email = document.getElementById("sign-in-form-username").value;
//     const password = document.getElementById("sign-in-form-password").value;
//     fetch("/auth/login", {
//       method: "POST",
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const {
//           token,
//           // user: { isManager },
//           user: email,
//         } = data;
//         localStorage.setItem("token", token);
//         // location.href = isManager ? "/manager" : "/user";
//         location.href = "/portal"
//       });
//   };

//   loginButton.addEventListener("click", (event) => {
//     event.preventDefault();
//     login();
//   });
// });
