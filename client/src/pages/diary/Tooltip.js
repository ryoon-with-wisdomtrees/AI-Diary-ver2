import styled, {keyframes} from "styled-components";

const Tooltip = ({children, message})=> {
	return (
	  <TooltipContainer>
	    {children}
	    <TooltipContent className="tooltip">{message}</TooltipContent>
	  </TooltipContainer>
	);
}

const TooltipContainer = styled.div`
  display: inline-block;
//   position: relative;
//   width: fit-content;
//   height: fit-content;

  &:hover > .tooltip,
  &:active > .tooltip {
    display: block;
  }
`;

const TooltipContent = styled.div`
  display: none;
  position: absolute;
  z-index: 200;

//   max-width: 2000px
  border: 1px solid none;
  border-radius: 5px;
  padding: 5px;
  font-size: 1.0rem;
  color: white;
  background: grey;

  margin-top: 10px;
//   margin-left: 30px;
`;

const tooltip = keyframes`
  0% { opacity: 0; }
  40% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 1;}
`;

// width: fit-content;
// height: fit-content;
  
export default Tooltip;