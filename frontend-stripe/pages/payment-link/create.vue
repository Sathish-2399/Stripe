<script setup lang="ts">
const API_BASE = "http://localhost:8083"
const form = ref({
  product: "",
  price: "",
  quantity: "1",
  currency: "usd",
  description: ""
})
const paymentLink = ref<any>(null)
const error = ref("")
const loading = ref(false)

const createPaymentLink = async () => {
  paymentLink.value = null
  error.value = ""

  const price = Number(form.value.price)
  const quantity = Number(form.value.quantity)

  if (!form.value.product.trim() || Number.isNaN(price) || price <= 0 || Number.isNaN(quantity) || quantity <= 0) {
    error.value = "Product, price, and quantity are required"
    return
  }

  loading.value = true

  try {
    paymentLink.value = await $fetch<any>(`${API_BASE}/create/payment-link`, {
      method: "POST",
      body: {
        product: form.value.product,
        price,
        quantity,
        currency: form.value.currency || "usd",
        description: form.value.description || undefined
      }
    })
  } catch (err: any) {
    error.value = err.data?.message || err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container">
    <h1>Create Payment Link</h1>

    <div class="card">
      <label>Product</label>
      <input
        v-model="form.product"
        type="text"
      >

      <label>Price</label>
      <input
        v-model="form.price"
        type="number"
        min="1"
      >

      <label>Quantity</label>
      <input
        v-model="form.quantity"
        type="number"
        min="1"
      >

      <label>Currency</label>
      <input
        v-model="form.currency"
        type="text"
      >

      <label>Description</label>
      <input
        v-model="form.description"
        type="text"
      >

      <button
        :disabled="loading"
        @click="createPaymentLink"
      >
        {{ loading ? "Creating..." : "Create Payment Link" }}
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
