<template>
  <nav v-if="user">
    <div>
      <p>Hey there {{user.displayName}}</p>
      <p class="email">Currently logged in as {{user.email}}</p>
    </div>
    <button @click="handleClick">Logout</button>
  </nav>
</template>

<script>
import useLogout from '../composables/useLogout'
// import { useRouter } from 'vue-router'
import getUser from '../composables/getUser'

export default {
setup(){
    const { logout, error } = useLogout()
    const { user } = getUser()

    //const router = useRouter()
    
    const handleClick =async () => {
        await logout()
        if(!error.value) {
            console.log('user logged out')
            // router.push({name: 'Welcome'}) better solution with watch method is on Chatroom view
        }
    }

    return { handleClick, user}
}


}
</script>

<style>
  nav {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav p {
    margin: 2px auto;
    font-size: 16px;
    color: #444;
  }
  nav p.email {
    font-size: 14px;
    color: #999;
  }
</style>