function convertPath(path) {
  return path.map(path => {
    return {
      lat: Number(path[0]),
      lng: Number(path[1]),
    };
  });
}
export default function route(state, action) {
  switch (action.type) {
    case 'SET_ROUTE':
      if (action.payload.status == 'success') {
        return { ...action.payload, path: convertPath(action.payload.path) };
      } else {
        return action.payload;
      }

    default:
      return state;
  }
}
