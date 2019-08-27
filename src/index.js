
import './style/index.less';
import SelectionActivity from './activity/SelectionActivity';

export default {

  build:(el)=> {
    let activity = new SelectionActivity(el);
    console.log('hello world')
  }

};

