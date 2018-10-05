/**
 * Reducer and action creator duck
 *
 * Can be used in browser and with React Native
 */

import { handleActions } from 'redux-actions'
import breakpointsDefault from './breakpoints-default'

// media type to default to when no width/height dimensions present
const defaultMediaType = 'infinity'

// orientation to default to when no width/height dimensions present
const defaultOrientation = null

/*******************************************************************************
 * Actions
 ******************************************************************************/

const CALCULATE_RESPONSIVE_STATE = 'responsive-redux/CALCULATE_RESPONSIVE_STATE'

/*******************************************************************************
 * Action Creators
 ******************************************************************************/

/**
 * Action creator can be used in browser and React Native
 *
 * Can be called in browser
 * const width = window.innerWidth
 * const height = window.innerHeight
 *
 * Can be called in React Native
 * import { Dimensions } from 'react-native'
 * const { width, height } = Dimensions.get('window')
 */
export const calculateResponsiveState = ({ width, height, breakpoints } = {}) => {
  return {
    type: CALCULATE_RESPONSIVE_STATE,
    payload: {
      width,
      height,
      breakpoints
    }
  }
}

/*******************************************************************************
 * Initial State
 ******************************************************************************/

const initialState = {
  breakpoints: breakpointsDefault,
  mediaType: defaultMediaType,
  orientation: defaultOrientation,
  lessThan: {},
  greaterThan: {},
  is: {}
}

/*******************************************************************************
 * Reducer
 ******************************************************************************/

export default handleActions(
  {
    [CALCULATE_RESPONSIVE_STATE]: (state, action) => {
      const { payload } = action
      const { width, height, breakpoints } = payload

      let breakpointsUse = breakpoints

      // use the default breakpoints if none were defined by the developer
      if(Object.keys(breakpointsUse) < 1) {
        breakpointsUse = breakpointsDefault
      }

      return _getState({ width, height, breakpoints: breakpointsUse })
    }
  },
  initialState
)

/**
 * This is what the new state will look like using defaultBreakpoints
 *
 * state = {
 *    breakpoints: {
 *        extraSmall: integer,
 *        large: integer,
 *        medium: integer,
 *        small: integer,
 *    },
 *    greaterThan: {
 *        extraSmall: boolean,
 *        large: boolean,
 *        medium: boolean,
 *        small: boolean,
 *    },
 *    is: {
 *        extraSmall: boolean,
 *        large: boolean,
 *        medium: boolean,
 *        small: boolean,
 *    }
 *    lessThan: {
 *        extraSmall: boolean,
 *        large: boolean,
 *        medium: boolean,
 *        small: boolean,
 *    },
 *    mediaType: name of current breakpoint,
 *    orientation: 'portrait' or 'landscape'
 * }
 *
 */

/**
 * Used in reducer
 *
 * @param { width, height} Object
 */
const _getState = ({ width, height, breakpoints }) => {
  // clone the initialState
  let state = JSON.parse(JSON.stringify(initialState))

  // set state.orientation
  let orientation = 'portrait'

  if (width > height) {
    orientation = 'landscape'
  }

  state = {
    ...state,
    orientation
  }

  // get the names of all the breakpoints
  const breakpointNames = Object.keys(breakpoints)

  // breakpoints when keys and values swapped
  let keyedByValue = {}

  // iterate breakpointNames and determine state.greaterThan and state.lessThan
  for (let i = 0; i < breakpointNames.length; i++) {
    const breakpointName = breakpointNames[i]

    // the value of the configured breakpoint
    const value = breakpoints[breakpointName]

    keyedByValue[value] = breakpointName

    state['greaterThan'][breakpointName] = false
    state['lessThan'][breakpointName] = false

    if (width > value) {
      state['greaterThan'][breakpointName] = true
    }

    if (width < value) {
      state['lessThan'][breakpointName] = true
    }
  }

  let breakpointValues = []

  for (let b in breakpoints) {
    const value = breakpoints[b]
    breakpointValues.push(value)
  }

  breakpointValues.sort((a, b) => {
    if (a < b) {
      return -1
    }
    if (a > b) {
      return 1
    }

    // a must be equal to b
    return 0
  })

  let largestBreakpointValue = 0

  // iterate breakpointValues and determine state.is
  for (let i = 0; i < breakpointValues.length; i++) {
    const breakpointValue = breakpointValues[i]

    if (width <= breakpointValue) {
      if (!largestBreakpointValue) {
        largestBreakpointValue = breakpointValue
      }
    }

    const breakpointName = keyedByValue[breakpointValue]

    // set false until done interating and largestBreakpointValue has been found
    state['is'][breakpointName] = false
  }

  // get the name of the largest breakpoint
  const mediaType = keyedByValue[largestBreakpointValue]

  state['is'][mediaType] = true

  const dimensions = { width, height }

  state = {
    ...state,
    breakpoints,
    dimensions,
    mediaType
  }

  return state
}
