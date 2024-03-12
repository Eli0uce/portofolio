document.getElementById("nav-toggle").onclick = function () {
  document.getElementById("nav-content").classList.toggle("hidden");
};

new kursor({
  type: 1,
  color: "#fff",
  removeDefaultCursor: true,
});