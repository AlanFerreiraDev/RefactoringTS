import { useEffect, useRef, useState, useCallback } from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';
import { IconBaseProps } from 'react-icons';

interface InputProps {
  name: string;
  // Esse icon, precisei ir no package.json ver a lib, para instalar os types dela
  // Notar que IconBaseProps vem direto do REACT-ICONS
  icon?: React.ComponentType<IconBaseProps>;
  placeholder?: string;
}

export default function Input({ name, icon: Icon, ...rest }: InputProps) {
  // Adiciono no useRef, pq vou usar ele no Input
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
}
