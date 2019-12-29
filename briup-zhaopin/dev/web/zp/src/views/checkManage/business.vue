/*
 * @Author: liuyr 
 * 商家审核页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-28 22:52:22
 */
<template>
  <div id="businessCheck">
    <!-- {{businessData}} -->
    <div class="select">
      <template >
        <!-- {{nameData}} -->
  <el-select @change="namechange" 
  clearable
  v-model="id" 
  placeholder="选择企业" 
  size="small">
    <el-option
      v-for="item in nameData"
      :key="item.id"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select>
</template>
    </div>
      <el-table
      ref="multipleTable"
      :data="businessList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selectionChange"
     >
      <el-table-column  type="selection" width="55"> </el-table-column>
      <el-table-column  prop="name"    label="企业名称"    width="120">     </el-table-column>
      <el-table-column  prop="contactName"   label="联系人"   width="120"> </el-table-column>
      <el-table-column  prop="contactPhone"  label="联系方式"  show-overflow-tooltip> </el-table-column>
      <el-table-column  prop="industry" label="行业" show-overflow-tooltip> </el-table-column>
      <el-table-column  prop="location" label="所在地" show-overflow-tooltip></el-table-column>
      <el-table-column  prop="scale" label="公司规模" show-overflow-tooltip> </el-table-column>
      <el-table-column  prop="address"  label="详情"  show-overflow-tooltip> 
        <template slot-scope="scope"> 
          <el-button @click="toSee(scope.row)" type="text" size="small">查看 </el-button>
        </template>
        </el-table-column>
        <!-- <el-table-column  prop="auditStatus" label="状态" show-overflow-tooltip> </el-table-column> -->
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click= "toagree" :visible.sync= "toagreeVisible">通过</el-button>
              <el-button type="danger" size="mini" @click= "torefuse" :visible.sync= "torefuseVisible">拒绝</el-button>
            <!-- <div > </div> -->
             <!-- <div :visible.sync = "agreeVisible"> 审核通过</div>  -->
            <!-- <div :visible.sync = "refuseVisible" >已拒绝</div> --> 

          </template>
      </el-table-column>
     </el-table>
    <div class="pagi">
      <el-pagination
        background layout="prev, pager, next" 
       :total="businessData.length"
       :page-size="pageSize"
       :current-page.sync="currentpage"
       @current-change="pagechange"
       >  
      </el-pagination>
    </div>
    <div style="margin-top: -40px" >  
      <el-button
      size="small"
      type="success"
       @click="toallagree" 
       >一键通过</el-button>  
    </div>
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
  :title="check.name"
  :visible.sync="seeVisible">
  <div class="tosee">
    <div ></div>
    <div>{{check.scale}}</div>
  </div>
  <div class="tosee">
    <div ><span>行业类型：{{check.industry}}</span></div>
    <div ><span>成立时间：{{check.establishedTime}}</span></div>
    <div ><span>注册资本：</span>{{check.registeredCapital}}</div>
  </div>
 <div class="tosee">
    <div >{{check.description}}</div>
   <!-- <div class="imgDiv">
         <a :href="currentBus.businessLicense" target="_blank">
          <img :src="currentBus.businessLicense" alt width="200" height="150" />
         </a> 
  </div> -->
  </div>
  
</el-dialog>
    </div>
       
 </div>    
</template>

<script>
import {findAllBusiness,findBusinessById} from "@/api/business.js";
import {findAllEmployment,findEmploymentByTitle} from "@/api/employment.js";
import config from "@/utils/config.js";
export default {
  data() {
    return {
      //获取所有公司名字
      name:"",
      //存储所有公司名称的数组
      nameData:[],
      //获取所有联系人名字
      contactName:"",
      //获取所有联系人电话
      contactPhone:"",
      //获取所有行业信息
      industry:"",
      //获取所有所在地信息
      location:"",
      //获取所有公司规模信息
      scale:"",
      // 查找审核状态
      Employment:"", 
      //存放所有表格数据的数组
      businessData:[],
      //显示每页条数
      pageSize:config.pageSize,
      //显示当前页
      currentpage:1,
      //商家列表/表格数据
      // businessList:[]
      //当前查看
      check:{},
      //模态框显示与否
      seeVisible:false,
      //拒绝对话框显示与否
      dialogTableVisible:false,
      //
      id:"",
      //通过审核状态隐藏
      agreeVisible:false,
      //已拒绝状态隐藏
      refuseVisible:false,
     
    };
  },
  computed: {
    
    //分页数据
    businessList() {
      let temp = [...this.businessData];
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
   
    //查找所有招聘企业信息
   async findAllbus(){
      try {
        //查找招聘企业所有信息
        let res = await findAllBusiness();
        this.businessData=res.data;
        this.nameArr= res.data.map(item=>{
          return item.name;
        })
      } catch (error) {
        config.errorMsg(this,'查找商家信息错误');
      }
    },
    //查询所有的企业名称
    async findAllname(){
      try {
        let res= await findAllBusiness();
        this.nameData=res.data;
      } catch (error) {
        config.errorMsg(this,"查找错误")
      }
    },
    //通过企业名称进行筛选条件
  async  namechange(val){
    //val是option的value值
    // console.log(namechange)
      if (val) {
        try {
       let res = await findBusinessById({id:val});
       this.businessData = res.data;
       this.currentpage=1;
      } catch (error) {
        config.errorMsg(this,'通过企业名称查找招聘信息失败')
      }
      } else {
        this.findAllbus();
      }
    },
    //点击实现一键通过
    toallagree(){

    },
    //点击查看
    toSee(row){
        this.check={ ...row };
        this.seeVisible = true;
      console.log(row);
    },
    toagree(){
      // alert("通过");
      this.agreeVisible=true;
      //  this.toagreeVisible=false;
    },
    torefuse(){
      this.dialogTableVisible=true;
    },
    selectionChange(){},


},
 created() {
    this.findAllbus();
    this.findAllname();
  },
  mounted() {}
};
</script>
<style scoped>
.select{
  margin-top: 20px;
  margin-bottom: 25px;
}
.pagi{
  text-align: right;
  margin-top:20px;
}
.dialogbtn{
  size: small;
  text-align: right;
  margin-top: 15px;
}
.tosee{
  border-bottom: 1px solid #ccc;
  line-height: 20px;
}

</style>