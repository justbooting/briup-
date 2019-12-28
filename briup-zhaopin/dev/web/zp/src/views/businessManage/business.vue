/*
 * @Author: liuyr 
 * 商家列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-28 18:41:20
 */
<template>
  <div id="businessList">
      <div class="searchDiv">
      <el-select @change="provinceChange"  v-model="province" clearable placeholder="省份" size="mini">
      <el-option  v-for="item in provinceData" :key="item.id" :label="item.name" :value="item.name"></el-option> 
    </el-select>
      <el-select @change="cityChange" v-model="city" clearable placeholder="城市" size="mini"> 
        <el-option  v-for="item in cityData" :key="item.id" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-select @change="industryChange"  v-model="industry" clearable placeholder="行业" size="mini"> 
        <el-option  v-for="item in industryData" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select @change="scaleChange" v-model="scale" clearable placeholder="规模" size="mini"> 
        <el-option v-for="item in scaleData" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      </div>
  <!-- 商家信息管理 -->    
      <div class="tableDiv">
    <el-table ref="multipleTable" :data="BusinessList" tooltip-effect="dark" style="width: 100%" @selection-change="selectionChange">
    <el-table-column type="selection"  align="center" width="55"></el-table-column>
    <el-table-column prop="id"  label="编号" align="center" ></el-table-column>
    <el-table-column prop="name" label="企业名称" align="center" >
    </el-table-column>
    <el-table-column prop="contactName" label="联系人"  align="center" ></el-table-column>
    <el-table-column prop="contactPhone" label="联系方式" align="center" ></el-table-column>
    <el-table-column prop="industry" label="行业" align="center" ></el-table-column>
    <el-table-column prop="location" label="所在地" align="center" >
     <template slot-scope="scope">{{ scope.row.province }}-{{scope.row.city}}</template></el-table-column>
    <el-table-column prop="scale" label="公司规模"  show-overflow-tooltip align="center" ></el-table-column>
        <el-table-column label="详情" width="100">
        <template slot-scope="scope">
           <el-button type="text" @click="tosee(scope.row)" size="small">查看</el-button>
        </template>
      </el-table-column>
     <el-table-column fixed="right" label="操作" width="100" align="center">
      <template slot-scope="scope">
        <el-button type="text" @click="toDelete(scope.row.id)" align="center" size="small">删除</el-button>
        <el-button type="text" size="small" @click="toedit(scope.row)" align="center">修改</el-button>
      </template>
    </el-table-column>
  </el-table>

       <el-dialog :before-close="beforeclose" title="修改商家信息" :visible.sync="dialogFormVisible" width="75%">
  <el-form :model="currentBus" :rules="rules" ref="ruleForm">
    <el-row :gutter="20">
  <el-col :span="12"><el-form-item prop="name" label="公司名称" :label-width="formLabelWidth">
      <el-input  v-model="currentBus.name" auto-complete="off"></el-input>
    </el-form-item></el-col>
  <el-col :span="12"> <el-form-item prop="industry" label="所属行业" :label-width="formLabelWidth">
      <el-input v-model="currentBus.industry" auto-complete="off"></el-input>
    </el-form-item></el-col></el-row>
    <el-row :gutter="20">
<el-col :span="12"> <el-form-item prop="contactName" label="联系人" :label-width="formLabelWidth">
      <el-input v-model="currentBus.contactName" auto-complete="off"></el-input>
    </el-form-item> </el-col>
<el-col :span="12"> <el-form-item prop="contactPhone" label="联系方式" :label-width="formLabelWidth">
      <el-input v-model="currentBus.contactPhone" auto-complete="off"></el-input>
    </el-form-item></el-col>
    </el-row>
    <el-row :gutter="20">
<el-col :span="12"><el-form-item prop="scale" label="公司规模" :label-width="formLabelWidth">
      <el-input v-model="currentBus.scale" auto-complete="off"></el-input>
    </el-form-item></el-col>
