import styled from "styled-components";
import ReactSelect from "react-select";
import {Button} from "../../../components/Button";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;
export const Form = styled.form`
    border-radius: 20px;
    background-color: ${(props) => props.theme.black};
    padding: 35px;
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;
export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;
export const Label = styled.label`
    color: ${(props) => props.theme.white};
    font-size: 14px;
`;
export const Input = styled.input`
    width: 100%;
    height: 48px;
    border-radius: 5px;
    padding: 0 12px;
    border: none;
`;
export const LabelUpload = styled.label`
    cursor: pointer;
    border: 1px dashed  ${(props) => props.theme.white};
    border-radius: 5px;
    padding: 10px;
    display: flex;
    margin-top: 20px 0; 
    color: ${(props) => props.theme.white};

≥ svg {
    width: 24px;
    height: 24px;
    fill: ${(props) => props.theme.white};
}
    input {
        display: none;
    }

`;

export const Select = styled(ReactSelect)`

`;
export const SubmitButton = styled(Button)`
    margin-top: 80px;
`;
export const ErrorMessage = styled.span`
    color: ${(props) => props.theme.darkRed};
    font-size: 12px;
    line-height: 14px;
    font-weight: 600;
    margin-top: 4px;
`;

export const CheckboxContainer = styled.div`
    display: flex;
    gap: 18px;
    margin-top: 10px;
    cursor: pointer;
    
   
`;