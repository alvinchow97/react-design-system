import { BinIcon } from "@lifesg/react-icons/bin";
import { CrossIcon } from "@lifesg/react-icons/cross";
import { ProgressBar } from "../shared/progress-bar";
import {
    Content,
    DesktopErrorMessage,
    ErrorIconButton,
    IconButton,
    Item,
    ItemActionContainer,
    ItemFileSizeText,
    ItemNameSection,
    ItemText,
    LoadingActionContainer,
    MobileErrorMessage,
} from "./file-item.styles";
import { FileItemProps } from "./types";
import { FileUploadHelper } from "./helper";

interface Props extends FileItemProps {
    onDelete: () => void;
    onEdit?: (() => void) | undefined;
}

export const FileItem = ({
    id,
    name,
    size,
    type,
    description,
    progress = 1,
    errorMessage,
    thumbnailImageDataUrl,
    editableMode,
    onDelete,
    onEdit,
}: Props) => {
    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const isLoading = progress < 1;

    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    const handleDelete = () => {
        onDelete();
    };

    const handleEdit = () => {
        if (onEdit) onEdit();
    };

    // =========================================================================
    // RENDER FUNCTIONS
    // =========================================================================
    const renderActionButton = () => {
        if (isLoading) {
            return (
                <LoadingActionContainer>
                    <ProgressBar progress={progress} />
                </LoadingActionContainer>
            );
        } else if (errorMessage) {
            return (
                <ItemActionContainer>
                    <ErrorIconButton
                        onClick={handleDelete}
                        data-testid={`${id}-error-delete-button`}
                    >
                        <CrossIcon />
                    </ErrorIconButton>
                </ItemActionContainer>
            );
        } else {
            const isEditable = FileUploadHelper.isSupportedImageType(type);

            return (
                <ItemActionContainer $hasEditButton={isEditable}>
                    {/* TODO: Add in part 2 */}
                    {/* {isEditable && (
                        <IconButton
                            key="edit"
                            data-testid={`${id}-edit-button`}
                            type="button"
                            styleType="light"
                            onClick={handleEdit}
                        >
                            <PencilIcon />
                        </IconButton>
                    )} */}
                    <IconButton
                        key="delete"
                        data-testid={`${id}-delete-button`}
                        type="button"
                        styleType="light"
                        onClick={handleDelete}
                    >
                        <BinIcon />
                    </IconButton>
                </ItemActionContainer>
            );
        }
    };

    return (
        <Item
            id={id}
            $error={!!errorMessage}
            $loading={isLoading}
            $editable={FileUploadHelper.isSupportedImageType(type)}
        >
            <Content>
                <ItemNameSection>
                    <ItemText
                        data-testid="name"
                        weight={description ? "semibold" : "regular"}
                    >
                        {name}
                    </ItemText>
                    {description && (
                        <ItemText data-testid="description">
                            {description}
                        </ItemText>
                    )}
                    {errorMessage && (
                        <DesktopErrorMessage weight="semibold">
                            {errorMessage}
                        </DesktopErrorMessage>
                    )}
                </ItemNameSection>
                <ItemFileSizeText>
                    {!isLoading && FileUploadHelper.formatFileSizeDisplay(size)}
                </ItemFileSizeText>
                {errorMessage && (
                    <MobileErrorMessage weight="semibold">
                        {errorMessage}
                    </MobileErrorMessage>
                )}
            </Content>
            {renderActionButton()}
        </Item>
    );
};
