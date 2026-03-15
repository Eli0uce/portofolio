document.addEventListener("DOMContentLoaded", function () {
  var navToggle = document.getElementById("nav-toggle");
  var navContent = document.getElementById("nav-content");
  var siteHeader = document.getElementById("site-header");
  var yearNode = document.getElementById("year");
  var revealTargets = document.querySelectorAll(".reveal");

  if (yearNode) {
	yearNode.textContent = String(new Date().getFullYear());
  }

  if (navToggle && navContent) {
	navToggle.addEventListener("click", function () {
	  var isOpen = navContent.classList.toggle("is-open");
	  navToggle.setAttribute("aria-expanded", String(isOpen));
	});

	navContent.querySelectorAll("a").forEach(function (link) {
	  link.addEventListener("click", function () {
		navContent.classList.remove("is-open");
		navToggle.setAttribute("aria-expanded", "false");
	  });
	});
  }

  var updateHeaderState = function () {
	if (!siteHeader) {
	  return;
	}
	if (window.scrollY > 18) {
	  siteHeader.classList.add("is-scrolled");
	} else {
	  siteHeader.classList.remove("is-scrolled");
	}
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  if ("IntersectionObserver" in window) {
	var observer = new IntersectionObserver(
	  function (entries) {
		entries.forEach(function (entry) {
		  if (entry.isIntersecting) {
			entry.target.classList.add("in-view");
			observer.unobserve(entry.target);
		  }
		});
	  },
	  { threshold: 0.14 }
	);

	revealTargets.forEach(function (node) {
	  observer.observe(node);
	});
  } else {
	revealTargets.forEach(function (node) {
	  node.classList.add("in-view");
	});
  }
});
