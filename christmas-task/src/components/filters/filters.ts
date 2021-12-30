import BaseComponent from 'components/base-component';
import RangeFilter from 'components/filters/range/range';
import ValueFilter from 'components/filters/value/value';
import FavoritesFilter from 'components/filters/favorites/favorites';
import {
  COLOR_FILTER_DATA, DATA_FILTER_BY_COPIES, SHAPE_FILTER_DATA,
  SIZE_FILTER_DATA, DATA_FILTER_BY_YEARS, FILTER_TITLES
} from 'constants/constants';
import 'components/filters/filters.scss';

class Filters extends BaseComponent {
  public filterByCopies: RangeFilter;
  public filterByYears: RangeFilter;
  public shapeFilter: ValueFilter;
  public colorFilter: ValueFilter;
  public sizeFilter: ValueFilter;
  public favoritesFilter: FavoritesFilter;

  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.createFilters();
  }

  private createFilters(): void {
    const rangeFiltersContainer = new BaseComponent(this.node, 'div', 'filters-range').node;
    const rangeFiltersTitle = new BaseComponent(rangeFiltersContainer, 'h2', 'settings__title', FILTER_TITLES.range);
    this.filterByCopies = new RangeFilter(rangeFiltersContainer, 'div', 'filters-range__type', DATA_FILTER_BY_COPIES);
    this.filterByYears = new RangeFilter(rangeFiltersContainer, 'div', 'filters-range__type', DATA_FILTER_BY_YEARS);

    const valueFiltersContainer = new BaseComponent(this.node, 'div', 'filters-value').node;
    const valueFiltersTitle = new BaseComponent(valueFiltersContainer, 'h2', 'settings__title', FILTER_TITLES.value);
    this.shapeFilter = new ValueFilter(valueFiltersContainer, 'div', 'filters-value__type', SHAPE_FILTER_DATA);
    this.colorFilter = new ValueFilter(valueFiltersContainer, 'div', 'filters-value__type filters-value__type_color', COLOR_FILTER_DATA);
    this.sizeFilter = new ValueFilter(valueFiltersContainer, 'div', 'filters-value__type filters-value__type_size', SIZE_FILTER_DATA);

    this.favoritesFilter = new FavoritesFilter(this.node, 'div', 'filters-favorites');
  }

  resetFilters(): void {
    const filters = [this.filterByCopies, this.filterByYears, this.shapeFilter, this.colorFilter, this.sizeFilter, this.favoritesFilter];
    filters.forEach(filter => {
      filter.resetFilter();
    });
  }
}

export default Filters;
