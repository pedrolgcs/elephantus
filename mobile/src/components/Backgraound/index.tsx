import React from 'react';
import { Platform, SafeAreaView } from 'react-native';
import * as Styled from './styles';

interface IBackgroundProps {
  scrollable?: boolean;
}

const Container: React.FC<IBackgroundProps> = ({ children, scrollable }) => (
  <>
    {scrollable ? (
      <Styled.Scroll
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Styled.Background>{children}</Styled.Background>
      </Styled.Scroll>
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
      // IOS
      <SafeAreaView style={{ flex: 1 }}>
        <Styled.KeyboardAvoiding behavior="padding" enabled>
          <Container scrollable={scrollable}>{children}</Container>
        </Styled.KeyboardAvoiding>
      </SafeAreaView>
    ) : (
      // Android
      <Container scrollable={scrollable}>{children}</Container>
    )}
  </>
);

export default Background;
