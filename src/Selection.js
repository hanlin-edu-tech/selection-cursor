
class Selection {

  constructor() {
    this.__ranges = [];
  }

  addRange(range) {
    this.__ranges.push(range);
  }

  removeRange(range) {
    let index = this.__ranges.indexOf(range);

    if (index != -1 ) {
      this.__ranges.splice(index, 1); 
    }
  }

  removeRanges() {
    this.__ranges = [];
  }

  getRanges() {
    return this.__ranges;
  }

  setCursor(cursor) {
    this.__cursor = cursor;
  }

  getCursor() {
    return this.__cursor;
  }

  get rangeCount() {
    return this.__ranges.length;
  }

}

export default Selection;

