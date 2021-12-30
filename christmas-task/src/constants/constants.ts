import { IRangeFilterData, IValueFilterData } from 'types/interfaces';

export const PAGE_HASHES = {
  home: '#home',
  toys: '#toys',
  christmasTree: '#christmas-tree'
};

export const DEFAULT_VALUE_FAVORITES_COUNTER = '0';

export const FAVORITES_COUNTER_ERROR_TEXT = 'Sorry, all slots are occupied';

export const NAV_BUTTONS_NAMES = {
  toys: 'toys',
  christmasTree: 'christmas tree'
};

export const LOGO_RSSCHOOL_HREF = 'https://rs.school/js/';

export const DEV_INFO = {
  href: 'https://github.com/ckachok',
  developer: 'App developer: Sergei Hul',
  year: '2021'
};

export const SEARCH_PLACEHOLDER = 'Search for toys';

export const SETTINGS_TITLE = {
  sorting: 'Sorting',
  filtersByRange: 'Filters by range',
  filtersByValue: 'Filters by value'
};

export const SETTINGS_BUTTON_NAMES = {
  resetFilters: 'Reset filters',
  resetSettings: 'Reset settings'
};

export const SORTING = {
  title: 'Select sorting:',
  byNameMax: 'By name A → Z',
  byNameMin: 'By name Z → A',
  byYearMax: 'By year ↑',
  byYearMin: 'By year ↓',
};

export const SORTING_TYPES = [SORTING.byNameMax, SORTING.byNameMin, SORTING.byYearMax, SORTING.byYearMin];

export const DATA_FILTER_BY_COPIES: IRangeFilterData = {
  minValue: 1,
  maxValue: 12,
  step: 1,
  title: 'Number of copies:'
};

export const DATA_FILTER_BY_YEARS: IRangeFilterData = {
  minValue: 1940,
  maxValue: 2020,
  step: 10,
  title: 'Year of purchase:'
};

export const SHAPE_FILTER_DATA: IValueFilterData = {
  typeValues: ['ball', 'bell', 'cone', 'snowflake', 'figurine'],
  buttonStyle: 'shape-button',
  title: 'Shape:'
};

export const COLOR_FILTER_DATA: IValueFilterData = {
  typeValues: ['white', 'yellow', 'red', 'blue', 'green'],
  buttonStyle: 'color-button',
  title: 'Color:'
};

export const SIZE_FILTER_DATA: IValueFilterData = {
  typeValues: ['big', 'average', 'small'],
  buttonStyle: 'size-button',
  title: 'Size:'
};

export const FAVORITES_FILTER_DATA = {
  id: 'favorite',
  title: 'Only favorites:'
};

export const FILTER_TITLES = {
  range: 'Filters by range',
  value: 'Filters by value'
};

export const TOYS_DATA_URL = 'assets/data/data.json';

export const SRC_IMAGES_TOYS = 'https://raw.githubusercontent.com/ckachok/stage1-tasks/christmas-task/assets/toys/';

export const TOY_CARD_PROPERTY_NAMES = [
  'Number of copies: ',
  'Year of purchase: ',
  'Toy shape: ',
  'Toy color: ',
  'Toy size: ',
  'Favorite: '
];

export const NO_MATCH_MESSAGE = 'Sorry, no matches found';
