
import './style/index.less';
import SelectionActivity from './activity/SelectionActivity';
import * as AdapterFactory from './adapter/index'

export default {

  build:(el)=> {
    let adapter = AdapterFactory.create('table');
    let activity = new SelectionActivity(el, adapter);
  }

};

