
class Observer {

  constructor(){

    this.eventMap = new Map();

  }


  on(eventName, func){

    let funcs = this.eventMap.get(eventName) || [];
    funcs.push(func);
    this.eventMap.set(eventName, funcs);
  }

  off(eventName, func){
    let funcs = this.eventMap.get(eventName) || [];
    let index = funcs.indexOf(func);

    if (index != -1){
      funcs.splice(index, 1);
    }
  }

  trigger(eventName, data) {
    let funcs = this.eventMap.get(eventName) || [];

    funcs.forEach((func)=> {
      func({name:eventName, data:data});
    });
  }

}

export default Observer;


