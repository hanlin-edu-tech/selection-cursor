
const isDelegate = (selector, target, sourceEl)=> {
  let els = sourceEl.querySelectorAll(selector);
  let currentTarget = target;

  while(currentTarget) {

    for(let el of els) {
      if (el == currentTarget) {
        return true;
      }
    }

    if (!currentTarget) break;
    currentTarget = currentTarget.parentNode;
  }

  return false;
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

    if (!selector || isDelegate(selector, evt.target, el)) {
      func.apply(el, eventArgs);
    }

  });
};

export default { 
  on:on
};

