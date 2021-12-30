import BaseComponent from 'components/base-component';
import Logo from 'components/logo-app/logo-app';
import Navigation from 'components/nav/nav';
import FavoritesCounter from 'components/favorites-counter/favorites-counter';
import 'components/header/header.scss';

class Header extends BaseComponent {
  private logo: Logo;
  private nav: Navigation;
  public favoritesCounter: FavoritesCounter;

  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.createHeader();
  }

  private changeStyles(activeButton: HTMLAnchorElement): void {
    const navButtons = [this.logo.node, this.nav.toysButton.node, this.nav.christmasTreeButton.node];
    navButtons.forEach(button => {
      button.classList.remove('active');
    });

    activeButton.classList.add('active');

    if (activeButton === this.logo.node) {
      this.favoritesCounter.node.classList.remove('visible');
    } else {
      this.favoritesCounter.node.classList.add('visible');
    }
  }

  private startNavigationCycle(): void {
    this.logo.onHome = () => {
      this.changeStyles(this.logo.node);
    };
    this.nav.onToys = () => {
      this.changeStyles(this.nav.toysButton.node);
    };
    this.nav.onChristmasTree = () => {
      this.changeStyles(this.nav.christmasTreeButton.node);
    };
  }

  private createHeader(): void {
    const headerContainer = new BaseComponent(this.node, 'div', 'container header__container').node;
    this.logo = new Logo(headerContainer, 'a', 'logo');
    this.nav = new Navigation(headerContainer, 'nav', 'nav');
    this.favoritesCounter = new FavoritesCounter(headerContainer, 'div', 'favorites visible');
    this.startNavigationCycle();
  }
}

export default Header;
