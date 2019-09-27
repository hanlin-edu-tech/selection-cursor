
import Adapter from './Adapter';
import MODE from './../mode/index';
import Range from './../Range';
import * as STYLE from './../const/STYLE';
import * as EVENT from './../const/EVENT';
import * as TABLE from './../const/TABLE';
import * as CLIPBOARD from './../const/CLIPBOARD';
import Point from './../math/Point';
import Vector from './../math/Vector'; 

class TableAdapter extends Adapter {


  init() {

    let el = this.getRootElement();

    el.classList.add(STYLE.SELECTION_DECORATOR);

    let defaultSelectedEl = el.querySelector(`tbody td:not([${TABLE.DATA_ROW_MARK_INDEX}])`);

    if (defaultSelectedEl) {
      this.setCursorTarget(defaultSelectedEl);
      defaultSelectedEl.focus();
    }

    this.events = {
      onCell:this.onCell.bind(this),
      onRow:this.onRow.bind(this),
      onMode:this.onMode.bind(this),
      onSelectedAll:this.onSelectedAll.bind(this)
    };
    this.refresh();
    this.registerEvent();

  }

  _getSelectedFieldValue(selectedField) {
    let el = selectedField.el;
    let input = el.querySelector('input, textarea');

    if (input) {
      return input.value;
    }

    return el.innerText;
  }

  _setSelectedFieldValue(selectedField, text) {
    let el = selectedField.el;
    let input = el.querySelector('input, textarea');

    if (input) {
      input.value = text;
    }
  }

  onDeleteSelectedFields() {
    let selectedFields = this.getSelectedFields();
    selectedFields.forEach((selectedField)=> {
      this._setSelectedFieldValue(selectedField, '');
    });
  }

  onCopy(evt) {
    let result = [];
    let selectedFields = this.getSelectedFields();

    let firstSelected = selectedFields[0];
    
    for (let selectedField of selectedFields) {
      let currentRowIndex = selectedField.rowIndex - firstSelected.rowIndex;
      let currentColIndex = selectedField.colIndex - firstSelected.colIndex;
      let row = result[currentRowIndex] || [];
      result[currentRowIndex] = row;
      row[currentColIndex] = this._getSelectedFieldValue(selectedField);
    }

    if (result.length) {
      evt.preventDefault();
      let resultText = result.map((row)=> row.join(CLIPBOARD.TAB)).join(CLIPBOARD.NEWLINE);
      evt.clipboardData.setData(CLIPBOARD.TEXT_PLAIN, resultText);
    }
  }

  onPaste(evt) {
    let resultText = evt.clipboardData.getData(CLIPBOARD.TEXT_PLAIN);
    let rows = resultText.split(CLIPBOARD.NEWLINE).map((row)=> row.split(CLIPBOARD.TAB));

    if (rows.length) {
      let selectedFields = this.getSelectedFields();

      if (rows.length == 1 && rows[0].length) {

        selectedFields.forEach((selectedField)=> {
          this._setSelectedFieldValue(selectedField, rows[0][0]);
        });

      } else {
        let firstSelected = selectedFields[0];
        let selectedFieldMap = {};

        selectedFields.forEach((selectedField)=> {
          selectedFieldMap[`${selectedField.rowIndex}-${selectedField.colIndex}`] = selectedField;
        });

        for (let rowIndex in rows) {
          let row = rows[rowIndex];

          for (let colIndex in row) {
            let currentRowIndex = firstSelected.rowIndex + parseInt(rowIndex);
            let currentColIndex = firstSelected.colIndex + parseInt(colIndex);
            let selectedField = selectedFieldMap[`${currentRowIndex}-${currentColIndex}`];
            if (selectedField) {
              this._setSelectedFieldValue(selectedField, row[colIndex]);
            }
          }
        }
      }
      event.preventDefault();
    }
  }

  onMode(evt) {
    //evt.preventDefault();

    let mode = this.getCurrentMode();

    if (this[mode]) {
      this[mode](evt);
    }
  }

