import axiosInstance from './ajax';
import jsonp from 'jsonp';
//登录请求
export const reqLogin = (username,password) => axiosInstance.post('/login',{username,password});
//验证登录
export  const reqValidataUser = (id) => axiosInstance.post('/validate/user', {id});
//天气晴朗请求
export const reqWeather = (cityName) => {
  return  new Promise((resolve, reject)=>{
    jsonp(
      `http://api.map.baidu.com/telematics/v3/weather?location=${cityName}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
      {},
      function (error,data) {
        if(error){
          reject('天气请求失败');
        }else{
          const { dayPictureUrl, weather } = data.results[0].weather_data[0];
          resolve({
            dayPictureUrl, weather
          });
        }
      }
    );
  })
};