import React, { useEffect, useRef, useState } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

// styles
import * as Styled from './styles';

export interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
}
interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const inputElementRef = useRef<any>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Styled.Container>
      {icon && <Styled.InputIcon name={icon} size={20} color="#3F4045" />}
      <Styled.TextInput
        ref={inputElementRef}
        keyboardAppearance="default"
        placeholderTextColor="#d1d1d1"
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Styled.Container>
  );
};

export default Input;
