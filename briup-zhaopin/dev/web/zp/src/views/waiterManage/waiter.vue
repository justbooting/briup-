/*
 * @Author: liuyr 
 * 客服列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: Carl
 * @Last Modified time: 2019-12-28 16:48:15
 */
<template>
  <div id="waiterList">
    <!-- 两个按钮 -->
    <div id="btnLocation">
      <el-button type="primary" icon="el-icon-circle-plus" id="btn1" @click="addWaiterMethod">添加客服</el-button>
      <el-button type="primary" icon="el-icon-circle-plus" @click="importWaiterMethod" >导入客服</el-button>
    </div>

    <!-- 两个下拉框 -->
    <div id="select">
      <el-select v-model="isOnlineValue" clearable placeholder="上线情况" @change = "isOnlineChange">
        <el-option
          v-for="item in isOnline"
          :key="item.isOnlineValue"
          :label="item.isOnlineLabel"
          :value="item.isOnlineValue">
        </el-option>
      </el-select>

      <el-select v-model="genderValue" clearable placeholder="性别" @change = "genderChange">
        <el-option
          v-for="item in gender"
          :key="item.genderValue"
          :label="item.genderLabel"
          :value="item.genderValue">
        </el-option>
      </el-select>
    </div>

    <!-- 当前标准为 -->
    <div id="labelLocation">
      当前标准为(
      <el-tag>XX</el-tag>
      )人
    </div>

    <!-- 检索输入框 -->
    <div id="inputLocation">
      {{inputKeyWord}}
      {{inputValue}}

      <el-input placeholder="请输入关键字" v-model="inputKeyWord" class="inputSize">
        <el-select v-model="inputValue" slot="prepend" placeholder="关键字" class="selectSize">
          <el-option label="id" value="inputValue.id"></el-option>
          <el-option label="用户名" value="inputValue.username"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="judgement(inputValue,inputKeyWord)"></el-button>
      </el-input>
    </div>

    <!-- 表格 -->
    <div id="tableLocation">
      <el-table ref="multipleTable" :data="waiterList" tooltip-effect="dark" style="width: 100%"
        @selection-change="selectionChange">
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <el-table-column align="center" prop="id" label="id" ></el-table-column>
        <el-table-column align="center" prop="username" label="用户名" ></el-table-column>
        <el-table-column align="center" prop="realname" label="姓名" ></el-table-column>
        <el-table-column align="center" prop="gender" label="性别" ></el-table-column>
        <el-table-column align="center" prop="status" label="状态" ></el-table-column>
        <el-table-column align="center" label="分配工作" >
          <template slot-scope="scope">
            <el-button @click="toDistribute(scope.row)" type="primary" size="small" icon="el-icon-service">分配</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" >
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="toDelete(scope.row.id)" icon="el-icon-delete" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="footerDiv">
      <!-- 分配按钮 -->

      <!-- 分页 -->
      <div class="pageDiv">
        <el-pagination
          @current-change = "pageChange"
          :current-page.sync = "currentPage"
          :page-size = "pageSize"
          background
          layout="prev, pager, next"
          :total="waiterData.length">
        </el-pagination>
      </div>

    </div>
    
    <!-- 分配表格 -->
    <div id="distributeTable">
      <el-dialog 
      :title="'客服'+currentWaiter.username+'('+currentWaiter.realname+')'+'  工作分配'" 
      :visible.sync="seeVisible"
      width = "60%">
        {{currentWaiter}}
        <el-table ref="multipleTable" tooltip-effect="dark" :data="workDistributeList" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}">
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" prop="jobhunter.realname" label="求职人" ></el-table-column>
          <el-table-column align="center" prop="jobhunter.telephone" label="联系方式" ></el-table-column>
          <el-table-column align="center" label="求职岗位" >
            <template slot-scope="scope">{{scope.row.employment.salary}}/{{scope.row.employment.welfare}} {{scope.row.employment.job}}</template>
          </el-table-column>
          <el-table-column align="center" label="经手人" >
            <template slot-scope="scope">
              <!-- 分配动作 -->
              <el-button @click="toDistributeWaiter(scope.row)" type="text" size="small">无</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="askTime" label="申请时间" sortable ></el-table-column>
        </el-table>

        <!-- 分配表格分页 -->
      <div id="tableFooter">
          <div class="pageDiv">
            <el-pagination
              @current-change = "secondPageChange"
              :current-page.sync = "secondCurrentPage"
              :page-size = "secondPageSize"
              background
              layout="prev, pager, next"
              :total="jobHunterData.length">
            </el-pagination>
          </div>
      </div>
      </el-dialog>     
    </div>

    <!-- 新增客服 -->
    
    <div id="addWaiterDiv">
      
      <el-dialog title="添加客服" :visible.sync="addWaiterVisible">
        <el-form :model="addWaiter">
          <el-form-item label="用户名(username)：" :label-width="formLabelWidth">
            <el-input v-model="addWaiter.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名(realname)：" :label-width="formLabelWidth" >
            <el-input v-model="addWaiter.realname" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别(gender)：" :label-width="formLabelWidth">
            <el-radio v-model="addWaiter.gender" label="男">男</el-radio>
            <el-radio v-model="addWaiter.gender" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="在线情况(isOnline)：" :label-width="formLabelWidth" >
            <el-radio v-model="addWaiter.status" label="在线">在线</el-radio>
            <el-radio v-model="addWaiter.status" label="离线">离线</el-radio>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addCancel">取 消</el-button>
          <el-button type="primary" @click="addConfirm">确 定</el-button>
        </div>

      </el-dialog>
    </div>
    
    <div id="importdescr">
      <el-dialog title="导入客服" :visible.sync="importVisible" width="40%" :before-close="handleClose">
        <strong id="descr1">导入说明</strong>
        <br><br>
        <strong id="descr2">使用导入功能时，请按照模板表格规定的字段去填写对应信息，您可以点击按钮下载模板表格，填写完后在下提交：</strong>
        <el-upload
          id="uploadCenter"
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件或表格拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <span slot="footer" class="dialog-footer" id="btnCenter">
          <el-button type="primary" @click="importVisible = false" size ="medium">下载模板</el-button>
          <el-button type="success" @click="importVisible = false" size ="medium">开始导入</el-button>
        </span>
      </el-dialog>
    </div>


  </div>

