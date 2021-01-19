import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
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

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  // refs
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const inputElementRef = useRef<any>(null);

  // states
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => setIsFocused(true), []);

  const handleInputBlue = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

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
        ref={inputElementRef}
        keyboardAppearance="default"
        placeholderTextColor="#d1d1d1"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlue}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Styled.Container>
  );
};

export default forwardRef(Input);
