function scrollAnimate(params) {
  function setParams(defP, newP) {
    for (let key in defP) {
      if (newP[key] !== undefined) {
        defP[key] = newP[key];
      }
    }
    return defP;
  }

  const opt = setParams(
    {
      animClass: "._anim-items",
      animActive: "_active",
      animNoRemove: "_anim-no-hide",
      windowPath: 4,
      offsetTop: false,
      repeatMode: true,
      offOnMobile: true
    },
    params || {}
  );

  if (opt.offOnMobile && /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      return
  }
  const animClass = opt.animClass,
    animActive = opt.animActive,
    animNoRemove = opt.animNoRemove;
  const animItems = document.querySelectorAll(animClass);
  if (animItems.length > 0) {
    window.addEventListener("scroll", animOnScroll);
    function animOnScroll() {
      if (opt.windowPath) {
        for (let i = 0; i < animItems.length; i++) {
          let animItem = animItems[i],
            animItemHeight = animItem.offsetHeight,
            animItemOffset = offset(animItem).top,
            animStart = 4;

          let animItemPoint = window.innerHeight - animItemHeight / animStart;
          if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
          }
          if (
            pageYOffset > animItemOffset - animItemPoint &&
            pageYOffset < animItemOffset + animItemHeight
          ) {
            animItem.classList.add(animActive);
          } else {
            if (opt.repeatMode) {
              if (!animItem.classList.contains(animNoRemove)) {
                animItem.classList.remove(animActive);
              }
            }
          }
        }
      } else if (opt.offsetTop) {
        for (let i = 0; i < animItems.length; i++) {
          let animItem = animItems[i],
            animItemHeight = animItem.offsetHeight,
            animItemOffset = offset(animItem).top,
            itemOffset = opt.offsetTop;
          if (
            pageYOffset > animItemOffset - window.innerHeight + itemOffset &&
            pageYOffset < animItemOffset + animItemHeight
          ) {
            animItem.classList.add(animActive);
          } else {
            if (opt.repeatMode) {
              if (!animItem.classList.contains(animNoRemove)) {
                animItem.classList.remove(animActive);
              }
            }
          }
        }
      }
    }
    animOnScroll();
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
}

scrollAnimate({
  windowPath: false,
  offsetTop: 100,
  repeatMode: false,
});