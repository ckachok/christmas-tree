import BaseComponent from 'components/base-component';
import { IToyData } from 'types/interfaces';
import preloadPicture from 'utils/secondary-functions';
import { SRC_IMAGES_TOYS, TOY_CARD_PROPERTY_NAMES } from 'constants/constants';
import 'components/toy-card/toy-card.scss';

class ToyCard extends BaseComponent {
  public toyData: IToyData;
  public onToyCard: () => void;

  constructor(parentNode: HTMLElement, tagName: string, className: string, toyData: IToyData) {
    super(parentNode, tagName, className);
    this.toyData = toyData;
    this.createToyCard();
  }

  private createCardName(): void {
    const name = new BaseComponent(this.node, 'h2', 'toy-card__name', this.toyData.name);
  }

  private createCardImage(): void {
    const link = `${SRC_IMAGES_TOYS}${this.toyData.num}.png`;
    const image = new BaseComponent<HTMLImageElement>(this.node, 'img', 'toy-card__image');
    image.node.alt = `toy${this.toyData.num}`;
    preloadPicture(link, image.node);
  }

  private createCardDescription(): void {
    const description = new BaseComponent(this.node, 'div', 'toy-card__description');

    const descProperties = [
      this.toyData.count, this.toyData.year, this.toyData.shape,
      this.toyData.color, this.toyData.size, this.toyData.favorite
    ];
    descProperties.forEach((value, index) => {
      const propertyName = new BaseComponent(description.node, 'p', '', TOY_CARD_PROPERTY_NAMES[index]);
      const propertyValue = new BaseComponent(propertyName.node, 'span', '', value);
    });
  }

  private createToyCard(): void {
    this.node.id = `toy-card-${this.toyData.num}`;
    this.createCardName();
    this.createCardImage();
    this.createCardDescription();
    this.node.addEventListener('click', () => {
      this.node.classList.toggle('favorite');
      this.onToyCard();
    });
  }
}

export default ToyCard;
