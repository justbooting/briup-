import axios from '@/utils/axios'


/**
 * 查找所有商家信息
 */
export  function findAllBusiness() {
    return axios.get('/Business/findAll');
   
  }
  //  export  function findAllBusiness(param) {
  //   return axios.post('/Business/findAll',param);
   
  // }
  /**
   * 通过ID删除商家信息
   * @param {object} param 
   * {id:''}
   */
  export  function deletesByIdBusines(param) {
    return axios.post('/Business/deleteById',param);
   
  }
  /**
   * 通过城市查找商家信息
   * @param {object} param 
   * {city:''}
   */
  export  function findByCityBusiness(param) {
    return axios.get('Business/findByCity',{params:param});
   
  }
   /**
   * 通过id查找商家信息
   * @param {object} param 
   * {id:''}
   */
  export  function findByIdBusiness(param) {
    return axios.get('Business/findById',{params:param});
   
  }
   /**
   * 通过行业查找商家信息
   * @param {object} param 
   * {Industry:''}
   */
  export  function findByIndustryBusiness(param) {
    return axios.get('/Business/findByIndustry',{params:param});
   
  }

   /**
   * 通过位置查找商家信息
   * @param {object} param 
   * {Location :''}
   */
  export  function findByLocationBusiness(param) {
    return axios.get('/Business/findByLocation',{params:param});
   
  }
  /**
   * 通过省份查找商家信息
   * @param {object} param 
   * {Province :''}
   */
  export  function findByProvinceBusiness(param) {
    return axios.get('/Business/findByProvince',{params:param});
   
  }
   /**
   * 通过规模查找商家信息
   * @param {object} param 
   * {Scale :''}
   */
  export  function findByScaleBusiness(param) {
    return axios.get('/Business/findByScale',{params:param});
   
  }
  export  function saveOrUpdateBusiness(param) {
    return axios.post('/Business/saveOrUpdate',param);
   
  }

  /**
 * 通过id查找商家信息
 * @param {Object} param {id:''}
 */
export function findBusinessById(param) {
  return axios.get('/Business/findById', {
    params: param
  });
}
/**
 * 通过企业名称查找企业信息
 */
export function findEmploymentByTitle(param) {
  return axios.get('/Employment/findByTitle',{
    params:param
  });
}
/**
 * 查找所有招聘信息
 */
export function findAllEmployment() {
  return axios.get('/Employment/findAll');
}
/**
 * 通过职位查找企业信息
 */
export function findAllEmploymentByJob(param) {
  return axios.get('/Employment/findByJob',{params:param
  });
}