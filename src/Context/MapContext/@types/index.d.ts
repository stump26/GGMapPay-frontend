interface IMapContext {
  map: any;
  setMapHandle?: (map: any) => void;
  center?: PositionType;
  posMove?: (map: any) => void;
  mapInnerContents?: React.ReactElement;
  setMapinnerContents?: React.Dispatch;
  clustererM?: any;
}
