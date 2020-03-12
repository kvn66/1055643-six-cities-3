const SHAKE_ANIMATION_TIMEOUT = 600;
const shake = `@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}`;

export const getCard = (id, cards) => {
  return cards.find((card) => card.id === id);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const parseUrl = () => {
  return window.location.pathname.slice(1).split(`/`);
};

export const shakeElement = (element, time, coefficient) => {
  $(element).css({"transition": "0.1s"});

  setInterval(() => {
    var randomInt1 = Math.floor((Math.random() * 3) + 1);
    var randomInt2 = Math.floor((Math.random() * 3) + 1);
    var randomInt3 = Math.floor((Math.random() * 2) + 1);

    var phase1 = (randomInt1 % 2) === 0 ? "+" : "-";
    var phase2 = (randomInt2 % 2) === 0 ? "+" : "-";
    var phase3 = (randomInt3 % 2) === 0 ? "+" : "-";

    var transitionX = ((phase1 + randomInt1) * (coefficient / 10)) + "px";
    var transitionY = ((phase2 + randomInt2) * (coefficient / 10)) + "px";
    var rotate = ((phase3 + randomInt3) * (coefficient / 10)) + "deg";

    $(element).css({"-webkit-transform": "translate("+transitionX+","+transitionY+") rotate("+rotate+")"});
  }, time);
}
