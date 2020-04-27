interface IMarker {
  title: string;
  latlng: any;
}

interface IMarkerContext {
  markers: Array<IMarker>;
  renderMarkers?: (map: any) => void;
}
