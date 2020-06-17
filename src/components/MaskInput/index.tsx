import React, {
    useRef,
    useEffect,
    useState,
    useCallback,
} from 'react';
import ReactInputMask, { Props as InputProps } from 'react-input-mask';
import { Container, Error } from './styles';
import { FiAlertCircle } from 'react-icons/fi';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

interface Props extends InputProps {
    name: string;
    containerStyle?: object;
    icon?: React.ComponentType<IconBaseProps>;
}
const InputMask: React.FC<Props> = ({
    name,
    containerStyle = {},
    icon: Icon,
    ...rest
}) => {
    const inputRef = useRef(null);
 
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const { fieldName, defaultValue, error, registerField } = useField(name);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!inputRef.current);
    }, []);

 

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',

            setValue(ref: any, value: string) {
                ref.setInputValue(value);
            },
            clearValue(ref: any) {
                ref.setInputValue('');
            },
        });
    }, [fieldName, registerField]);

    return (
        <Container
            style={containerStyle}
            isErrored={!!error}
            isFilled={isFilled}
            isFocused={isFocused}
        >
            {Icon && <Icon size={20} />}
            <ReactInputMask
            ref={inputRef}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
             
                {...rest}
            />
            {error && (
                <Error title={error}>
                    <FiAlertCircle color="#c53030" size={20} />
                </Error>
            )}
        </Container>
    );
};
export default InputMask;
