
class SelectionContext {

  constructor(activity) {
    this.activity = activity;
  }

  getSelectedFields() {
    return this.activity.adapter.getSelectedFields();
  }

  refresh() {
    this.activity.adapter.refresh();
  }

  dispose() {
    this.activity.dispose();
  }

  on(...args) {
    this.activity.on(...args);
  }

  off(...args){
    this.activity.off(...args);
  }

}

export default SelectionContext;

