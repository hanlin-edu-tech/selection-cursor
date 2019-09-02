
import TableAdapter from './TableAdapter';

const adapterMap = {
  'table':TableAdapter
};

export const create = (type)=>{

  return new adapterMap[type];

}

