import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

// styles
import * as Styled from './styles';

interface InputMaskRef extends TextInputMask {
  value: string;
  rawValue: string;
}

interface InputMaskProps extends Omit<TextInputMaskProps, 'defaultValue'> {
  name: string;
  icon?: string;
}

const InputMask: React.FC<InputMaskProps> = ({
  name,
  icon,
  onChangeText,
  ...rest
}) => {
  const inputRef = useRef<InputMaskRef>(null);
  const { fieldName, registerField, defaultValue = '' } = useField(name);

  const [value, setValue] = useState(defaultValue);
  const [rawValue, setRawValue] = useState(defaultValue);

  const mergeOnChaneText = useCallback(
    (text, rawValeu) => {
      setValue(text);
      setRawValue(rawValeu);

      onChangeText && onChangeText(text, rawValeu);
    },
    [onChangeText],
  );

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
      getValue: (ref: InputMaskRef) => {
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
        onChangeText={mergeOnChaneText}
        {...rest}
      />
    </Styled.Container>
  );
};

export default InputMask;
