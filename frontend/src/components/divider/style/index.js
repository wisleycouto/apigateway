import styled from 'styled-components';

export const DividerStyle = styled.div`


.br-divider,
hr {
  --divider-style: solid;
  --divider-color: var(--divider-light);
  --divider-padding: var(--spacing-scale-base);
  --divider-size: 1px;
  --divider-light: var(--color-secondary-04);
  --divider-dark: var(--color-secondary-01);
  border-color: var(--divider-color);
  border-style: var(--divider-style);
  border-width: 0;
  border-top-width: var(--divider-size);
  display: block;
}
.br-divider.content,
hr.content {
  align-items: center;
  border: 0;
  display: flex;
  justify-content: center;
}
.br-divider.content::after, .br-divider.content::before,
hr.content::after,
hr.content::before {
  border-color: var(--divider-color);
  border-style: var(--divider-style);
  border-width: 0;
  border-top-width: var(--divider-size);
  content: "";
  flex: 1;
}
.br-divider.content::after,
hr.content::after {
  margin-left: var(--divider-padding);
}
.br-divider.content::before,
hr.content::before {
  margin-right: var(--divider-padding);
}
.br-divider.vertical,
hr.vertical {
  align-self: stretch;
  border-right-width: var(--divider-size);
  border-top-width: 0;

}
.br-divider.vertical.content,
hr.vertical.content {
  flex-direction: column;
  
}
.br-divider.vertical.content::after, .br-divider.vertical.content::before,
hr.vertical.content::after,
hr.vertical.content::before {
  border-right-width: var(--divider-size);
  border-top-width: 0;
}
.br-divider.inverted,
hr.inverted {
  --divider-color: var(--color-secondary-01);
}
.br-divider.dashed,
hr.dashed {
  --divider-style: dashed;
}
.br-divider.sm,
hr.sm {
  --divider-size: 2px;
}
.br-divider.md,
hr.md {
  --divider-size: 3px;
}
.br-divider.lg,
hr.lg {
  --divider-size: 4px;
}

hr {
  --divider-padding: var(--spacing-scale-2x);
  margin: var(--divider-padding) 0;
}

`;
