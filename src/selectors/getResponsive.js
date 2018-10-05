import { createSelector } from 'reselect'

/**
 * Get the responsive object from redux store
 *
 * @param {Object} state
 */
const _getResponsive = state => {
  return state['responsive']
}

/**
 * Get/select the responsive state from redux
 */
export const getResponsive = createSelector([_getResponsive], state => {
  if (state) {
    return state
  }

  return {}
})
