# DOM Game UI with ControlWrap

`domgameui` is a lightweight, powerful UI framework built on top of `lit`](https://lit.dev/) for creating game user interfaces using standard DOM elements. Designed with game development in mind, it allows for intuitive navigation and interaction using gamepads and keyboards, without the need for a mouse or touch input(It's optional). This framework makes it easy to implement a cursor system, select items, and interact with a variety of UI components such as lists, grids, tab panels, buttons, selectors, checkboxes, range sliders, and radio button groups. Additionally, `dom game ui` offers robust support for multiplayer controls, enabling multiple players to interact with the UI simultaneously.

This project is dependent on the [`controlwrap`](https://www.npmjs.com/package/controlwrap) library, which provides the underlying input management and device abstraction necessary for `dom game ui` to function seamlessly across different input devices.

## Features

- **Gamepad and Keyboard Support:** Navigate your UI with gamepads and keyboards seamlessly.
- **Multiplayer Ready:** Built-in support for multiple players to interact with the UI at the same time.
- **Customizable Components:** Includes a variety of UI components such as buttons, selectors, checkboxes, and more, all customizable for your game's needs.
- **Cursor Management:** Easy-to-use cursor system for navigating through UI elements.
- **Control Peer Dependency on [`ControlWrap`](https://www.npmjs.com/package/controlwrap):** Leverages `controlwrap` for handling input devices, making integration simple and efficient.

## Demo

TBD

## Getting Started

To get started with `dom game ui`, you'll need to install the package and its dependencies in your project.

### Installation

```bash
npm install domgameui controlwrap
```

## Examples

```typescript
import {ControlWrap,mappingRequirement,MouseMaster} from 'controlwrap';
import {UIMaster} from 'domgameui';

//init ControlWrap config first
ControlWrap.getInstance().wrappedInit(...)

//init UIMaster with a html Element as container
UIMaster.init(document.getElementById('main_ui') as HTMLDivElement);

//renew input eeveryframe, and put it into the UI
const enterFrameDo=()=>{
    const Inputs=ControlWrap.getInstance().update();
    UIMaster.getInstance().frameUpdate(Inputs);
    window.requestAnimationFrame(enterFrameDo);
}
enterFrameDo();

//write a Main View extends from `UIParentRoot`, for instance named it as `mainScreen`
//create a instance of `mainScreen`, and call `UIMaster` to switch to this view
UIMaster.getInstance().showMain(mainScreen.createInstance() as mainScreen).then(async ()=>{
    //done
})

```

## Documentation

### Concept

The fundamental architecture of `dom game ui` is built around three primary class types you should extend: `SelectableComponent`, `Container`, and `RootView`, all orchestrated by the `UIMaster`.

- **SelectableComponent**: This includes UI elements like buttons, sliders, selectors, etc., representing the terminal nodes in the UI hierarchy.
- **Container**: Examples include tab containers, lists, grids, etc. A container can encapsulate another container and is responsible for managing scrollbars.
- **RootView**: Represents a full-screen view or background (non-interactive) and panels (which overlay on top of the view). While it functions as a container, it cannot be nested within another container.
- **UIMaster**: This component allows for switching views, opening/closing panels, changing backgrounds, and managing foreground elements.

The `UIMaster` ensures that at any given time, only one `RootView` is active, and it tracks which `SelectableComponent`, if any, is currently selected. Input is processed in a hierarchical manner: it is first sent to the `SelectableComponent` through `captureInput`. If the component does not capture the input, it bubbles up to its parent container and continues up the hierarchy until it reaches the `RootView`.

Additionally, there is a `captureAllInput` method that directs input to the `RootView` directly (when `captureInput` fails to capture it). Unlike `captureInput`, which processes input from the main player, `captureAllInput` handles inputs from all players simultaneously, making it ideal for multiplayer UI scenarios. Your game should implement a `RootView` (possibly a canvas wrapped in a lit-element) and use `captureAllInput` to aggregate input from each player.

### Styles

By default, if you do not extend a `Component`, it will adopt a basic style that may not align with your aesthetic preferences. To customize the appearance of your components, you have three options:

1) Extend the static `styles` property, similar to a standard lit-element, to apply custom CSS.
2) Override the `renderWrap` method to add a wrapper HTML element around the core element. You can also override the core element itself by modifying the `renderCore` method.
3) Extending a class automatically excludes the default style. If you wish to retain the default styling, simply add `static useTempCss: boolean = true` to your class definition.

All elements feature four lifecycle methods for visibility transitions: `enterAni`, `suspend`, `resume`, and `exitAni`. By default, these methods simply toggle the display between "block" and "none". However, you can override these methods to integrate your custom animations, enhancing the user experience with dynamic visual feedback.

## Contributing

We welcome contributions to `dom game ui`! If you're interested in helping improve the library, please take a look at our contributing guidelines. Whether it's adding new features, fixing bugs, or improving documentation, your help is greatly appreciated.

## License

`dom game ui` is licensed under the MIT License. See the LICENSE file for more details.