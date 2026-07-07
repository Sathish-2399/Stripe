<script setup lang="ts">
const API_BASE = "http://localhost:8083"
const disputes = ref<any[]>([])
const loading = ref(false)
const error = ref("")

const loadDisputes = async () => {
  loading.value = true
  error.value = ""

  try {
    disputes.value = await $fetch<any[]>(`${API_BASE}/create/dispute/all`)
  } catch (err: any) {
    error.value = err.data?.message || err.message
  } finally {
    loading.value = false
  }
}

onMounted(loadDisputes)
</script>

<template>
  <div class="container">
    <h1>All Disputes</h1>

    <p v-if="loading">Loading disputes...</p>
    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>
    <p v-if="!loading && disputes.length === 0">No disputes found.</p>

    <table v-if="disputes.length">
      <thead>
        <tr>
          <th>Dispute ID</th>
          <th>Charge ID</th>
          <th>Amount</th>
          <th>Reason</th>
          <th>Evidence</th>
          <th>Status</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="dispute in disputes"
          :key="dispute.dispute_id"
        >
          <td>{{ dispute.dispute_id }}</td>
          <td>{{ dispute.charge_id }}</td>
          <td>{{ dispute.amount }}</td>
          <td>{{ dispute.reason || "-" }}</td>
          <td>{{ dispute.evidence || "-" }}</td>
          <td>{{ dispute.status }}</td>
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
