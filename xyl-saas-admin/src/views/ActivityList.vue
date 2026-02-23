<template>
  <div class="activity-container">
    <div class="header">
      <h2>校友活动管理</h2>
      <div class="header-actions">
        <el-select v-model="currentTenantId" placeholder="选择租户" @change="fetchActivities">
          <el-option
            v-for="item in tenants"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button type="primary" @click="showCreateDialog" :disabled="!currentTenantId">新增活动</el-button>
      </div>
    </div>

    <el-table :data="activities" style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="活动标题" />
      <el-table-column prop="startTime" label="开始时间" width="180">
        <template #default="scope">
          {{ new Date(scope.row.startTime).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column prop="location" label="地点" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">
            {{ getStatusText(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="editActivity(scope.row)">编辑</el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteActivity(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑活动' : '新增活动'"
      width="600px"
    >
      <el-form :model="form" label-width="100px">
        <el-form-item label="标题" required>
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="封面图">
          <el-input v-model="form.cover" placeholder="请输入图片URL" />
        </el-form-item>
        <el-form-item label="开始时间" required>
          <el-date-picker
            v-model="form.startTime"
            type="datetime"
            placeholder="选择开始时间"
          />
        </el-form-item>
        <el-form-item label="结束时间" required>
          <el-date-picker
            v-model="form.endTime"
            type="datetime"
            placeholder="选择结束时间"
          />
        </el-form-item>
        <el-form-item label="活动地点">
          <el-input v-model="form.location" />
        </el-form-item>
        <el-form-item label="最大人数">
          <el-input-number v-model="form.maxParticipants" :min="0" />
          <span style="margin-left: 10px; color: #999;">0表示不限</span>
        </el-form-item>
        <el-form-item label="活动详情">
          <el-input type="textarea" v-model="form.content" :rows="4" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status">
            <el-option label="草稿" :value="0" />
            <el-option label="已发布" :value="1" />
            <el-option label="已结束" :value="2" />
          </el-select>
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
const activities = ref([]);
const loading = ref(false);
const dialogVisible = ref(false);
const isEdit = ref(false);
const form = ref({});

const API_BASE = 'http://localhost:3000/api';

const getStatusType = (status) => {
  const map = { 0: 'info', 1: 'success', 2: 'warning' };
  return map[status] || 'info';
};

const getStatusText = (status) => {
  const map = { 0: '草稿', 1: '已发布', 2: '已结束' };
  return map[status] || '未知';
};

const fetchTenants = async () => {
  try {
    const res = await axios.get(`${API_BASE}/tenants`);
    if (res.data.code === 200) {
      tenants.value = res.data.data;
      if (tenants.value.length > 0) {
        currentTenantId.value = tenants.value[0].id;
        fetchActivities();
      }
    }
  } catch (error) {
    ElMessage.error('获取租户列表失败');
  }
};

const fetchActivities = async () => {
  if (!currentTenantId.value) return;
  
  loading.value = true;
  try {
    const res = await axios.get(`${API_BASE}/activities`, {
      params: { tenantId: currentTenantId.value }
    });
    if (res.data.code === 200) {
      activities.value = res.data.data;
    }
  } catch (error) {
    ElMessage.error('获取活动列表失败');
  } finally {
    loading.value = false;
  }
};

const showCreateDialog = () => {
  isEdit.value = false;
  form.value = {
    tenantId: currentTenantId.value,
    title: '',
    status: 0,
    maxParticipants: 0,
  };
  dialogVisible.value = true;
};

const editActivity = (row) => {
  isEdit.value = true;
  form.value = { ...row };
  dialogVisible.value = true;
};

const deleteActivity = (row) => {
  ElMessageBox.confirm(
    '确定要删除该活动吗？',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      await axios.delete(`${API_BASE}/activities/${row.id}`);
      ElMessage.success('删除成功');
      fetchActivities();
    } catch (error) {
      ElMessage.error('删除失败');
    }
  });
};

const submitForm = async () => {
  try {
    if (isEdit.value) {
      await axios.put(`${API_BASE}/activities/${form.value.id}`, form.value);
      ElMessage.success('更新成功');
    } else {
      await axios.post(`${API_BASE}/activities`, form.value);
      ElMessage.success('创建成功');
    }
    dialogVisible.value = false;
    fetchActivities();
  } catch (error) {
    ElMessage.error(isEdit.value ? '更新失败' : '创建失败');
  }
};

onMounted(() => {
  fetchTenants();
});
</script>

<style scoped>
.activity-container {
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
