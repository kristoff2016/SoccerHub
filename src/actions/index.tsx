import * as auth from './auth';
function toReducerAction(dispatch: any, action: any) {
  return (...args: any) => dispatch(action(...args));
}

function combineActions(dispatch: any) {
  const allActions = {
    ...auth,
  };

  return Object.entries(allActions).reduce(
    (actions, [actionName, action]) => ({
      ...actions,
      [actionName]: toReducerAction(dispatch, action),
    }),
    {},
  );
}

export default combineActions;
