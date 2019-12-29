/*
 * @Author: liuyr 
   求职者模块api
 * @Date: 2019-12-25 17:11:41 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-26 21:31:51
 */
/**
 * 查找所有招聘信息
 */
export function findAllEmployment() {
    return axios.get('/Employment/findAll');
}
/**
 * 通过企业名称查找企业信息
 */
export function findEmploymentByTitle() {
  return axios.get('/Employment/findByTitle');
}