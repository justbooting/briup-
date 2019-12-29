/*
* @Author: liuyr 
* 职位管理页面
* @Date: 2019-12-23 17:11:53 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-29 09:15:05
*/
<template>
<div id="modulePosition">
	<br>
	
	<el-button type="primary" round id="boon_bu" @click="dialogFormVisible1 = true">添加省份</el-button><br>
	<br>
	<!-- 添加省份的對話框 -->
	<el-dialog title="添加省份" :visible.sync="dialogFormVisible1" >
		<el-form >
			<el-form-item label="省份名称" :label-width="formLabelWidth">
				<el-input v-model="province" autocomplete="off"></el-input>
				</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible1 = false">取 消</el-button>
			<el-button type="primary" @click="addProvince">确 定</el-button>
		</div>
	</el-dialog>

	<!-- {{provinceData}} -->
	<el-table :data="provinceData" style="width: 100%">
		<!-- 下面的city是一个省份的全部城市 -->
		<el-table-column type="expand" prop="city">
			<template  slot-scope="scope">
				<el-table :data="scope.row.city">
					<el-table-column prop="name" label="城市">
						<template slot-scope="scope">
							<span>{{scope.row.name}}</span>
						</template>
					</el-table-column>
				</el-table><br>				
				<li id="font_li" >
					<button id="span_toadd" @click="toAddCity(scope.row.id)">添加</button>
					<!-- 下面的city是要新增的城市 -->
				<li id ="li_boot"><input type="text" v-model="city"></li>
	 	  	</template>
		
		</el-table-column>
    	<el-table-column
    	label="省份"
     	prop="name">
    	</el-table-column>
    </el-table>

	<!-- <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="city">
        <el-form-item label="城市名称" :label-width="formLabelWidth">
          <el-input v-model="city.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属省份" :label-width="formLabelWidth">
          <el-select v-model="city.provinceId" placeholder="请选择所属省份">
           
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toAddCity">确 定</el-button>
      </div>
    </el-dialog> -->



</div>
</template>

<script>
import { findAllCity,findCityById,saveOrUpdateCity} from "@/api/city.js";
import { findAllProvince,saveOrUpdateProvince } from "@/api/province.js";
import config from "@/utils/config.js";
export default {
data() {
	return {
		dialogFormVisible1:false,//設置添加省份表單可視
		city:"",//要添加城市的名
		cityData:[],
		cityArr:[],

		totalArr:[],

		province:"",//要添加省份的名字
		provinceData:[],//查詢的所有省份數據

		dialogFormVisible: false,
		dialogTitle: "新增城市",

		//表单左侧的文字宽度
		formLabelWidth: "120px",
	};
},
computed: {},
methods: {
	// 新增城市
	async toAddCity(provinceId){
		try {
			console.log(provinceId);
			let res= await saveOrUpdateCity({provinceId : provinceId,
			name: this.city});
			if(res.status!=200){
				config.errrMsg(this,"添加城市失敗！");
				
			}
			else{		
				config.successMsg(this,"添加城市成功！");
				this.findProvinceData();
				// this.dialogFormVisible = false;
			}
		} catch (error) {
			console.log(error);
		}
		// this.dialogFormVisible = true;
        // this.getProvinceData();
	},
	
	//   toAdd() {
    //   this.dialogTitle = "新增城市";
    //   this.city = {};
    //   this.dialogFormVisible = true;
    //   this.getProvinceData();
    // },
	// 添加省份
	async addProvince(){
		try {
			console.log(typeof(this.province));
			let res= await saveOrUpdateProvince({name : this.province});
			if(res.status!=200){
				config.errrMsg(this,"添加省份失敗！");
				this.dialogFormVisible1 = false;
			}
			else{
				
				config.successMsg(this,"添加省份成功！");
				this.dialogFormVisible1 = false;
			}
		} catch (error) {
			console.log(error);
		}
		
		
	},
	//1111查找所有省份数据
	async findProvinceData() {
	try {
		let res = await findAllProvince();
		// console.log(res.data);

		let temp = [...res.data];
		// console.log('-----',temp);
		temp.forEach(async (item)=>{
			//工作類型id
			let id = item.id;
			//通過工作類型id獲取該工作類型底下的工作
			let res = await findAllCity();
			let city = res.data;
			let cityArr = city.filter((city)=>{
				return city.provinceId === id;
			});
			// console.log(cityArr);
			// 给省份加上城市属性数组
			item.city = cityArr;
		
			
		})
		setTimeout(()=>{
			this.provinceData = temp;
			// this.findProvinceData();
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
	this.findProvinceData();

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

