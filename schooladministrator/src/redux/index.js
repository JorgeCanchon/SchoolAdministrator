import { combineReducers } from 'redux';
import { connectRouter } from "connected-react-router";
import reducerTeacher  from './teacher/index';
import reducerStudent  from './student/index';
import reducerSubject  from './subject/index';
import reducerGradebook  from './gradebook/index';

export default history => combineReducers({
   teacher: reducerTeacher,
   student: reducerStudent,
   subject: reducerSubject,
   gradebook: reducerGradebook,
   router: connectRouter(history)
});
