import BaseComponent from 'components/base-component';
import { SETTINGS_TITLE, SORTING, SORTING_TYPES } from 'constants/constants';
import 'components/sorting/sorting.scss';

class Sorting extends BaseComponent {
  public select: BaseComponent<HTMLSelectElement>;
  private optionTitle: BaseComponent<HTMLOptionElement>;
  public onSorting: () => void;

  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.createSorting();
  }

  createSelect(): void {
    this.select = new BaseComponent<HTMLSelectElement>(this.node, 'select', 'sorting__select');
    this.optionTitle = new BaseComponent<HTMLOptionElement>(this.select.node, 'option', '', SORTING.title);
    SORTING_TYPES.forEach(type => {
      const option = new BaseComponent<HTMLOptionElement>(this.select.node, 'option', '', type);
    });
    this.select.node.onchange = () => this.onSorting();
  }

  createSorting(): void {
    const title = new BaseComponent(this.node, 'h2', 'settings__title', SETTINGS_TITLE.sorting);
    this.createSelect();
  }

  resetSorting(): void {
    this.optionTitle.node.selected = true;
  }
}

export default Sorting;
