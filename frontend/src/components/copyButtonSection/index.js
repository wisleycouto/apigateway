import React, { memo, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { Container, Span, SelectDiv } from "./style";
import CopyButton from "../copyButton";

/**
 * @typedef {(servico: string, tokenAcesso: string) => string} OlindaCustomURL Funcao que retorna uma URL personalizada para consulta do servico no apigatewayolinda
 *
 * @typedef {Object} CopyButtonSectionProps
 * @property {import("../../types").Consumidor[]} listaConsumidoresServicos
 * @property {OlindaCustomURL} [customURLformat] Funcao que retorna uma URL personalizada para consulta no apigatewayolinda. Recebe o servico e o token de acesso.
 * @property {string} nomeServico
 */

/**
 *
 * @param {string} servico
 * @param {string | null | undefined} tokenAcesso
 */
function formatURL(servico, tokenAcesso) {
  return `${
    process.env.REACT_APP_BASE_URL_BACKEND
  }/olinda/consultar-olinda?servico=${encodeURIComponent(servico)}${
    (tokenAcesso && `&token_acesso=${tokenAcesso}`) || ""
  }`;
}

/**
 *
 * @param {CopyButtonSectionProps} props
 * @returns
 */
function CopyButtonSectionPrivate(props) {
  /**
   * @type {import("../../types").useState<string>}
   */
  const [selectedConsumidorKey, setSelectedConsumidor] = useState(null);

  const selectedConsumidor = useMemo(
    () =>
      props.listaConsumidoresServicos.find(
        (consumidor) => consumidor.id_consumidor === selectedConsumidorKey
      ),
    [props.listaConsumidoresServicos, selectedConsumidorKey]
  );

  useEffect(() => {
    setSelectedConsumidor(props.listaConsumidoresServicos[0].id_consumidor);
  }, [props.listaConsumidoresServicos]);

  const copyURL = props.customURLformat
    ? props.customURLformat(
        props.nomeServico,
        (selectedConsumidor && selectedConsumidor.token_acesso) || null
      )
    : formatURL(
        props.nomeServico,
        (selectedConsumidor && selectedConsumidor.token_acesso) || null
      );

  /**
   * @param {import("../../types").Consumidor} newValue
   */
  const handleChange = (newValue) => {
    setSelectedConsumidor(newValue.id_consumidor);
  };

  return (
    <Container>
      <CopyButton valueToCopy={copyURL} disabled={selectedConsumidor == null} />

      <SelectDiv>
        <Select
          placeholder='Consumidor'
          options={[
            { label: "Consumidor", options: props.listaConsumidoresServicos },
          ]}
          getOptionLabel={(consumidor) => consumidor.consumidor}
          getOptionValue={(consumidor) => consumidor.id_consumidor}
          onChange={handleChange}
          value={selectedConsumidor}
          menuPortalTarget={document.body}
        />
      </SelectDiv>
    </Container>
  );
}

/**
 *
 * @param {CopyButtonSectionProps & { isServicoPublico: boolean, tokenAcesso: string | undefined | null, isServicoConsumidor: boolean | undefined }} props
 */
function CopyButtonSection({
  isServicoPublico,
  tokenAcesso,
  isServicoConsumidor,
  ...rest
}) {
  /**
   * @type {(servico: string, tokenAcesso: string) => string}
   */
  const finalCustomURL = rest.customURLformat
    ? (servico, tokenAcesso) =>
        `${rest.customURLformat(encodeURIComponent(servico), tokenAcesso)}`
    : formatURL;

  if (isServicoPublico || tokenAcesso || isServicoConsumidor) {
    const copyURL = finalCustomURL(rest.nomeServico, tokenAcesso);

    return <CopyButton valueToCopy={copyURL} />;
  }

  if (!rest.listaConsumidoresServicos) {
    return <Span>Nenhum consumidor cadastrado!</Span>;
  }

  return (
    <CopyButtonSectionPrivate {...rest} customURLformat={finalCustomURL} />
  );
}

export default memo(CopyButtonSection);
