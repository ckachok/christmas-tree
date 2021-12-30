import BaseComponent from 'components/base-component';
import { IValueFilterData } from 'types/interfaces';
import 'components/filters/value/value.scss';

class ValueFilter extends BaseComponent {
  private filterData: IValueFilterData;
  public activeFilterButtons: Element[];
  public onFilter: () => void;

  constructor(parentNode: HTMLElement, tagName: string, className: string, filterData: IValueFilterData) {
    super(parentNode, tagName, className);
    this.filterData = filterData;
    this.createFilter();
  }

  private createFilterButtons(): void {
    const buttonsContainer = new BaseComponent(this.node, 'div', 'filters-value__buttons');
    this.filterData.typeValues.forEach(typeValue => {
      const button = new BaseComponent(buttonsContainer.node, 'button', this.filterData.buttonStyle);
      button.node.id = typeValue;
      button.node.setAttribute('aria-label', typeValue);
      this.handleButtonClick(buttonsContainer.node, button.node);
    });
  }

  private createFilter(): void {
    const title = new BaseComponent(this.node, 'h3', 'filters__text', this.filterData.title);
    this.createFilterButtons();
  }

  private getActiveFilterButtons(buttonsContainer: HTMLElement): void {
    this.activeFilterButtons = [];
    const allFilterButtons = Array.from(buttonsContainer.children);
    allFilterButtons.forEach(button => {
      if (button.classList.contains('active')) {
        this.activeFilterButtons.push(button);
      }
    });
  }

  private handleButtonClick(buttonsContainer: HTMLElement, button: HTMLElement): void {
    button.addEventListener('click', () => {
      button.classList.toggle('active');
      this.getActiveFilterButtons(buttonsContainer);
      this.onFilter();
    });
  }

  resetFilter(): void {
    if (!this.activeFilterButtons) return;

    this.activeFilterButtons.forEach(button => {
      button.classList.remove('active');
    });
    this.activeFilterButtons = [];
  }
}

export default ValueFilter;
