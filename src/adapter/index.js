
import TableAdapter from './TableAdapter';

const adapterMap = {
  'table':TableAdapter
};

export const create = (type, opts)=>{

  return new adapterMap[type](opts);

}

