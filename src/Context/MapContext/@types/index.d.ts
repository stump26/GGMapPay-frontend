type IMap = any;
interface IMapContext {
  map?: IMap;
  center?: PositionType;
  posMove?: (pos: PositionType) => void;
  setMap?: React.Dispatch<any>;
}
