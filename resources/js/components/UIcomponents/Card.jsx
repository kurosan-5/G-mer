import { Card } from "@mui/material";
import { styled } from "@mui/material";

const StyledCard = styled(Card)(({theme}) => ({
    margin: 15
}))

export default function CardUI({children, ...other}){
    return <StyledCard {...other}>{children}</StyledCard>
}