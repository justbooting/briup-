/*
 * @Author: liuyr 
 * 招聘审核页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-28 22:51:15
 */
<template>

  <div id="recruitCheck">
    <!-- {{EmploymentData}} -->
    <!-- {{EmploymentData.length}} -->
    <div>
      <div class="select">
      <template >
        <!-- {{businessData}} -->
  <el-select @change="jobchange" v-model="job" placeholder="职位类型" size="small">
    <el-option
      v-for="item in EmploymentData"
      :key="item.id"
      :label="item.job"
      :value="item.job">
    </el-option>
  </el-select>
   </template >
    </div >
    <div style="margin-top: 15px;" class="input" >
  <el-input placeholder="请输入关键字" v-model="input3" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="关键字">
      <el-option label="餐厅名" value="1"></el-option>
      <el-option label="订单号" value="2"></el-option>
      <el-option label="用户电话" value="3"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search">搜索</el-button>
  </el-input>
</div>
    </div>
  <el-table ref="multipleTable" :data="businessList" tooltip-effect="dark" style="width: 100%">
    <el-table-column  type="selection"  width="55"> </el-table-column>
    <el-table-column
      prop="title"
      label="招聘标题"
      width="120">
      <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
    </el-table-column>
    <el-table-column
          prop="contactName"
          label="发布人"
          width="120">
    </el-table-column>
    <el-table-column
          prop="contactPhone"
          label="联系方式"
          show-overflow-tooltip>
    </el-table-column>
    <el-table-column
          prop="job"
          label="职位"
          show-overflow-tooltip>
    </el-table-column>
    <el-table-column
          prop="publishTime"
          label="发布时间"
          show-overflow-tooltip>
    </el-table-column>
    <el-table-column
          prop="address"
          label="详细信息"
          show-overflow-tooltip>
      <template slot-scope="scope" > 
          <el-button @click= "toSee(scope.row)" type="text" size="small">查看 </el-button> 
       </template>
    </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click= "toagree(scope.row)" :visible.sync= "toagreeVisible">通过</el-button>
          <el-button type="danger" size="mini" @click= "torefuse(scope.row)" :visible.sync= "torefuseVisible">拒绝</el-button>
          </template>
      </el-table-column>
  </el-table>
    <div class="pagi">
      <el-pagination
            background 
            layout="prev, pager, next" 
          :total="EmploymentData.length"
          :page-size="pageSize"
          :current-page.sync="currentpage"
          @current-change="pagechange">
      </el-pagination>
    </div>
    <div style="margin-top: -40px"><el-button @click="toallagree" type="success" size="small">一键通过</el-button> </div>
    <el-dialog title="填写拒绝理由" :visible.sync="dialogTableVisible">
       <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入理由..."
            v-model="textarea">
       </el-input>
       <div class="dialogbtn"><el-button type="primary" size="small" >确定</el-button></div>
    </el-dialog>
    <div>
      <el-dialog
  :title="check.title"
  :visible.sync="seeVisible">
  <div class="tosee">
    <div ><span>工资：{{check.salary}}</span></div>
    <div><span>工作福利：{{check.welfare}}</span></div>
  </div>
  <div class="tosee">
    <div><span>工作时间：{{check.workingHours}}</span></div>
    <div><span>上班时间：{{check.startTime}}</span></div>
    <div><span>下班时间：{{check.endTime}}</span></div>
  </div>
 <div class="tosee">
    <div><span>工作描述：{{check.description}}</span></div>
 </div>
  <div>
    <div class="img"></div>
  </div>
</el-dialog>
    </div>
</div>
</template>

<script>
 import {findAllBusiness,findAllEmployment,findAllEmploymentByJob} from "@/api/business.js";
 import config from "@/utils/config.js";
export default {
  data() {
    return {
      //查找所有招聘信息
      Employment:"",
      //查找所有招聘标题
      title:"",
      //查找所有发布人信息
      contactName:"",
      //查找所有联系方式
      contactPhone:"",
      //查找所有的工作职位
      job:"",
      //查找所有发布时间
      publishTime:"",
      //查找所有状态
      auditStatus:"",
      //存放所有招聘信息的数组
      EmploymentData:[],
      //存放招聘标题的数组
      titleData:[],
      //存放所有发布人信息的数组
      contactNameData:[],
      //存放所有联系方式的数组
      contactPhoneData:[],
      //存放所有工作职位的数组
      jobData:[],
      //存放所有发布时间的数组
      publishTimeData:[],
      //存放所有状态的数组
      auditStatusData:[],
      dialogTableVisible:false,
      seeVisible:false,
      check:{},
      //当前页
      currentpage: 1,
      //每页条数
      pageSize: config.pageSize    

    };
  },
  computed: {
    //分页数据
    businessList() {
      let temp = [...this.EmploymentData];
      let page = this.currentpage;
      let pageSize = config.pageSize;
      return temp.slice((page - 1) * pageSize, page * pageSize);
    }
  },
  methods: {
    //页数发生改变
    pagechange(page){
      this.currentpage = page;
    },
    //点击查看
    toSee(row){
        this.check={ ...row };
        this.seeVisible = true;
      console.log(row);
    },
    //查找所有求职信息
  async  findAllEmp(){
      try {
        let res = await findAllEmployment();
      this.EmploymentData = res.data;
      } catch (error) {
        config.errorMsg(this,"查找信息错误")
      }
    },
    torefuse(){
      this.dialogTableVisible=true;
    }
  },
  //一键通过
  toallagree(){},
  toSee(){},
  toagree(){},
  //职业发生改变
  async jobchange(val){
      if(val){
        try{
        let res = await findAllEmploymentByJob({job:val});{
           this.EmploymentData=res.data;
        }
      }catch(error){
        config.errorMsg(this,"通过职业商家信息失败")
      }
      }else{
        this.findAllEmp();
     }
  },
  created() {
    this.findAllEmp();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>

.select{
  margin-top: 20px;
  margin-left: 10px;
  margin-bottom: 25px;
}
.pagi{
  text-align: right;
  margin-top: 20px
}
.input{
  margin-right: 20px;
  width: 300px; 
  float: right;
  
}
.input,.select{
 display: inline-block
}
.dialogbtn{
  text-align: right;
  margin-top: 15px;
}
.tosee{
  border-bottom: 1px solid #ccc;
  line-height: 35px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 16px;
}
</style>