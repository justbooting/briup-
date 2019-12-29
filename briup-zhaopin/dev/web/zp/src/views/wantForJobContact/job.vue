/*
 * @Author: huangjh 
 * @Date: 2019-12-25 14:32:55 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-29 15:11:06
 */
<template>
  <div id="jobList">
    <div id="xxx">待联系</div>
    <el-table
      :data="employmentJobhunterDataList"
      style="width: 80%">
      <el-table-column
        prop="jobhunter.realname"
        label="求职人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="jobhunter.telephone"
        label="联系方式"
        width="180">
      </el-table-column>
      <el-table-column
        label="求职岗位">
        <template slot-scope="scope">
          {{ scope.row.employment.salary }}/月{{scope.row.employment.welfare}}{{scope.row.employment.job}}
        </template>
      </el-table-column>
      <el-table-column label="简历">
       <template 
        slot-scope="scope"><el-button @click="toSee(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
      <el-table-column
        prop="newaskTime"
        label="申请时间">
      </el-table-column>
    </el-table>
     <div class="pageDiv">
        <el-pagination
          :page-size="pageSize"
          :current-page.sync="currentPage"
          background
          @current-change="pageChange"
          layout="prev, pager, next"
          :total="employmentJobhunterData.length"
        ></el-pagination>
      </div>
     <!-- 查看模态框 -->
    <el-dialog :title="currentBus.jobhunter.realname" :visible.sync="seeVisible">
      <div id="xinxi">个人信息:</div>
      <div class="seeDiv">
        <span>性别:</span>
        {{currentBus.jobhunter.gender}}
      </div>
      <div class="seeDiv">
        <span>最高学历:</span>
        {{currentBus.jobhunter.education}}
      </div>
      <div class="seeDiv">
        <span>出生年月:</span>
        {{currentBus.jobhunter.birth}}
      </div>
      <div class="seeDiv">
        <span>工作经验:</span>
        {{currentBus.jobhunter.workTime}}
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {findEmploymentJobhunterAllWithJobhAndEmpl} from '@/api/employment-jobhunter.js'
import config from "@/utils/config.js";

export default {
  data() {
    return {
      education:'',
      gender:'',
      seeVisible:false,
      currentBus:{
        jobhunter:{}
      },
      job:'',
      salary:'',
      welfare:'',
      realname:'',
      telephone:'',
      askTime:'',
      employmentJobhunterData:[],
      pageSize:config.pageSize,
      currentPage: 1,
    };
  },
  computed: {
    employmentJobhunterDataList() {
      let temp = [...this.employmentJobhunterData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page - 1) * pageSize, page * pageSize);
      
    }
  },
  methods: {
    //分页
    pageChange(page) {
      this.currentPage = page;
    },
    //查看
    toSee(row){
      this.currentBus = { ...row };
      this.seeVisible = true;
    },
    //获取所有求职信息
    async findAllej(){
      try {
        let res = await findEmploymentJobhunterAllWithJobhAndEmpl();      
        let newdata = res.data;
        let arr = newdata.filter((item,index,newdata)=>{
          return item.remark === "待联系";
        })
        this.employmentJobhunterData = arr;
        
        this.employmentJobhunterData.forEach(element => {
              console.log(element);
             element.newaskTime = element.askTime.substring(0,10);
        });
      } catch (error) {
        console.log(error);
        config.errorMsg(this,'查找错误');
      }
    },
      
  },
  created() {
    this.findAllej();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
#xxx{
  font-style: oblique;
  text-align: center;
  line-height: 25px;
  color: white;
  height: 25px;
  width: 50px;
  background-color: gray;
}
.seeDiv {
  border-bottom: 1px solid #ccc;
  line-height: 30px;
  font-weight: bold;
  span{
    color: #777;
  }
}
.pageDiv{
  float: right;
  margin-top: 30px;
  margin-right: 300px;
}
</style>