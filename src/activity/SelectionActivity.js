
import Selection from './../Selection';
import Cursor from './../Cursor';


class SelectionActivity {

  constructor(el) {
    this.el = el;

    this.selection = new Selection();
    this.registerEvent();
  }

  registerEvent() {
    let el = this.el;

    el.addEventListener('click', (evt)=> {
      console.log(evt);
      let cursor = new Cursor(evt.target);
      this.selection.setCursor(cursor);
    });

    window.addEventListener('keydown', (evt)=> {
      console.log(evt);
    });

    window.addEventListener('keyup', (evt)=> {

    });

  }

}

export default SelectionActivity;

