# responsive-redux

Responsive state management for Redux. Works with React and React Native.

# Installation

Install `responsive-redux` with npm.

```
npm install --save responsive-redux
```

# Features

- Works in React and React Native
- Developer defined breakpoints
- Uses just one event listener
- One place in code that calculates the current breakpoint
- Uses [reselect](https://github.com/reduxjs/reselect) style selector to provide a single source for getting responsive state

# Examples

#### React example code

<a href="https://github.com/markallancourtney/responsive-redux-example-react-web" target="_blank">
    https://github.com/markallancourtney/responsive-redux-example-react-web
</a>

#### React Native example code

<a href="https://github.com/markallancourtney/responsive-redux-example-react-native" target="_blank">
    https://github.com/markallancourtney/responsive-redux-example-react-native
</a>

# Example

```js
// MyComponent.js

import React from "react";
import { connect } from "react-redux";
import { getResponsive } from "responsive-redux";

// optional for React Native
import { View, Text } from "react-native";

class MyComponent extends React.Component {
  render() {
    // grab the responsive state off of props
    const { responsive } = this.props;

    let message = `The viewport's current media type is: ${
      responsive.mediaType
    }. `;

    if (responsive.lessThan.small) {
      message +=
        'Secret message for viewports smaller than than the "small" breakpoint!';
    } else if (responsive.lessThan.medium) {
      message +=
        'Secret message for viewports between the "small" and "medium" breakpoints!';
    } else {
      message += 'Message for viewports greater than the "medium" breakpoint.';
    }

    // React Native
    return (
      <View>
        <Text>{message}</Text>
      </View>
    );

    // React web
    return <p>{message}</p>;
  }
}

const mapStateToProps = (state, ownProps) => {
  // use the getResponsive() selector
  const responsive = getResponsive(state);

  return {
    responsive
  };
};

export default connect(mapStateToProps)(MyComponent);
```

# The Responsive State

The reducer provided by `responsive-redux` adds the following to the Redux store.
The getResponsive() selector returns the `responsive` object.

- top-level Redux store
  - `responsive`
    - `breakpoints`: (_object_) A duplicate of the developer-defined breakpoints object. An object keyed by breakpoint name with values of the pixel width of the breakpoint.
    - `dimensions`: {_object_} An object with keys `width` and `height` and values of the current width and height of the viewport.
    - `greaterThan`: (_object_) An object keyed by breakpoint name with values of booleans that indicate whether the viewport is currently greater than the breakpoint.
    - `is`: (_object_) An object keyed by breakpoint name with values of booleans that indicate whether the viewport is currently that particular breakpoint.
    - `lessThan`: (_object_) An object keyed by breakpoint name with values of booleans that indicate whether the viewport is currently less than the breakpoint.
    - `mediaType`: (_string_) The largest breakpoint category that the viewport satisfies.
    - `orientation`: (_string_) The viewport orientation. Has three possible values: "portrait", "landscape", or `null`.

Using the object returned from the getResponsive() selector, you can access the viewport's current media type like so:

```js
// get the current responsive state using the getResponsive() selector
responsive = getResponsive();

// media type (e.g. "large")
responsive.mediaType;

// orientation
responsive.orientation;

// true if width is greater than the "medium" breakpoint
responsive.greaterThan.medium;

// true if mediaType === 'small'
responsive.is.small;
```

# Using Custom Breakpoints

Breakpoints are defined by you, the developer. See the links to React and React Native code examples above.

### The Infinity Media Type

When the viewport is wider than the largest breakpoint, its `mediaType` value is `infinity`.

---

### Thanks

This project was inspired by <a href="https://github.com/AlecAivazis/redux-responsive" target="_blank">redux-responsive</a>
