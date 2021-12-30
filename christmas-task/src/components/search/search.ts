import BaseComponent from 'components/base-component';
import { SEARCH_PLACEHOLDER } from 'constants/constants';
import 'components/search/search.scss';

class Search extends BaseComponent<HTMLInputElement> {
  public onSearch: () => void;

  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.node.type = 'search';
    this.node.placeholder = SEARCH_PLACEHOLDER;
    this.node.focus();
    this.node.addEventListener('input', () => {
      this.onSearch();
    });
    this.node.addEventListener('search', () => {
      this.onSearch();
    });
  }

  resetSearch(): void {
    this.node.value = '';
  }
}

export default Search;
