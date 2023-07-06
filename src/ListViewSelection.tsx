import classNames from "classnames";
import { ReactElement, createElement, useMemo, Fragment, useRef } from "react";
import { ListViewSelectionContainerProps } from "../typings/ListViewSelectionProps";
import { ValueStatus, ObjectItem } from "mendix";
import "./ui/ListViewSelection.css";

export function ListViewSelection({
    class: className,
    dynamicClassName,
    reference,
    referenceSet,
    dataSource,
    referenceType,
    selectionType,
    content,
    style,
    tabIndex
}: ListViewSelectionContainerProps): ReactElement {
    const mainRef = useRef<HTMLDivElement>(null);

    const contextObject: ObjectItem | undefined = useMemo(() => {
        if (dataSource.status === ValueStatus.Available) {
            const items = dataSource.items;
            if (items && items.length > 0) {
                return dataSource.items[0];
            } else {
                console.error(`List View Selection (id: ${name}) was not passed the context object.`);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSource]);

    const selected: boolean = useMemo(
        () =>
            referenceType === "REFERENCE"
                ? reference.value !== undefined && contextObject !== undefined && reference.value === contextObject
                : referenceSet.value !== undefined &&
                  contextObject !== undefined &&
                  referenceSet.value.find(value => value.id === contextObject.id) !== undefined,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [reference, referenceSet, contextObject]
    );

    const ReadOnly: boolean = useMemo(
        () => (referenceType === "REFERENCE" ? reference.readOnly : referenceSet.readOnly),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [reference, referenceSet]
    );

    const onClickContainer = (): void => {
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
            className={classNames(className, "mendix-listview-selection", {
                [`${dynamicClassName.value}`]: selected && selectionType === "CONTAINER"
            })}
            style={{ ...style, cursor: ReadOnly ? "default" : "pointer" }}
            tabIndex={selectionType === "CONTAINER" ? tabIndex || 0 : undefined}
            ref={mainRef}
            onClick={() => {
                if (!ReadOnly) {
                    onClickContainer();
                    mainRef.current?.blur();
                }
            }}
            
            onKeyDown={event => {
                if (event.key === "Enter" && !ReadOnly) {
                    onClickContainer();
                }
            }}
        >
            {selectionType === "INPUT" && (
                <Fragment>
                    {referenceType === "REFERENCE" ? (
                        <input type="radio" readOnly={ReadOnly} checked={selected} tabIndex={tabIndex}></input>
                    ) : (
                        <input type="checkbox" readOnly={ReadOnly} checked={selected} tabIndex={tabIndex}></input>
                    )}
                </Fragment>
            )}
            {selectionType === "CONTAINER" && content}
        </div>
    );
}
