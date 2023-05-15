import { useEffect, useRef, useState } from "react";
import { TimeRangePickerHelper } from "./helper";
import { TimeRangePickerDropdown } from "./time-range-picker-dropdown";
import {
    ArrowRangeContainer,
    ArrowRight,
    BottomHighlightEndTime,
    BottomHighlightStartTime,
    InputSelectorEndTimeElement,
    InputSelectorStartTimeElement,
    TimeContainer,
    Wrapper,
} from "./time-range-picker.styles";
import { TimeRangePickerProps, TimeRangeSelectorProps } from "./types";

export const TimeRangePicker = ({
    id,
    disabled = false,
    error,
    value,
    format = "12hr",
    readOnly,
    onChange,
    onBlur,
    ...otherProps
}: TimeRangePickerProps) => {
    // =============================================================================
    // CONST, STATE, REF
    // =============================================================================
    const [showStartTimeSelector, setShowStartTimeSelector] =
        useState<boolean>(false);
    const [showEndTimeSelector, setShowEndTimeSelector] =
        useState<boolean>(false);
    const [startTimeVal, setStartTimeVal] = useState("");
    const [endTimeVal, setEndTimeVal] = useState("");

    const nodeRef = useRef<HTMLDivElement>();

    // =============================================================================
    // EFFECTS
    // =============================================================================

    useEffect(() => {
        if (value) {
            setStartTimeVal(value.startTime);
            setEndTimeVal(value.endTime);
        }
    }, []);
    useEffect(() => {
        document.addEventListener("mousedown", handleMouseDownEvent);
        document.addEventListener("keyup", handleKeyUpEvent);

        return () => {
            document.removeEventListener("mousedown", handleMouseDownEvent);
            document.removeEventListener("keyup", handleKeyUpEvent);
        };
    }, [showEndTimeSelector]);

    // =============================================================================
    // EVENT HANDLERS
    // =============================================================================
    const handleStartTimeFocus = () => {
        if (!disabled && !readOnly && !showStartTimeSelector) {
            setShowEndTimeSelector(false);
            setShowStartTimeSelector(true);
        }
    };

    const handleEndTimeFocus = () => {
        if (!disabled && !readOnly && !showEndTimeSelector) {
            setShowStartTimeSelector(false);
            setShowEndTimeSelector(true);
        }
    };

    const handleMouseDownEvent = (event: MouseEvent) => {
        if (!disabled) {
            runOutsideFocusHandler(event);
        }
    };

    const handleKeyUpEvent = (event: KeyboardEvent) => {
        switch (event.code) {
            case "Tab":
                runOutsideFocusHandler(event);
                break;
            default:
                break;
        }
    };

    const handleSelectionDropdownCancel = () => {
        setShowEndTimeSelector(false);
        setShowStartTimeSelector(false);
    };

    const handleStartTime = (value: string) => {
        setShowStartTimeSelector(false);
        setShowEndTimeSelector(true);
        setStartTimeVal(value);

        const timeValue: TimeRangeSelectorProps = {
            startTime: value,
            endTime: endTimeVal,
        };

        onChange && onChange(timeValue);
    };

    const handleEndTime = (value: string) => {
        setShowEndTimeSelector(false);

        let startTime = startTimeVal;
        let endTime = value;
        if (startTimeVal == "") {
            setShowStartTimeSelector(true);
        } else if (startTimeVal > value) {
            endTime = startTimeVal;
            startTime = value;
        }

        const timeValue: TimeRangeSelectorProps = {
            startTime: startTime,
            endTime: endTime,
        };
        setEndTimeVal(endTime);
        setStartTimeVal(startTime);

        onChange && onChange(timeValue);
    };

    // =============================================================================
    // HELPER FUNCTIONS
    // =============================================================================
    const runOnBlurHandler = () => {
        setShowStartTimeSelector(false);
        setShowEndTimeSelector(false);
        onBlur && onBlur();
    };

    const runOutsideFocusHandler = (event: MouseEvent | KeyboardEvent) => {
        if (nodeRef && !nodeRef.current.contains(event.target as any)) {
            if (!showEndTimeSelector) {
                runOnBlurHandler();
            }
            if (!showStartTimeSelector) {
                runOnBlurHandler();
            }
        }
    };

    return (
        <Wrapper ref={nodeRef} id={id} {...otherProps}>
            <TimeContainer
                $disabled={disabled}
                $error={error}
                $readOnly={readOnly}
            >
                <InputSelectorStartTimeElement
                    onFocus={handleStartTimeFocus}
                    $focused={showStartTimeSelector}
                    readOnly
                    placeholder={"From"}
                    value={TimeRangePickerHelper.formatValue(
                        startTimeVal,
                        format
                    )}
                    disabled={disabled}
                    $error={error}
                    data-testid={
                        otherProps["data-testid"]
                            ? `${otherProps["data-testid"]}-timepicker-selector`
                            : "timepicker-selector"
                    }
                />
                {showStartTimeSelector && <BottomHighlightStartTime />}

                <TimeRangePickerDropdown
                    id={id}
                    show={showStartTimeSelector}
                    value={startTimeVal}
                    format={format}
                    onCancel={handleSelectionDropdownCancel}
                    onChange={handleStartTime}
                />
                <ArrowRangeContainer>
                    <ArrowRight />
                </ArrowRangeContainer>

                {showEndTimeSelector && <BottomHighlightEndTime />}

                <InputSelectorEndTimeElement
                    onFocus={handleEndTimeFocus}
                    $focused={showEndTimeSelector}
                    readOnly
                    placeholder={"To"}
                    value={TimeRangePickerHelper.formatValue(
                        endTimeVal,
                        format
                    )}
                    disabled={disabled}
                    $error={error}
                    data-testid={
                        otherProps["data-testid"]
                            ? `${otherProps["data-testid"]}-timepicker-selector`
                            : "timepicker-selector"
                    }
                />
                <TimeRangePickerDropdown
                    id={id}
                    show={showEndTimeSelector}
                    value={endTimeVal}
                    format={format}
                    onCancel={handleSelectionDropdownCancel}
                    onChange={handleEndTime}
                />
            </TimeContainer>
        </Wrapper>
    );
};
