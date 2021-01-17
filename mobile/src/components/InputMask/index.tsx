import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

// styles
import * as Styled from './styles';

interface InputMaskProps extends Omit<TextInputMaskProps, 'defaultValue'> {
  name: string;
  icon?: string;
}
interface InputMaskReference extends TextInputMask {
  value: string;
  rawValue: string;
}

const InputMask: React.FC<InputMaskProps> = ({ name, icon, ...rest }) => {
  const inputRef = useRef<InputMaskReference>(null);
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  const [value, setValue] = useState(defaultValue);
  const [rawValue, setRawValue] = useState(defaultValue);

  const handleOnChangeText = useCallback((maskedValue, unmaskedValue) => {
    setValue(maskedValue);
    setRawValue(unmaskedValue);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
      inputRef.current.rawValue = rawValue;
    }
  }, [value, rawValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref: InputMaskReference) => {
        return ref.rawValue;
      },
      setValue: (_, newValue: string) => {
        setValue(newValue);
        setRawValue(newValue);
      },
      clearValue: () => {
        setValue('');
        setRawValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Styled.Container>
      {icon && <Styled.InputIcon name={icon} size={20} color="#3F4045" />}
      <Styled.TextInput
        ref={inputRef}
        value={value}
        includeRawValueInChangeText
        onChangeText={handleOnChangeText}
        placeholderTextColor="#b1b1b1"
        {...rest}
      />
    </Styled.Container>
  );
};

export default InputMask;
