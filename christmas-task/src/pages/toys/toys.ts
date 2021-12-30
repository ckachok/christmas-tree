import BaseComponent from 'components/base-component';
import Header from 'components/header/header';
import Settings from 'components/settings/settings';
import ToyCard from 'components/toy-card/toy-card';
import Page from 'pages/page';
import getToysData from 'services/services';
import { NO_MATCH_MESSAGE, SORTING } from 'constants/constants';
import 'pages/toys/toys.scss';

class ToysPage extends Page {
  protected header: Header;
  private settings: Settings;
  private toysContainer: BaseComponent<HTMLElement>;
  private originalSetCards: ToyCard [] = [];
  private filteredSetCard: ToyCard[];
  private favoritesError: HTMLElement;
  private favoritesCounter: HTMLElement;

  constructor(parentNode: HTMLElement, id: string) {
    super(parentNode, id);
  }

  private showFilteredCards(): void {
    this.toysContainer.node.innerHTML = '';
    if (!this.filteredSetCard.length) {
      this.toysContainer.node.classList.add('empty');
      this.toysContainer.node.innerText = NO_MATCH_MESSAGE;
    } else {
      this.filteredSetCard.forEach(card => {
        this.toysContainer.node.append(card.node);
      });
      this.toysContainer.node.classList.remove('empty');
    }
  }

  private applySearch(): void {
    const searchValue = this.settings.search.node.value.toLowerCase();

    if (!this.filteredSetCard || !this.filteredSetCard.length) {
      this.filteredSetCard = this.originalSetCards.slice(0);
    }

    this.filteredSetCard = this.filteredSetCard.filter(card => card.toyData.name.toLowerCase().includes(searchValue));

    this.showFilteredCards();

    if (!searchValue) {
      this.applyFilters();
    }
  }

  private applySorting(): void {
    const select = this.settings.sorting.select.node;

    if (!this.filteredSetCard) {
      this.filteredSetCard = this.originalSetCards.slice(0);
    }

    this.filteredSetCard.sort((a, b) => {
      if (select.value === SORTING.byNameMax) {
        if (a.toyData.name < b.toyData.name) return -1;
      } else if (select.value === SORTING.byNameMin) {
        if (a.toyData.name > b.toyData.name) return -1;
      } else if (select.value === SORTING.byYearMax) {
        if (+a.toyData.year < +b.toyData.year) return -1;
      } else if (select.value === SORTING.byYearMin) {
        if (+a.toyData.year > +b.toyData.year) return -1;
      }
      return 0;
    });

    this.showFilteredCards();
  }

  private applyRangeFilters(): void {
    const minValueFilterByCopies = this.settings.filters.filterByCopies.minRangeValue.node.innerText;
    const maxValueFilterByCopies = this.settings.filters.filterByCopies.maxRangeValue.node.innerText;
    const minValueFilterByYears = this.settings.filters.filterByYears.minRangeValue.node.innerText;
    const maxValueFilterByYears = this.settings.filters.filterByYears.maxRangeValue.node.innerText;

    this.filteredSetCard = this.filteredSetCard.filter(
      card => +card.toyData.count >= +minValueFilterByCopies && +card.toyData.count <= +maxValueFilterByCopies
    );
    this.filteredSetCard = this.filteredSetCard.filter(
      card => +card.toyData.year >= +minValueFilterByYears && +card.toyData.year <= +maxValueFilterByYears
    );
  }

  private applyValueFilters(): void {
    const activeBtnShape = this.settings.filters.shapeFilter.activeFilterButtons;
    const activeBtnColor = this.settings.filters.colorFilter.activeFilterButtons;
    const activeBtnSize = this.settings.filters.sizeFilter.activeFilterButtons;
    const activeBtnFilters = [activeBtnShape, activeBtnColor, activeBtnSize];
    activeBtnFilters.forEach(setButtons => {
      if (setButtons && setButtons.length) {
        this.filteredSetCard = this.filteredSetCard
          .filter(card => setButtons
            .some(button => button.id === card.toyData.shape || button.id === card.toyData.color || button.id === card.toyData.size));
      }
    });
  }

