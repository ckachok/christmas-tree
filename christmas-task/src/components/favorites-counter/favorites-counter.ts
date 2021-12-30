import BaseComponent from 'components/base-component';
import { DEFAULT_VALUE_FAVORITES_COUNTER, FAVORITES_COUNTER_ERROR_TEXT } from 'constants/constants';
import 'components/favorites-counter/favorites-counter.scss';

class FavoritesCounter extends BaseComponent {
  public counter: HTMLElement;
  public errorMessage: HTMLElement;

  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.createCounter();
    this.createErrorMessage();
  }

  private createCounter(): void {
    this.counter = new BaseComponent(this.node, 'span', 'favorites__counter', DEFAULT_VALUE_FAVORITES_COUNTER).node;
  }

  private createErrorMessage(): void {
    this.errorMessage = new BaseComponent(this.node, 'span', 'favorites__error', FAVORITES_COUNTER_ERROR_TEXT).node;
  }
}

export default FavoritesCounter;
