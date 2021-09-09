<template>
  <p> Signup Form </p>
  <form @submit.prevent="handleSubmit">
      <input type="text" required placeholder="Display name" v-model="displayName">
      <input type="email" required placeholder="Email" v-model="email">
      <input type="password" required placeholder="Password" v-model="password">
      <div class="error">{{ error }}</div>
      <button>Sign up</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../composables/useSignup'

export default {
    setup() {
        // refs
        const displayName = ref('')
        const email = ref('')
        const password = ref('')

        const {error, signup} = useSignup()

        const handleSubmit = async () => {
            await signup(email.value, password.value, displayName.value)
            if (!error.value) {
                console.log('user signed up') //after user signed up this will work
            }
        }
        return {displayName, email, password, handleSubmit, error}
    }
}
</script>

<style>

</style>