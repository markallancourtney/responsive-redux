// default export in ./duck.js is the reducer
import reducer from './duck'
export { reducer }

// all other exports in ./duck.js are action creators
export * from './duck'

// export all selectors
export * from './selectors'
