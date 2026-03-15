document.addEventListener("DOMContentLoaded", function () {
  var navToggle = document.getElementById("nav-toggle");
  var navContent = document.getElementById("nav-content");
  var siteHeader = document.getElementById("site-header");
  var yearNode = document.getElementById("year");
  var revealTargets = document.querySelectorAll(".reveal");
  var prefersReducedMotion =
	window.matchMedia &&
	window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (yearNode) {
	yearNode.textContent = String(new Date().getFullYear());
  }

  if (!prefersReducedMotion) {
	revealTargets.forEach(function (node, index) {
	  node.style.transitionDelay = String(Math.min(index * 80, 320)) + "ms";
	});

	document.querySelectorAll(".glass-card").forEach(function (card) {
	  var rafId = null;

	  card.addEventListener("mousemove", function (event) {
		if (rafId) {
		  return;
		}
		rafId = window.requestAnimationFrame(function () {
		  var rect = card.getBoundingClientRect();
		  var x = ((event.clientX - rect.left) / rect.width) * 100;
		  var y = ((event.clientY - rect.top) / rect.height) * 100;
		  card.style.setProperty("--pointer-x", x.toFixed(2) + "%");
		  card.style.setProperty("--pointer-y", y.toFixed(2) + "%");
		  rafId = null;
		});
	  });

	  card.addEventListener("mouseenter", function () {
		card.classList.add("is-hovered");
	  });

	  card.addEventListener("mouseleave", function () {
		card.classList.remove("is-hovered");
		card.style.removeProperty("--pointer-x");
		card.style.removeProperty("--pointer-y");
	  });
	});
  }

  if (navToggle && navContent) {
	var closeMenu = function () {
	  navContent.classList.remove("is-open");
	  navToggle.setAttribute("aria-expanded", "false");
	};

	navToggle.addEventListener("click", function () {
	  var isOpen = navContent.classList.toggle("is-open");
	  navToggle.setAttribute("aria-expanded", String(isOpen));
	});

	navContent.querySelectorAll("a").forEach(function (link) {
	  link.addEventListener("click", closeMenu);
	});

	document.addEventListener("click", function (event) {
	  var clickedOutsideMenu =
		!navContent.contains(event.target) && !navToggle.contains(event.target);
	  if (clickedOutsideMenu) {
		closeMenu();
	  }
	});

	document.addEventListener("keydown", function (event) {
	  if (event.key === "Escape") {
		closeMenu();
	  }
	});

	window.addEventListener("resize", function () {
	  if (window.innerWidth > 900) {
		closeMenu();
	  }
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
