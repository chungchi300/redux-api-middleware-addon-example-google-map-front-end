import _ from 'lodash';
export function isFailed(state) {
  return (
    state.network.getRoute == 'FAILURE' ||
    state.network.postRoute == 'FAILURE' ||
    _.get(state, 'route.status') == 'in progress' ||
    _.get(state, 'route.status') == 'failure'
  );
}
