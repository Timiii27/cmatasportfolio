export interface Project {
  slug: string;
  category: "web" | "product" | "fashion" | "graphic";
  titleKey: string;
  descriptionKey: string;
  images: string[];
  gridLayout:
    | "bombay"
    | "perfume"
    | "tableware"
    | "luccica"
    | "raices"
    | "aura"
    | "coleccion"
    | "diamantes";
}

export interface Category {
  slug: string;
  nameKey: string;
  projects: Project[];
}

export const projects: Project[] = [
  // Product Design
  {
    slug: "bombay",
    category: "product",
    titleKey: "project.bombay.title",
    descriptionKey: "project.bombay.description",
    images: [
      "/projects/product/bombay/1.jpg",
      "/projects/product/bombay/2.jpg",
      "/projects/product/bombay/3.jpg",
      "/projects/product/bombay/4.jpg",
    ],
    gridLayout: "bombay",
  },
  {
    slug: "perfume",
    category: "product",
    titleKey: "project.perfume.title",
    descriptionKey: "project.perfume.description",
    images: [
      "/projects/product/perfume/1.jpg",
      "/projects/product/perfume/2.jpg",
      "/projects/product/perfume/3.jpg",
    ],
    gridLayout: "perfume",
  },
  {
    slug: "tableware",
    category: "product",
    titleKey: "project.tableware.title",
    descriptionKey: "project.tableware.description",
    images: [
      "/projects/product/tableware/1.jpg",
      "/projects/product/tableware/2.jpg",
      "/projects/product/tableware/3.jpg",
      "/projects/product/tableware/4.jpg",
    ],
    gridLayout: "tableware",
  },

  // Fashion Design
  {
    slug: "luccica",
    category: "fashion",
    titleKey: "project.luccica.title",
    descriptionKey: "project.luccica.description",
    images: [
      "/projects/fashion/luccica/1.jpg",
      "/projects/fashion/luccica/2.jpg",
      "/projects/fashion/luccica/3.jpg",
      "/projects/fashion/luccica/4.jpg",
      "/projects/fashion/luccica/5.jpg",
      "/projects/fashion/luccica/6.jpg",
    ],
    gridLayout: "luccica",
  },
  {
    slug: "raices",
    category: "fashion",
    titleKey: "project.raices.title",
    descriptionKey: "project.raices.description",
    images: [
      "/projects/fashion/raices/1.jpg",
      "/projects/fashion/raices/2.jpg",
      "/projects/fashion/raices/3.jpg",
      "/projects/fashion/raices/4.jpg",
      "/projects/fashion/raices/5.jpg",
      "/projects/fashion/raices/6.jpg",
    ],
    gridLayout: "raices",
  },
  {
    slug: "coleccion",
    category: "fashion",
    titleKey: "project.coleccion.title",
    descriptionKey: "project.coleccion.description",
    images: [
      "/projects/fashion/coleccion/1.jpg",
      "/projects/fashion/coleccion/2.jpg",
      "/projects/fashion/coleccion/3.jpg",
      "/projects/fashion/coleccion/4.jpg",
      "/projects/fashion/coleccion/5.jpg",
    ],
    gridLayout: "coleccion",
  },

  // Graphic Design
  {
    slug: "aura",
    category: "graphic",
    titleKey: "project.aura.title",
    descriptionKey: "project.aura.description",
    images: [
      "/projects/graphic/aura/1.jpg",
      "/projects/graphic/aura/2.jpg",
      "/projects/graphic/aura/3.jpg",
      "/projects/graphic/aura/4.jpg",
    ],
    gridLayout: "aura",
  },
  {
    slug: "diamantes",
    category: "graphic",
    titleKey: "project.diamantes.title",
    descriptionKey: "project.diamantes.description",
    images: [
      "/projects/graphic/diamantes/1.jpg",
      "/projects/graphic/diamantes/2.jpg",
      "/projects/graphic/diamantes/3.jpg",
      "/projects/graphic/diamantes/4.jpg",
    ],
    gridLayout: "diamantes",
  },
];

export const categories: Category[] = [
  {
    slug: "web",
    nameKey: "category.web",
    projects: [],
  },
  {
    slug: "product",
    nameKey: "category.product",
    projects: projects.filter((p) => p.category === "product"),
  },
  {
    slug: "fashion",
    nameKey: "category.fashion",
    projects: projects.filter((p) => p.category === "fashion"),
  },
  {
    slug: "graphic",
    nameKey: "category.graphic",
    projects: projects.filter((p) => p.category === "graphic"),
  },
];

export function getProject(
  category: string,
  slug: string,
): Project | undefined {
  return projects.find((p) => p.category === category && p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getNextProject(currentProject: Project): Project | undefined {
  const categoryProjects = projects.filter(
    (p) => p.category === currentProject.category,
  );
  const currentIndex = categoryProjects.findIndex(
    (p) => p.slug === currentProject.slug,
  );
  return categoryProjects[currentIndex + 1] || categoryProjects[0];
}

export function getPreviousProject(
  currentProject: Project,
): Project | undefined {
  const categoryProjects = projects.filter(
    (p) => p.category === currentProject.category,
  );
  const currentIndex = categoryProjects.findIndex(
    (p) => p.slug === currentProject.slug,
  );
  return (
    categoryProjects[currentIndex - 1] ||
    categoryProjects[categoryProjects.length - 1]
  );
}
