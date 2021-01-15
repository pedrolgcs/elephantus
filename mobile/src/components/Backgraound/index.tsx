import React from 'react';
import { Platform, SafeAreaView } from 'react-native';
import * as Styled from './styles';

interface IBackgroundProps {
  scrollable?: boolean;
}

const Container: React.FC<IBackgroundProps> = ({
  children,
  scrollable = false,
}) => (
  <>
    {scrollable ? (
      <Styled.Background>
        <Styled.Scroll>{children}</Styled.Scroll>
      </Styled.Background>
    ) : (
      <Styled.Background>{children}</Styled.Background>
    )}
  </>
);

const Background: React.FC<IBackgroundProps> = ({
  children,
  scrollable = false,
}) => (
  <>
    {Platform.OS === 'ios' ? (
      <SafeAreaView style={{ flex: 1 }}>
        <Container scrollable={scrollable}>{children}</Container>
      </SafeAreaView>
    ) : (
      <Container scrollable={scrollable}>{children}</Container>
    )}
  </>
);

export default Background;
