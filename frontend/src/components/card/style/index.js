import styled from 'styled-components';

export const CardStyle = styled.div`
    .br-card {
        --card-background: var(--color-secondary-01);
        --card-back-background: var(--color-secondary-07);
        --card-margin: var(--spacing-scale-2x);
        --card-padding: var(--spacing-scale-2x);
        --card-shadow: var(--surface-shadow-sm);
        background: var(--card-background);
        box-shadow: var(--card-shadow);
        color: var(--card-color);
        margin-bottom: var(--card-margin);

        min-width: 300px;
    }

    .br-card .card-content,
    .br-card .front .content,
    .br-card .back .content {
        padding: var(--card-padding);
    }

    .br-card .card-content *:last-child,
    .br-card .front .content *:last-child,
    .br-card .back .content *:last-child {
        margin-bottom: 0;
    }

    .br-card .front .header,
    .br-card .back .header,
    .br-card .card-header {
        padding: var(--card-padding) var(--card-padding) 0;

    }

    .br-card .front .footer,
    .br-card .back .footer,
    .br-card .card-footer {
        padding: 0 var(--card-padding) var(--card-padding);
    }

    .br-card .card-footer .d-flex .ml-auto {
        display: flex;
        flex-direction: row;
    }   

    .br-card .back {
        background: var(--card-back-background);
        color: var(--color-secondary-01);
    }

    .br-card[data-expanded] {
        overflow: hidden;
    }

    .br-card[data-expanded=on] {
        height: 100%;
        opacity: 1;
    }
    
    .br-card[data-expanded=off] {
        opacity: 0;
        height: 0;
        z-index: -1;
    }

    .br-card .br-list .br-item {
        white-space: normal;
    }

    .br-card .br-button[aria-expanded=true] {
        transform: rotate(180deg);
    }
`;