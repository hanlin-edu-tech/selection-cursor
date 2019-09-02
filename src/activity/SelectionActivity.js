
import Selection from './../Selection';
import MODE from './../mode/index';

class SelectionActivity {

  constructor(el, adapter) {
    this.el = el;
    this.adapter = adapter;

    this.mode = MODE.STANDARD;
    this.keyModeMap = this.initKeyModeMap();

    this.selection = new Selection();
    this.adapter.setActivity(this);
    this.registerEvent();
    this.adapter.init();
  }

  initKeyModeMap() {
    const map = new Map();

    map.set(16, MODE.CONTINUATION);
    map.set(17, MODE.OPTION);
    map.set(91, MODE.OPTION);

    return map;
  }

  registerEvent() {

    window.addEventListener('keydown', (evt)=> {

      let availableMode = this.keyModeMap.get(evt.which);

      if (availableMode) {
        this.mode = availableMode;
      }

      console.log(evt);
    });

    window.addEventListener('keyup', (evt)=> {

      if (this.keyModeMap.has(evt.which)) {
        this.mode = MODE.STANDARD;
      }
      console.log(evt);
    });

  }

}

export default SelectionActivity;

