interface IMapContext {
  map: any;
  setMap?: React.Dispatch;
  center?: PositionType;
  posMove?: (map: any) => void;
  mapInnerContents?: React.ReactElement;
  setMapinnerContents?: React.Dispatch;
}
