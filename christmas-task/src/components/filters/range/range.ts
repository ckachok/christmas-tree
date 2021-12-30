import noUiSlider, { target } from 'nouislider';
import BaseComponent from 'components/base-component';
import { IRangeFilterData } from 'types/interfaces';
import 'nouislider/dist/nouislider.css';
import 'components/filters/range/range.scss';

class RangeFilter extends BaseComponent {
  private filterData: IRangeFilterData;
  public minRangeValue: BaseComponent<HTMLElement>;
  public maxRangeValue: BaseComponent<HTMLElement>;
  public filter: target;

  constructor(parentNode: HTMLElement, tagName: string, className: string, filterData: IRangeFilterData) {
    super(parentNode, tagName, className);
    this.filterData = filterData;
    this.createFilter();
  }

  private createRangeSlider(): void {
    this.filter = new BaseComponent(this.node, 'div', 'filter-range__slider').node;
    noUiSlider.create(this.filter, {
      start: [this.filterData.minValue, this.filterData.maxValue],
      connect: true,
      step: this.filterData.step,
      range: {
        min: this.filterData.minValue,
        max: this.filterData.maxValue
      },
      format: {
        to: value => parseInt(value.toString(), 10),
        from: value => parseInt(value, 10)
      }
    });
  }

  private createRangeValues(): void {
    const rangeValueContainer = new BaseComponent(this.node, 'div', 'filters-range__values');
    this.minRangeValue = new BaseComponent(rangeValueContainer.node, 'span', 'filters__text');
    this.maxRangeValue = new BaseComponent(rangeValueContainer.node, 'span', 'filters__text');
    const rangeValues = [this.minRangeValue.node, this.maxRangeValue.node];
    this.filter.noUiSlider.on('update', (values, handle) => {
      rangeValues[handle].innerHTML = values[handle].toString();
    });
  }

  private createFilter(): void {
    const title = new BaseComponent(this.node, 'h3', 'filters__text', this.filterData.title);
    this.createRangeSlider();
    this.createRangeValues();
  }

  resetFilter(): void {
    this.filter.noUiSlider.reset();
  }
}

export default RangeFilter;
