
import Selection from './../Selection';
import MODE from './../mode/index';
import Observer from './../util/Observer';
import * as EVENT from './../const/EVENT';

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
      onCopy:this.onCopy.bind(this),
      onBodyClick:this.onBodyClick.bind(this)
    };

    this.selection = new Selection();
    this.adapter.setActivity(this);
    this.registerEvent();
    this.adapter.init();
  }

  onKeydown(evt) {

    let which = evt.which;
    let availableMode = this.keyModeMap.get(which);
  
    if (availableMode) {
      this.mode = availableMode;
    } else if (which == 8) {
      this.adapter.onDeleteSelectedFields();
    }
  }

  onKeyup(evt){

    if (this.keyModeMap.has(evt.which)) {
      this.mode = MODE.STANDARD;
    }

  }

  onBodyClick(evt) {
    this.adapter.onBodyClick(evt);
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

    window.addEventListener(EVENT.KEYDOWN, this.events.onKeydown);
    window.addEventListener(EVENT.KEYUP, this.events.onKeyup);
    document.body.addEventListener(EVENT.COPY, this.events.onCopy);
    document.body.addEventListener(EVENT.PASTE, this.events.onPaste);
    document.body.addEventListener(EVENT.CLICK, this.events.onBodyClick);

  }

  dispose() {

    window.removeEventListener(EVENT.KEYDOWN, this.events.onKeydown);
    window.removeEventListener(EVENT.KEYUP, this.events.onKeyup);
    document.body.removeEventListener(EVENT.COPY, this.events.onCopy);
    document.body.removeEventListener(EVENT.PASTE, this.events.onPaste);
    document.body.removeEventListener(EVENT.CLICK, this.events.onBodyClick);
    this.adapter.dispose();

  }

}

export default SelectionActivity;

