// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
const openModal = () => {
  console.log("hello");
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
const closeModal = () => {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const handleLogin = async () => {
  const username = (document.getElementById("ip-username")).value;
  const password = (document.getElementById("ip-password")).value;

  const err_us = document.getElementById("err-username");
  const err_pw = document.getElementById("err-password");
  err_us.innerHTML = "";
  err_pw.innerHTML = "";
  console.log("username", username);
  console.log("password", password);
  if (!password) {
    err_pw.innerHTML = "Password empty";
  }
  if (!username) {
    err_us.innerHTML = "Username empty";
  }
  // call api
  const res = await basePost({
    uri: "user/login",
    auth: false,
    body: { username, password },
  });
  console.log("res", { res });
  // save token
  if (res?.access_token) {
    localStorage.setItem("access_token", res.access_token);
    localStorage.setItem("refresh_token", res.refresh_token);
    closeModal();
  } else {
    err_pw.innerHTML = "Login fail" + res;
  }
};
