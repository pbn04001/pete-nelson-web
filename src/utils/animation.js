import anime from 'animejs';

export function delayAnimationCheckVisible(animation, delay, component, visible) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (component.visible === visible) {
        anime(animation)
          .finished
          .then(() => {
            resolve();
          });
      } else {
        resolve();
      }
    }, delay);
  });
}

export default {
  delayAnimationCheckVisible,
};
