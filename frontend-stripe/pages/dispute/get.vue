<script setup lang="ts">
const API_BASE = "http://localhost:8083"
const disputeId = ref("")
const dispute = ref<any>(null)
const error = ref("")
const loading = ref(false)

const getDispute = async () => {
  dispute.value = null
  error.value = ""

  if (!disputeId.value.trim()) {
    error.value = "Dispute ID is required"
    return
  }

  loading.value = true

  try {
    const data = await $fetch<any>(`${API_BASE}/create/dispute/${disputeId.value.trim()}`)
    dispute.value = data
    if (!data) {
      error.value = "Dispute not found"
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
    <h1>Get Dispute</h1>

    <div class="card">
      <label>Dispute ID</label>
      <input
        v-model="disputeId"
        type="text"
        placeholder="dp_..."
      >
      <button
        :disabled="loading"
        @click="getDispute"
      >
        {{ loading ? "Loading..." : "Get Dispute" }}
      </button>
    </div>

    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>

    <table v-if="dispute">
      <tbody>
        <tr>
          <th>Dispute ID</th>
          <td>{{ dispute.dispute_id }}</td>
        </tr>
        <tr>
          <th>Charge ID</th>
          <td>{{ dispute.charge_id }}</td>
        </tr>
        <tr>
          <th>Amount</th>
          <td>{{ dispute.amount }}</td>
        </tr>
        <tr>
          <th>Reason</th>
          <td>{{ dispute.reason || "-" }}</td>
        </tr>
        <tr>
          <th>Evidence</th>
          <td>{{ dispute.evidence || "-" }}</td>
        </tr>
        <tr>
          <th>Status</th>
          <td>{{ dispute.status }}</td>
        </tr>
        <tr>
          <th>Created At</th>
          <td>{{ dispute.created_at }}</td>
        </tr>
      </tbody>
    </table>

    <br>
    <NuxtLink to="/dispute">Back</NuxtLink>
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
