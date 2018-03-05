import API from 'redux-api-middleware-addon';
export function addLocation() {
  return async (dispatch, getState) => {
    dispatch({ type: 'ADD_LOCATION' });
  };
}
export function mapLoaded() {
  return async (dispatch, getState) => {
    dispatch({ type: 'MAP_LOADED' });
  };
}

export function reloadRoute() {
  return async (dispatch, getState) => {
    let createRouteResult = await dispatch(
      API.Action.request(
        '/route',
        {
          method: 'post',
          data: { locations: getState().locations },
          subst: null,
        },
        API.Helper.BASIC
      )
    );

    if (createRouteResult.type == 'SUCCESS') {
      let getRouteResult = await dispatch(
        API.Action.request(
          '/route/{token}',
          {
            method: 'get',
            data: null,
            subst: { token: createRouteResult.payload.token },
          },
          API.Helper.BASIC
        )
      );
      if (getRouteResult.type == 'SUCCESS') {
        dispatch({ type: 'SET_ROUTE', payload: getRouteResult.payload });
      }
    }
  };
}
export function removeLocation(index) {
  return async (dispatch, getState) => {
    dispatch({ type: 'REMOVE_LOCATION', payload: { index: index } });
    await dispatch(reloadRoute());
  };
}
export function locationChange(index, val) {
  return { type: 'CHANGE_LOCATION', payload: { index: index, val: val } };
}
