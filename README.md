## ListViewSelection
A widget that simplifies making a list view with single or multi-select functionality

<table>
 <tr>
  <td>Check boxes / Radio buttons</td>
  <td>Highlight a row</td>
 </tr>
  <td> <img src="https://github.com/bsgriggs/mendix-listview-selection/blob/media/demo_input.png"  alt="input" width="100%" height="auto" /></td>
 <td> <img src="https://github.com/bsgriggs/mendix-listview-selection/blob/media/demo_container.png"  alt="container" width="100%" height="auto" /></td>
</table>

## Features
- Can select a single object or a set of objects
- Option to have a check box, radio buttons, or highlight the row
- Ability to run an action when the selection changes

## Usage
<details>
<summary><h3>1. Domain model</h3></summary>
<p>You need a non-persistent page helper object that has an association with the entity that is listed in the list view.</p>
    <p>In this case, my list view returns Vehicles</p>
    <img src="https://github.com/bsgriggs/mendix-listview-selection/blob/media/domain.png"  alt="container" width="100%" height="auto" />
</details>

<details>
<summary><h3>2. Nanoflow DS_ListViewContext</h3></summary>
<p>You need a **Nanoflow** that receives an object from the list view's row, adds it to a list, and returns the list.</p>
    <p>This is required due to a technical limitation. Use a nanoflow to minimize overhead.</p>
    <img src="https://github.com/bsgriggs/mendix-listview-selection/blob/media/DS_ListViewContent.png"  alt="container" width="100%" height="auto" />
</details>

<details>
<summary><h3>3a. Check boxes / Radio buttons</h3></summary>
<p></p>
</details>

<details>
<summary><h3>3b. Highlight a row</h3></summary>
<p></p>
</details>

## Demo project
https://widgettesting105-sandbox.mxapps.io/p/advanced-listview-controls

## Issues, suggestions and feature requests
https://github.com/bsgriggs/mendix-listview-selection/issues

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
1. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.

Benjamin Griggs
