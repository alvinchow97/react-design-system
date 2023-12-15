import styled, { css } from "styled-components";
import { Color } from "../color";
import { FadeWrapper } from "../shared/fade-wrapper";
import { Text } from "../text";

// =============================================================================
// STYLE INTERFACES
// =============================================================================
interface LabelStyleProps {
    $active?: boolean;
}

interface ChainStyleProps {
    $active?: boolean;
}

// =============================================================================
// STYLING
// =============================================================================
export const Chain = styled.ul`
    display: inline-flex;
    width: 100%;
    list-style-type: none;
`;

export const ChainItem = styled.li<ChainStyleProps>`
    display: flex;
    flex-shrink: 0;
    border-bottom: 4px solid ${Color.Neutral[5]};

    ${(props) => {
        if (props.$active) {
            return css`
                border-bottom: 4px solid ${Color.Primary};
            `;
        }
    }}
`;

export const ChainLink = styled.a`
    position: relative;
    padding: 1rem 1rem 1.25rem;
`;

export const Label = styled(Text.Body)<LabelStyleProps>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -59%); // Based on testing
    color: ${Color.Neutral[3]};
    opacity: 1;

    ${(props) => {
        if (props.$active) {
            return css`
                opacity: 0;
            `;
        }
    }}
`;

export const BoldLabel = styled(Text.Body)<LabelStyleProps>`
    color: ${Color.Primary};
    opacity: 0;
    ${(props) => {
        if (props.$active) {
            return css`
                opacity: 1;
            `;
        }
    }}
`;

export const CustomFadeWrapper = styled(FadeWrapper)`
    [data-id="left-fade-indicator-button"],
    [data-id="right-fade-indicator-button"] {
        margin-bottom: 4px;
    }
`;
