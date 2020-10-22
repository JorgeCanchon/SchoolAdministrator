export const SET_GRADEBOOKS = 'SET_GRADEBOOKS';

export const initialState = {
  gradebook: []
};

export const reducerGradebook = (state = initialState, action) => {
  switch(action.type)
  {
    case SET_GRADEBOOKS:
      return {
        ...state,
        gradebook: action.gradebooks
      }
    default:
      return state;  
  }
}

export const setGradebooks = gradebooks => ({
  type: SET_GRADEBOOKS,
  gradebooks
});

export default reducerGradebook;