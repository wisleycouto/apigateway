import React from 'react';
import { DividerStyle } from './style';

function Divider (props) {
  let divider = props.direcao || "horizontal";
  let tracejado = props.tracejado || false ;


  
  return(

    <DividerStyle>  

        { (divider == "horizontal" ?
         <Horizontal tracejado={tracejado}  /> : 
         <Vertical tracejado={tracejado}  /> ) 
         }  
    </DividerStyle>
  );
}

function Horizontal(props) {
  return(        
      <span className={`br-divider ${props.tracejado ? "dashed" : "" } }`} ></span>
  );
}

function Vertical(props) {
    return(    
      <span className={`br-divider vertical ${props.tracejado ? "dashed" : ""}`}  style={{ margin:"10% 5px auto",height:"90%"}} ><br/></span>
    );
}

export default Divider;