  onRow(evt) {

    let target = evt.delegatedTarget;
    let currentEl = target;

    let mode = this.getCurrentMode();
    let cursor = this.getCursor();

    if (mode == MODE.OPTION) {

      if (this.isSelected(target)) {
        this.unselectedRow(target);
      } else {
        this.selectedRow(currentEl);
      }

      this.toggleEl(target);

    } else if (mode == MODE.CONTINUATION) {

      let startRowIndex = parseInt(cursor.el.dataset.rowIndex);
      let endRowIndex = parseInt(target.dataset.rowMarkIndex);

      let inc = startRowIndex < endRowIndex ? 1 : -1;

      this.clearSelectedElements();

      for (let index = startRowIndex; index != (endRowIndex + inc) ;index +=inc) {
        let el = this.getRootElement().querySelector(`tbody td[${TABLE.DATA_ROW_MARK_INDEX}='${index}']`);
        this.selectedEl(el);
        this.selectedRow(el, false);
      }

    } else {

      this.clearSelectedElements();
      this.selectedRow(currentEl);
      this.toggleEl(target);
    }

  }

  onCell(evt) {
    let mode = this.getCurrentMode();
    let cursor = this.getCursor();
    let target = evt.delegatedTarget;

    if (mode == MODE.OPTION) {

      if (this.isSelected(target)) {
        this.unselectedCol(target);
      } else {
        this.selectedCol(target);
      }

      this.toggleEl(target);

    } else if (mode == MODE.CONTINUATION) {
      let startColIndex = parseInt(cursor.el.dataset.colIndex);
      let endColIndex = parseInt(target.dataset.colMarkIndex);

      let inc = startColIndex < endColIndex ? 1 : -1;

      this.clearSelectedElements();

      for (let index = startColIndex; index != (endColIndex + inc) ;index +=inc) {
        let el = this.getRootElement().querySelector(`thead td[${TABLE.DATA_COL_MARK_INDEX}='${index}']`);
        this.selectedEl(el);
        this.selectedCol(el, false);
      }

    } else {
      this.clearSelectedElements();
      this.selectedEl(target);
      this.selectedCol(target);
    }
  }

  onSelectedAll(evt) {

    this.clearSelectedElements();
    let isFirstEl = true;

    let els = this.getRootElement().querySelectorAll(`tbody td:not([${TABLE.DATA_ROW_MARK_INDEX}]):not([${TABLE.DATA_INGORE_CELL}])`);

    for (let el of els) {

      if (isFirstEl) {
        isFirstEl = false;
      }

      this.selectedEl(el);
    }

  }

  [MODE.STANDARD](evt) {

      //this.clearRanges();

      this.clearSelectedElements();

      let target = evt.delegatedTarget;

      this.setCursorTarget(target);
  }

  [MODE.OPTION](evt) {

    let cursor = this.getCursor();

    let target = evt.delegatedTarget;

    if (cursor.el != target) {

      this.selectedEl(cursor.el);

      this.toggleEl(target);

      if (this.isSelected(target)) {
        this.setCursorTarget(target);
      } else {
        this.setCursorTarget(this.firstSelected());
      }

    } else if (this.countSelected() > 1) {
      this.unselectedEl(target);
      this.setCursorTarget(this.firstSelected());
    }

    /*if (cursor.el != target) {
      let range = this.getRangeByElement(target);

      if (!range) {
        range = new Range();
        
        range.startContainer = target;
        range.endContainer = target;

        this.addRange(range);
      }
      else {
        this.removeRange(range);
      }

      this.toggleEl(target);

      if (this.countSelected() > 0) {
        this.selectedEl(cursor.el);
      } else {
        this.unselectedEl(cursor.el);
      }

      this.setCursorTarget(target);

    } else if (this.countSelected() > 1){

      this.unselectedEl(cursor.el);
      this.setCursorTarget(this.firstSelected());
    }*/

  }

