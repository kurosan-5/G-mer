import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const Hukidashi= styled(({ className, ...props }) => (
    <Tooltip classes={{ tooltip: className }} {...props} />
  ))({
    tooltip: {
      padding: "20px",
      backgroundColor: "black",
    },
    '& .MuiTooltip-arrow': {
      fontSize: "20px",
      color: "gray",
    },
    '&[data-popper-placement*="top"], &[data-popper-placement*="right"], &[data-popper-placement*="left"], &[data-popper-placement*="bottom"]': {
      
    },
  });

export default Hukidashi;