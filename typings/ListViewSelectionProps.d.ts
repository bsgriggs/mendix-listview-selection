/**
 * This file was generated from ListViewSelection.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue, ListValue, ReferenceValue, ReferenceSetValue } from "mendix";

export type ReferenceTypeEnum = "REFERENCE" | "REFERENCE_SET";

export type StorageTypeEnum = "MENDIX" | "BROWSER_STORAGE";

export type SelectionTypeEnum = "INPUT" | "CONTAINER";

export interface ListViewSelectionContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    referenceType: ReferenceTypeEnum;
    storageType: StorageTypeEnum;
    reference: ReferenceValue;
    referenceSet: ReferenceSetValue;
    dataSource: ListValue;
    selectionType: SelectionTypeEnum;
    content: ReactNode;
    dynamicClassName: DynamicValue<string>;
    ariaLabel?: DynamicValue<string>;
}

export interface ListViewSelectionPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    referenceType: ReferenceTypeEnum;
    storageType: StorageTypeEnum;
    reference: string;
    referenceSet: string;
    dataSource: {} | { caption: string } | { type: string } | null;
    onChange: {} | null;
    selectionType: SelectionTypeEnum;
    content: { widgetCount: number; renderer: ComponentType<{ children: ReactNode; caption?: string }> };
    dynamicClassName: string;
    ariaLabel: string;
}
