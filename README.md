## List View Selection

A widget that simplifies making a list view with single or multi-select functionality

<table>
 <tr>
  <td>Check boxes / Radio buttons</td>
  <td>Highlight a row</td>
 </tr>
  <td> <img src="https://github.com/bsgriggs/mendix-listview-selection/blob/media/demo_input.png"  alt="input demo" width="100%" height="auto" /></td>
 <td> <img src="https://github.com/bsgriggs/mendix-listview-selection/blob/media/demo_container.png"  alt="container demo" width="100%" height="auto" /></td>
</table>

## Features

-   Can select a single object or a set of objects
-   Option to have a check box, radio buttons, or highlight the row
-   Ability to run an action when the selection changes
-   Supports keyboard navigation

## Usage

<details>
<summary><h3>1. Domain model</h3></summary>
<p>You need a non-persistent page helper object that has an association with the entity that is listed in the list view.</p>
    <p>In this case, my list view returns Vehicles</p>
    <img src="https://github.com/bsgriggs/mendix-listview-selection/blob/media/domain.png"  alt="domain" width="100%" height="auto" />
</details>

<details>
<summary><h3>2. Nanoflow DS_ListViewContext</h3></summary>
<p>You need a <strong>Nanoflow</strong> that receives an object from the list view's row, adds it to a list, and returns the list.</p>
    <p>This is required due to a technical limitation. Use a nanoflow to minimize overhead.</p>
    <img src="https://github.com/bsgriggs/mendix-listview-selection/blob/media/DS_ListViewContext.png"  alt="context" width="100%" height="auto" />
</details>

<details>
<summary><h3>3a. Checkboxes / Radio buttons</h3></summary>
<p>Add the widget to a column of your list view content</p>
 <img src="https://github.com/bsgriggs/mendix-listview-selection/blob/media/page_Input.png"  alt="page input" width="100%" height="auto" />
 <p>Set the widget settings according to your domain model</p>
  <img src="https://github.com/bsgriggs/mendix-listview-selection/blob/media/selectionType_Input.png"  alt="input settings" width="100%" height="auto" />
 <p><strong>Reference type</strong> Should the user be able to select an object or a list of objects</p>
 <p><strong>Reference</strong> The association from your non-persistent page helper to the objects being shown in the list view</p>
 <p><strong>Data source</strong> The Nanoflow created in step 2</p>
</details>

<details>
<summary><h3>3b. Highlight a row</h3></summary>
<p>Add the widget as the root of your list view content. </p>
 <img src="https://github.com/bsgriggs/mendix-listview-selection/blob/media/page_Container.png"  alt="page container" width="100%" height="auto" />
 <p>Set the widget settings according to your domain model</p>
  <img src="https://github.com/bsgriggs/mendix-listview-selection/blob/media/selectionType_Input.png"  alt="container settings" width="100%" height="auto" />
  <p><strong>Reference type</strong> Should the user be able to select an object or a list of objects</p>
 <p><strong>Reference</strong> The association from your non-persistent page helper to the objects being shown in the list view</p>
 <p><strong>Data source</strong> The Nanoflow created in step 2</p>
 <p><strong>Dynamic class name</strong> The class name applied to the widget's child container when this row is selected.</p>
 <p>Note: you will need to use some CSS/SCSS to make the widget's container the full height and width of the row. Remove the padding from the li and add it to the class you put for dynamic class name</p>
</details>

## Demo project

https://widgettesting105-sandbox.mxapps.io/p/advanced-listview-controls

## Issues, suggestions and feature requests

https://github.com/bsgriggs/mendix-listview-selection/issues

## Development and contribution

Benjamin Griggs
