
import Adapter from './Adapter';
import MODE from './../mode/index';
import Range from './../Range';
import * as STYLE from './../const/STYLE';
import * as EVENT from './../const/EVENT';
import * as TABLE from './../const/TABLE';
import Point from './../math/Point';
import Vector from './../math/Vector'; 

class TableAdapter extends Adapter {


  init() {

    let el = this.getRootElement();

    el.classList.add(STYLE.SELECTION_DECORATOR);

    let defaultSelectedEl = el.querySelector(`td:not([${TABLE.DATA_ROW_MARK_INDEX}])`);

    if (defaultSelectedEl) {
      this.setCursorTarget(defaultSelectedEl);
    }

    this.refresh();
    this.registerEvent();

  }

  [MODE.STANDARD](evt) {

      this.clearRanges();

      this.clearSelectedElements();

      let target = evt.delegatedTarget;

      this.setCursorTarget(target);
   
  }

  [MODE.OPTION](evt) {

    let cursor = this.getCursor();

    let target = evt.delegatedTarget;

    if (cursor.el != target) {
      let range = this.getRangeByElement(target);

      if (!range) {
        range = new Range();
        
        range.startContainer = target;
        range.endContainer = target;

        this.addRange(range);
        this.selectedEl(target);
      }
      else {
        this.unselectedEl(target);
        this.removeRange(range);
      }
    }

    if (this.getRangeCount() > 0) {
      this.selectedEl(cursor.el);
    } else {
      this.unselectedEl(cursor.el);
    }

  }

  [MODE.CONTINUATION](evt) {

    let cursor = this.getCursor();

    let target = evt.delegatedTarget;

    this.clearRanges();

    this.clearSelectedElements();

    let range = new Range();

    range.startContainer = cursor.el;
    range.endContainer = target;

    this.addRange(range);

    let cursorEl = cursor.el;

    let currentX = parseInt(cursorEl.dataset.colIndex);
    let currentY = parseInt(cursorEl.dataset.rowIndex);

    let targetX = parseInt(target.dataset.colIndex);
    let targetY = parseInt(target.dataset.rowIndex);
    
    let currentPoint = new Point(currentX, currentY);
    let targetPoint = new Point(targetX, targetY);

    let vector = new Vector();

    vector.move(currentPoint, targetPoint);

    vector.forEachAsRectangle((x, y)=> {
      this.selectedEl(this.getRootElement().querySelector(`td[${TABLE.DATA_ROW_INDEX}='${y}'][${TABLE.DATA_COL_INDEX}='${x}']`));
    });

  }

  clearSelectedElements() {
    let els = this.getRootElement().querySelectorAll(`.${STYLE.SELECTED}`);

    for (let el of els) {
      this.unselectedEl(el);
    }
  }

  registerEvent() {

    this.on(EVENT.MOUSE_DOWN, `td:not([${TABLE.DATA_ROW_MARK_INDEX}])`, (evt)=> {

      evt.preventDefault();

      let mode = this.getCurrentMode();

      if (this[mode]) {
        this[mode](evt);
      }
    });

    this.on(EVENT.MOUSE_DOWN, `td[${TABLE.DATA_ROW_MARK_INDEX}]`, (evt)=> {
      let target = evt.delegatedTarget;
      let currentEl = target;
      let isFirstEl = true;

      this.clearSelectedElements();
      this.clearRanges();
      let range = new Range();

      while(currentEl = currentEl.nextElementSibling) {

        if (isFirstEl) {
          this.setCursorTarget(currentEl);
          isFirstEl = false;
          range.startContainer = currentEl;
        }

        range.endContainer = currentEl;
        this.selectedEl(currentEl);
      }

      this.addRange(range);

    });

  }

  refresh() {
    let rows = this.getRootElement().querySelectorAll('tr');

    for (let index in rows) {
      let row = rows[index];

      if (row instanceof Element) {
        let cols = row.querySelectorAll(`td:not([${TABLE.DATA_ROW_MARK_INDEX}])`);

        for (let colIndex in cols) {
          let col = cols[colIndex];
          if (col instanceof Element) {
            col.dataset.rowIndex = index;
            col.dataset.colIndex = colIndex;
          }
        }
      }
    }
  }

}

export default TableAdapter;

