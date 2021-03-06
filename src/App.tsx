import KakaoMap from './Components/KakaoMap';
import LodingCurtain from './Components/LodingCurtain';
import Modal from './Components/Modal';
import React from 'react';
import SearchBar from './Components/SearchBar';
import styled from 'styled-components';

const FloatContents = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
`;

const MapContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 9;
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <div className="App">
      <MapContainer>
        <KakaoMap />
        <FloatContents>
          <SearchBar />
        </FloatContents>
        <Modal />
        <LodingCurtain />
      </MapContainer>
    </div>
  );
}

export default App;
