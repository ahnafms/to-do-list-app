<script>
import '../src/assets/index.css'
import {initializeApp} from "firebase/app"
import {getFirestore, collection, doc, getDocs, addDoc, deleteDoc, updateDoc} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDiNL0Ajsr3og2KB5iT5dfWlPEMZZBmX6I",
  authDomain: "vuejs-9f2fe.firebaseapp.com",
  projectId: "vuejs-9f2fe",
  storageBucket: "vuejs-9f2fe.appspot.com",
  messagingSenderId: "239658559478",
  appId: "1:239658559478:web:b0ef0a169f6472e7f8c9d7"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default{  
    data(){
        return{
            lists:[]
        }
    },
    mounted(){
        this.load();
    },
    methods: {
        async addData(title, desc, status){
            try{
                await addDoc(collection(db, "task"), {
                    title : title,
                    desc : desc,
                    status : status
                })
                this.load()
            }
            catch(err){
                console.log("Error : ", err);
            }
        },
        async deleteData(id){
            try{
                await deleteDoc(doc(db, "task", id)) 
                this.load()
            }
            catch(err){
                console.log(err)   
            }
        },
        async updateData(id, stats){
            try{
                const docRef = doc(db, "task", id)
                await updateDoc(docRef, {status:stats})
                this.load()
            }
            catch(err){
                console.log(err)
            }
        },
        async load(){
            try{
                const querySnapshot = await getDocs(collection(db, "task"))
                this.lists = []
                querySnapshot.forEach((doc) => {
                    let id = {id : doc.id}
                    this.lists.push({...doc.data(), ...id})
                })
            }
            catch(err){
                console.log(err)
            }
        }
    },
}
</script>

<template>
    <div class="flex w-full justify-around fixed p-4 bg-slate-700">
        <router-link to="/todo">To Do</router-link>
        <router-link to="/progress">Progress</router-link>
        <router-link to="/completed">Completed</router-link>
        <router-link to="/all">Home</router-link>
    </div>
    <router-view>
    
  </router-view>
</template>
