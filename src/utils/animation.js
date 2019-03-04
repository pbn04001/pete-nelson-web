import anime from 'animejs';

export function delayAnimationCheckVisible(animation, delay, component) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (component.visible) {
        anime(animation)
          .finished.then(() => {
            resolve();
          });
      } else {
        resolve();
      }
    }, delay);
  });
};

export default {
  delayAnimationCheckVisible,
}
