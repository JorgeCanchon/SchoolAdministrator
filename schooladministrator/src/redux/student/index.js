export const ADD_STUDENT = 'ADD_STUDENT';
export const SET_STUDENTS = 'SET_STUDENTS';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';

export const initialState = {
  teacher: []
};

export const reducerStudent = (state = initialState, action) => {
  switch(action.type)
  {
    case ADD_STUDENT:
      return {
        ...state,
        student: [
          ...state.student,
          action.student
        ]
      }
    case SET_STUDENTS:
      return {
        ...state,
        student: action.STUDENTs
      }
    case DELETE_STUDENT:
      return {
        ...state,
        student: [
          state.student.filter(x => x.id !== action.id)
        ]
      }
    case UPDATE_STUDENT:
      return {
        ...state,
        student: [
          state.student.map(x => (
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

export const addStudent = student => ({
  type: ADD_STUDENT,
  student
});

export const setStudent = STUDENTs => ({
  type: SET_STUDENTS,
  STUDENTs
});

export const deleteStudent = id => ({
  type: DELETE_STUDENT,
  id
});

export const updateStudent = (id, data) => ({
  type: UPDATE_STUDENT,
  id,
  data
});

export default reducerStudent;