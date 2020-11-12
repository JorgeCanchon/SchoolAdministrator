import axios from 'axios';
import * as constants from '../utils/constants';

export const GetReportGradebook = async () => {
    try
    {
      let result = await axios.get(constants.SUBJECT.GET_REPORT);
      let data = await result;
      return data; 
    }catch(e)
    {
      console.log(e);
      return { status: 500 };
    }
}


export const GetSubjects = async () => {
  try
  {
    let result = await axios.get(constants.SUBJECT.GET_SUBJECT);
    let data = await result;
    return data; 
  }catch(e)
  {
    console.log(e);
    return { status: 500 };
  }
}

export const InsertSubject = async subject => {
  try 
  {
    let result = await axios.post(constants.SUBJECT.POST, subject);
    let data = await result;
    return data;
  } catch (e) {
    console.log(e);
    return { status: 500 };
  }
}

export const InsertStudentSubject = async entity => {
  try 
  {
    let result = await axios.post(constants.SUBJECT.POST_STUDENT_SUBJECT, entity);
    let data = await result;
    return data;
  } catch (e) {
    console.log(e);
    return { status: 500 };
  }
}

