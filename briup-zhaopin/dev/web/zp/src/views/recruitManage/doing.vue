/*
 * @Author: liuyr 
 * 招聘中页面
 * @Date: 2019-12-23 17:03:30 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-28 10:15:38
 */
<template>
    <div id="recruitDoing">
        <!-- 两个职位按钮 -->
        <div class="button_box">
            <el-button class="recruit_butt" type="success" icon="el-icon-info">发布职位</el-button>
            <el-button class="recruit_butt" type="primary" icon="el-icon-info">导入职位</el-button>
        </div>
      <!-- 职位下拉筛选框 -->
        <div class="position_sort">
            <!-- 触发根据职位过滤函数 -->
            <el-select @change="positionFilter" size="mini" v-model="positionType" clearable placeholder="职位类型">
                <el-option
                v-for="item in positionData"
                :key="item"
                :label="item"
                :value="item"
                ></el-option>
            </el-select>
           
        </div>
        <!-- 下拉关键字框和搜索框 -->
        <div class="search_box">
            <el-select class="search_part" @change="keyWordTypeChange" size="mini" v-model="keyWordType" clearable placeholder="关键字类型" >
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                ></el-option>
            </el-select>
            <el-input class="search_part" size="mini" @change="reachKeyWord"
            placeholder="请输入关键字"
            v-model="inputWord">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <!-- 表格 -->
        <el-table size="mini" 
        @selection-change="selectionChange" 
        :data="recruitList()" 
        align="center" 
        style="width: 100%" 
        class="table">
            <el-table-column type="selection" align="center" label="#"></el-table-column>
            <el-table-column prop="title" align="center" label="招聘标题"></el-table-column>
            <el-table-column prop="contactName" align="center" label="发布人"></el-table-column>
            <el-table-column prop="contactPhone" align="center" label="联系方式"></el-table-column>
            <el-table-column prop="job" align="center" label="职位"></el-table-column>
            <el-table-column prop="newPublishTime" align="center" label="发布时间"></el-table-column>
            <el-table-column  
            align="center"
            label="详情"
            width="100">
                    <template   slot-scope="scope">
                        <el-button  @click="moreInfo(scope.row)" type="text" size="small">查看</el-button>
                    </template>
            </el-table-column> 
            <el-table-column
            fixed="right"
            label="操作"
            width="100"
            align="center">
                <template slot-scope="scope">
                    <el-button @click="toEdit(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="toDelect(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        
        </el-table>
        <!-- 详情对话框，初始为隐藏 -->
        <el-dialog :title="currentRecord.name" :visible.sync="seeVisible">
            <div class="headDiv">
                <span class="title">标题：{{currentRecord.title}}</span>
                <span class="salary">{{currentRecord.salary}}￥</span>
            </div>
            <div class="seeDiv">
                <span>招聘职位：</span>
                {{currentRecord.job}}
            </div>
            <div class="seeDiv">
                <span>工作地址：</span>
                {{currentRecord.province}}省
                {{currentRecord.city}}市
                {{currentRecord.location}}
            </div>
            <div class="seeDiv">
                <span>福利：</span>
                {{currentRecord.welfare}}
            </div>
             <div class="seeDiv">
                <span>工作时间：</span>
                {{currentRecord.workingHours}}
            </div>
            <div class="seeDiv">
                <span>工作描述：</span>
                {{currentRecord.description}}
            </div>
            <div class="seeDiv">
                <span>需要人数：</span>
                {{currentRecord.num}}
            </div>
            <div class="seeDiv">
                <span>联系人：</span>
                {{currentRecord.contactName}}
            </div>
            <div class="seeDiv">
                <span>联系电话：</span>
                {{currentRecord.contactPhone}}
            </div>
            <div class="seeDiv">
                <span>招聘开始时间：</span>
                {{currentRecord.scale}}
            </div>
            <div class="seeDiv">
                <span>招聘结束时间：</span>
                {{currentRecord.scale}}
            </div>
            
        </el-dialog>
        <!-- 修改对话框 -->
        <el-dialog title="修改招聘信息" :visible.sync="editVisible" width="60%" :before-close="beforeClose">
            <!-- 表单 -->
            <el-form :model="currentRecord" :rules="rules" ref="ruleForm">
                <!-- 第一行 招聘名称-->
                <el-form-item prop="title" label="招聘名称" :label-width="formLabelWidth">
                    <el-input v-model="currentRecord.title" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 第二行 工作和人数-->
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  prop="job" label="工作" :label-width="formLabelWidth">
                            <el-select
                            clearable                       
                            v-model="currentRecord.job"
                            placeholder="请选择工作"
                            >
                                <el-option
                                    v-for="item in positionData"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="num" label="招聘人数" :label-width="formLabelWidth">
                            <el-input v-model="currentRecord.num"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第三行 招聘公司和薪水-->
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  prop="name" label="招聘公司" :label-width="formLabelWidth">
                            <el-select
                            clearable                       
                            v-model="currentRecord.name"
                            placeholder="请选择招聘公司"
                            >
                                <el-option
                                    v-for="item in businessData"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="salary" label="薪水" :label-width="formLabelWidth">
                            <el-input v-model="currentRecord.salary"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第四行 选择福利、省份、城市-->       
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  prop="welfare" label="福利" :label-width="formLabelWidth">
                        <el-select
                            clearable                       
                            v-model="currentRecord.welfare"
                            placeholder="请选择福利"
                            >
                                <el-option
                                    v-for="item in welfareData"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <!-- 内嵌表单项 -->
                        <el-form-item required label="所在城市" :label-width="formLabelWidth">
                            <el-row>
                                <el-col :span="12">
                                    <!-- 再内嵌表单项 -->
                                    <el-form-item prop="province">
                                        <el-select
                                        clearable
                                        @change="dialogProChange"
                                        v-model="currentRecord.province"
                                        placeholder="请选择省份"
                                        >
                                        <el-option
                                            v-for="item in provinceData"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                        ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                <el-form-item prop="city">
                                    <el-select clearable v-model="currentRecord.city" placeholder="请选择城市">
                                    <el-option
                                        v-for="item in provinceCityData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.name"
                                    ></el-option>
                                    </el-select>
                                </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第五行 招聘时间、工作时间-->
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="招聘时间" :label-width="formLabelWidth">
                            <el-input  suffix-icon="el-icon-date">
                                {{currentRecord.startTime}}到{{currentRecord.endTime}}</el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="workingHours" label="工作时长" :label-width="formLabelWidth">
                            <el-input v-model="currentRecord.workingHours"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第六行 联系人、联系电话 -->
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item prop="contactName" label="联系人" :label-width="formLabelWidth">
                        <el-input v-model="currentRecord.contactName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="contactPhone" label="联系电话" :label-width="formLabelWidth">
                        <el-input v-model="currentRecord.contactPhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第七行 详细地址、招聘描述-->
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item prop="location" label="详细地址" :label-width="formLabelWidth">
                        <el-input type="textarea" :rows="4" v-model="currentRecord.location"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="description" label="招聘描述" :label-width="formLabelWidth">
                        <el-input type="textarea" :rows="4" v-model="currentRecord.description"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="toCancelEdit('ruleForm')">取 消</el-button>
                <el-button size="mini" type="primary" @click="toSave('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 增加对话框 -->
        <el-dialog title="发布招聘信息" :visible.sync="addVisible" width="60%" :before-close="beforeClose">
            <!-- 表单 -->
            <el-form :model="currentRecord" :rules="rules" ref="ruleForm">
                <!-- 第一行 招聘名称-->
                <el-form-item prop="title" label="招聘名称" :label-width="formLabelWidth">
                    <el-input v-model="currentRecord.title" autocomplete="off"></el-input>
                </el-form-item>
                <!-- 第二行 工作和人数-->
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  prop="job" label="工作" :label-width="formLabelWidth">
                            <el-select
                            clearable                       
                            v-model="currentRecord.job"
                            placeholder="请选择工作"
                            >
                                <el-option
                                    v-for="item in positionData"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="num" label="招聘人数" :label-width="formLabelWidth">
                            <el-input v-model="currentRecord.num"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第三行 招聘公司和薪水-->
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  prop="name" label="招聘公司" :label-width="formLabelWidth">
                            <el-select
                            clearable                       
                            v-model="currentRecord.name"
                            placeholder="请选择招聘公司"
                            >
                                <el-option
                                    v-for="item in businessData"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="salary" label="薪水" :label-width="formLabelWidth">
                            <el-input v-model="currentRecord.salary"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第四行 选择福利、省份、城市-->       
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  prop="welfare" label="福利" :label-width="formLabelWidth">
                        <el-select
                            clearable                       
                            v-model="currentRecord.welfare"
                            placeholder="请选择福利"
                            >
                                <el-option
                                    v-for="item in welfareData"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <!-- 内嵌表单项 -->
                        <el-form-item required label="所在城市" :label-width="formLabelWidth">
                            <el-row>
                                <el-col :span="12">
                                    <!-- 再内嵌表单项 -->
                                    <el-form-item prop="province">
                                        <el-select
                                        clearable
                                        @change="dialogProChange"
                                        v-model="currentRecord.province"
                                        placeholder="请选择省份"
                                        >
                                        <el-option
                                            v-for="item in provinceData"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                        ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                <el-form-item prop="city">
                                    <el-select clearable v-model="currentRecord.city" placeholder="请选择城市">
                                    <el-option
                                        v-for="item in provinceCityData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.name"
                                    ></el-option>
                                    </el-select>
                                </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第五行 招聘时间、工作时间-->
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item  label="招聘时间" :label-width="formLabelWidth">
                            <el-input  suffix-icon="el-icon-date">
                                {{currentRecord.startTime}}到{{currentRecord.endTime}}</el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="workingTime" label="工作时间" :label-width="formLabelWidth">
                            <el-input v-model="currentRecord.workingTime"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第六行 联系人、联系电话 -->
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item prop="contactName" label="联系人" :label-width="formLabelWidth">
                        <el-input v-model="currentRecord.contactName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="contactPhone" label="联系电话" :label-width="formLabelWidth">
                        <el-input v-model="currentRecord.contactPhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 第七行 详细地址、招聘描述-->
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item prop="location" label="详细地址" :label-width="formLabelWidth">
                        <el-input type="textarea" :rows="4" v-model="currentRecord.location"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item prop="description" label="招聘描述" :label-width="formLabelWidth">
                        <el-input type="textarea" :rows="4" v-model="currentRecord.description"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="toCancelAdd('ruleForm')">取 消</el-button>
                <el-button size="mini" type="primary" @click="toSave('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 分页和一键删除按钮 -->
        <div class="pagi_butt">
            <!-- 一键删除按钮 -->
            <el-button class="delectButton" @click="toDelectAll" type="danger" size="small">一键删除</el-button>
            <!-- 分页 -->
            <el-pagination
                class="pagi"
                @current-change="currentChange"
                :current-page.sync="currentPage"
                size="mini"
                background
                :page-size="5"
                layout="prev, pager, next"
                :total="allData.length"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import config from "@/utils/config.js";
import {    findRecruitAll,//查询所有招聘信息
            findAllPosition,//查询所有职位
            findAllWelfare,// 查询所有福利
            findAllProvince,//查询所有省份
            findAllCity,//查询所有城市
            findAllBusiness,//查找所有商家信息
            editReord,//编辑选中招聘信息或创建招聘信息
            deleteRecruitById,//根据id删除招聘信息
            findCityByProvinceId,// 根据省份id查询所有城市
            findRecruitByWelfare,//根据福利查找招聘信息
            findRecruitByCity,//根据城市查找删除招聘信息
            findRecruitByTitle,//根据主题查找删除招聘信息
            findBusinessById,//根据id查找商家信息
            findRecruitByJob, //根据工作查找招聘信息
            RecruitsaveOrUpdate//新增所修改招聘信息
            } from "@/api/recruit.js";
export default {
    data() {
        return {
            // 详情对话框可视属性
            seeVisible:false,
            // 编辑对话框可视属性
            editVisible:false,
            // 新增对话框可视属性
            addVisible:false,
            // 当前选中的记录，该记录可能会被执行查看和修改操作
            currentRecord:{},
            // 职业类型
            positionData:[], 
            //商家数据
            businessData:[],
            //福利数据
            welfareData:[],
            // 省份数据
            provinceData:[],
            // 城市数据
            provinceCityData:[],
            // 选择的职位类型
            positionType:"",
            // 关键字类型
            keyWordType:'',
            // 输入的搜索关键字
            inputWord:"",
            // 输入的搜索分类
            options:[{
                value: '选项1',
                label: '职位'
                }, {
                value: '选项2',
                label: '主题'
                }, {
                value: '选项3',
                label: '福利'
                },{
                value: '选项4',
                label: '城市'
                },

            ],
            // 表格当前页
            currentPage: 1,
            //修改对话框标题名称所占宽度
            formLabelWidth:"80px",
            // 总数据
            allData:[
                // id  
                // publishTime 发布日期
                // businessId  商家id
                // city    城市
                // province    省份
                // jobId   职位id
                // startTime   招聘开始日期
                // endTime 招聘结束日期
                // workingHours    工作时间
                // contactName 联系人姓名
                // contactPhone    联系方式
                // description 详细描述
                // job 工作
                // num 需要人数
                // salary  工资
                // status  状态
                // auditStatus 审核状态
                // title   招聘标题
                // welfare 福利
                // newPublishTime 裁剪时间字符串后的新发布时间
                // 
            ],
            // 选择删除的数据,数组元素是id
            deletData:[],
            // 要提交的数据，变量与allData相同
            applyData:[],
            //校验规则
            rules: {
                name: [{ required: true, message: "请输入公司名称", trigger: "blur" }],
                num: [{ required: true, message: "请输入招聘人数", trigger: "blur" }],
                salary: [{ required: true, message: "请输入工作薪水", trigger: "blur" }],
                workingTime: [{ required: true, message: "请输入工作时长", trigger: "blur" }],
                job: [{ required: true, message: "请输入职位类型", trigger: "blur" }],
                title: [
                { required: true, message: "请输入招聘标题", trigger: "blur" }
                ],
                welfare: [{ required: true, message: "请输入工作福利", trigger: "blur" }],
                contactName: [
                { required: true, message: "请输入联系人", trigger: "blur" }
                ],
                contactPhone: [
                { required: true, message: "请输入联系电话", trigger: "blur" }
                ],
                location: [
                { required: true, message: "请输入详细地址", trigger: "blur" }
                ],
                description: [
                { required: true, message: "请输入公司简介", trigger: "blur" }
                ],
                province: [
                { required: true, message: "请选择省份", trigger: "change" }
                ],
                city: [{ required: true, message: "请选择城市", trigger: "change" }]
            }
            
        };
    },
    computed: {},
    methods: {
        beforeClose() {
            this.$refs["ruleForm"].resetFields();
            this.editVisible = false;
        },
        //关闭编辑对话框
        toCancelEdit(formName) {
        //重置表单验证，关闭编辑对话框
            this.$refs[formName].resetFields();
            this.editVisible = false;
        },
        //关闭增加对话框
        toCancelAdd(formName) {
        //重置表单验证，关闭编辑对话框
            this.$refs[formName].resetFields();
            this.addVisible = false;
        },
        //保存
        toSave(formName) {
            //发布招聘信息
            if(this.addVisible){
                // 将当前记录设置为空
                this.currentRecord={};
                // 验证表单
                this.$refs[formName].validate(async valid => {
                if (valid) {
                    //通过验证就保存
                    try {
                        let val=this.currentRecord;
                        // delete val.publishTime;
                        // delete val.startTime
                        // delete val.endTime;
                        let res = await RecruitsaveOrUpdate(val);
                        if (res.status === 200) {
                            this.getAllData();
                            this.editVisible = false;
                            config.successMsg(this, "新增成功");
                        } else {
                        config.errorMsg(this, "新增失败");
                        }
                    } catch (error) {
                        console.log(error);
                        config.errorMsg(this, "新增失败");
                    }
                } else {
                    console.log("表单验证失败！");
                    return false;
                }
            });
            }
            // 修改招聘信息
            else{
                this.$refs[formName].validate(async valid => {
                if (valid) {
                    //通过验证
                    let province = this.currentRecord.province;
                    // console.log(province);
                    // console.log(typeof province);
                    // console.log(+province);    NaN  8
                    //如果省份发生更改
                    if (+province) {
                        //将省份id处理为省份名字，过滤省份数组
                        let result = this.provinceData.filter(item => {
                        return item.id === +province;
                        })[0];
                        // result 是省份对象
                        this.currentRecord.province = result.name;
                    }
                    //保存
                    try {
                        let val=this.currentRecord;
                        //  val.publishTime='';
                         delete val.publishTime;
                         delete val.startTime
                         delete val.endTime;
                        let res = await RecruitsaveOrUpdate(val);
                        if (res.status === 200) {
                            this.getAllData();
                            this.editVisible = false;
                            config.successMsg(this, "修改成功");
                        } else {
                        config.errorMsg(this, "1修改失败");
                        }
                    } catch (error) {
                        console.log(error);
                        config.errorMsg(this, "2修改失败");
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
            }
            
        },
        //修改对话框省份发生改变
        async dialogProChange(val) {
            // console.log(val);
            //重置城市下拉列表
            this.currentRecord.city = "";
            //通过省份id获取城市
            try {
                let res = await findCityByProvinceId({ provinceId: val });
                this.provinceCityData = res.data;
            } catch (error) {
                console.log(error);
                config.errorMsg(this, "通过省份查找城市失败");
            }
        },
        // 页数发生改变
        pageChange(page) {
        this.currentPage = page;
        },
       
        //查看
        toSee(row) {
        this.currentRecord = { ...row };
        this.seeVisible = true;
        },
        //编辑
        toEdit(row) {
            this.currentRecord = { ...row };
            this.editVisible = true;
        },

        /**
         * 获取全部招聘信息
         */
        async getAllData() {
            /**
             * 流程：首先获取全部招聘信息，
             *      其次根据得到的发布时间裁剪成正常时间格式
             */
            try {
                var data=await findRecruitAll();
                let newdata=data.data.filter(function hehe(item){
                     return true;//筛选条件item.businessId!=null
                 })
                newdata.forEach(element => {
                    if(element!=null){
                        element.newPublishTime=element.publishTime.substring(0,10);
                    }
                });
                
                this.allData=newdata;
            } catch (error) {
                config.errorMsg(this,"获取全部招聘数据失败！");
            }
        
        },

        /**
         * 获取全部商家信息
         */
        async getAllBusiness() {
            
            try {
                let data=await findAllBusiness();                
                this.businessData=data.data;
                // console.log(this.businessData);
            } catch (error) {
                config.errorMsg(this,"获取全部商家数据失败！");
            }
        
        },

        /**
         * 获取全部福利信息
         */
        async getAllWelfare() {
            
            try {
                let data=await findAllWelfare();                
                let newdata=data.data.filter(function hehe(item){
                     return item.status=="使用中";//筛选条件福利正在使用
                 })
                 this.welfareData=newdata;
            } catch (error) {
                config.errorMsg(this,"获取全部福利数据失败！");
            }
        
        },

        /**
         * 获取职业数据
         */
        async getPositionData(){
            try {
                let data=await findAllPosition();
                let arr1=[];
                data.data.forEach(element => {
                    if(element!=null){
                        arr1.push(element.name);
                    }
                });
                // console.log(arr1);
                this.positionData=arr1;
                // console.log(this.positionData);
            } catch (error) {
                
            }
        },
        //查找所有省份信息
        async findAllPro() {
            try {
                let res = await findAllProvince();
                this.provinceData = res.data;
            } catch (error) {
                config.errorMsg(this, "查找错误");
            }
        },
        //查找所有城市信息
        async findAllCi() {
            try {
                let res = await findAllCity();
                this.cityData = res.data;
            } catch (error) {
                config.errorMsg(this, "查找错误");
            }
        },
        /**
         * 职位寻找函数，根据职位展示数据
         */
        async positionFilter(){
            // 选择的职位类型不为空时
            if(this.positionType){
                try {
                    let res=await findRecruitByJob({ job :this.positionType });
                    this.allData=res.data;
                    this.currentPage=1;
                    config.successMsg(this, "查找成功！");
                } catch (error) {
                    config.errorMsg(this, "通过职位查找招聘信息错误");
                }          
            }
            else{
                // 恢复原来数据
                this.getAllData();
            }
            
            
        },

        /*****
         * 选择关键字类型发生改变时调用的函数
         * 作用：改变keyWordType的值
         */
        keyWordTypeChange(){
            //   只改变属性值，啥也不干
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
                    // 职位
                    if(this.keyWordType==this.options[0].value){
                        res=await findRecruitByJob({ job :this.inputWord });
                        this.allData=res.data;
                        this.currentPage=1;
                    }
                    // 主题
                    else if(this.keyWordType==this.options[1].value){
                        res=await findRecruitByTitle({ title :this.inputWord });
                        this.allData=res.data;
                        this.currentPage=1;
                    }
                    // 福利
                    else if(this.keyWordType==this.options[2].value){
                        res=await findRecruitByWelfare({ welfare :this.inputWord });
                        this.allData=res.data;
                        this.currentPage=1;
                    }
                    // 城市
                    else if(this.keyWordType==this.options[3].value){
                        res=await findRecruitByCity({ city :this.inputWord });
                        this.allData=res.data;
                        this.currentPage=1;
                    }
                                       
                } catch (error) {
                    console.log(error);
                    config.errorMsg(this, "通过关键字查找招聘信息错误！");
                }          
            }
            else{
                // 弹出警告
                config.errorMsg(this,"请选择关键字类型！");
                // 恢复原本数据
                this.getAllData();
            }
        },

        currentChange(val) {
            //val是当前点击的页数
            // console.log(val);
            this.currentPage = val;
        },

        // 设置表格数据
        recruitList() {
            //  1   2   3
            // console.log(this.allData.length);
            let temp = [...this.allData];
            let pageSize = 5;
            let page = this.currentPage;
            if(page * pageSize>this.allData.length)
                return temp.slice((page - 1) * pageSize, this.allData.length);
            else
                return temp.slice((page - 1) * pageSize, page * pageSize);
            
        },

        /****
         * 选择要删除的数据并放入deleteData数组中
         */
        selectionChange(val){
            //val 就是选中的对象组成的数组
            let ids = val.map(item => {
                return item.id;
            });
            this.deleteData = ids;
            // console.log(ids);
        },

        /***
         * 点击查看时触发的事件
         * 作用：显示详细的招聘信息
         */
        async moreInfo(obj){
            
            try {
                let business=await findBusinessById({ id :obj.businessId });
                // 在显示的信息中添加商家名和商家地址
                obj.name=business.data.name;
                obj.location=business.data.location;
                this.currentRecord=obj;
                this.seeVisible=true;
                // console.log(business);
            } catch (error) {
                config.errorMsg(this,"查询详细的招聘信息失败");
            }
            
        },

        /*****
         * 点击修改时触发的操作
         * 作用：修改相应招聘记录的内容
         */
        modifyInfo(){

        },

        /****
         * 删除多项招聘记录函数
         */
        toDelectAll(){
            // 给toDelect函数传个空参数
            let val;
            this.toDelect(val);
        },
        /****
         * 点击删除时执行的操作
         * val是在删除单项需要的参数，删除多项时可以不用
         */
        toDelect(val){
            let ids
            if(val){
                // console.log(val);
                ids=[...val.id];          
            }
            else{
                ids = this.deleteData;
                console.log("删除选中的数据");
            }
            if (ids!=null&& ids.length>0) {
                this.$alert("是否删除？", "提示", {
                confirmButtonText: "删除",
                callback: action => {
                    if (action === "confirm") {
                    let result = [];
                    ids.forEach(async id => {
                        try {
                            console.log(id);
                            let res = await deleteRecruitById({id:id});
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
                        this.getAllData();
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

        }
        
    },
    created() {
        /****
         * 查找所有商家、职位、省份、福利和招聘信息
         */
        this.getAllData();
        this.getAllBusiness();
        this.getPositionData();
        this.findAllPro();
        this.getAllWelfare();
           
    },
    mounted() {}
 };
</script>
<style scoped lang="scss">
.button_box{
    position: fixed;
    right: 10px;
    margin-top: -45px;
}
.recruit_butt{
    height: 30px;
    margin: 0px;
}
/* 职位下拉筛选框样式 */
.position_sort{
    display: inline-block;
}
/* 搜索框样式 */
 .search_box{
     float: right;
     width: 330px;
 }
 .search_part{
     display: inline-block;
     width: 150px;
 }
 /* 表格样式 */
 .table{
     margin-top: 20px;
 }
 /* 删除按钮和分页区域样式 */
 .pagi_butt{
     margin-top: 20px;
     padding: 0px;
 }
 .delectButton,.pagi{
     display: inline-block;
 }
 .headDiv{
     font-size: 32px;
     border-bottom: 1px solid #ccc;
     line-height: 60px;
     font-weight: bold;
 }
 .title{
     color: #777;
 }
 .salary{
     float: right;
     color: rgb(195, 236, 13);
 }
 .seeDiv {
    border-bottom: 1px solid #ccc;
    line-height: 30px;
    font-weight: bold;
    span {
        color: #777;
    }
}
.descDiv {
    font-weight: bold;
    color: #777;
    font-size: 12px;
    line-height: 30px;
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
}
 .pagi{
     float: right;
 }
</style>