  [MODE.CONTINUATION](evt) {

    let cursor = this.getCursor();

    let target = evt.delegatedTarget;

    //this.clearRanges();

    this.clearSelectedElements();

    /*let range = new Range();

    range.startContainer = cursor.el;
    range.endContainer = target;

    this.addRange(range);*/

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
      let el = this.getRootElement().querySelector(`td[${TABLE.DATA_ROW_INDEX}='${y}'][${TABLE.DATA_COL_INDEX}='${x}']:not([${TABLE.DATA_INGORE_CELL}])`);

      if (el) {
        this.selectedEl(el);
      }
    });

  }

  firstSelected() {

    return this.getRootElement().querySelector(`.${STYLE.SELECTED}:not(.${TABLE.DATA_ROW_MARK_INDEX})`);

  }

  clearSelectedElements() {
    let els = this.getRootElement().querySelectorAll(`.${STYLE.SELECTED}`);

    for (let el of els) {
      this.unselectedEl(el);
    }
  }

  unselectedRow(currentEl) {

    while(currentEl = currentEl.nextElementSibling) {

      this.unselectedEl(currentEl);
    }

  }

  isSkip(el) {
    return el.getAttributeNames().indexOf(TABLE.DATA_INGORE_CELL) != -1;
  }

  selectedRow(currentEl, moveCursor = true) {
    let isFirstEl = true;

    while(currentEl = currentEl.nextElementSibling) {

        if (!this.isSkip(currentEl)) {

          if (isFirstEl && moveCursor) {
            this.setCursorTarget(currentEl);
            isFirstEl = false;
          }

          this.selectedEl(currentEl);

        }
    }

  }

  unselectedCol(target) {
      let colMarkIndex = target.dataset.colMarkIndex;
      let els = this.getRootElement().querySelectorAll(`tbody td[${TABLE.DATA_COL_INDEX}='${colMarkIndex}']`);
      for (let el of els) {
        this.unselectedEl(el);
      }
  }

  selectedCol(target, moveCursor = true) {
      let isFirstEl = true;
      let colMarkIndex = target.dataset.colMarkIndex;
      let els = this.getRootElement().querySelectorAll(`tbody td[${TABLE.DATA_COL_INDEX}='${colMarkIndex}']:not([${TABLE.DATA_INGORE_CELL}])`);

      for (let el of els) {

        if (isFirstEl && moveCursor) {
          this.setCursorTarget(el);
          isFirstEl = false;
        }

        this.selectedEl(el);
      }
  }

  registerEvent() {

    this.on(EVENT.MOUSE_DOWN, TABLE.ON_CELL_SELECTOR, this.events.onMode);

    this.on(EVENT.MOUSE_DOWN, TABLE.ON_ROW_MARK_SELECTOR, this.events.onRow);

    this.on(EVENT.MOUSE_DOWN, TABLE.ON_CELL_MARK_SELECTOR, this.events.onCell);

    this.on(EVENT.MOUSE_DOWN, TABLE.ON_SELECT_ALL_SELECTOR, this.events.onSelectedAll);

    //this.on(EVENT.COPY, 'td', (evt)=> {
    /*document.body.addEventListener('copy', (evt)=> {
      console.log(evt);
      console.log(evt.clipboardData.setData('text/plain', 'test\ttest\n1231\t2131'));
      evt.preventDefault();
    });*/

  }

  refresh() {
    let rows = this.getRootElement().querySelectorAll('tbody tr');

    for (let index in rows) {
      let row = rows[index];

      if (row instanceof Element) {
        let cols = row.querySelectorAll(`tbody td:not([${TABLE.DATA_ROW_MARK_INDEX}])`);

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

  getSelectedFields() {
    let result = [];
    let els = this.getRootElement().querySelectorAll(`tbody td.${STYLE.SELECTED}:not([${TABLE.DATA_ROW_MARK_INDEX}]), tbody td.cursor`);

    for(let el of els) {
      result.push({
        rowIndex:parseInt(el.dataset.rowIndex),
        colIndex:parseInt(el.dataset.colIndex),
        el:el
      });
    }
    result.sort((a,b)=> (a.rowIndex * 10 + a.colIndex) - (b.rowIndex * 10 + b.colIndex) )

    return result;
  }

  dispose() {

    super.dispose();

    this.clearSelectedElements();

    this.off(EVENT.MOUSE_DOWN, TABLE.ON_CELL_SELECTOR, this.events.onMode);

    this.off(EVENT.MOUSE_DOWN, TABLE.ON_ROW_MARK_SELECTOR, this.events.onRow);

    this.off(EVENT.MOUSE_DOWN, TABLE.ON_CELL_MARK_SELECTOR, this.events.onCell);

    this.off(EVENT.MOUSE_DOWN, TABLE.ON_SELECT_ALL_SELECTOR, this.events.onSelectedAll);

  }

}

export default TableAdapter;

