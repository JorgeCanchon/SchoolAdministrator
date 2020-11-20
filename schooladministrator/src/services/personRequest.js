import axios from 'axios';
import * as constants from '../utils/constants';

export const GetTeacher = async () => {
  try {
    let result = await axios.get(constants.PERSON.GET_TEACHER);
    let data = await result;
    return data;
  } catch (e) {
    console.log(e);
    return { status: 500 };
  }
}

export const GetStudent = async () => {
  try {
    let result = await axios.get(constants.PERSON.GET_STUDENT);
    let data = await result;
    return data;
  } catch (e) {
    console.log(e);
    return { status: 500 };
  }
}

export const DeletePerson = async id => {
  try {
    let result = await axios.delete(`${constants.PERSON.DELETE}/${id}`);
    let data = await result;
    return data;
  } catch (e) {
    console.log(e);
    return { status: 500 };
  }
}

export const AddPerson = async person => {
  try {
    let result = await axios.post(constants.PERSON.POST, person);
    let data = await result;
    return data;
  } catch (e) {
    console.log(e);
    return { status: 500 };
  }
}

export const UpdatePerson = async person => {
  try {
    let result = await axios.put(constants.PERSON.PUT, person);
    let data = await result;
    return data;
  } catch (e) {
    console.log(e);
    return { status: 500 };
  }
}