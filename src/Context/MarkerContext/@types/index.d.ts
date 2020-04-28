interface IMarker {
  OverlayID: number;
  title: string;
  latlng: any;
  marker?: any;
  overlay?: any;
  handleOverlay?: () => void;
  content?: string;
}

interface IMarkerContext {
  markers: Array<IMarker>;
  renderMarkers?: (map: any) => void;
}
