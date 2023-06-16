import classNames from "classnames";
import { ReactElement, createElement, useMemo, Fragment } from "react";
import { ListViewSelectionContainerProps } from "../typings/ListViewSelectionProps";
import { ValueStatus, ObjectItem } from "mendix";
import "./ui/ListViewSelection.css";

export function ListViewSelection({
    class: className,
    dynamicClassName,
    name,
    reference,
    referenceSet,
    dataSource,
    referenceType,
    selectionType,
    content,
    style,
    tabIndex
}: ListViewSelectionContainerProps): ReactElement {
    const contextObject: ObjectItem | undefined = useMemo(() => {
        if (dataSource.status === ValueStatus.Available) {
            const items = dataSource.items;
            if (items && items.length > 0) {
                return dataSource.items[0];
            } else {
                console.error(`List View Selection (id: ${name}) was not passed the context object.`);
            }
        }
    }, [dataSource]);

    const selected: boolean = useMemo(
        () =>
            referenceType === "REFERENCE"
                ? reference.value !== undefined && contextObject !== undefined && reference.value === contextObject
                : referenceSet.value !== undefined &&
                  contextObject !== undefined &&
                  referenceSet.value.find(value => value.id === contextObject.id) !== undefined,

        [reference, referenceSet, contextObject]
    );

    const ReadOnly: boolean = useMemo(
        () => (referenceType === "REFERENCE" ? reference.readOnly : referenceSet.readOnly),
        [reference, referenceSet]
    );

    const onClickContainer = () => {
        if (contextObject !== undefined) {
            if (referenceType === "REFERENCE") {
                if (selected) {
                    reference.setValue(undefined);
                } else {
                    reference.setValue(contextObject);
                }
            } else {
                const refSetValue = referenceSet.value;
                if (selected) {
                    referenceSet.setValue(refSetValue?.filter(value => value.id !== contextObject.id));
                } else if (refSetValue !== undefined) {
                    referenceSet.setValue([...refSetValue, contextObject]);
                } else {
                    referenceSet.setValue([contextObject]);
                }
            }
        }
    };

    return (
        <div
            id={name}
            tabIndex={tabIndex}
            className={classNames(className, "mendix-list-view-selection")}
            style={{...style, cursor: ReadOnly ? "default" : "pointer"}}
            onClick={ReadOnly ? undefined : onClickContainer}
        >
            {selectionType === "INPUT" && (
                <Fragment>
                    {referenceType === "REFERENCE" ? (
                        <input type="radio" readOnly={ReadOnly} checked={selected}></input>
                    ) : (
                        <input type="checkbox" readOnly={ReadOnly} checked={selected}></input>
                    )}
                </Fragment>
            )}
            {selectionType === "CONTAINER" && <div className={selected ? dynamicClassName.value : ""}>{content}</div>}
        </div>
    );
}
