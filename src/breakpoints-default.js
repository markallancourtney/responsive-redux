/**
 * Default breakpoint declarations.
 * Will be used if no developer-defined breakpoints exist.
 *
 * Interesting article on CSS breakpoints:
 * https://medium.freecodecamp.org/the-100-correct-way-to-do-css-breakpoints-88d6a5ba1862
 *
 * Stats on screen resolutions:
 * http://gs.statcounter.com/#desktop+mobile+tablet-resolution-ww-monthly-201608-201610-bar
 */

/**
 * Breakpoint is the largest value in the range
 */
const breakpoints = {
  extraSmall: 320,
  small: 667, // protrait height of iPhone 6
  medium: 768, // width of average tablet
  large: 1024, // height of average tablet
  extraLarge: 1300,
  infinity: Infinity // When the browser is wider than the largest breakpoint, it's `mediaType` value is `infinity`.
}

export default breakpoints
