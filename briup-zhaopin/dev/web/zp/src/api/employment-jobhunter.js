/*
 * @Author: huangjh 
 * @Date: 2019-12-25 09:40:37 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-28 19:07:11
 */

import axios from '@/utils/axios'
/**
 * 通过id删除求职信息
 * @param {Object} param {id:''} 
 */
export function deleteEmploymentJobhunterById(param) {
  return axios.post('/EmploymentJobhunter/deleteById', param);
}
/**
 * 查找所有求职信息
 */
export function findAllEmploymentJobhunter() {
  return axios.get('/EmploymentJobhunter/findAll');
}

/**
 * 查找求职信息扩展
 * @param {Object} param {id:''}
 */
export function findEmploymentJobhunterAllWithJobhAndEmpl() {
    return axios.get('/EmploymentJobhunter/findAllWithJobhAndEmpl')
    
  }

/**
 * 通过id查找求职信息
 * @param {Object} param {id:''}
 */
export function findEmploymentJobhunterById(param) {
  return axios.get('/EmploymentJobhunter/findById', {
    params: param
  });
}

/**
 * 保存或更新求职信息
 * @param {Object} param
 */
export function saveOrUpdateEmploymentJobhunter(param) {
  return axios.post('/EmploymentJobhunter/saveOrUpdate', param);
}
