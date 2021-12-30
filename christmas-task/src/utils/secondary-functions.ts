const preloadPicture = (link: string, element: HTMLImageElement): void => {
  const img = new Image();
  const toyImage = element;
  img.src = link;
  img.onload = () => {
    toyImage.src = link;
  };
};

export default preloadPicture;
