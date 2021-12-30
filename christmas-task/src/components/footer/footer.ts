import BaseComponent from 'components//base-component';
import LogoRsschool from 'components/logo-rsschool/logo-rsschool';
import DevInfo from 'components//dev-info/dev-info';
import 'components/footer/footer.scss';

class Footer extends BaseComponent {
  constructor(parentNode: HTMLElement, tagName: string, className: string) {
    super(parentNode, tagName, className);
    this.createFooter();
  }

  private createFooter() {
    const footerContainer = new BaseComponent(this.node, 'div', 'container footer__container');
    const logoRsschool = new LogoRsschool(footerContainer.node, 'a', 'logo-rsschool');
    const devInfo = new DevInfo(footerContainer.node, 'div', 'dev-info');
  }
}

export default Footer;
