export const ADD_SUBJECT = 'ADD_SUBJECT';
export const SET_SUBJECTS = 'SET_SUBJECTS';
export const DELETE_SUBJECT = 'DELETE_SUBJECT';
export const UPDATE_SUBJECT = 'UPDATE_SUBJECT';

export const initialState = {
  subject: []
};

export const reducerSubject = (state = initialState, action) => {
  switch(action.type)
  {
    case ADD_SUBJECT:
      return {
        ...state,
        subject: [
          ...state.subject,
          action.subject
        ]
      }
    case SET_SUBJECTS:
      return {
        ...state,
        subject: action.subjects
      }
    case DELETE_SUBJECT:
      return {
        ...state,
        subject: [
          state.subject.filter(x => x.id !== action.id)
        ]
      }
    case UPDATE_SUBJECT:
      return {
        ...state,
        subject: [
          state.subject.map(x => (
            x.id === action.id ? {
              ...x,
              property: action.a.property
            }
            : x
          ))
        ]
      }  
    default:
      return state;  
  }
}

export const addSubject = subject => ({
  type: ADD_SUBJECT,
  subject
});

export const setSubjects = subjects => ({
  type: SET_SUBJECTS,
  subjects
});

export const deleteSubject = id => ({
  type: DELETE_SUBJECT,
  id
});

export const updateSubject = (id, data) => ({
  type: UPDATE_SUBJECT,
  id,
  data
});

export default reducerSubject;