<template>
<div class="container">
    <Navbar />
    <NewChatForm />    
</div>
</template>

<script>
import { watch } from 'vue'
import Navbar from "../components/Navbar.vue"
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'
import NewChatForm from '../components/NewChatForm.vue'

export default {
    components: { Navbar, NewChatForm },
    setup() {

        const router = useRouter()
        const { user } = getUser()

        // if user value is null redirects to the welcome screen
        watch(user, () => {
            if(!user.value) {
                router.push({name: 'Welcome'})
            }
        })
    }
}
</script>

<style>

</style>