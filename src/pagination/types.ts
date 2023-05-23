export interface PaginationsProps {
    id?: string | undefined;
    "data-testid"?: string | undefined;
    className?: string | undefined;
    pageSize?: number | undefined;
    totalItems: number;
    activePage: number;
    showFirstAndLastNav?: boolean | undefined;
    showPageSizeChanger?: boolean | undefined;
    onPageChange?: ((page: number) => void) | undefined;
}

export interface DropdownProps {
    id?: string | undefined;
    "data-testid"?: string | undefined;
    className?: string | undefined;
    pageSize?: number | undefined;
    onPageSizeChange?: ((page: number) => void) | undefined;
}

export interface DropdownItemProps {
    value?: number | undefined;
    label?: string | undefined;
}
