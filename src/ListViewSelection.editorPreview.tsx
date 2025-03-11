import classNames from "classnames";
import { ReactElement, createElement, Fragment } from "react";
import { ListViewSelectionPreviewProps } from "../typings/ListViewSelectionProps";

export function preview({
    class: className,
    content,
    readOnly,
    referenceType,
    selectionType,
    styleObject
}: ListViewSelectionPreviewProps): ReactElement {
    return (
        <div
            className={classNames(className, "mendix-listview-selection", {
                selected: selectionType === "CONTAINER"
            })}
            style={{ ...styleObject, cursor: readOnly ? "default" : "pointer" }}
        >
            {selectionType === "INPUT" && (
                <Fragment>
                    {referenceType === "REFERENCE" ? (
                        <input type="radio" readOnly={readOnly} checked></input>
                    ) : (
                        <input type="checkbox" readOnly={readOnly} checked></input>
                    )}
                </Fragment>
            )}
            {selectionType === "CONTAINER" && (
                <content.renderer caption="Place custom content here">
                    <div style={{ width: "100%" }} />
                </content.renderer>
            )}
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/ListViewSelection.css");
}
