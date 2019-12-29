/*
 * @Author: Journey 
 * @Date: 2019-12-25 12:30:49 
 * @Last Modified by: Journey
 * @Last Modified time: 2019-12-28 13:57:15
 */


import axios from '@/utils/axios';

import qs from "qs";
/**
 * 通过id删除福利信息
 * @param {Object} param {id:''} 
 */
export function deleteWelfareById(param) {
  return axios.post('/Welfare/deleteById', param);
}


/**
 * 查找所有福利信息
 */
export function findAllWelfare() {
  return axios.get('/Welfare/findAll');
}


/**
 * 通过id查找福利信息
 * @param {Object} param {id:''}
 */
export function findWelfareById(param) {
  return axios.get('/Welfare/findById', {
    params: param
  });
}


/**
 * 保存或更新福利信息
 * @param {Object} param
 */
export function saveOrUpdateWelfare(param) {
  return axios.post('/Welfare/saveOrUpdate', param);
}


// export function saveOrUpdateWelfare1(name,status) {
//   return axios.post('/Jobs/saveOrUpdate', qs.stringify({ name }), qs.stringify({ status }));
// }
