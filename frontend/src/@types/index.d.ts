export {};

declare global {
  interface Window {
    kakao: any;
    Navigator: ant;
  }

  type PositionType = {
    longitude: number;
    latitude: number;
  };
}