<el-col :span="12"> <el-form-item required label="所在城市" :label-width="formLabelWidth">
  <el-row>
    <el-col :span="12">  
      <el-form-item prop="province"><el-select @change="dialogProvinChange" v-model="currentBus.province" clearable placeholder="请选择省份" size="mini">
      <el-option v-for="item in provinceData" :key="item.id" :label="item.name" :value="item.id"></el-option> 
    </el-select></el-form-item></el-col>
      <el-col :span="12"> <el-form-item prop="city">   
    <el-select   v-model="currentBus.city" clearable placeholder="请选择城市" size="mini"> 
        <el-option v-for="item in provinceCityData" :key="item.id" :label="item.name" :value="item.name"></el-option>
      </el-select></el-form-item></el-col>
   
  </el-row>
     </el-form-item> 
   </el-col>
   </el-row>
   <el-row :gutter="20">
<el-col :span="12"> 
     <el-form-item prop="location" label="详细地址" :label-width="formLabelWidth">
    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="currentBus.location"></el-input>
    </el-form-item>  </el-col>
<el-col :span="12"> 
  <el-form-item prop="description" label="公司简介" :label-width="formLabelWidth">
    <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="currentBus.description"></el-input>
    </el-form-item> 
    </el-col>
    </el-row>

    
   </el-form>
   
  <div slot="footer" class="dialog-footer">
    <el-button @click="toCancel('ruleForm')">取 消</el-button>
    <el-button type="primary" @click="tosave('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
</div>


  
      
      <div class="footerDiv">
        <div class="btnDiv"> <el-button @click="toBatchDelete" type="warning" plain size="mini">批量删除</el-button></div>
     <div class="pageDiv">
        <el-pagination :page-size="pageSize" @current-change="pageChange"       
      :current-page.sync="currentPage"
     size="mini" background layout="prev, pager, next" :total="BusinessData.length"></el-pagination>

     </div>
</div>

<el-dialog :title="currentBus.name" :visible.sync="seeVisible" >
  <div class="seeDiv"><span>行业类型</span>{{currentBus.industry}}</div>
  <div class="seeDiv"> <span>成立时间</span>{{currentBus.establishedTime}}</div>
  <div class="seeDiv"><span>注册资本</span>{{currentBus.registeredCapital}}</div>
  <div class="seeDiv"><span>公司规模</span>{{currentBus.scale}}</div>
  <div class="descDiv">&nbsp;&nbsp;&nbsp;&nbsp;{{currentBus.description}}</div> 
  <div class="imgDiv">
    <a :href="currentBus.businessLicense" target="_blank">
      <img :src="currentBus.businessLicense" alt width="200px" height="150px">
    </a>
  </div>
</el-dialog>


</div>
</template>

<script>
import config from '@/utils/config.js';
import {findAllBusiness,deleteByIdBusiness,saveOrUpdateBusiness,findByProvinceBusiness,findByCityBusiness,findByIndustryBusiness,findByScaleBusiness} from "@/api/Business.js";
import {findAllCity,findByProvinceIdCity} from "@/api/city.js";
import {findAllProvince} from "@/api/Province.js";


