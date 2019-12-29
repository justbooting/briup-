/*
* @Author: liuyr 
* 职位管理页面
* @Date: 2019-12-23 17:11:53 
 * @Last Modified by: Journey
 * @Last Modified time: 2019-12-29 00:01:01
*/
<template>
<div id="modulePosition">
	<br>
	
	<el-button type="primary" round id="boon_bu" @click="dialogFormVisible1 = true">添加职位</el-button><br>

	<br>
	<!-- {{jobtypeData}} -->


	<!-- 添加职业类型 -->
	<el-dialog title="添加职业类型" :visible.sync="dialogFormVisible1" >
		<el-form >
			<el-form-item label="职业类型名称" :label-width="formLabelWidth">
				<el-input v-model="jobtype" autocomplete="off"></el-input>
				</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible1 = false">取 消</el-button>
			<el-button type="primary" @click="addJobtype">确 定</el-button>
		</div>
	</el-dialog>


	
	<el-table :data="jobtypeData" style="width: 100%">
		<el-table-column type="expand" prop="jobs">
			<template  slot-scope="scope">
			<el-table :data="scope.row.jobs">
				<el-table-column prop="name" label="职业">
					<template slot-scope="scope">
						<span>{{scope.row.name}}</span>
					</template>
				</el-table-column>
			</el-table><br>

			
			<li id="font_li" >
				<!-- {{scope.row.jobs}} -->
			<button id="span_toadd" @click="toAddJob(scope.row.id)">添加</button>
			
			<!-- 下面的city是要新增的城市 -->
			<li id ="li_boot"><input type="text" v-model="jobs"></li>
	 	  	</template>
		
		</el-table-column>
    	<el-table-column
    	label="职业类型"
     	prop="name">
    	</el-table-column>
    </el-table>



</div>
</template>

<script>
import { findAllJobs,findJobsById,findJobsByStatus,saveOrUpdateJobs} from "@/api/jobs.js";
import { findAllJobtype,saveOrUpdateJobtype } from "@/api/jobtype.js";
import config from "@/utils/config.js";
import { async } from 'q';
export default {
data() {
	return {
	dialogFormVisible1:false,//设置添加职业类型窗口不可见
	formLabelWidth: "120px",

	jobs:"",
	jobsData:[],
	jobsAllArr:[],
	jobsArr:[],

	totalArr:[],

	jobtype:"",
	jobtypeData:[],
	};
},
computed: {},
methods: {

	async toAddJob(jobtypeId){
		try {
			console.log(jobtypeId)
			// console.log(this.provinceId);
			let res= await saveOrUpdateJobs({jobTypeId : jobtypeId,
			name: this.jobs});
			if(res.status!=200){
				config.errrMsg(this,"添加城市失敗！");
				
			}
			else{		
				config.successMsg(this,"添加城市成功！");
				this.findJobtypeData();
				// this.dialogFormVisible = false;
			}
		} catch (error) {
			console.log(error);
		}
		
	},



	async addJobtype(){
		try {
			console.log(typeof(this.jobtype));
			let res= await saveOrUpdateJobtype({name : this.jobtype,});
			this.dialogFormVisible1 = false;
			this.findJobtypeData();
			if(res.status!=200){
				config.errrMsg(this,"添加职业类型失败！");
				this.dialogFormVisible1 = false;
			}
			else{
				config.successMsg(this,"添加职业类型成功！");
				this.dialogFormVisible1 = false;
			}
		} catch (error) {
				this.dialogFormVisible1 = false;
				console.log("xxxxxxxx");

			console.log(error);
		}

	},


	//1111查找所有职位类型
	async findJobtypeData() {
	try {
		let res = await findAllJobtype();
		// console.log(res.data);

		let temp = [...res.data];
		// console.log('-----',temp);
		temp.forEach(async (item)=>{
			//工作類型id
			let id = item.id;
			//通過工作類型id獲取該工作類型底下的工作
			let res = await findAllJobs();
			let jobs = res.data;
			let jobArr = jobs.filter((job)=>{
				return job.jobTypeId === id;
			});
			console.log(jobArr);
			item.jobs = jobArr;
			
		})
		setTimeout(()=>{
			this.jobtypeData = temp;
		},500)
		
	} catch (err) {
		this.$notify.error({
		title: "错误",
		message: "查找失败"
	});
	}
	},
},


created() {
	// this.findJobsData();
	this.findJobtypeData();

},
mounted() {
	
}
};
</script>



<style scoped>
#modulePosition{
	width: 100%;
}

#boon_bu{
	right: 100px;
}

tr{
border: px;
color: aqua;
}

table{
border: 2px;
}

td{
	height: 30px;
	line-height: 30px;
	width: 100%;
}

#span_toadd{
	/* float: left; */
	position: relative;
	padding-right: 50px;
}

#font_li{
	width: 100px;
}
li{
    line-height: 20px;
	
    height: auto;
	float: left;
	list-style-type:none;

}
#li_boot{
	width: 300px;
}

#bt_2{
	clear: left;
}
</style>