  private applyFavoritesFilter(): void {
    const activeBtnFavorite = this.settings.filters.favoritesFilter.activeFilterButton;

    if (activeBtnFavorite) {
      this.filteredSetCard = this.filteredSetCard.filter(card => card.toyData.favorite === 'yes');
    }
  }

  private applyFilters(): void {
    this.filteredSetCard = this.originalSetCards.slice(0);

    this.applyRangeFilters();
    this.applyValueFilters();
    this.applyFavoritesFilter();
    this.applySorting();
  }

  private resetFilters(): void {
    this.toysContainer.node.classList.remove('empty');
    this.filteredSetCard = this.originalSetCards.slice(0);
    this.toysContainer.node.innerHTML = '';
    this.filteredSetCard.forEach(card => {
      this.toysContainer.node.append(card.node);
    });
    this.applySorting();
  }

  private resetSettings(): void {
    this.resetFilters();

    this.filteredSetCard.forEach(card => {
      card.node.classList.remove('favorite');
    });

    this.header.favoritesCounter.counter.innerText = '0';
    this.header.favoritesCounter.errorMessage.classList.remove('active');
  }

  private startRangeFiltersCycle(): void {
    const rangeFilters = [
      this.settings.filters.filterByCopies.filter.noUiSlider,
      this.settings.filters.filterByYears.filter.noUiSlider
    ];
    rangeFilters.forEach(rangeFilter => {
      rangeFilter.on('update', () => {
        if (this.originalSetCards) {
          this.applyFilters();
        }
      });
    });
  }

  private startValueFiltersCycle(): void {
    this.settings.filters.shapeFilter.onFilter = () => this.applyFilters();
    this.settings.filters.colorFilter.onFilter = () => this.applyFilters();
    this.settings.filters.sizeFilter.onFilter = () => this.applyFilters();
    this.settings.filters.favoritesFilter.onFilter = () => this.applyFilters();
  }

  private startToyPageCycle(): void {
    this.settings.search.onSearch = () => this.applySearch();
    this.settings.sorting.onSorting = () => this.applySorting();

    this.startRangeFiltersCycle();
    this.startValueFiltersCycle();

    this.settings.onResetFilters = () => this.resetFilters();
    this.settings.onResetSettings = () => this.resetSettings();
  }

  private addToyCardToFavorites(card: HTMLElement): void {
    this.favoritesError = this.header.favoritesCounter.errorMessage;
    this.favoritesCounter = this.header.favoritesCounter.counter;
    let counterValue = +this.favoritesCounter.innerText;

    if (card.classList.contains('favorite')) {
      if (counterValue === 20) {
        card.classList.remove('favorite');
        this.favoritesError.classList.add('active');
      } else {
        counterValue += 1;
      }
    } else {
      this.favoritesError.classList.remove('active');
      counterValue -= 1;
    }

    this.favoritesCounter.innerText = counterValue.toString();
  }

  private createSetToyCards(parentNode: HTMLElement): void {
    getToysData().then(toysData => {
      toysData.forEach(toyData => {
        const card = new ToyCard(parentNode, 'div', 'toy-card', toyData);
        card.onToyCard = () => {
          this.addToyCardToFavorites(card.node);
        };

        this.originalSetCards.push(card);
      });
    });
  }

  protected createMain(id: string): void {
    this.main = new BaseComponent(this.parentNode, 'main', 'main');
    this.main.node.id = id;

    const mainContainer = new BaseComponent(this.main.node, 'div', 'container main__container');
    this.settings = new Settings(mainContainer.node, 'div', 'settings');
    this.toysContainer = new BaseComponent(mainContainer.node, 'div', 'toys-container');
    this.createSetToyCards(this.toysContainer.node);
    this.startToyPageCycle();
  }
}

export default ToysPage;
