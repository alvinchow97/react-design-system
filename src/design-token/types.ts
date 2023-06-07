import { SimpleInterpolation, css } from "styled-components";

export type CssValue = SimpleInterpolation | ReturnType<typeof css>;

export interface DesignTokenSet {
    InputBoxShadow: CssValue;
    InputErrorBoxShadow: CssValue;
    ElevationBoxShadow: CssValue;
    Table: {
        Header: CssValue;
        Cell: {
            Primary: CssValue;
            Secondary: CssValue;
            Selected: CssValue;
            Hover: CssValue;
        };
    };
}

export type DesignTokenSetOptions = Partial<DesignTokenSet>;
