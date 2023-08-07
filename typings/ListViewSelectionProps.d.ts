/**
 * This file was generated from ListViewSelection.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, ListValue, ReferenceValue, ReferenceSetValue } from "mendix";

export type ReferenceTypeEnum = "REFERENCE" | "REFERENCE_SET";

export type SelectionTypeEnum = "INPUT" | "CONTAINER";

export interface ListViewSelectionContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    referenceType: ReferenceTypeEnum;
    reference: ReferenceValue;
    referenceSet: ReferenceSetValue;
    dataSource: ListValue;
    onChange?: ActionValue;
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
    reference: string;
    referenceSet: string;
    dataSource: {} | { type: string } | null;
    onChange: {} | null;
    selectionType: SelectionTypeEnum;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    dynamicClassName: string;
    ariaLabel: string;
}
