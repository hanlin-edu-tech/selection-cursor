
import Adapter from './Adapter';

class TableAdapter extends Adapter{


  init() {

    let el = this.getRootElement();

    el.classList.add('selection-decorator');

    let defaultSelectedEl = el.querySelector('td');

    if (defaultSelectedEl) {
      this.setCursorTarget(defaultSelectedEl);
    }

    this.registerEvent();

  }

  registerEvent() {

    this.on('mousedown', 'td', (evt)=> {
      let cursor = this.getCursor();

      if (cursor) {
        cursor.el.classList.remove('cursor');
      }

      let target = evt.delegatedTarget;

      evt.preventDefault();
      target.classList.add('cursor');

      this.setCursorTarget(target);
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

