import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

//composable with realtime listener
// error and documents inside the function
// because whenever we use this in a component 
// we will need to generate new values every time 
// this function is called
const getCollection = (collection) => {
    const error = ref(null)
    const documents = ref(null)

    let collectionRef = projectFirestore.collection(collection)
    .orderBy('createdAt')

    // onSnapshot is put inside unsub to trigger unsubscription from
    // the real time listener
    const unsub = collectionRef.onSnapshot( (snap) => {
        let results = []
        snap.docs.forEach(doc => {
            // doc.data().createdAt makes the second part waits for 
            //the data to be created at firebase
            doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
        })
        documents.value = results
        error.value = null
    }, (err) => {
        console.log(err.message)
        documents.value = null
        error.value = 'could not fetch data'
    })

    watchEffect((onInvalidate) => {
        onInvalidate(() => unsub())
    })

    return { documents, error }
}

export default getCollection