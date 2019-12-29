/*
 * @Author: liuyr 
 * 商家审核页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-29 15:24:17
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
      :key="item"
      :label="item"
      :value="item">
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
      <el-table-column  prop="name" label="企业名称"    width="120">     </el-table-column>
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
          <el-button type="success" size="mini" @click= "toagree" >通过</el-button>
              <el-button type="danger" size="mini" @click= "torefuse" >拒绝</el-button>
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
        >
       </el-input>
       <div class="dialogbtn"><el-button type="primary" size="small" >确定</el-button></div>
    </el-dialog>
    <div>
      <el-dialog
  :title="check.name"
  :visible.sync="seeVisible">
  <div class="tosee">
    <div ></div>
    <div><span>公司规模：{{check.scale}}</span></div>
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
import {findAllBusiness,findEmploymentByTitle} from "@/api/business.js";
import {findAllEmployment} from "@/api/employment.js";
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
      
      businessname:[],//下拉框
      //当前查看
      check:{},
      //模态框显示与否
      seeVisible:false,
      //拒绝对话框显示与否
      dialogTableVisible:false,
      id:"",
      //通过审核状态隐藏
      agreeVisible:false,
      //已拒绝状态隐藏
      refuseVisible:false,
      //批量删除ids
      ids:[]
     
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
   
    //查找所有招聘企业
   async findAllbus(){
      try {
        //查找招聘企业
        let res = await findAllBusiness();
        this.businessData=res.data;
        // console.log(this.businessData);

        let nameArr= res.data.map(item=>{
          return item.name;
        });
        console.log(nameArr);
        this.nameData = [...new Set(nameArr)];
      } catch (error) {
        config.errorMsg(this,'查找商家信息错误');
      }
    },


    //通过企业名找企业
    async findAllname(){
      try {
        let res= await findAllBusiness();
        this.businessData=res.data;
        this.currentPage = 1;
        //状态数组
        let nameArr = res.data.map(item => {
          return item.name;
      });
      // console.log(statusArr);
          //去重
	  	this.nameData = [...new Set(nameArr)];
		// console.log(this.statusData);
      } catch (error) {
        config.errorMsg(this,"查找错误")
      }
    },


    //通过企业名称进行筛选条件
  async  namechange(val){
    //val是option的value值
    // console.log(namechange)
      if (val) {
        console.log(val);
        console.log("xxxx");
        try {
       let res = await findAllBusiness();
        let temp = res.data;
        let resu = temp.filter((item)=>{
			  return item.name === val;
		    });

       this.businessData = resu;

       this.currentpage=1;
      } catch (error) {
        config.errorMsg(this,'通过行业查找招聘信息失败')
      }
      } else {
        this.findAllbus();
      }
    },


    //点击实现一键通过
    toallagree(id){
       //获取要批量删除的id  this.ids
      let ids = this.ids;
      if (ids.length > 0) {
        this.$alert("通过审核？", "提示", {
          confirmButtonText: "通过",
          callback: action => {
            if (action === "confirm") {
              let result = [];
              ids.forEach(async id => {
                try {
                  let res = await deleteBusinessById({ id: id });
                  result.push(res.status);
                } catch (error) {
                  result.push(500);
                }
              });
              setTimeout(() => {
                // console.log(result);
                //判断是否都是200
                let resu = result.every(item => {
                  return item === 200;
                });
                if (resu) {
                  config.successMsg(this, "批量操作成功");
                } else {
                  config.errorMsg(this, "批量操作失败");
                }
                this.findAllBus();
              }, 2000);
            }
          }
        });
      } else {
        this.$message({
          message: "请选中要通过的数据",
          type: "warning"
        });
      }
    },
    //点击查看
    toSee(row){
        this.check={ ...row };
        this.seeVisible = true;
      console.log(row);
    },
    toagree(){
       this.$confirm("是否审核通过?", "提示", {
        confirmButtonText: "通过",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //访问后台接口
          try {
            let res = await deleteBusinessById({ id: id });
            if (res.status === 200) {
              config.successMsg(this, "删除成功");
              this.findAllBus();
            } else {
              config.errorMsg(this, "删除失败");
            }
          } catch (error) {
            config.errorMsg(this, "删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    torefuse(){
      this.dialogTableVisible=true;
    },
    selectionChange(){},


},
 created() {
    this.findAllbus();
    // this.findAllname();
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