(() => {
  try {
    const targetElement = document.createElement("div");
    console.log("contentScript");
    targetElement.id = "sidebar-container";
    document.body.appendChild(targetElement);
  } catch (err) {
    console.log(err);
  }
})();
