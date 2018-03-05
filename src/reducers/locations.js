export default function locations(state = ['', ''], action) {
  switch (action.type) {
    case 'ADD_LOCATION':
      return [...state, ''];
    case 'CHANGE_LOCATION':
      return Object.assign([], state, {
        [action.payload.index]: action.payload.val,
      });

    case 'REMOVE_LOCATION':
      return state
        .slice(0, action.payload.index)
        .concat(state.slice(action.payload.index + 1));
    default:
      return state;
  }
}
