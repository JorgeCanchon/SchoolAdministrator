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