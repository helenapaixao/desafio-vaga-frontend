import React, { InputHTMLAttributes, useRef } from 'react';
import { Container } from './styles';

import { IconBaseProps } from 'react-icons';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name?: string;
    containerStyle?: object;
    icon?: React.ComponentType<IconBaseProps>;
}

const SearchInput: React.FC<InputProps> = ({
    name,
    value = '',
    containerStyle = {},
    icon: Icon,
    ...rest
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Container style={containerStyle} data-testid="input-container">
            {Icon && <Icon name="search" size={20} />}
            <input ref={inputRef} {...rest} />
        </Container>
    );
};

export default SearchInput;
