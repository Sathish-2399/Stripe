<script setup lang="ts">
const API_BASE = "http://localhost:8083"
const refundId = ref("")
const refund = ref<any>(null)
const error = ref("")
const loading = ref(false)

const getRefund = async () => {
  refund.value = null
  error.value = ""

  if (!refundId.value.trim()) {
    error.value = "Refund ID is required"
    return
  }

  loading.value = true

  try {
    const data = await $fetch<any>(`${API_BASE}/create/refund/${refundId.value.trim()}`)
    refund.value = data
    if (!data) {
      error.value = "Refund not found"
    }
  } catch (err: any) {
    error.value = err.data?.message || err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container">
    <h1>Get Refund</h1>

    <div class="card">
      <label>Refund ID</label>
      <input
        v-model="refundId"
        type="text"
        placeholder="re_..."
      >
      <button
        :disabled="loading"
        @click="getRefund"
      >
        {{ loading ? "Loading..." : "Get Refund" }}
      </button>
    </div>

    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>

    <table v-if="refund">
      <tbody>
        <tr>
          <th>Refund ID</th>
          <td>{{ refund.refund_id }}</td>
        </tr>
        <tr>
          <th>Charge ID</th>
          <td>{{ refund.charge_id }}</td>
        </tr>
        <tr>
          <th>Amount</th>
          <td>{{ refund.amount }}</td>
        </tr>
        <tr>
          <th>Reason</th>
          <td>{{ refund.reason || "-" }}</td>
        </tr>
        <tr>
          <th>Status</th>
          <td>{{ refund.status }}</td>
        </tr>
        <tr>
          <th>Created At</th>
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
  width: 700px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 8px;
}
input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
}
button {
  padding: 10px 20px;
  cursor: pointer;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
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
  width: 180px;
}
.error {
  color: red;
  margin-bottom: 15px;
}
</style>
