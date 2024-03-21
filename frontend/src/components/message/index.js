import { faCheckCircle, faInfoCircle, faTimes, faTimesCircle, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { MessageStyle } from "./style";

const TimesCircleIcon = <FontAwesomeIcon icon={faTimesCircle}/>
const CheckIcon = <FontAwesomeIcon icon={faCheckCircle}/>
const ExclamationIcon = <FontAwesomeIcon icon={faExclamationTriangle} />
const InfoIcon = <FontAwesomeIcon icon={faInfoCircle} />

const TimesIcon = <FontAwesomeIcon icon={faTimes}/>

const typesIcons = new Map([
  ["danger",  TimesCircleIcon],
  ["success", CheckIcon],
  ["info",    InfoIcon],
  ["warning", ExclamationIcon],
]);

function Message({ 
  type, // "danger" | "success" | "info" | "warning"
  isContext, // true | false
  ...rest 
}) {

  const listTypes = ["danger", "success", "info", "warning"];
  const realType = (listTypes.find(t => t === type) !== undefined ? type : "info");

  return (
    <MessageStyle>
      {!isContext?
        <FeedbackMessage type={realType} {...rest} />
      :
        <ContextMessage  type={realType} {...rest} />
      }
    </MessageStyle>
  );
}

function FeedbackMessage({
  type,
  message,
  messageTitle,
  customClass,
  show,
  onCloseButtonClick,
}) {

  if (show) {
    return (<div className={`br-message ${type || ''} ${customClass || ''}`} role="alert">
        

        <div className="content">
          {/* <span className="message-title">{messageTitle} </span>
          <span className="message-body">{message}</span> */}
          <strong>{messageTitle} </strong>
          {message} 
        </div>
  
        </div>

          );
  }
  return <div></div>;
}

function ContextMessage({
  message,
  type,
  customClass,
}) {

  return (
    <span className={`feedback ${type || ''} ${customClass || ''}`} role="alert">
        <i className="fas" aria-hidden="true">{typesIcons.get(type)}</i>
        {message}
    </span>
  );
}

export default Message;