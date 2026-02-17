import { links } from "./links.js";

const pageTemplate = (sideBar, gradientDetail) =>
  `<html>
<head>
  <title>${gradientDetail.title}</title>
  <style>
    .grad-container {
        background-image: ${gradientDetail.gradient};
    }
  </style>
  <link rel="stylesheet" href="grad_style.css">
</head>

<body>
  ${sideBar}
  <div class="grad-frame">
    <div class="grad-container">
    </div>
  </div>
</body>

</html>`;

const sideBarTemplate = Deno.readTextFileSync("sideBarTemplate.html");



const navigationTemplate = (href, title) => {
  return `
  <a href="${href}" class="link">
          <li class="navigation">${title}</li>
        </a>
      `;
};

const generateNavigation = (navigationList) => {
  const navBar = navigationList.map(({ href, title }) =>
    navigationTemplate(href, title)
  );
  return navBar.join("\n");
};

const generateSideBar = (navigations, sideBarTemplate) => {
  return sideBarTemplate.replace("${navigations}", navigations);
};

const updateSideBar = (links) => {
  const navigations = generateNavigation(links);
  const sideBar = generateSideBar(navigations, sideBarTemplate);

  return sideBar;
};

const sideBar = updateSideBar(links);

const writeToHtml = (content, path) => Deno.writeTextFileSync(path, content);

const generatePage = (links, sideBar) => {
  const pages = links.map((gradientDetail) => {
    const page = pageTemplate(sideBar, gradientDetail);
    writeToHtml(page, gradientDetail.href)
  });

  return pages;
}

generatePage(links, sideBar);
