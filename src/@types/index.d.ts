export {};

declare global {
  interface Window {
    kakao: any;
    Navigator: ant;
  }

  type PositionType = {
    long: number;
    lat: number;
  };
}
