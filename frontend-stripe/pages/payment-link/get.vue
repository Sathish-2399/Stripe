<script setup lang="ts">
const API_BASE = "http://localhost:8083"
const paymentLinkId = ref("")
const paymentLink = ref<any>(null)
const error = ref("")
const loading = ref(false)

const getPaymentLink = async () => {
  paymentLink.value = null
  error.value = ""

  if (!paymentLinkId.value.trim()) {
    error.value = "Payment Link ID is required"
    return
  }

  loading.value = true

  try {
    const data = await $fetch<any>(`${API_BASE}/create/payment-link/${paymentLinkId.value.trim()}`)
    paymentLink.value = data
    if (!data) {
      error.value = "Payment link not found"
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
    <h1>Get Payment Link</h1>

    <div class="card">
      <label>Payment Link ID</label>
      <input
        v-model="paymentLinkId"
        type="text"
        placeholder="plink_..."
      >
      <button
        :disabled="loading"
        @click="getPaymentLink"
      >
        {{ loading ? "Loading..." : "Get Payment Link" }}
      </button>
    </div>

    <p
      v-if="error"
      class="error"
    >
      {{ error }}
    </p>

    <table v-if="paymentLink">
      <tbody>
        <tr>
          <th>Payment Link ID</th>
          <td>{{ paymentLink.payment_link_id }}</td>
        </tr>
        <tr>
          <th>Product</th>
          <td>{{ paymentLink.product }}</td>
        </tr>
        <tr>
          <th>Amount</th>
          <td>{{ paymentLink.amount }} {{ paymentLink.currency }}</td>
        </tr>
        <tr>
          <th>Status</th>
          <td>{{ paymentLink.status }}</td>
        </tr>
        <tr>
          <th>URL</th>
          <td>{{ paymentLink.url }}</td>
        </tr>
      </tbody>
    </table>

    <br>
    <NuxtLink to="/payment-link">Back</NuxtLink>
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
