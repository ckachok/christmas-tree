import BaseComponent from 'components/base-component';
import Search from 'components/search/search';
import Sorting from 'components/sorting/sorting';
import Filters from 'components/filters/filters';
import { SETTINGS_BUTTON_NAMES } from 'constants/constants';
import 'components/settings/settings.scss';

class Settings extends BaseComponent {
  public search: Search;
  public sorting: Sorting;
  public filters: Filters;
  public onResetFilters: () => void;
  public onResetSettings: () => void;

  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.search = new Search(this.node, 'input', 'search');
    this.sorting = new Sorting(this.node, 'div', 'sorting');
    this.filters = new Filters(this.node, 'div', 'filters');
    this.createSettingsButton();
  }

  private changeStyleButton(button: HTMLElement): void {
    button.classList.add('reset-button_active');

    button.addEventListener('animationend', () => {
      button.classList.remove('reset-button_active');
    });
  }

  private createSettingsButton(): void {
    const buttonsContainer = new BaseComponent(this.node, 'div', 'settings__buttons').node;

    const filtersResetButton = new BaseComponent(
      buttonsContainer,
      'button',
      'reset-button',
      SETTINGS_BUTTON_NAMES.resetFilters
    );
    filtersResetButton.node.addEventListener('click', () => {
      this.changeStyleButton(filtersResetButton.node);
      this.filters.resetFilters();
      this.onResetFilters();
    });

    const settingsResetButton = new BaseComponent(
      buttonsContainer,
      'button',
      'reset-button',
      SETTINGS_BUTTON_NAMES.resetSettings
    );
    settingsResetButton.node.addEventListener('click', () => {
      this.changeStyleButton(settingsResetButton.node);
      this.filters.resetFilters();
      this.sorting.resetSorting();
      this.search.resetSearch();
      this.onResetSettings();
    });
  }
}

export default Settings;
