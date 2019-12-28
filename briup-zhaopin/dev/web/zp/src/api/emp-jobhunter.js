/*
 * @Author: liuyr 
 * 求职信息模块API
 * @Date: 2019-12-22 18:54:17 
 * @Last Modified by: Carl
 * @Last Modified time: 2019-12-26 23:54:47
 */
import axios from '@/utils/axios'

/**
 * 查找所有求职信息（拓展）
 */
export function findAllWithJobhAndEmpl() {
  return axios.get('/EmploymentJobhunter/findAllWithJobhAndEmpl');
}
