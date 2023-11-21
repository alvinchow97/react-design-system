export interface DropdownSelectorProps {
    children: JSX.Element[];
    show: boolean;
    onBlur?: (e?: any) => void;
    error?: boolean | undefined;
    disabled?: boolean | undefined;
    testId?: string | undefined;
    readOnly?: boolean | undefined;
    className?: string | undefined;
}
