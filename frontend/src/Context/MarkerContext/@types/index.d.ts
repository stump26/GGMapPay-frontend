interface IMarker {
  MarkerID: number;
  StoreName: string;
  addr: string;
  jibun: string;
  latlng: PositionType;
  handleOverlay?: () => void;
}

interface IMarkerContext {
  markers: Array<IMarker>;
}