</template>

<script>

import config from "@/utils/config.js";
import { 
        findAllCustomerService,
        findCustomerServiceByGender,
        findCustomerServiceByEducation,
        deleteCustomerServiceById,
        saveOrUpdateCustomerService,
        findCustomerServiceById,
                                          } from "@/api/waiter.js";

import { findAllWithJobhAndEmpl } from "@/api/emp-jobhunter.js";

export default {
  data() {
    return {
      //根据是否在线查找客服，select-option框中的数据数组
      isOnline:[{
        isOnlineValue:'在线',
        isOnlineLabel:'在线'
      },{
        isOnlineValue:'离线',
        isOnlineLabel:'离线'
      }],
      isOnlineValue:'',

      //根据性别查找客服，select-option框中的数据数组
      gender:[{
        genderValue:'男',
        genderLabel:'男'
      },{
        genderValue:'女',
        genderLabel:'女'
      }],
      genderValue:'',

      //搜索框默认值（为空）
      input: '',
      select: '',

      //客服数组
      waiterData:[],

      //当前页
      currentPage:1,

      //每页条数
      pageSize:config.pageSize,

      //当前查看或修改的对象
      currentWaiter: {},
      //模态框显示与否
      seeVisible: false,

      //求职者数组
      jobHunterData:[],

      //分配表格当前页
      secondCurrentPage:1,

      //分配表格每页条数
     secondPageSize:config.secondePageSize,

     //添加客服表单显示与否
     addWaiterVisible:false,
    
     //修改模态框标题所占宽度
     formLabelWidth:'160px',

     //对象存放新增客服的信息
     addWaiter:{},

     //导入客服模态框
     importVisible:false,
     
     //输入内容关键字
     inputKeyWord:'',

     //根据关键字的下拉，获取内容
     inputValue:{},

     //

    };
  },
  computed: {
    //进行分页
    waiterList(){
      let temp = [...this.waiterData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page-1)*pageSize,page*pageSize);
    },

    //分配表格分页
    workDistributeList(){
      let temp = [...this.jobHunterData];
      let page = this.secondCurrentPage;
      let pageSize = config.secondePageSize;

      //日期格式处理
      let changeDateList = temp.slice((page-1)*pageSize,page*pageSize);
      for(let i = 0;i<changeDateList.length;i++){
        changeDateList[i].askTime = changeDateList[i].askTime.slice(0,10);
        // console.log(changeDateList[i].askTime);
      }

      return changeDateList;
    },
  },

    

  methods: {

    //查找所有客服信息
    async findAllWaiter(){
      try {
        let res = await findAllCustomerService();
        this.waiterData = res.data;
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
    //查看
    //将客服用户名和真实姓名传过来，做标题
    toDistribute(row) {
      this.currentWaiter = { ...row };
      this.seeVisible = true;
      this.findAllJobHunter();
      this.secondCurrentPage = 1;
    },
    //删除
    toDelete(id) {
      this.$confirm('此操作将永久删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        //访问后台接口
        try {
          let res = await deleteCustomerServiceById({id:id});
          if(res.status === 200){
            config.successMsg(this,'删除成功');
            this.findAllWaiter();
          }else{
            config.errorMsg(this,'删除失败');
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
    //复选框选中切换
    selectionChange(val) {
      //val 就是选中的对象组成的数组
      console.log(val);
    },

    //根据是否在线筛选客服
    async isOnlineChange(val){
      // console.log(val);
      this.genderValue = '';
      if(val){
        try {
          let res = await findCustomerServiceByEducation({status:val});
          this.waiterData = res.data;
        } catch (error) {
          config.errorMsg(this,"是否在线查找错误");
        }
      }else{
        this.findAllWaiter();
      }
    },

    //根据性别筛选客服
    async genderChange(val){
      // console.log(val);
      this.isOnlineValue = '';
      if(val){
        try {
          let res = await findCustomerServiceByGender({gender:val});
          this.waiterData = res.data;
        } catch (error) {
          config.errorMsg(this,"性别查找错误");
        }
      }else{
        this.findAllWaiter();
      }
    },

    //搜索框判断
    judgement(key,val){
      console.log(key,val);
      if(key == "inputValue.id"){
        this.idChange(val);
      }else if(key == "inputValue.username"){
        this.usernameChange(val);
      }else{
        config.errorMsg(this, "查找错误");
      }
    },
 
    //根据id筛选客服
    async idChange(val){
      // console.log(val);
      if(val == ''){
        config.errorMsg(this, "查询失败，请输入内容");
        return 0;
      }
      try {
        let res = await findCustomerServiceById({id:val});
        if(res.data == null){
          config.errorMsg(this, "查询失败，无该数据");
          this.waiterData = null;
          return 0;
        }
        this.waiterData = [res.data];

      } catch (error) {
        config.errorMsg(this, "id查找错误，请检查输入内容");
      }
    },

    //根据用户名(username)筛选客服
    async usernameChange(val){
      console.log(val);
    },




    //页数发生改变
    pageChange(page){
      this.currentPage = page;
    },

    //查找所有求职者
    async findAllJobHunter(){
      try {
        let res = await findAllWithJobhAndEmpl();
        this.jobHunterData = res.data;
      } catch (error) {
        config.errorMsg(this, "查找错误");
      }
    },
    
    //分配表格页数发生改变
    secondPageChange(page){
      this.secondCurrentPage = page;
    },

    //点击新增客服时的方法（显示模态框）
    addWaiterMethod(){
      this.addWaiterVisible = true;
    },

    //新增客服点击确定（提交表单后清空）
    addConfirm(){
      //提交表单
      console.log({...this.addWaiter});
      this.toSave();

      //提交表单后清空
      this.addWaiter.username ='';
      this.addWaiter.realname ='';
      this.addWaiter.gender ='';
      this.addWaiter.status='';

      //新增结束模态框关闭
      this.addWaiterVisible = false;
      //新增结束后刷新
      this.findAllWaiter();

    },

    //新增客服点击取消（模态框清空）
    addCancel(){
      this.addWaiter.username ='';
      this.addWaiter.realname ='';
      this.addWaiter.gender ='';
      this.addWaiter.status='';

      this.addWaiterVisible = false;
    },

    //新增接口处理函数
    async toSave(){
      try {
        // console.log({...this.addWaiter});
        let res = await saveOrUpdateCustomerService({...this.addWaiter});
        console.log(res.status);
        if (res.status === 200) {
          config.successMsg(this, "新增成功");
        } else {
          config.errorMsg(this, "新增失败");
        }
      } catch (error) {
        console.log(error);
        config.errorMsg(this, "新增失败");
      }
    },

    //点击导入客服时的方法（显示模态框）
    importWaiterMethod(){
      this.importVisible = true;
    }

  },

  //钩子函数（组件完成加载后执行下面的函数）
  created() {
    this.findAllWaiter();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>

  #btnLocation{
    width: 260px;
    position: absolute;
    top: -0.2%;
    left: 81%;


    #btn1{
      background-color: rgb(255, 102, 0);
      border: 1px solid rgb(255, 102, 0);
    }
  }

  #select{
    display: inline-block;
  }

  
  #labelLocation{
    margin-left: 20px;
    display: inline-block;
  }

  #inputLocation{
    float: right;


    .selectSize{
      /* 控制关键字长度 */
      width: 110px;
    }

    .inputSize{
      /* 控制输入框的长度 */
      width: 330px;
    }

  }

  #tableLocation{
    margin-top: 10px;
  }

  .footerDiv{
    //清除父元素的浮动
    overflow: hidden;
    margin-top: 10px;


    .btnDiv{
      float: left;
    }

    .pageDiv{
      float: right;
    }
  }

  

  #distributeTable{

    #tableFooter{
      height: 32px;
      margin-top: 15px;
      .pageDiv{
        float: right;
      }
    }
  }

  #importdescr{

    #descr1{
      font-size: 18px;
    }

    #descr2{
      color: red;
    }

  }

</style>