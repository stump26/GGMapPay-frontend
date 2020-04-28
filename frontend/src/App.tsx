import React from 'react';
import KakaoMap from './Components/KakaoMap';
import styled from 'styled-components';
import SearchBar from './Components/SearchBar';

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
      </MapContainer>
    </div>
  );
}

export default App;
