import BaseComponent from 'components/base-component';
import { FAVORITES_FILTER_DATA } from 'constants/constants';
import 'components/filters/favorites/favorites.scss';

class FavoritesFilter extends BaseComponent {
  private inputCheckbox: BaseComponent<HTMLInputElement>;
  public activeFilterButton: HTMLInputElement;
  public onFilter: () => void;

  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.createFilter();
  }

  private createInputCheckbox(): void {
    this.inputCheckbox = new BaseComponent<HTMLInputElement>(this.node, 'input', 'filters-favorites__checkbox');
    this.inputCheckbox.node.type = 'checkbox';
    this.inputCheckbox.node.id = FAVORITES_FILTER_DATA.id;
    this.handleCheckboxClick(this.inputCheckbox.node);
  }

  private createLabel(): void {
    const label = new BaseComponent(this.node, 'label', 'filters-favorites__label');
    label.node.setAttribute('for', FAVORITES_FILTER_DATA.id);
  }

  private createFilter(): void {
    const title = new BaseComponent(this.node, 'h3', 'filters__text', FAVORITES_FILTER_DATA.title);
    this.createInputCheckbox();
    this.createLabel();
  }

  private handleCheckboxClick(checkbox: HTMLInputElement): void {
    checkbox.addEventListener('click', () => {
      this.getActiveFilterButtons(checkbox);
      this.onFilter();
    });
  }

  private getActiveFilterButtons(checkbox: HTMLInputElement): void {
    this.activeFilterButton = checkbox.checked ? checkbox : null;
  }

  resetFilter(): void {
    this.activeFilterButton = null;
    this.inputCheckbox.node.checked = false;
  }
}

export default FavoritesFilter;
