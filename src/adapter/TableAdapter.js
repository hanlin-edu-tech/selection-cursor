
import Adapter from './Adapter';
import MODE from './../mode/index';
import Range from './../Range';
import * as STYLE from './../const/STYLE';

class TableAdapter extends Adapter{


  init() {

    let el = this.getRootElement();

    el.classList.add(STYLE.SELECTION_DECORATOR);

    let defaultSelectedEl = el.querySelector('td');

    if (defaultSelectedEl) {
      this.setCursorTarget(defaultSelectedEl);
    }

    this.registerEvent();

  }

  [MODE.STANDARD](evt) {

      let cursor = this.getCursor();

      if (cursor) {
        cursor.el.classList.remove(STYLE.CURSOR);
      }

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
        target.classList.add(STYLE.SELECTED);
      }
      else {
        target.classList.remove(STYLE.SELECTED);
        this.removeRange(range);
      }
    }

    if (this.getRangeCount() > 0) {
      cursor.el.classList.add(STYLE.SELECTED);
    } else {
      cursor.el.classList.remove(STYLE.SELECTED);
    }

  }

  registerEvent() {

    this.on('mousedown', 'td', (evt)=> {

      evt.preventDefault();

      let mode = this.getCurrentMode();

      if (this[mode]) {
        this[mode](evt);
      }
    });

    this.on('click' , 'span', (evt)=> {
      evt.preventDefault();
      console.log(324);
    });

    this.on('click', (evt)=> {
      console.log(evt);
    });

  }

}

export default TableAdapter;

