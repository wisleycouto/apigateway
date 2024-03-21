import React, { useEffect } from "react";
import { ScrimStyle } from './style';

function Scrim(props) {

    useEffect(() => {
        const scrim = document.querySelector('#scrimexample');
        
        const options = {
          attributes: true
        }
        
        function callback(mutationList, observer) {
          mutationList.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const classList = scrim.classList;
                props.onModalActiveChange(classList.contains('active'));
            }
          })
        }
        
        const observer = new MutationObserver(callback);
        observer.observe(scrim, options);
    },[]);
    
    return (
        <ScrimStyle>
            <div>
                <div className={`br-scrim foco ${props.showModal && "active"}`} id="scrimexample" data-trigger="scrim">
                    <div className="br-modal medium">
                        <div  className="br-modal-dialog">
                            <div className="br-modal-content">
                                <div className="br-modal-header">
                                    <h1 className="br-modal-title">{props.title}</h1>
                                </div>
                                <div className="br-modal-body">
                                    {typeof(props.desc) === "string"?  <p>{props.desc}</p> : props.desc}
                                </div>
                                <div className="br-modal-footer justify-content-center" >                       
                                    {
                                        props.buttons.map((el, index) => 
                                            <button key={'button_scrim_'+index} className= {`br-button mt-3 mt-sm-0 ml-sm-3 ${el.class || "primary"}`} type="button" data-dismiss="scrimexample"
                                                onClick = {el.action}>
                                                {el.label}                               
                                            </button>       
                                        )            
                                    }                     
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ScrimStyle>
    )
}

export default Scrim;