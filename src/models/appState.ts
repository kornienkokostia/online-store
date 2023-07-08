import BagItem from './bagItem';

export default interface AppStateInterface {
  goodsOrientation: string;
  goodsInBag: BagItem[];
}
