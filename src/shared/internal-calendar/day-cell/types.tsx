import { Dayjs } from "dayjs";

export type CellType =
    | "current"
    | "selected"
    | "selected-outline"
    | "overlap"
    | "overlap-outline"
    | "hover-dash"
    | "hover-current";

export type LabelType = "available" | "unavailable" | "current" | "selected";

export type Variant = "other-month" | "today" | "default";

export interface CellStyleProps {
    bgLeft?: CellType | undefined;
    bgRight?: CellType | undefined;
    circleLeft?: CellType | undefined;
    circleRight?: CellType | undefined;
    shadow?: boolean | undefined;
    circleShadow?: boolean | undefined;
    label?: LabelType | undefined;
    disabled?: boolean | undefined;
    interactive?: boolean | undefined;
}

export interface DayCellProps extends CellStyleProps {
    date: Dayjs;
    calendarDate: Dayjs;
    onSelect: (value: Dayjs) => void;
    onHover: (value: Dayjs) => void;
}
