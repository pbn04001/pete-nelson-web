import anime from 'animejs';

export function delayAnimationCheckVisible(animation, delay, component, visible) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (component.visible === visible) {
        anime(animation)
          .finished
          .then(() => {
            resolve(true);
          });
      } else {
        resolve(false);
      }
    }, delay);
  });
}

export function hideSectionAfterAnimation(delay, component) {
  setTimeout(() => {
    if (component.visible === false) {
      component.$refs.section.style.display = 'none';
    }
  }, delay);
}

export function delayActionCheckVisible(action, delay, component, visible) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (component.visible === visible) {
        action();
        resolve(true);
      } else {
        resolve(false);
      }
    }, delay);
  });
}

export default {
  delayAnimationCheckVisible,
};
