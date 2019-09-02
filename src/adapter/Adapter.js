
import eventHelper from './../util/eventHelper';
import Cursor from './../Cursor';

class Adapter {

  init() {

  }

  setActivity(activity) {
    this.activity = activity;
  }

  setCursorTarget(cursorTarget) {
    let cursor = new Cursor(cursorTarget);
    cursorTarget.classList.add('cursor');
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

}

export default Adapter;

