document.addEventListener("DOMContentLoaded", function () {
  var navToggle = document.getElementById("nav-toggle");
  var navContent = document.getElementById("nav-content");
  var siteHeader = document.getElementById("site-header");
  var yearNode = document.getElementById("year");
  var projectsCountNode = document.getElementById("projects-count");
  var revealTargets = document.querySelectorAll(".reveal");

  if (yearNode) {
	yearNode.textContent = String(new Date().getFullYear());
  }

  var projects = Array.isArray(window.PROJECTS) ? window.PROJECTS.slice() : [];
  var projectsList = document.getElementById("projects-list");
  var projectCardTemplate = document.getElementById("project-card-template");
  var projectFilters = document.getElementById("project-filters");

  var sortProjects = function (list) {
	return list.sort(function (a, b) {
	  if (Boolean(a.featured) !== Boolean(b.featured)) {
		return a.featured ? -1 : 1;
	  }
	  return Number(b.year || 0) - Number(a.year || 0);
	});
  };

  var categories = ["Tous"];
  projects.forEach(function (project) {
	if (project.category && categories.indexOf(project.category) === -1) {
	  categories.push(project.category);
	}
  });

  var renderProjects = function (category) {
	if (!projectsList || !projectCardTemplate) {
	  return;
	}

	projectsList.innerHTML = "";

	var activeCategory = category || "Tous";
	var filtered = sortProjects(
	  projects.filter(function (project) {
		return activeCategory === "Tous" || project.category === activeCategory;
	  })
	);

	filtered.forEach(function (project) {
	  var fragment = projectCardTemplate.content.cloneNode(true);
	  var card = fragment.querySelector(".project-card");
	  var image = fragment.querySelector(".project-media");
	  var badge = fragment.querySelector(".project-featured-badge");
	  var title = fragment.querySelector(".project-title");
	  var year = fragment.querySelector(".project-year");
	  var categoryNode = fragment.querySelector(".project-category");
	  var description = fragment.querySelector(".project-description");
	  var tags = fragment.querySelector(".project-tags");
	  var link = fragment.querySelector(".project-link");

	  image.src = project.image || "";
	  image.alt = project.alt || project.title || "Projet";
	  title.textContent = project.title || "Projet";
	  year.textContent = project.year || "";
	  categoryNode.textContent = project.category || "Projet";
	  description.textContent = project.description || "";

	  if (Array.isArray(project.tags)) {
		project.tags.forEach(function (tag) {
		  var tagNode = document.createElement("span");
		  tagNode.textContent = tag;
		  tags.appendChild(tagNode);
		});
	  }

	  link.href = project.href || "#";
	  link.textContent = project.cta || "Voir le projet";
	  if (project.external) {
		link.target = "_blank";
		link.rel = "noreferrer";
	  }

	  if (!project.featured) {
		badge.remove();
	  } else {
		card.classList.add("is-featured");
	  }

	  projectsList.appendChild(fragment);
	});
  };

  if (projectsCountNode) {
	projectsCountNode.textContent = String(projects.length) + "+";
  }

  if (projectFilters && categories.length > 0) {
	var setActiveFilter = function (value) {
	  projectFilters.querySelectorAll("button").forEach(function (button) {
		var isActive = button.getAttribute("data-filter") === value;
		button.classList.toggle("is-active", isActive);
	  });
	};

	categories.forEach(function (category) {
	  var button = document.createElement("button");
	  button.type = "button";
	  button.className = "filter-chip";
	  button.setAttribute("data-filter", category);
	  button.textContent = category;
	  button.addEventListener("click", function () {
		renderProjects(category);
		setActiveFilter(category);
	  });
	  projectFilters.appendChild(button);
	});

	setActiveFilter("Tous");
  }

  renderProjects("Tous");

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
