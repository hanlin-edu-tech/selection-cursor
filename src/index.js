
import './style/index.less';
import SelectionActivity from './activity/SelectionActivity';
import * as AdapterFactory from './adapter/index';
import SelectionContext from './SelectionContext';

export default {

  build:(el)=> {
    let adapter = AdapterFactory.create('table');
    let activity = new SelectionActivity(el, adapter);
    let context = new SelectionContext(activity);
    return context;
  }

};

