
import PropTypes from "prop-types";
import { StyledButton } from "./style.js";

export function Button ({children}) {
    return <StyledButton > {children} </StyledButton>;
}
Button.propTypes = {
    children: PropTypes.string.isRequired,
};