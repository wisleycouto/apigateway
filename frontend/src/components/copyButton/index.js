import React, { useCallback, useState } from "react";

/**
 *
 * @param {string} text
 */
async function handleCopyToClipboard(text) {
  if (navigator.clipboard) {
    return await navigator.clipboard.writeText(text);
  }

  // Copiar nao seguro (para protocolo http e contextos nao seguros)
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus({ preventScroll: true });
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    document.body.removeChild(textArea);
    throw err;
  }
  document.body.removeChild(textArea);
}

/**
 *
 * @param {import("react").HTMLProps<HTMLButtonElement> & { valueToCopy: string }} props
 * @returns
 */
function CopyButton({ valueToCopy, ...rest }) {
  const initialValue = "Copiar URL";
  const [buttonTitle, setButtonTitle] = useState(initialValue);
  const handleCopy = useCallback(async () => {
    if (rest.disabled) {
      return;
    }

    try {
      await handleCopyToClipboard(valueToCopy);
      handleCopyFeedback();
    } catch (err) {
      console.log(
        "Não foi possível copiar para área de transferência",
        err.message || "motivo desconhecido!"
      );
    }
  }, [valueToCopy]);

  const handleCopyFeedback = () => {

    setButtonTitle("Copiado!");
    setTimeout(() => {
      setButtonTitle(initialValue);
    }, 1000);
  };

  return (
    <button
      {...rest}
      type='button'
      className='btn btn-primary btn-small'
      onClick={handleCopy}
    >
      {buttonTitle ? buttonTitle : rest.children || "Copiar valor"}
    </button>
  );
}

export default CopyButton;
