import classNames from "classnames";
import { ReactElement, createElement, useMemo, Fragment, useRef } from "react";
import { ListViewSelectionContainerProps } from "../typings/ListViewSelectionProps";
import { ValueStatus, ObjectItem } from "mendix";
import "./ui/ListViewSelection.css";

export function ListViewSelection(props: ListViewSelectionContainerProps): ReactElement {
    const mainRef = useRef<HTMLDivElement>(null);

    const contextObject: ObjectItem | undefined = useMemo(() => {
        if (props.dataSource.status === ValueStatus.Available) {
            if (props.dataSource.items && props.dataSource.items.length > 0) {
                return props.dataSource.items[0];
            } else {
                console.error(`List View Selection (id: ${props.name}) was not passed the context object.`);
            }
        }
    }, [props.dataSource, props.name]);

    const selected: boolean = useMemo(
        () =>
            props.referenceType === "REFERENCE"
                ? props.reference.value !== undefined &&
                  contextObject !== undefined &&
                  props.reference.value === contextObject
                : props.referenceSet.value !== undefined &&
                  contextObject !== undefined &&
                  props.referenceSet.value.find(value => value.id === contextObject.id) !== undefined,
        [props.reference, props.referenceSet, contextObject, props.referenceType]
    );

    const ReadOnly: boolean = useMemo(
        () => (props.referenceType === "REFERENCE" ? props.reference.readOnly : props.referenceSet.readOnly),
        [props.reference, props.referenceSet, props.referenceType]
    );

    const onClickContainer = (): void => {
        if (contextObject !== undefined) {
            if (props.referenceType === "REFERENCE") {
                if (selected) {
                    props.reference.setValue(undefined);
                } else {
                    props.reference.setValue(contextObject);
                }
            } else {
                const refSetValue = props.referenceSet.value;
                if (selected) {
                    props.referenceSet.setValue(refSetValue?.filter(value => value.id !== contextObject.id));
                } else if (refSetValue !== undefined) {
                    props.referenceSet.setValue([...refSetValue, contextObject]);
                } else {
                    props.referenceSet.setValue([contextObject]);
                }
            }
        }
    };

    return (
        <div
            id={props.name}
            className={classNames(props.class, "mendix-listview-selection", {
                [`${props.dynamicClassName.value}`]: selected && props.selectionType === "CONTAINER"
            })}
            style={{ ...props.style, cursor: ReadOnly ? "default" : "pointer" }}
            tabIndex={props.selectionType === "CONTAINER" ? props.tabIndex || 0 : undefined}
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
            aria-selected={props.selectionType === "CONTAINER" ? selected : undefined}
        >
            {props.selectionType === "INPUT" && (
                <Fragment>
                    {props.referenceType === "REFERENCE" ? (
                        <input
                            type="radio"
                            readOnly={ReadOnly}
                            checked={selected}
                            tabIndex={props.tabIndex}
                            aria-label={props.ariaLabel?.value}
                        ></input>
                    ) : (
                        <input
                            type="checkbox"
                            readOnly={ReadOnly}
                            checked={selected}
                            tabIndex={props.tabIndex}
                            aria-label={props.ariaLabel?.value}
                        ></input>
                    )}
                </Fragment>
            )}
            {props.selectionType === "CONTAINER" && props.content}
        </div>
    );
}
