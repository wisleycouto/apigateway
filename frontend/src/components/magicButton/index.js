import React from 'react'
import { MagicButtonStyle } from './style'

function MagicButton (props) {    
    let button = props.button;
    let label = props.label || "";
    
    return(
      <MagicButtonStyle>
          <Padrao button={props.button} label={props.label}/>
      </MagicButtonStyle>
    );
}



function Padrao(props) {

    return(
        <div className={`br-magic-button  ${props.button || ''}`}>
            <button className="br-button" type="button">{props.label}
            </button>
        </div>
    );
}


export default MagicButton;