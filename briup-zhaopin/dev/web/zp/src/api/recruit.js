/*
 * @Author: liuyr 
 * 招聘管理API
 * @Date: 2019-12-22 18:54:17 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-28 21:04:33
 */

import axios from '@/utils/axios'
/**
 * 根据id删除招聘记录
 * @param {object} parem{id:""} 
 */
export  function deleteRecruitById(param) {
    return axios.post('/Employment/deleteById',param);
}

/**
 * 查找所有招聘信息
 * @param {object} param{none} 
 */
export  function findRecruitAll() {
  return axios.get('/Employment/findAll');
//   {
//     "id": 360,
//     "title": "前端",
//     "contactName": "",
//     "contactPhone": "",
//     "job": "null",
//     "publishTime": "2019-11-27T13:41:46.000+0000",
//     "welfare": "五险一金",
//     "salary": "5000",
//     "description": "web",
//     "status": "审核通过",
//     "num": 50,
//     "businessId": 2355,
//     "workingHours": "1",
//     "jobId": 7,
//     "city": "南昌",
//     "province": "江西",
//     "startTime": null,
//     "endTime": null,
//     "auditStatus": "拒绝"
//   }
}
 
/**
 * 根据职位查找所有招聘信息
 * @param {object} param{job:""} 
 */
export  function findRecruitByJob(param){
    return axios.get('/Employment/findByJob',{params:param});
}

/**
 * 根据主题查找所有招聘信息
 * @param {object} param{title:""} 
 */
export  function findRecruitByTitle(param){
    return axios.get('/Employment/findByTitle',{
        params: param
      });
}
 
 /**
 * 根据福利查找所有招聘信息
 * @param {object} param{welfare:""} 
 */
export  function findRecruitByWelfare(param){
    return axios.get('/Employment/findByWelfare',{
        params: param
      });
}

/****
 * 根据城市查找所有招聘信息
 * @param {object} param{city:""} 
 */
export  function findRecruitByCity(param){
    return axios.get('/Employment/findByCity',{
        params: param
      });
}

/****
 * 根据商家id查找所有商家信息
 * @param {object} param{id:""} 
 */
export  function findBusinessById(param){
    return axios.get('/Business/findById',{
        params: param
      });
}

/****
 * 查找所有商家信息
 * @param {object} param{none} 
 */
export  function findAllBusiness(){
    return axios.get('/Business/findAll');
}

/****
 * 查找所有城市信息
 * @param {object} param{none} 
 */
export  function findAllCity(){
    return axios.get('/City/findAll');
}
findAllCity
/**
 * 新增或修改招聘信息
 * @param {object} param{obj:""} 
 */
export  function RecruitsaveOrUpdate(param){
    return axios.post('/Employment/saveOrUpdate',param);

// id  
// publishTime 发布日期
// businessId  商家id
// city    城市
// province    省份
// jobId   职位id
// startTime   招聘开始日期
// endTime 招聘结束日期
// workingHours    工作时间
// contactName 联系人姓名
// contactPhone    联系方式
// description 详细描述
// job 工作
// num 需要人数
// salary  工资
// status  状态
// auditStatus 审核状态
// title   招聘标题
// welfare 福利

}

/**
 * 查询所有职位
 * @param {object} parem{id:""} 
 */
export  function findAllPosition(){
    return axios.get('/Jobs/findAll');
}
/****
 * 查询所有福利信息
 */
export  function findAllWelfare(){
    return axios.get('/Welfare/findAll');
}
/****
 * 查询所有省份信息
 */
export  function findAllProvince(){
    return axios.get('/Province/findAll');
}
/****
 * 根据省份id查询所有城市信息
 * @param(id)
 */
export  function findCityByProvinceId(param){
    return axios.get('/City/findByProvinceId',{
        params: param});
}
/****
 * 查询所有工作信息
 */

