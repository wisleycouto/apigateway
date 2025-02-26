import styled from "styled-components";

export const ScrimStyle = styled.div`

.br-scrim.foco {
    background: var(--surface-overlay-scrim);
    bottom: 0;
    display: none;
    height: 100%;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 999;
  }
  .br-scrim.foco .br-modal {
    background-color: var(--color-secondary-01, #fff);
    left: 50%;
    max-height: 90%;
    overflow: auto;
    padding: var(--spacing-scale-2x);
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
  .br-scrim.foco.active {
    display: block;
  }
  .br-scrim.inibicao {
    position: relative;
  }
  .br-scrim.inibicao::before {
    background: var(--surface-overlay-scrim);
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
  .br-scrim.legibilidade {
    position: relative;
  }
  .br-scrim.legibilidade .scrim-text {
    background: var(--surface-overlay-text);
    bottom: 0;
    left: 0;
    padding: var(--spacing-scale-3x) var(--spacing-scale-baseh);
    position: absolute;
    width: 100%;
  }
  
  .br-scrim-util.foco {
    background: var(--surface-overlay-scrim);
    bottom: 0;
    display: none;
    height: 100%;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 999;
  }
  .br-scrim-util.foco .br-modal {
    background-color: var(--color-secondary-01, #fff);
    left: 50%;
    max-height: 90%;
    overflow: auto;
    padding: var(--spacing-scale-2x);
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 1000;
  }
  .br-scrim-util.foco.active {
    display: block;
  }
  .br-scrim-util.inibicao {
    position: relative;
  }
  .br-scrim-util.inibicao::before {
    background: var(--surface-overlay-scrim);
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
  .br-scrim-util.legibilidade {
    position: relative;
  }
  .br-scrim-util.legibilidade .scrim-text {
    background: var(--surface-overlay-text);
    bottom: 0;
    left: 0;
    padding: var(--spacing-scale-3x) var(--spacing-scale-baseh);
    position: absolute;
    width: 100%;
  }
`
