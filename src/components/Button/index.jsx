
import PropTypes from "prop-types";
import { StyledButton } from "./style.js";

export function Button ({children, ...props}) {
    return <StyledButton {...props}> {children} </StyledButton>;
}
Button.propTypes = {
    children: PropTypes.string
};