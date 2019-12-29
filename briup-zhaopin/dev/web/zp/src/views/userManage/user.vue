/*
 * @Author: liuyr 
 * 用户列表页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: fanqn
 * @Last Modified time: 2019-12-29 11:28:45
 */
<template>
  <div id="userList">   
    <!-- <div class="butDiv">
      <el-button @click="toAdd" type="warning" plain>添加用户</el-button>
      <el-button type="warning" plain>导入用户</el-button>
    </div> -->
    <div id="butDiv">
      <el-button type="primary" icon="el-icon-circle-plus" id="btn1" @click="toAdd">添加用户</el-button>
      <el-button type="primary" icon="el-icon-circle-plus" >导入用户</el-button>
    </div>
    <!--关键词搜索框 -->
    <div class="keywords">
      <el-input  placeholder="请输入关键字" @change="reachKeyWord"  v-model="inputWord"  class="input-with-select">
        <el-select @change="keyWordTypeChange" v-model="keyWordType" slot="prepend" placeholder="关键字" class="choose">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="reachKeyWord"></el-button>
      </el-input>
    </div>


    <!-- 学历，性别下拉框 -->
    <div class="searchDiv">
      <el-select @change="educationChange" clearable v-model="education" placeholder="学历">
        <el-option
          v-for="item in educationData"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-select @change="genderChange" clearable v-model="gender" placeholder="性别">
        <el-option
          v-for="item in genderData"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <!--表格  -->
    <div class="tableDiv">
      <el-table
        ref="multipleTable"
        :data="userList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="selectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="realname"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="手机号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="gender"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="birth"
          label="出生年月">
        </el-table-column>
        <el-table-column
          align="center"
          prop="education"
          label="最高学历">
        </el-table-column>
        <el-table-column
          align="center"
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="toEdit(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="toDelete(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
    <!-- 批量删除，分页 -->
    <div class="footerDiv">
      <div class="btnDiv">
        <el-button @click="toBatchDelete" size="mini" type="danger" plain>批量删除</el-button>
      </div>
      <div class="pageDiv">
        <el-pagination
            :page-size="pageSize"
            :current-page.sync="currentPage"
            size="mini"
            background
            @current-change="pageChange"
            layout="prev, pager, next"
            :total="userData.length">
        </el-pagination>
      </div>
    </div>

    <!-- 修改模态框 -->
    <el-dialog title="修改用户信息" :visible.sync="editVisible" width="60%" :before-close="beforeClose">
      <el-form :model="currentuser" :rules="rules" ref="ruleForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="birth" label="出生日期" :label-width="formLabelWidth">
              <el-input v-model="currentuser.birth"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="currentStatus" label="求职状态" :label-width="formLabelWidth">
              <el-input v-model="currentuser.currentStatus"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="education	" label="最高学历" :label-width="formLabelWidth">
              <el-input v-model="currentuser.education	"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="gender" label="性别" :label-width="formLabelWidth">
              <el-input v-model="currentuser.gender"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
              <el-input v-model="currentuser.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="realname" label="真实姓名" :label-width="formLabelWidth">
              <el-input v-model="currentuser.realname"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="resume" label="简历" :label-width="formLabelWidth">
              <el-input v-model="currentuser.resume"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="telephone" label="联系电话" :label-width="formLabelWidth">
              <el-input v-model="currentuser.telephone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
              <el-input v-model="currentuser.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="workTime" label="工作时间" :label-width="formLabelWidth">
              <el-input v-model="currentuser.workTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>        

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="toCancel('ruleForm')">取 消</el-button>
        <el-button size="mini" type="primary" @click="toSave('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加模态框 -->
    <el-dialog title="添加用户" :visible.sync="addVisible" width="40%" :before-close="beforeClose">
      <el-form :model="currentAdduser" :rules="addrules" ref="ruleForm">
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="currentAdduser.username"></el-input>
        </el-form-item>
        <el-form-item prop="telephone" label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="currentAdduser.telephone"></el-input>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="toAddsave('ruleForm')">确 定</el-button>
    </div>
  </el-dialog>
 

    </div>    
</template>

<script>
import { findAlluser,
  deleteJobhunterById,
  findJobhunterByEducation,
  findJobhunterByGender,
  findJobhunterByTelephone,
  findJobhunterByUsername,
  findJobhunterById,
  saveOrUpdateJobhunter } from "@/api/user.js";
import config from "@/utils/config.js";

export default {
  data() {
    return {
      // 学历
      education:'',
      // 性别
      gender:'',
      // 学历数组
      educationData:[],
      // 性别数组
      genderData:[],
      // 用户数组
      userData: [],
      // 用户列表，表格数据
      // userList:[]
      // 当前页
      currentPage:1,
      //每页条数
      pageSize: config.pageSize,
      //批量删除ids
      ids: [],
      //当前修改的对象
      currentuser: {},
      //添加用户
      currentAdduser:{
        username:'',
        telephone:'',
      },
      //添加模态框显示与否
      addVisible:false,
      //修改模态框显示与否
      editVisible: false,
      //修改模态框标题名称所占宽度
      formLabelWidth: "80px", 
      // 关键字类型
      keyWordType:'',
      // 输入的搜索关键字
      inputWord:"",
      
      // 输入的搜索分类
      options:[{
          value: '选项1',
          label: '学历'
        }, {
          value: '选项2',
          label: '性别'
        }, {
          value: '选项3',
          label: 'id'
        },{
            value: '选项4',
            label: '手机号'
          },{
            value: '选项5',
            label: '用户名'
          },
            ],
    
      //校验规则
      rules: {
        realname: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        telephone: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
        gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      },
      addrules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        telephone: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
      }     
    };
  },
  computed: {
    userList(){
      let temp = [...this.userData];
      let page = this.currentPage;
      let pageSize = config.pageSize;
      return temp.slice((page-1)*pageSize,pageSize*page); 
    }
  },
  
  methods: {
    /**
     * 选择关键字类型发生改变时调用的函数
     * 作用：改变keyWordType的值
     */
    keyWordTypeChange(){
      //只改变属性值
    },    
    /**
    * 输入关键字并按回车时触发的事件
    * 作用：寻找含有关键字的记录，并显示
    */
    async reachKeyWord(keyWord){
      // 选择某一方面搜索
      // console.log("关键字类型："+this.keyWordType);
      if(this.keyWordType){
        try {
          // 根据关键字类型调用方法
          let res;
          // 学历
          if(this.keyWordType==this.options[0].value){
            // console.log(this.inputWord);
            res=await findJobhunterByEducation({ education :this.inputWord });
            // console.log(res);
            this.userData=res.data;
            this.currentPage=1;
            
          }
          // 性别
          else if(this.keyWordType==this.options[1].value){
            res=await findJobhunterByGender({ gender :this.inputWord });
            this.userData=res.data;
            this.currentPage=1;
          }
          // id
          else if(this.keyWordType==this.options[2].value){                
            res=await findJobhunterById({ id :this.inputWord});
            //  console.log(this.inputWord);
             console.log(res.data);
            //  console.log(res);
            this.userData=[res.data];
            console.log(this.userData,"------");

            this.currentPage=1;
          }
          // 手机号
          else if(this.keyWordType==this.options[3].value){
            res=await findJobhunterByTelephone({ telephone :this.inputWord });
            this.userData=res.data;
            this.currentPage=1;
          }
          // 用户名
          else if(this.keyWordType==this.options[4].value){
            res=await findJobhunterByUsername({ username :this.inputWord });
            this.userData=res.data;
            this.currentPage=1;
          }                                    
        } catch (error) {
          console.log(error);
          config.errorMsg(this, "通过关键字查找用户信息错误！");
        }          
      }
      else{
        // 弹出警告
        config.errorMsg(this,"请选择关键字！");
        // 恢复原本数据
        this.findAllus();
      }
    },
   //添加
    toAddsave(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //通过验证
          //保存
          try {
            let res = await saveOrUpdateJobhunter(this.currentAdduser);
            if (res.status === 200) {
              this.findAllus();
              this.addVisible = false;
              config.successMsg(this, "添加成功");
            } else {
              config.errorMsg(this, "添加失败");
            }
          } catch (error) {
            console.log(error);
            config.errorMsg(this, "添加失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //保存
    toSave(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //通过验证
          //保存
          try {
            let res = await saveOrUpdateJobhunter(this.currentuser);
            if (res.status === 200) {
              this.findAllus();
              this.editVisible = false;
              config.successMsg(this, "修改成功");
            } else {
              config.errorMsg(this, "修改失败");
            }
          } catch (error) {
            console.log(error);
            config.errorMsg(this, "修改失败");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //右上角，模态框关闭之前
    beforeClose() {
      this.$refs["ruleForm"].resetFields();
      this.editVisible = false;
      this.addVisible = false;
    },
    //关闭模态框
    toCancel(formName) {
      //重置表单验证，关闭模态框
      this.$refs[formName].resetFields();
      this.editVisible = false;
    },
    // 添加按钮
    toAdd(row){
      this.currentAdduser = {};
      this.addVisible = true;
    },
    // 修改
    toEdit(row) {
      this.currentuser = { ...row };
      this.editVisible = true;
    },    
    // 页数发生改变
    pageChange(page){
      this.currentPage = page;
    },  
    // 学历发生改变
    async educationChange(val){
      this.gender = '';
      if(val){
          try{
            let res =await findJobhunterByEducation({education:val});
            this.userData = res.data;
            this.currentPage=1;
          }catch(error){
        config.errorMsg(this,'通过学历查找用户信息错误')
      }
      }else{
        this.findAllus();
      }
    },
    // 性别发生改变
    async genderChange(val){
      this.education = '';
      if(val){
          try{
            let res = await findJobhunterByGender({gender:val});
            this.userData = res.data;
            this.currentPage=1;
          }catch(error){
        config.errorMsg(this,'通过学历查找用户信息错误')
      }
      }else{
        this.findAllus();
      }
    },
    // 删除 
    toDelete(id) {
      this.$confirm("是否删除该记录?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
          //访问后台接口
          try {
            let res = await deleteJobhunterById({ id: id });
            if (res.status === 200) {
              config.successMsg(this, "删除成功");
              this.findAllus();
            } else {
              config.errorMsg(this, "删除失败");
            }
          } catch (error) {
            config.errorMsg(this, "删除失败");
          }
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
                  let res = await deleteJobhunterById({ id: id });
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
                  config.successMsg(this, "批量删除成功");
                } else {
                  config.errorMsg(this, "批量删除失败");
                }
                this.findAllus();
              }, 2000);
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
    
    // 获取所有用户信息
    async findAllus() {
      try {
        let res = await findAlluser();
        // console.log(res)
        this.userData = res.data;
        this.currentPage = 1;
        //学历数组
        let educationArr = res.data.map(item => {
          return item.education;
        }); 
        // 去重
        this.educationData = [...new Set(educationArr)];
        //性别数组
         let genderArr = res.data.map(item => {
          return item.gender;
        });
        //去重
        this.genderData = [...new Set(genderArr)];
      } catch (err) {
        config.errorMsg(this, "查找错误");
      }
    },

  },
  created() {
        this.findAllus();

  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.tableDiv {
  margin-top: 10px;
}
.footerDiv{
  overflow: hidden;
  margin-top: 10px;
}
.btnDiv{
  float: left;
}
.pageDiv{
  float: right;
}
// .butDiv{
//   float: right;
// }
#butDiv{
  width: 260px;
  position: absolute;
  top: -0.2%;
  left: 81%;


  #btn1{
    background-color: rgb(255, 102, 0);
    border: 1px solid rgb(255, 102, 0);
  }
}
.dialog-footer {
  text-align: center;
  margin-top: -30px;
}
.keywords{
  float: right;
  width: 330px;
}
.selection{
  width: 100px;
}
.search_part{
  display: inline-block;
  width: 150px;
}
.choose{
    width: 90px;
}
</style>