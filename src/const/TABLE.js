
export const DATA_ROW_MARK_INDEX = 'data-row-mark-index';

export const DATA_COL_MARK_INDEX = 'data-col-mark-index';

export const DATA_ROW_INDEX = 'data-row-index';

export const DATA_COL_INDEX = 'data-col-index';

export const SELECT_ALL = 'data-select-all';

export const ON_CELL_SELECTOR = `tbody td:not([${DATA_ROW_MARK_INDEX}])`;

export const ON_ROW_MARK_SELECTOR = `tbody td[${DATA_ROW_MARK_INDEX}]`;

export const ON_CELL_MARK_SELECTOR = `thead td[${DATA_COL_MARK_INDEX}], thead th[${DATA_COL_MARK_INDEX}]`;

export const ON_SELECT_ALL_SELECTOR = `thead td[${SELECT_ALL}], thead th[${SELECT_ALL}]`;


