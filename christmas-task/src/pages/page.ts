import BaseComponent from 'components/base-component';
import Header from 'components/header/header';
import Footer from 'components/footer/footer';

abstract class Page {
  protected parentNode: HTMLElement;
  protected header: Header;
  protected footer: Footer;
  protected main: BaseComponent<HTMLElement>;

  constructor(parentNode: HTMLElement, id: string) {
    this.parentNode = parentNode;
    this.header = new Header(this.parentNode, 'header', 'header');
    this.createMain(id);
    this.footer = new Footer(this.parentNode, 'footer', 'footer');
  }

  protected createMain(id: string) {
    this.main = new BaseComponent(this.parentNode, 'main', 'main');
    this.main.node.id = id;
    const mainContainer = new BaseComponent(this.main.node, 'div', 'container main__container');
  }
}

export default Page;
