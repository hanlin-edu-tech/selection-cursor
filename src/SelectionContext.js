
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

}

export default SelectionContext;

