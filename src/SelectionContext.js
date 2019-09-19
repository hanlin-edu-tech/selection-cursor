
class SelectionContext {

  constructor(activity) {
    this.activity = activity;
  }

  getSelectedFields() {
    return this.activity.adapter.getSelectedFields();
  }

  dispose() {
    this.activity.dispose();
  }

}

export default SelectionContext;

