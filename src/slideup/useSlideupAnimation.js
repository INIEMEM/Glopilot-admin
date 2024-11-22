import { useEffect } from 'react';
import './style.css'

const useSlideUpAnimation = (elementSelector, textInTimer = 3000, textOutTimer = 2800) => {
  useEffect(() => {
    const elements = document.querySelector(elementSelector)?.children;
    if (!elements) return;

    const elementsLength = elements.length;
    let index = 0;

    const animate = () => {
      for (let i = 0; i < elementsLength; i++) {
        elements[i].classList.remove("text-in", "text-out");
      }

      elements[index].classList.add("text-in");

      setTimeout(() => {
        elements[index].classList.add("text-out");
      }, textOutTimer);

      setTimeout(() => {
        index = index === elementsLength - 1 ? 0 : index + 1;
        animate(); // Recursively call to continue the animation
      }, textInTimer);
    };

    animate();

    return () => {
      // Cleanup if the component unmounts
      for (let i = 0; i < elementsLength; i++) {
        elements[i].classList.remove("text-in", "text-out");
      }
    };
  }, [elementSelector, textInTimer, textOutTimer]);
};

export default useSlideUpAnimation;
