interface IMapContext {
  center?: PositionType;
  posMove?: (map: any) => void;
  mapInnerContents?: React.ReactElement;
  setMapinnerContents?: React.Dispatch;
}
