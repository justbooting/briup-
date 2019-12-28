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
  export  function deleteByIdBusiness(param) {
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
   * 通过位置查找商家信息
   * @param {object} param 
   * {Province :''}
   */
  export  function findByProvinceBusiness(param) {
    return axios.get('/Business/findByProvince',{params:param});
   
  }
   /**
   * 通过位置查找商家信息
   * @param {object} param 
   * {Scale :''}
   */
  export  function findByScaleBusiness(param) {
    return axios.get('/Business/findByScale',{params:param});
   
  }
  export  function saveOrUpdateBusiness(param) {
    return axios.post('/Business/saveOrUpdate',param);
   
  }

  