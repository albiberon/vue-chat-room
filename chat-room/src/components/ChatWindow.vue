<template>
  <div class="chat">
      <div v-if="error"> {{ error }} </div>
      <div v-if="documents" class="messages" ref="messages">
          <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
              <span class="created-at">{{ doc.createdAt }}</span>
              <span class="name">{{ doc.user }}</span>
              <span class="message">{{ doc.message }}</span>
          </div>
      </div>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import { formatDistanceToNow } from 'date-fns'
import { computed } from '@vue/reactivity'
import { onUpdated, ref } from '@vue/runtime-core'


export default {
    setup() {
        const { error, documents } = getCollection('messages')

        const formattedDocuments = computed (() => {
            if (documents.value) {
                // maps throught the document values
                // and returns a new doc array with createdAt info 
                // replaced by formatted time
                return documents.value.map((doc) => {
                    let time = formatDistanceToNow(doc.createdAt.toDate())
                    return { ...doc, createdAt: time }
                })
            }
        })

        // auto-scroll to bottom related script
        const messages = ref(null)

        onUpdated(()=> {
            messages.value.scrollTop = messages.value.scrollHeight
        })

        return { error, documents, formattedDocuments, messages }
    }
}
</script>

<style scoped>
  .chat-window {
    background: #fafafa;
    padding: 30px 20px;
  }
  .single {
    margin: 18px 0;
    text-align: left;
    padding-left: 20px
  }
  .created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .name {
    font-weight: bold;
    margin-right: 6px;
  }
  .messages {
    max-height: 400px;
    overflow: auto;
  }
</style>