export default {
  data() {
    return {
      currentPage: 1,
      //省份
      province:'',
      //城市
      city:'',
      //行业
      industry:'',
      //规模
      scale:'',
      //省份数组
      provinceData:[],
      //城市数组
      cityData:[],
      //行业数组
      industryData:[],
      //规模数组
      scaleData:[],
      //商家数组
      BusinessData:[],
      //每页条数
      pageSize:config.pageSize,
      //批量删除的id
      ids:[],
      //当前查看的对象
      currentBus:{},
      //查看模态框显示与否
      seeVisible: false,
      //修改模态框标题名称所占宽度
     formLabelWidth:'100px',
     //修改模态框显示与否
     dialogFormVisible:false,
      dialogVisible: false,
      //省份对应的城市信息
      provinceCityData:'',
      //校验规则
       rules: {
          name: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
          ],
          industry: [
            { required: true, message: '请输入行业类型', trigger: 'blur' },
          ],
          contactName: [
            { required: true, message: '请输入联系人名字', trigger: 'blur' },
          ],
          contactPhone: [
            { required: true, message: '请输入联系人电话', trigger: 'blur' },
          ],
          scale: [
            { required: true, message: '请输入公司规模', trigger: 'blur' },
          ],
          location: [
            { required: true, message: '请输入详细地址', trigger: 'blur' },
          ],
          description: [
            { required: true, message: '请输入公司描述', trigger: 'blur' },
          ],
          province: [
            { required: true, message: '请选择省份', trigger: 'change' }
          ],
          city: [
            { required: true, message: '请选择城市', trigger: 'change' }
          ],
          
        }
    };
  },
  computed: {
     BusinessList(){
      let temp = [...this.BusinessData];
      let pageSize = config.pageSize;
      let page = this.currentPage;
      return temp.slice((page-1) * pageSize , pageSize * page);
    }
  },
  methods: {

    pageChange(page){
      this.currentPage = page;
    },
  
   
     //省份发生改变
    async provinceChange(val){
       this.industry="";
      this.city="";
      this.scale="";
       //val shi option的value值
       if (val){
          try {
         let res = await findByProvinceBusiness({province:val});
         this.BusinessData = res.data;
         this.currentPage = 1;
       } catch (error) {
         config.errorMsg(this,'通过省份查找商家信息错误')       
         }
       }else{
         this.findALLBus();
       }
      
     },

    //城市发生改变
    async cityChange(val){  
      this.industry="";
      this.province="";
      this.scale="";
       //val shi option的value值
       if (val){
          try {
         let res = await findByCityBusiness({city:val});
         this.BusinessData = res.data;
         this.currentPage = 1;
       } catch (error) {
         config.errorMsg(this,'通过城市查找商家信息错误')       
         }
       }else{
         this.findALLBus();
       }
      
     },

    //行业发生改变
    async industryChange(val){
      this.province="";
      this.city="";
      this.scale="";
       //val shi option的value值
       if (val){
          try {
         let res = await findByIndustryBusiness({industry:val});
         this.BusinessData = res.data;
         this.currentPage = 1;
       } catch (error) {
         console.log(error);
         config.errorMsg(this,'通过行业查找商家信息错误')       
         }
       }else{
         this.findALLBus();
       }
     },

      //规模发生改变
    async scaleChange(val){
      this.province="";
      this.city="";
      this.industry="";
       //val shi option的value值
       if (val){
          try {
         let res = await findByScaleBusiness({scale:val});
         this.BusinessData = res.data;
         this.currentPage = 1;
       } catch (error) {
         config.errorMsg(this,'通过规模查找商家信息错误')       
         }
       }else{
         this.findALLBus();
       }
     },



    
    
    
    tosee(row){
      this.currentBus = { ...row };
      this.seeVisible = true;
    },

    toedit(row){
       this.currentBus =  {...row};
        this.dialogFormVisible = true;
        this.findALLBus();
    },
    async dialogProvinChange(val){
      //通过省份id获取城市
      //重置下拉列表
      this.currentBus.city ="";
      try{
        let res = await findByProvinceIdCity({provinceId:val});
        this.provinceCityData = res.data;
      }catch(error){
        config.errorMsg(this,'失败');
      }
    },

    beforeclose(){
      //重置表单验证
      this.$refs['ruleForm'].resetFields();
      this.dialogFormVisible = false;
    },

    //关闭模态框
    toCancel(formName){
      //重置表单验证
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },

     tosave(formName){
       this.$refs[formName].validate(async(valid) => {
          if (valid) {
            //通过验证
              let province = this.currentBus.province;
          if(+province){
        //将省份id处理成省份名字 过滤省份数组
        let result = this.provinceData.filter((item)=>{
            return item.id === +province;
          })[0];
          //result是省份对象
          this.currentBus.province = result.name;
        }
          try {
         let res = await saveOrUpdateBusiness(this.currentBus);
         this.dialogFormVisible = false;
         if(res.status===200){
           config.successMsg(this,'修改成功');
         }else{
           config.errorMsg(this,'修改失败');
         }
         
          }
          catch(error){
          config.errorMsg(this,'修改失败');
          
        }
        this.findALLBus();
        } else {
            config.errorMsg(this,'修改失败');
            return false;
          }
        });
    
    },

      toDelete(id){  
       this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning',
        })
       .then(async()=> {
          //访问后台接口
          try {
            let res = await deleteByIdBusiness({id:id});
            if(res.status===200){
              config.successMsg(this,'删除成功');
              this.findALLBus();
            }else{
              config.errorMsg(this,'删除失败,该商家有招聘信息');
            }
          } catch (error) {
            config.errorMsg(this,'删除失败');
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
    },

    toBatchDelete(){
      //获取批量删除的ID this.ids
      let ids = this.ids;
      if(ids.length>0){
         this.$alert('是否删除？', '提示', {
          confirmButtonText: '删除',
          callback: action => {
          if (action==='confirm') {
            let result = [];
            ids.forEach(async(id)=>{
               try {
            let res = await deleteByIdBusiness({id:id});
            result.push(res.status);
          } catch (error) {
            result.push(500);
            // config.errorMsg(this,'删除失败');
          }
            });  
            setTimeout(()=>{
              //判断是否都是200
              let resu = result.every((item)=>{
                return item===200;
              }) 
              if (resu) {
                config.successMsg(this,'批量删除成功');
              }else{
                config.errorMsg(this,'批量删除失败');   
              }  
              this.findALLBus();
            },2000)
          } else {
            config.errorMsg(this,'删除失败');
          }
          }
        });
      }else{
         this.$message({
          message: '请选中要删除的数据',
          type: 'warning'
        });
      };
    },


    selectionChange(val){
      //val就是选中对象所组成的数组
      // console.log(val);
      let ids = val.map((item)=>{
        return item.id;
      });
      this.ids = ids;
    },
    
    //查找所有省份信息
    async findALLpro(){
    
      try {
        let res = await findAllProvince();
        this.provinceData = res.data;
      } catch (error) {
        config.errorMsg(this,'查找错误')
      }
    },

    //查找所有城市信息
    async findALLci(){
      
      try {
        let res = await findAllCity();
        this.cityData = res.data;
      } catch (error) {
        config.errorMsg(this,'查找错误')
      }
    },
   

    //查找所有商家信息
    async findALLBus(){
      try {
        let res = await findAllBusiness();
        this.BusinessData = res.data;
        this.currentPage = 1;
        //产生行业数组和规模数组
       let industryArr = res.data.map(item => {
          return item.industry;
        });
        //去重
        this.industryData = [...new Set(industryArr)];
        //规模数组
        let scaleArr = res.data.map(item => {
          return item.scale;
        });
        //去重
        this.scaleData = [...new Set(scaleArr)];
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
  },


    
    },

    
  
   created() {
      //this.findBusinessData();
      this.findALLpro();
      this.findALLci();
      this.findALLBus();
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
 .tableDiv{
   margin-top: 10px;
 }
 .footerDiv{
   overflow: hidden;
 }
 .btnDiv{
   margin-top: 10px;
   float: left;
 }
 .pageDiv{
    text-align: right;
    margin-top: 10px;
  }
  .seeDiv{
    border-bottom:1px solid #ccc;
    line-height:30px;
    span{
      color:#999;
    }
    .descDiv{
      color: #777;
      font-size:12px;
      line-height:30px;
      padding:10px 0px;
      border-bottom:1px solid #ccc;
      font-weight:bold;
    }
    .imgDiv{
      text-align: center;
    }
    .dialog__footer{
      text-align: center;
      margin-top: -20px;
    }
  }
</style>