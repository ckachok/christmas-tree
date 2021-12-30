import BaseComponent from 'components/base-component';
import { LOGO_RSSCHOOL_HREF } from 'constants/constants';
import 'components/logo-rsschool/logo-rsschool.scss';

class LogoRsschool extends BaseComponent<HTMLAnchorElement> {
  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.node.href = LOGO_RSSCHOOL_HREF;
    this.node.target = '_blank';
  }
}

export default LogoRsschool;
