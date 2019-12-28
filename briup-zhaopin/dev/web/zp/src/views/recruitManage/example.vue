<template>
  <div>
    <!-- 城市信息管理 -->
    <el-button @click="toAdd" size="mini" type="primary">新增</el-button>
    <!-- {{cityData}} -->
    <el-table size="mini" :data="cityList()" style="width: 100%">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="provinceId" label="所属省份"></el-table-column>
      <el-table-column prop="pName" label="省份"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="aaa">
          <el-button @click="toDelete(aaa.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagi">
      <el-pagination
        @current-change="currentChange"
        :current-page.sync="currentPage"
        size="mini"
        background
        layout="prev, pager, next"
        :total="cityData.length"
      ></el-pagination>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="city">
        <el-form-item label="城市名称" :label-width="formLabelWidth">
          <el-input v-model="city.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属省份" :label-width="formLabelWidth">
          <el-select v-model="city.provinceId" placeholder="请选择所属省份">
            <el-option label="请选择" value></el-option>
            <el-option
              v-for="(item,index) in provinceData"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
//设置基础路径
axios.defaults.baseURL = "http://127.0.0.1:8899";
export default {
  data() {
    return {
      //当前页
      currentPage: 1,
      // 城市数据
      cityData: [],
      // 模态框显示与隐藏
      dialogFormVisible: false,
      dialogTitle: "新增城市",
      //表单左侧的文字宽度
      formLabelWidth: "120px",
      //表单中的数据对象
      city: {
        name: "",
        provinceId: ""
      },
      //省份数据
      provinceData: []
    };
  },
  computed: {
    cityList() {
      //  1   2   3
      let temp = [...this.cityData];
      let pageSize = 10;
      let page = this.currentPage;
      return temp.slice((page - 1) * pageSize, page * pageSize);
      /* temp.slice(0, pageSize);
      temp.slice((page - 1) * pageSize, pageSize * page);
      temp.slice(10, pageSize * 2);
      temp.slice((page - 1) * pageSize, pageSize * page);
      temp.slice(20, pageSize * 3);
      temp.slice((page - 1) * pageSize, pageSize * page); */
      //截取数组
      [1, 3, 6, 9, 3, 6, 7];

      //arr.slice(2, 5); //开始位置，结束位置，不包括结束位置的元素  [6,9,3]
    }
  },
  methods: {
    currentChange(val) {
      //val是当前点击的页数
      // console.log(val);
      this.currentPage = val;
    },
    //保存
    async toSave() {
      // console.log(this.city);
      try {
        let res = await axios.post(
          "/City/saveOrUpdate",
          qs.stringify(this.city)
        );
        // console.log(res);
        this.dialogFormVisible = false;
        this.init();
        this.$notify({
          title: "成功",
          message: "保存成功",
          type: "success"
        });
      } catch (err) {
        console.log(err);
      }
    },
    //新增按钮
    toAdd() {
      this.dialogTitle = "新增城市";
      this.city = {};
      this.dialogFormVisible = true;
      this.getProvinceData();
    },
    //编辑按钮
    toEdit(row) {
      this.dialogTitle = "编辑城市";
      this.city = { ...row };
      delete this.city.pName;
      // console.log(this.city);4
      this.dialogFormVisible = true;
      this.getProvinceData();
    },
    //获取省份信息，异步函数
    async getProvinceData() {
      try {
        let res = await axios.get("/Province/findAll");
        // console.log(res, "-----");
        this.provinceData = res.data.data;
      } catch (err) {
        console.log(err);
      }
    },
    // 获取所有城市的数据
    init() {
      axios
        .get("/City/findAll")
        .then(res => {
          //res经过axios的封装了
          //res.data 是后台的数据
          //res.data.data 是数组
          // console.log(res.data.data);
          //遍历所有的城市对象，通过省份id给每个对象里添加省份名字。
          let temp = res.data.data;
          temp.forEach(item => {
            let id = item.provinceId;
            axios
              .get("/Province/findById", {
                params: { id }
              })
              .then(res => {
                // console.log(res.data.data.name);
                item.pName = res.data.data.name;
                // console.log(item, 22);
              })
              .catch(err => {
                console.log(err);
              });
          });
          //超时调用
          setTimeout(() => {
            this.cityData = temp;
          }, 2000);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //删除
    toDelete(row) {
      //row代表当前要删除的city对象
      let id = row.id;
      axios
        .post("/City/deleteById", qs.stringify({ id }))
        .then(res => {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success"
          });
          this.init();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  //生命周期钩子函数，组件创建完毕
  created() {
    this.init();
  },
  mounted() {}
};
</script>
<style scoped>
.pagi {
  text-align: right;
  margin-top: 10px;
}
</style>