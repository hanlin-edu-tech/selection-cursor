
const getDelegation = (selector, target, sourceEl)=> {
  if (!selector) return null;

  let els = sourceEl.querySelectorAll(selector);
  let currentTarget = target;

  while(currentTarget) {

    for(let el of els) {
      if (el == currentTarget) {
        return currentTarget;
      }
    }

    currentTarget = currentTarget.parentNode;
  }

  return null;
};

const on = (...args)=> {
  let el = null, eventName = null , selector = null, func = null;

  if (args.length == 3) {
    [el, eventName, func] = args;
  } else {
    [el, eventName, selector, func] = args;
  }

  el.addEventListener(eventName, (...eventArgs)=> {
    let evt = eventArgs[0];

    let delegatedTarget = getDelegation(selector, evt.target, el);

    if (!selector || delegatedTarget) {
      evt.delegatedTarget = delegatedTarget;

      func.apply(el, eventArgs);
    }

  });
};

export default { 
  on:on
};

