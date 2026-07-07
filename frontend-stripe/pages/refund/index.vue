<template>
  <div class="container">
    <h1>Refund</h1>

    <div class="card">
      <h3>Create Refund</h3>
      <p>Create a refund using Payment Intent ID or Charge ID.</p>
      <NuxtLink to="/refund/create">
        <button>Create Refund</button>
      </NuxtLink>
    </div>

    <div class="card">
      <h3>Get Refund</h3>
      <p>Retrieve refund details by Refund ID.</p>
      <NuxtLink to="/refund/get">
        <button>Get Refund</button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.container{
    width:700px;
    margin:40px auto;
}
.card{
    border:1px solid #ddd;
    border-radius:8px;
    padding:20px;
    margin-bottom:20px;
}
h1{
    margin-bottom:30px;
}
h3{
    margin-bottom:10px;
}
p{
    margin-bottom:15px;
}
button{
    padding:10px 20px;
    cursor:pointer;
}
</style>