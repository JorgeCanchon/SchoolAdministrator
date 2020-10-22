export const ADD_TEACHER = 'ADD_TEACHER';
export const SET_TEACHERS = 'SET_TEACHERS';
export const DELETE_TEACHER = 'DELETE_TEACHER';
export const UPDATE_TEACHER = 'UPDATE_TEACHER';

export const initialState = {
  teacher: []
};

export const reducerTeacher = (state = initialState, action) => {
  switch(action.type)
  {
    case ADD_TEACHER:
      return {
        ...state,
        teacher: [
          ...state.teacher,
          action.teacher
        ]
      }
    case SET_TEACHERS:
      return {
        ...state,
        teacher: action.teachers
      }
    case DELETE_TEACHER:
      return {
        ...state,
        teacher: [
          state.teacher.filter(x => x.id !== action.id)
        ]
      }
    case UPDATE_TEACHER:
      return {
        ...state,
        teacher: [
          state.teacher.map(x => (
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

export const addTeacher = teacher => ({
  type: ADD_TEACHER,
  teacher
});

export const setTeachers = teachers => ({
  type: SET_TEACHERS,
  teachers
});

export const deleteTeacher = id => ({
  type: DELETE_TEACHER,
  id
});

export const updateTeacher = (id, data) => ({
  type: UPDATE_TEACHER,
  id,
  data
});

export default reducerTeacher;