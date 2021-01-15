import React, { useCallback, useState } from 'react';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

// components
import Input from '../Input';

interface InputMaskProps extends TextInputMaskProps {
  name: string;
  icon?: string;
}

const InputMask: React.FC<InputMaskProps> = ({ type, ...rest }) => {
  const [value, setValue] = useState('');
  const [rawValue, setRawValue] = useState('');

  const handleOnChangeText = useCallback((maskedValue, unmaskedValue) => {
    setValue(maskedValue);
    setRawValue(unmaskedValue);
  }, []);

  return (
    <TextInputMask
      type={type}
      includeRawValueInChangeText
      value={value}
      onChangeText={handleOnChangeText}
      customTextInput={Input}
      customTextInputProps={{
        rawValue,
        ...rest,
      }}
      {...rest}
    />
  );
};

export default InputMask;
