
import Selection from './../Selection';
import MODE from './../mode/index';
import Observer from './../util/Observer';

class SelectionActivity extends Observer {

  constructor(el, adapter) {
    super();
    this.el = el;
    this.adapter = adapter;

    this.mode = MODE.STANDARD;
    this.keyModeMap = this.initKeyModeMap();

    this.events = {
      onKeydown:this.onKeydown.bind(this),
      onKeyup:this.onKeyup.bind(this),
      onPaste:this.onPaste.bind(this),
      onCopy:this.onCopy.bind(this)
    };

    this.selection = new Selection();
    this.adapter.setActivity(this);
    this.registerEvent();
    this.adapter.init();
  }

  onKeydown(evt) {

    let availableMode = this.keyModeMap.get(evt.which);
  
    if (availableMode) {
      this.mode = availableMode;
    }
  }

  onKeyup(evt){

    if (this.keyModeMap.has(evt.which)) {
      this.mode = MODE.STANDARD;
    }

  }

  onCopy(evt) {
    this.adapter.onCopy(evt);
  }

  onPaste(evt) {
    this.adapter.onPaste(evt);
  }

  initKeyModeMap() {
    const map = new Map();

    map.set(16, MODE.CONTINUATION);
    map.set(17, MODE.OPTION);
    map.set(91, MODE.OPTION);

    return map;
  }

  registerEvent() {

    window.addEventListener('keydown', this.events.onKeydown);
    window.addEventListener('keyup', this.events.onKeyup);
    document.body.addEventListener('copy', this.events.onCopy);
    document.body.addEventListener('paste', this.events.onPaste);

  }

  dispose() {

    window.removeEventListener('keydown', this.events.onKeydown);
    window.removeEventListener('keyup', this.events.onKeyup);
    document.body.removeEventListener('copy', this.events.onCopy);
    document.body.removeEventListener('paste', this.events.onPaste);
    this.adapter.dispose();

  }

}

export default SelectionActivity;

