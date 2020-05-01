export {};

declare global {
  interface Window {
    kakao: any;
    Navigator: any;
    __APOLLO_STATE__: any;
  }

  type PositionType = {
    longitude: number;
    latitude: number;
  };
}
