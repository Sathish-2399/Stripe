<script setup lang="ts">
const API_BASE = "http://localhost:8083"
const refunds = ref<any[]>([])
const loading = ref(false)
const error = ref("")

const loadRefunds = async () => {
  loading.value = true
  error.value = ""

  try {
    refunds.value = await $fetch<any[]>(`${API_BASE}/create/refund/all`)
  } catch (err: any) {
    error.value = err.data?.message || err.message
  } finally {
    loading.value = false
  }
}

onMounted(loadRefunds)
</script>

<template>
  <div class="container">
    <h1>All Refunds</h1>

    <p v-if="loading">Loading refunds...</p>
    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>
    <p v-if="!loading && refunds.length === 0">No refunds found.</p>

    <table v-if="refunds.length">
      <thead>
        <tr>
          <th>Refund ID</th>
          <th>Charge ID</th>
          <th>Amount</th>
          <th>Reason</th>
          <th>Status</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="refund in refunds"
          :key="refund.refund_id"
        >
          <td>{{ refund.refund_id }}</td>
          <td>{{ refund.charge_id }}</td>
          <td>{{ refund.amount }}</td>
          <td>{{ refund.reason || "-" }}</td>
          <td>{{ refund.status }}</td>
          <td>{{ refund.created_at }}</td>
        </tr>
      </tbody>
    </table>

    <br>
    <NuxtLink to="/refund">Back</NuxtLink>
  </div>
</template>

<style scoped>
.container {
  width: 1000px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}
h1 {
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
.error {
  color: red;
  margin-bottom: 15px;
}
</style>
