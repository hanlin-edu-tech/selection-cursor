
const registerMap = new Map();

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


const putListener = (el, eventName, selector, func, listenerFn) => {

  let listenerFns = registerMap.get(el) || [];

  listenerFns.push({
    eventName:eventName,
    selector:selector,
    listenerFn:listenerFn,
    func:func
  });

  registerMap.set(el, listenerFns);

};

const removeListener = (el, eventName, selector, func)=> {

  let listenerFns = registerMap.get(el) || [];

  let index = listenerFns.findIndex((row)=> {
    return row.eventName == eventName && row.selector == selector && row.func == func;
  });

  if (index != -1) {
    return (listenerFns.splice(index, 1)[0]||{}).listenerFn;
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

  let listenerFn = (...eventArgs)=> {
    let evt = eventArgs[0];

    let delegatedTarget = getDelegation(selector, evt.target, el);

    if (!selector || delegatedTarget) {
      evt.delegatedTarget = delegatedTarget;

      func.apply(el, eventArgs);
    }
  };

  el.addEventListener(eventName, listenerFn);
  putListener(el, eventName, selector, func, listenerFn)
};

const off = (...args)=> {
  let el = null, eventName = null , selector = null, func = null;

  if (args.length == 3) {
    [el, eventName, func] = args;
  } else {
    [el, eventName, selector, func] = args;
  }

  let listenerFn = removeListener(el, eventName, selector, func);

  el.removeEventListener(eventName, listenerFn);
};

export default { 
  on:on,
  off:off
};

