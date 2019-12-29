/*
* @Author: Journey
* 福利管理页面
* @Date: 2019-12-23 17:11:53
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-28 22:41:06
*/
<template>
<div id="moduleBoon">
	<!-- {{welfare}} -->
	<el-select  @change="welfareChange" size="mini" v-model="welfare" clearable placeholder="状态">
	<el-option
		v-for="item in statusData"
		:key="item"
		:label="item"
		:value="item"
	></el-option>
	</el-select>


	 <!-- {{operating}} -->
	<div class="tableDiv" >
	<el-table
	ref="multipleTable"
	:data="welfareList "
	tooltip-effect="dark"
	style="width: 100%;height:500px;"
	@selection-change="selectionChange"
	>
	<el-table-column align="center" type="selection" width="55"></el-table-column>
	<el-table-column align="center" prop="id" label="福利id"></el-table-column>
	<el-table-column align="center" prop="name" label="福利名称"></el-table-column>
	<el-table-column align="center" prop="status" label="状态" id="status_control"></el-table-column>
	<el-table-column  align="center" label="操作" width="100">
		<template   slot-scope="scope">
			<el-button @click="changeWelfareStatus(scope.row)" type="primary" size="small">{{operating[scope.$index]}}</el-button>
		</template>
	</el-table-column>
	</el-table>

	</div>



	 <div class="footDiv">
      <div class="btnDiv">
        <el-button @click="toBatchDelete" size="mini" type="danger" plain>批量删除</el-button>
      </div>
      <div class="pageDiv">
        <el-pagination
          :page-size = "pageSize"
          :current-page.sync = "currentPage"
          background
          @current-change='pageChange'
          layout="prev, pager, next"
          :total="welfareData.length">
        </el-pagination>
      </div>
    </div>

</div>
</template>

<script>
import axios from "axios";
import qs from "qs";

import { findAllWelfare } from "@/api/welfare.js";
import { deleteWelfareById,findWelfareById,saveOrUpdateWelfare } from "@/api/welfare.js";

import config from "@/utils/config.js";

//设置基础路径
export default {
data() {
	return {
		welfare:"",
		welfareData:[],
		value:"",
       currentPage:1,
       //每页条数
	   pageSize:config.pageSize,
	    ids: [],
       //当前查看或修改的对象
	   currentBus: {},
	   statusData: [],
		operating: [],
	  
	   
       //模态框显示与否
       seeVisible: false

	};
},
computed: {
	welfareList(){
	  let temp = [...this.welfareData];
	//   console.log("welfareData= "+temp);
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page-1)*pageSize,page*pageSize);
    }
},
methods: {
	//页数发生改变
    pageChange(page){
      this.currentPage = page;
	},
	


	//通过状态来查找，
	async welfareChange(val){

      if(val){
        try{
		let res = await findAllWelfare();
		let temp = res.data;
		let resu = temp.filter((item)=>{
			return item.status === val;
		});

 		// this.welfareData = [...new Set(resu)];
        this.welfareData = resu;
		this.currentPage = 1;
		console.log(this.welfareData[0].status);
		// console.log(this.welfareData.length);
		//当前数据长度
		var alength = this.welfareData.length;

		//选择框内容数组
		 let statusArr = res.data.map(item => {
          return item.status;
		});
		

		//操作选项
		var a =[];

			
		if(this.welfareData[0].status =='使用中'){
			for(var i=0;i<alength;i++){
					a[i]="冻结";
			}
		}else{
			for(var i=0;i<alength;i++){
					a[i]="恢复";
			}
		}
		this.operating = [...a];


		// console.log(this.welfareData);
        }catch(error){
			alert('通过状态查找错误');
        }
      }else{
			this.findWelfareData();
      }
	},
	


	//批量删除
    toBatchDelete() {
      //获取要批量删除的id  this.ids
      let ids = this.ids;
      if (ids.length > 0) {
        this.$alert("是否删除？", "提示", {
          confirmButtonText: "删除",
          callback: action => {
            if (action === "confirm") {
              let result = [];
              ids.forEach(async id => {
                try {
                  let res = await deleteWelfareById({ id: id });
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
					alert("批量删除成功");
                //   config.successMsg(this, "批量删除成功");
                } else {
					alert("批量删除失败");

                //   config.errorMsg(this, "批量删除失败");
                }
                this.findWelfareData();
              }, 500);
            }
          }
        });
      } else {
        this.$message({
          message: "请选中要删除的数据",
          type: "warning"
        });
      }
	},
	

    //复选框选中切换
    selectionChange(val) {
      //val 就是选中的对象组成的数组
      // console.log(val);
      let ids = val.map(item => {
        return item.id;
      });
      this.ids = ids;
	},
	

	/* 查找全部福利数据 */
	async findWelfareData() {
		try {
		let res = await findAllWelfare();
		this.welfareData = res.data;
		this.currentPage = 1;
        //状态数组
        let statusArr = res.data.map(item => {
          return item.status;
		});
		// console.log(statusArr);
        //去重
		this.statusData = [...new Set(statusArr)];
		// console.log(this.statusData);

		//操作选项
		var a =[];
		if(statusArr){
			for(var i=0;i<statusArr.length;i++){
				if(statusArr[i]=='使用中'){
					a[i]="冻结";
				}else{
					a[i]="恢复";
				}
			}
		}
		this.operating = [...a];

      } catch (error) {
		// config.errorMsg(this, "查找错误");
		alert("查找错误")
      }
    },




	changeWelfareStatus(val){	
		console.log("val= "+val);
		var new_status = val.status;
		if(val.status=="使用中"){
			new_status = "被冻结";
		}else{
			new_status = "使用中";
		}
		// console.log(new_status);
		// console.log("xxxx");
		try {
		let res = saveOrUpdateWelfare({id:val.id,status:new_status,
		name:val.name});
		// this.welfareData = res.data;
		// 刷新数据
		this.findWelfareData();
		// console.log(res.data);
	} catch (err) {
		this.$notify.error({
		title: "错误",
		message: "修改失败"
		});
	}
	},

	
},
//生命周期钩子函数，组件创建完毕
created() {
	this.findWelfareData();
},

mounted() {

}
};
</script>

<style scoped>

</style>