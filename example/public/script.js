const container = document.getElementById("container")

setInterval(() => {
  let width = window.innerWidth;
  let height = window.innerHeight;
  let dominateScale = width > height ? height : width

  container.style.width = `${dominateScale}px`
  container.style.height = `${dominateScale}px`
}, 1)