import styled, { css } from "styled-components";
import { Color } from "../color";
import { DayLabel } from "../shared/internal-calendar/standard";
import { TextStyleHelper } from "../text";
import { Button } from "../button";
import { ChevronUpIcon } from "@lifesg/react-icons";
import { Transition } from "../transition";
import { TimeSlot } from "../time-slot-bar/time-slot-bar.styles";

interface StyleProps {
    $isExpanded: boolean;
    $maxVisibleCellHeight?: number;
}

export const DayLabelWeek = styled(DayLabel)`
    ${(props) => {
        const { $variant } = props;
        switch ($variant) {
            case "default":
                return css`
                    ${TextStyleHelper.getFontFamily("H5", "semibold")}
                    color: ${Color.Neutral[1]};
                `;
        }
    }}
`;

export const HeaderCellWeek = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    user-select: none;
    margin-bottom: 0.5rem;
    flex: 1;
`;

export const HeaderCellWeekColumn = styled.div`
    grid-column: 2 / -1;
    display: flex;
`;

export const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto repeat(7, 1fr);
    column-gap: 0.25rem;
`;

export const ColumnWeekCell = styled.div<StyleProps>`
    grid-column: 2 / -1;
    display: flex;
    gap: 0.125rem;
    transition: ${Transition.Base};
    max-height: 100rem;

    ${(props) =>
        props.$maxVisibleCellHeight &&
        !props.$isExpanded &&
        css`
            max-height: ${props.$maxVisibleCellHeight}px;
            overflow: hidden;
        `}
`;

export const TimeColumn = styled.div<StyleProps>`
    display: flex;
    flex-direction: column;
    grid-row: 3 / auto;
    gap: 0.25rem;
    width: 1.375rem;
    transition: ${Transition.Base};
    max-height: 100rem;

    ${(props) =>
        props.$maxVisibleCellHeight &&
        !props.$isExpanded &&
        css`
            max-height: ${props.$maxVisibleCellHeight}px;
            overflow: hidden;
        `};
`;

export const TimeColumnWrapper = styled.div`
    min-height: 3.75rem;
    :last-child {
        min-height: 0;
    }
`;

export const TimeColumnText = styled.div`
    ${TextStyleHelper.getFontFamily("Body", 700)}
    color: ${Color.Neutral[3]};
    font-size: 0.625rem !important;
    line-height: 0.75rem !important;
    text-align: center;
    :first-line {
        font-size: 0.875rem !important;
    }
`;

export const TimeSlotWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: 0.0625rem;
    gap: 0.25rem;
`;

export const CollapseExpandAllWrapper = styled.div`
    grid-row: 4;
    grid-column: 1 / -1;
    display: flex;
    margin-top: 0.5rem;
`;

export const CollapseExpandAllButton = styled(Button.Default)`
    width: 100%;
    height: 2.5rem;
    span {
        ${TextStyleHelper.getTextStyle("H5", "semibold")}
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

export const ChevronIcon = styled(ChevronUpIcon)<StyleProps>`
    transform: rotate(${(props) => (props.$isExpanded ? 0 : 180)}deg);
    transition: transform 300ms ease-in-out;
`;

export const TimeSlotComponent = styled(TimeSlot)`
    ${(props) => {
        if (props.$type === "vertical") {
            return css`
                max-width: 200px;
                ${props.$height && `height: ${props.$height}px;`}
                ${props.$height && `min-height: ${props.$height}px;`}
                margin: 0;
                border-radius: 0.125rem;
            `;
        }
    }}

    ${(props) => {
        if (!props.$halfFill) {
            return css`
                background-color: ${props.$bgColor};
            `;
        } else {
            return css`
                background: linear-gradient(
                    to ${props.$halfFill},
                    ${props.$bgColor} 50%,
                    ${Color.Neutral[5]} 0%
                );
            `;
        }
    }}
`;
