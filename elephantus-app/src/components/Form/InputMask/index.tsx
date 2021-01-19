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
  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  // refs
  const inputValueRef = useRef<InputMaskReference>({
    rawValue: defaultValue,
    value: defaultValue,
  } as InputMaskReference);

  // states
  const [value, setValue] = useState(defaultValue);
  const [rawValue, setRawValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => setIsFocused(true), []);

  const handleInputBlue = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  const handleOnChangeText = useCallback((maskedValue, unmaskedValue) => {
    setValue(maskedValue);
    setRawValue(unmaskedValue);
  }, []);

  useEffect(() => {
    inputValueRef.current.value = value;
    inputValueRef.current.rawValue = rawValue;
  }, [value, rawValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
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
    <Styled.Container isFocused={isFocused} isErrored={!!error}>
      {icon && (
        <Styled.InputIcon
          name={icon}
          size={20}
          isErrored={!!error}
          isFocused={isFocused}
          isFilled={isFilled}
        />
      )}
      <Styled.TextInput
        ref={inputValueRef}
        value={value}
        includeRawValueInChangeText
        onBlur={handleInputBlue}
        onFocus={handleInputFocus}
        onChangeText={handleOnChangeText}
        placeholderTextColor="#b1b1b1"
        {...rest}
      />
    </Styled.Container>
  );
};

export default InputMask;
