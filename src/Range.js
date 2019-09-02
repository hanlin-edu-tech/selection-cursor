
class Range {

  constructor() {
  
  }

  get startContainer() {
    return this.__startEl;
  }

  set startContainer(el) {
    return this.__startEl = el;
  }

  get endContainer() {
    return this.__endEl;
  }

  set endContainer(el) {
    return this.__endEl = el;
  }

}


export default Range;

