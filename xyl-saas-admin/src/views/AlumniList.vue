<template>
  <div class="alumni-container">
    <div class="header">
      <h2>校友信息管理</h2>
      <div class="header-actions">
        <el-select v-model="currentTenantId" placeholder="选择租户" @change="fetchAlumni">
          <el-option
            v-for="item in tenants"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" @click="showCreateDialog" :disabled="!currentTenantId">新增校友</el-button>
      </div>
    </div>

    <el-table :data="alumniList" style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="姓名" width="100" />
      <el-table-column prop="gender" label="性别" width="80">
        <template #default="scope">
          {{ scope.row.gender === 1 ? '男' : (scope.row.gender === 2 ? '女' : '未知') }}
        </template>
      </el-table-column>
      <el-table-column prop="enrollmentYear" label="入学年份" width="100" />
      <el-table-column prop="department" label="院系" />
      <el-table-column prop="major" label="专业" />
      <el-table-column prop="className" label="班级" />
      <el-table-column prop="city" label="城市" />
      <el-table-column prop="company" label="单位" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'info'">
            {{ scope.row.status === 1 ? '正常' : '未审核' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="editAlumni(scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteAlumni(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑校友' : '新增校友'"
      width="600px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="姓名" required>
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
            <el-radio :label="0">未知</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="入学年份">
          <el-input-number v-model="form.enrollmentYear" :min="1900" :max="2100" />
        </el-form-item>
        <el-form-item label="毕业年份">
          <el-input-number v-model="form.graduationYear" :min="1900" :max="2100" />
        </el-form-item>
        <el-form-item label="院系">
          <el-input v-model="form.department" />
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="form.major" />
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="form.className" />
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="form.studentId" />
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="form.city" />
        </el-form-item>
        <el-form-item label="工作单位">
          <el-input v-model="form.company" />
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="form.position" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" />
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
const currentTenantId = ref(null);
const alumniList = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const isEdit = ref(false);
const form = ref({});

const API_BASE = 'http://localhost:3000/api';

const fetchTenants = async () => {
  try {
    const res = await axios.get(`${API_BASE}/tenants`);
    if (res.data.code === 200) {
      tenants.value = res.data.data;
      if (tenants.value.length > 0) {
        currentTenantId.value = tenants.value[0].id;
        fetchAlumni();
      }
    }
  } catch (error) {
    ElMessage.error('获取租户列表失败');
  }
};

const fetchAlumni = async () => {
  if (!currentTenantId.value) return;
  
  loading.value = true;
  try {
    const res = await axios.get(`${API_BASE}/alumni`, {
      params: { tenantId: currentTenantId.value }
    });
    if (res.data.code === 200) {
      alumniList.value = res.data.data;
    }
  } catch (error) {
    ElMessage.error('获取校友列表失败');
  } finally {
    loading.value = false;
  }
};

const showCreateDialog = () => {
  isEdit.value = false;
  form.value = {
    tenantId: currentTenantId.value,
    name: '',
    gender: 0,
    status: 1,
  };
  dialogVisible.value = true;
};

const editAlumni = (row) => {
  isEdit.value = true;
  form.value = { ...row };
  dialogVisible.value = true;
};

const deleteAlumni = (row) => {
  ElMessageBox.confirm(
    '确定要删除该校友吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      await axios.delete(`${API_BASE}/alumni/${row.id}`);
      ElMessage.success('删除成功');
      fetchAlumni();
    } catch (error) {
      ElMessage.error('删除失败');
    }
  });
};

const submitForm = async () => {
  try {
    if (isEdit.value) {
      await axios.put(`${API_BASE}/alumni/${form.value.id}`, form.value);
      ElMessage.success('更新成功');
    } else {
      await axios.post(`${API_BASE}/alumni`, form.value);
      ElMessage.success('创建成功');
    }
    dialogVisible.value = false;
    fetchAlumni();
  } catch (error) {
    ElMessage.error(isEdit.value ? '更新失败' : '创建失败');
  }
};

onMounted(() => {
  fetchTenants();
});
</script>

<style scoped>
.alumni-container {
  padding: 20px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.header-actions {
  display: flex;
  gap: 10px;
}
</style>
