export default function map(state = { loaded: false }, action) {
  switch (action.type) {
    case 'MAP_LOADED':
      return { ...state, loaded: true };
    default:
      return state;
  }
}
