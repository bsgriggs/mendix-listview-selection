import classNames from "classnames";
import { ReactElement, createElement, useMemo, Fragment, useRef } from "react";
import { ListViewSelectionContainerProps } from "../typings/ListViewSelectionProps";
import { ValueStatus, ObjectItem } from "mendix";
import "./ui/ListViewSelection.css";
import useSessionStorageSync from "./utils/useSessionStorageSync";

export function ListViewSelection(props: ListViewSelectionContainerProps): ReactElement {
    const mainRef = useRef<HTMLDivElement>(null);
    const [selectedObjs, setSelectedObjs] = useSessionStorageSync(props.name, null);

    const contextObject: ObjectItem | undefined = useMemo(() => {
        if (props.dataSource.status === ValueStatus.Available) {
            if (props.dataSource.items !== undefined && props.dataSource.items.length > 0) {
                return props.dataSource.items[0];
            } else {
                console.error(`List View Selection (id: ${props.name}) was not passed the context object.`);
            }
        }
    }, [props.dataSource, props.name]);

    const isSelected = useMemo(() => {
        if (props.storageType === "BROWSER_STORAGE") {
            if (selectedObjs === null || contextObject === undefined) {
                return false;
            } else if (props.referenceType === "REFERENCE") {
                return selectedObjs === JSON.stringify(contextObject);
            } else {
                return (
                    (JSON.parse(selectedObjs) as ObjectItem[]).find(value => value.id === contextObject.id) !==
                    undefined
                );
            }
        } else {
            return props.referenceType === "REFERENCE"
                ? props.reference.value !== undefined &&
                      contextObject !== undefined &&
                      props.reference.value === contextObject
                : props.referenceSet.value !== undefined &&
                      contextObject !== undefined &&
                      props.referenceSet.value.find(value => value.id === contextObject.id) !== undefined;
        }
    }, [props.reference, props.referenceSet, contextObject, props.storageType, props.referenceType, selectedObjs]);

    const ReadOnly: boolean = useMemo(
        () =>
            props.storageType === "BROWSER_STORAGE"
                ? false
                : props.referenceType === "REFERENCE"
                ? props.reference.readOnly
                : props.referenceSet.readOnly,
        [props.reference, props.referenceSet, props.storageType, props.referenceType]
    );

    const onClickContainer = (): void => {
        if (contextObject !== undefined) {
            if (props.storageType === "BROWSER_STORAGE") {
                if (props.referenceType === "REFERENCE") {
                    if (isSelected) {
                        setSelectedObjs(null);
                    } else {
                        setSelectedObjs(JSON.stringify(contextObject));
                    }
                } else {
                    const selected: ObjectItem[] = JSON.parse(selectedObjs);
                    if (isSelected) {
                        setSelectedObjs(JSON.stringify(selected?.filter(value => value.id !== contextObject.id)));
                    } else {
                        setSelectedObjs(JSON.stringify([...selected, contextObject]));
                    }
                }
            } else {
                if (props.referenceType === "REFERENCE") {
                    if (isSelected) {
                        props.reference.setValue(undefined);
                    } else {
                        props.reference.setValue(contextObject);
                    }
                } else {
                    const refSetValue = props.referenceSet.value;
                    if (isSelected) {
                        props.referenceSet.setValue(refSetValue?.filter(value => value.id !== contextObject.id));
                    } else if (refSetValue !== undefined) {
                        props.referenceSet.setValue([...refSetValue, contextObject]);
                    } else {
                        props.referenceSet.setValue([contextObject]);
                    }
                }
            }
        }
    };

    // useEffect(() => {
    //     // on unmount - clear selection from storage
    //     return () => setSelectedObjs(null);
    // }, [setSelectedObjs]);

    return (
        <div
            id={props.name}
            className={classNames(props.class, "mendix-listview-selection", {
                [`${props.dynamicClassName.value}`]: isSelected && props.selectionType === "CONTAINER"
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
            aria-selected={props.selectionType === "CONTAINER" ? isSelected : undefined}
        >
            {props.selectionType === "INPUT" && (
                <Fragment>
                    {props.referenceType === "REFERENCE" ? (
                        <input
                            type="radio"
                            readOnly={ReadOnly}
                            checked={isSelected}
                            tabIndex={props.tabIndex}
                            aria-label={props.ariaLabel?.value}
                        ></input>
                    ) : (
                        <input
                            type="checkbox"
                            readOnly={ReadOnly}
                            checked={isSelected}
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
