/*
 * @Author: fanqn 
 * @Date: 2019-12-25 09:44:14 
 * @Last Modified by: fanqn
 * @Last Modified time: 2019-12-26 18:58:00
 */
import qs from "qs";
import axios from '@/utils/axios'
/* 查找数据 */
export  function findAlluser() {
  return axios.get('/Jobhunter/findAll');
}
/**
 * 通过id删除用户信息
 * @param {object} {id:''} 
 */
export  function deleteJobhunterById(param) {
  return axios.post('/Jobhunter/deleteById',param);
}

/**
 * 通过学历查找用户信息
 * @param {Object} param {Education:''}
 */
export function findJobhunterByEducation(param) {
  return axios.get('/Jobhunter/findByEducation', {
    params: param
  });
}
/**
* 通过性别查找用户信息
* @param {object} param  {Gender:''}
*/
export function findJobhunterByGender(param){
  return axios.get('/Jobhunter/findByGender',{params:param})
}

/**
* 通过id查找用户信息
* @param {object} param  {id:''}
*/
export function findJobhunterById(param){
  return axios.get('/Jobhunter/findById',{params:param})
}


/**
* 通过手机号查找用户信息
* @param {object} param  {Telephone:''}
*/
export function findJobhunterByTelephone(param){
  return axios.get('/Jobhunter/findByTelephone',{params:param})
}

/**
* 通过省份查找用户信息
* @param {object} param  {Username:''}
*/
export function findJobhunterByUsername(param){
  return axios.get('/Jobhunter/findByUsername',{params:param})
}

/**
*快速查找
* @param {object} param  {quickRegistration:''}
*/
export function quickRegistrationJobhunter(param){
  return axios.post('/Jobhunter/quickRegistration',param)
}

/**
* 通过保存或更新用户信息
* @param {object} param  {saveOrUpdate:''}
*/
export function saveOrUpdateJobhunter(param){
  return axios.post('/Jobhunter/saveOrUpdate',param)
}