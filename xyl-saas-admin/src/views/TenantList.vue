<template>
  <div class="tenant-container">
    <div class="header">
      <h2>小程序租户管理</h2>
      <el-button type="primary" @click="showCreateDialog">新增租户</el-button>
    </div>

    <el-table :data="tenants" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="appId" label="AppID" />
      <el-table-column prop="ossPath" label="OSS路径" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="editTenant(scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteTenant(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑租户' : '新增租户'"
      width="500px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="名称" required>
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="AppID" required>
          <el-input v-model="form.appId" />
        </el-form-item>
        <el-form-item label="AppSecret" required>
          <el-input v-model="form.appSecret" />
        </el-form-item>
        <el-form-item label="OSS路径" required>
          <el-input v-model="form.ossPath" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';

const tenants = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const isEdit = ref(false);
const form = ref({
  name: '',
  appId: '',
  appSecret: '',
  ossPath: '',
  status: 1,
});

const API_BASE = 'http://localhost:3000/api';

const fetchTenants = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${API_BASE}/tenants`);
    if (res.data.code === 200) {
      tenants.value = res.data.data;
    }
  } catch (error) {
    ElMessage.error('获取租户列表失败');
  } finally {
    loading.value = false;
  }
};

const showCreateDialog = () => {
  isEdit.value = false;
  form.value = {
    name: '',
    appId: '',
    appSecret: '',
    ossPath: '/xyl-saas/',
    status: 1,
  };
  dialogVisible.value = true;
};

const editTenant = (row) => {
  isEdit.value = true;
  form.value = { ...row };
  dialogVisible.value = true;
};

const deleteTenant = (row) => {
  ElMessageBox.confirm(
    '确定要删除该租户吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      await axios.delete(`${API_BASE}/tenants/${row.id}`);
      ElMessage.success('删除成功');
      fetchTenants();
    } catch (error) {
      ElMessage.error('删除失败');
    }
  });
};

const submitForm = async () => {
  try {
    if (isEdit.value) {
      await axios.put(`${API_BASE}/tenants/${form.value.id}`, form.value);
      ElMessage.success('更新成功');
    } else {
      await axios.post(`${API_BASE}/tenants`, form.value);
      ElMessage.success('创建成功');
    }
    dialogVisible.value = false;
    fetchTenants();
  } catch (error) {
    ElMessage.error(isEdit.value ? '更新失败' : '创建失败');
  }
};

onMounted(() => {
  fetchTenants();
});
</script>

<style scoped>
.tenant-container {
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
