/*
 * @Author: liuyr 
 * 省份模块API
 * @Date: 2019-12-22 18:54:17 
 * @Last Modified by: Journey
 * @Last Modified time: 2019-12-27 19:36:06
 */
import axios from '@/utils/axios'
/**
 * 通过id删除省份信息
 * @param {Object} param {id:''} 
 */
export function deleteJobtypeById(param) {
  return axios.post('/JobType/deleteById', param);
}


/**
 * 查找所有省份信息
 */
export function findAllJobtype() {
  return axios.get('/JobType/findAll');
}


/**
 * 通过id查找省份信息
 * @param {Object} param {id:''}
 */
export function findJobtypeById(param) {
  return axios.get('/Jobs/findById', param);
}






/**
 * 保存或更新省份信息
 * @param {Object} param
 */
export function saveOrUpdateJobtype(param) {
  return axios.post('/JobType/saveOrUpdate', param);
}
