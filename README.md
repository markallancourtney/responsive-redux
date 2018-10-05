# responsive-redux
Responsive state management for redux. Works with React and React Native.

#### React example code
https://github.com/markallancourtney/responsive-redux-example-react-web

#### React Native example code
https://github.com/markallancourtney/responsive-redux-example-react-native


# Features
- Developer defined breakpoints
- One place in code that calculates the current breakpoint
- Uses just one event listener
- Uses [reselect](https://github.com/reduxjs/reselect) to provide a single source for getting responsive state



# Example

```js
// MyComponent.js

import React from 'react'
import { connect } from 'react-redux'
import { getResponsive } from 'responsive-redux'


class MyComponent extends React.Component {
    render() {
        // grab the responsive state off of props
        const { responsive } = this.props

        let message = `The viewport's current media type is: ${responsive.mediaType}.`

        if (responsive.lessThan.small) {
            message += 'Secret message for viewports smaller than than the "small" breakpoint!'
        } else if (responsive.lessThan.medium) {
            message += 'Secret message for viewports between the "small" and "medium" breakpoints!'
        } else {
            message += 'Message for viewports greater than the "medium" breakpoint.'
        }

        return (
            <p>
                {message}
            </p>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  // use the getResponsive() selector
  const responsive = getResponsive(state)

  return {
    responsive
  }
}

export default connect(mapStateToProps)(MyComponent)

```

# The Responsive State

The reducer provided by `responsive-redux` adds the following to the redux store.
The getResponsive() selector returns this `responsive` object.

- top-level redux store
    - `responsive`
        - `mediaType`: (*string*) The largest breakpoint category that the viewport satisfies.
        - `orientation`: (*string*) The viewport orientation. Has three possible values: "portrait", "landscape", or `null`.
        - `lessThan`: (*object*) An object keyed by breakpoint name with values of booleans that indicate whether the viewport is currently less than the breakpoint.
        - `greaterThan`: (*object*) An object keyed by breakpoint name with values of booleans that indicate whether the viewport is currently greater than the breakpoint.
        - `is`: (*object*) An object keyed by breakpoint name with values of booleans that indicate whether the viewport is currently that particular breakpoint.

Using the object returned from the getResponsive() selector, you can access the viewport's current media type like so:

```js
// get the current responsive state using the getResponsive() selector
responsive = getResponsive()

// media type (e.g. "large")
responsive.mediaType

// orientation
responsive.orientation

// true if width is greater than the "medium" breakpoint
responsive.greaterThan.medium

// true if mediaType === 'small'
responsive.is.small

```


# Using Custom Breakpoints

Breakpoints are defined by you, the developer. See the links to React and React Native code examples above.


### The Infinity Media Type

When the viewport is wider than the largest breakpoint, its `mediaType` value is `infinity`.
