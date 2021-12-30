import { TOYS_DATA_URL } from 'constants/constants';
import { IToyData } from 'types/interfaces';

const getToysData = async (): Promise<IToyData[]> => {
  const res = await fetch(TOYS_DATA_URL);
  const dataToys: IToyData[] = await res.json();
  return dataToys;
};

export default getToysData;
