import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTypography = styled(Typography)(({theme}) => ({
    margin: 10,
}));

export default function TextUI({children, ...other}){
    return <StyledTypography {...other}>{children}</StyledTypography>;
}