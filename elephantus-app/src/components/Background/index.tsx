import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  <SafeAreaView style={{ flex: 1 }}>
    {Platform.OS === 'ios' ? (
      // IOS
      <Styled.KeyboardAvoiding behavior="padding" enabled>
        <Container scrollable={scrollable}>{children}</Container>
      </Styled.KeyboardAvoiding>
    ) : (
      // Android
      <Container scrollable={scrollable}>{children}</Container>
    )}
  </SafeAreaView>
);

export default Background;
