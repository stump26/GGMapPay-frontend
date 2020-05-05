import React, { useContext } from 'react';

import { LoadingContext } from '~/Context/LoadingContext';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

type LoadingContainerProps = {
  visible: boolean;
};

const SearchLoading = styled(ReactLoading).attrs({
  type: 'spin',
})`
  margin: auto;
  > svg {
    fill: #ebebeb;
  }
`;

const LoadingContainer = styled.div<LoadingContainerProps>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: ${(props: LoadingContainerProps) => (props.visible ? 'flex' : 'none')};
  top: 0;
  background-color: #02010ebd;
  z-index: 5;
`;

const LodingCurtain: React.FC = () => {
  const { isLoadingVisible } = useContext(LoadingContext);
  return (
    <LoadingContainer visible={isLoadingVisible}>
      <SearchLoading />
    </LoadingContainer>
  );
};

export default LodingCurtain;
