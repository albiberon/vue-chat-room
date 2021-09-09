import { ref } from "vue"
import { projectAuth } from "../firebase/config"


const error = ref(null)

const signup = async (email, password, displayName) => {
    error.value = null

    try {
        const res = await projectAuth.createUserWithEmailAndPassword(email, password)
        // This long method given by firebase. Makes a request to firebase backend and 
        // signs the user up if everything is ok then sends us back a response. This is why
        // we are storing the resposne in res. 

        // If the response is null throw an error
        if(!res) {
            throw new Error('Could not complete the sign up')
        }
        // if successfull user property is attached to the response.

        // To be able to add display name we also have to use another method from firebase.
        await res.user.updateProfile({ displayName })
        error.value = null
        
        return res
        // console.log(res.user)
    } 
    catch(err) {
        console.log(err.message)
        error.value = err.message;
    }
}

const useSignup = () => {
    return { error, signup }
}


export default useSignup