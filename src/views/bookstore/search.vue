<template>
  <div>
    <el-input v-model="input" placeholder="请输入内容" class="searchClass">
      <div slot="prepend">
        <div class="centerClass">
          <el-select v-model="select" placeholder="请选择" style="width: 90px">
            <el-option label="餐厅" value="1" />
            <el-option label="订单" value="2" />
            <el-option label="用户" value="3" />
          </el-select>
        </div>
        <div class="centerClass">
          <div class="line" />
        </div>
      </div>
      <el-button slot="append" icon="el-icon-search" />
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      select: ''
    }
  }
}
</script>

<style scoped>
  .searchClass{
    border: 1px solid #c5c5c5;
    border-radius: 20px;
    background: #f4f4f4;
  }
  .searchClass .el-input-group__prepend {
    border: none;
    background-color: transparent;
    padding: 0 10px 0 30px;
  }
  .searchClass .el-input-group__append {
    border: none;
    background-color: transparent;
  }
  .searchClass .el-input__inner {
    height: 36px;
    line-height: 36px;
    border: none;
    background-color: transparent;
  }
  .searchClass .el-icon-search{
    font-size: 16px;
  }
  .searchClass .centerClass {
    height: 100%;
    line-height: 100%;
    display: inline-block;
    vertical-align: middle;
    text-align: right;
  }
  .searchClass .line {
    width: 1px;
    height: 26px;
    background-color: #c5c5c5;
    margin-left: 14px;
  }
  .searchClass:hover{
    border: 1px solid #D5E3E8;
    background: #fff;
  }
  .searchClass:hover .line {
    background-color: #D5E3E8;
  }
  .searchClass:hover .el-icon-search{
    color: #409eff;
    font-size: 16px;
  }
</style>
