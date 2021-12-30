import BaseComponent from 'components/base-component';
import { DEV_INFO } from 'constants/constants';
import 'components/dev-info/dev-info.scss';

class DevInfo extends BaseComponent {
  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.createDevInfo();
  }

  private createDevInfo(): void {
    const developer = new BaseComponent<HTMLAnchorElement>(this.node, 'a', 'dev-info__developer', DEV_INFO.developer);
    developer.node.href = DEV_INFO.href;
    developer.node.target = '_blank';

    const year = new BaseComponent(this.node, 'span', 'dev-info__year', DEV_INFO.year);
  }
}

export default DevInfo;
