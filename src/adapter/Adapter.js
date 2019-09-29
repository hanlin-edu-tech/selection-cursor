
import eventHelper from './../util/eventHelper';
import Cursor from './../Cursor';
import * as STYLE from './../const/STYLE';

class Adapter {

  constructor(opts){
    this.opts = opts;
  }

  init() {

  }

  setActivity(activity) {
    this.activity = activity;
  }

  setCursorTarget(cursorTarget) {
    let lastCursor = this.getCursor();

    if (lastCursor) {
      lastCursor.el.classList.remove(STYLE.CURSOR);
    }

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

  off(...args) {
    let eventArgs = [this.activity.el, ...args];
    eventHelper.off(...eventArgs);
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

  clearRanges() {
    this.activity.selection.removeRanges();
  }

  getRangeCount() {
    return this.activity.selection.rangeCount;
  }

  getRanges() {
    return this.activity.selection.getRanges();
  }

  refresh() {
    //do nothing...
  }

  selectedEl(el) {
    el.classList.add(STYLE.SELECTED);
  }

  unselectedEl(el) {
    el.classList.remove(STYLE.SELECTED);
  }

  isSelected(el) {
    return el.classList.contains(STYLE.SELECTED);
  }

  toggleEl(el) {
    this.isSelected(el) ? this.unselectedEl(el): this.selectedEl(el);
  }

  countSelected() {
    return this.getRootElement().querySelectorAll(`.${STYLE.SELECTED}`).length;
  }

  getSelectedFields() {
    return [];
  }  

  dispose() {
    let cursor = this.getCursor();

    if (cursor) {
      cursor.el.classList.remove(STYLE.CURSOR);
    }
  }

  onCopy() {

  }

  onPaste() {

  }

  onDeleteSelectedFields() {

  }

  onBodyClick() {
  
  }

  isFocusOnTheTable() {
    return this._focusOnTable;
    /*if (window.getSelection().rangeCount) {
      let range = window.getSelection().getRangeAt(0);
      let currentEl = range.startContainer;
      let rootEl = this.getRootElement();

      while(currentEl) {

        if (currentEl === rootEl) {
          return true;
        }
        currentEl = currentEl.parentElement;
      }

    }
    return false;*/
  }

  focusTable() {
    this._focusOnTable = true;
    this.getRootElement().classList.add('focus');
  }

  unfocusTable() {
    this._focusOnTable = false;
    this.getRootElement().classList.remove('focus');
  }


}

export default Adapter;

