# Portfolio V2 Premium

Ce portfolio est en HTML/CSS/JS pur (sans build).  
La section projets est **data-driven** pour ajouter des projets ultra facilement.

## Ajouter un projet en 30 secondes

1. Ouvre `projects-data.js`.
2. Duplique un objet dans `window.PROJECTS`.
3. Mets a jour les champs ci-dessous, puis enregistre.

```js
{
  title: "Mon nouveau projet",
  category: "Etude de cas - SaaS",
  year: "2026",
  description: "Description courte et impactante.",
  image: "img/mon-projet.webp",
  alt: "Apercu Mon projet",
  href: "mon-projet.html",
  cta: "Etude de cas",
  external: false,
  featured: true,
  tags: ["React", "UX", "API"],
}
```

## Champs importants

- `title`: nom du projet
- `category`: categorie visible dans les filtres
- `year`: annee pour le tri
- `description`: resume court
- `image`: visuel de la carte
- `href`: lien (page interne ou externe)
- `external`: `true` si lien externe
- `featured`: met un badge "Featured"
- `tags`: liste de labels techniques

## Lancer en local

Tu peux ouvrir `index.html` directement, ou utiliser un serveur local simple.

```powershell
cd E:\Travail\WorkSpace\2026\portofolio
python -m http.server 8080
```

Puis ouvre `http://localhost:8080`.

