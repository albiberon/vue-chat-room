<template>
  <p> Signup Form </p>
  <form @submit.prevent="handleSubmit">
      <input type="email" required placeholder="Email" v-model="email">
      <input type="password" required placeholder="Password" v-model="password">
      <div class="error">{{ error }}</div>
      <button>Log in</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from '../composables/useLogin'
import { useRouter } from 'vue-router'

export default {
    setup(props, context) {
        const email = ref('')
        const password = ref('')
        const {error, login} = useLogin()


        const handleSubmit = async () => {
            // console.log( email.value, password.value)
            await login(email.value, password.value)
                if (!error.value) {
                    // console.log('User logged in')
                    context.emit('login')
                    router.push({name: 'Chatroom'})
                } 
        }
        
        return {email, password, handleSubmit, error}
    }

}
</script>

<style>

</style>