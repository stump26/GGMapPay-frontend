interface IMarker {
  MarkerID: string;
  StoreName: string;
  addr: string;
  jibun: string;
  telno: string;
  latlng: PositionType;
  handleOverlay?: () => void;
}

interface IMarkerContext {
  markers: Array<IMarker>;
  setMarkers: React.Dispatch;
}
