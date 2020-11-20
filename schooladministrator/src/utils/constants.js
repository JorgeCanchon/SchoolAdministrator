export const API_URL = 'http://localhost:64690/api/';

export const PERSON = {
  GET_TEACHER: `${API_URL}persona/teacher`,
  GET_STUDENT: `${API_URL}persona/student`,
  DELETE: `${API_URL}persona`,
  POST: `${API_URL}persona`,
  PUT: `${API_URL}persona`
}

export const SUBJECT = {
  GET_REPORT: `${API_URL}asignatura/reportGradebook`,
  GET_SUBJECT: `${API_URL}asignatura`,
  POST: `${API_URL}asignatura`,
  POST_STUDENT_SUBJECT: `${API_URL}asignatura/alumnoAsignatura`,
}