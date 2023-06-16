import classNames from "classnames";
import { ReactElement, createElement, Fragment } from "react";
import { ListViewSelectionPreviewProps } from "../typings/ListViewSelectionProps";

export function preview({
    class: className,
    content,
    dynamicClassName,
    readOnly,
    reference,
    referenceSet,
    referenceType,
    selectionType,
    styleObject
}: ListViewSelectionPreviewProps): ReactElement {
    return (
        <div className={classNames(className, "mendix-list-view-selection")} style={styleObject}>
            {selectionType === "INPUT" && (
                <Fragment>
                    {referenceType === "REFERENCE" ? (
                        <input type="radio" readOnly={readOnly} checked={true}></input>
                    ) : (
                        <input type="checkbox" readOnly={readOnly} checked={true}></input>
                    )}
                </Fragment>
            )}
            {selectionType === "CONTAINER" && (
                <div style={{ border: "1px dotted red" }}>
                    {readOnly ? 'Read only mode' : `Sets ${referenceType === "REFERENCE" ? reference : referenceSet} when selected with className '${dynamicClassName}'`}
                    {content}
                </div>
            )}
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/ListViewSelection.css");
}
