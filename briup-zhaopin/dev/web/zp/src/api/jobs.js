
/*
 * @Author: Journey 
 * @Date: 2019-12-25 12:30:49 
 * @Last Modified by: Journey
 * @Last Modified time: 2019-12-28 21:49:01
 */


import axios from '@/utils/axios'

/**
 * 通过id删除职工信息
 * @param {Object} param {id:''} 
 */
export function deleteJobsById(param) {
  return axios.post('/Jobs/deleteById', param);
}


/**
 * 查找所有职工信息
 */
export function findAllJobs() {
  return axios.get('/Jobs/findAll');
}


/**
 * 通过id查找职工信息
 * @param {Object} param {id:''}
 */
export function findJobsById(param) {
  return axios.get('/Jobs/findById', param);
}


/**
 * 通过Status查找职工信息
 * @param {Object} param {Status:''}
 */
export function findJobsByStatus(param) {
    return axios.get('/Jobs/findByStatus',  {params:param});
  }


/**
 * 保存或更新职工信息
 * @param {Object} param
 */
export function saveOrUpdateJobs(param) {
  return axios.post('/Jobs/saveOrUpdate', param);
}

