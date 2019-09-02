
import eventHelper from './../util/eventHelper';
import Cursor from './../Cursor';
import * as STYLE from './../const/STYLE';

class Adapter {

  init() {

  }

  setActivity(activity) {
    this.activity = activity;
  }

  setCursorTarget(cursorTarget) {
    let cursor = new Cursor(cursorTarget);
    cursorTarget.classList.add(STYLE.CURSOR);
    this.activity.selection.setCursor(cursor);
  }

  getCursor() {
    return this.activity.selection.getCursor();
  }

  on(...args) {
    let eventArgs = [this.activity.el, ...args];
    eventHelper.on(...eventArgs);
  }

  getCurrentMode() {
    return this.activity.mode;
  }

  getRootElement() {
    return this.activity.el;
  }

  addRange(range) {
    this.activity.selection.addRange(range);
  }

  getRangeByElement(el) {

    let ranges = this.activity.selection.getRanges();

    for (let range of ranges) {
      if (range.startContainer == el && range.endContainer == el) {
        return range;
      }
    }
  }

  removeRange(range) {
    this.activity.selection.removeRange(range);
  }

  getRangeCount() {
    return this.activity.selection.rangeCount;
  }

}

export default Adapter;

