<script>
import '../assets/index.css'
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
    <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/5.0.0/mdb.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
    <div class="w-full min-h-screen flex font-poppins bg-white">
            <div class=" self-center px-96 w-full text-black rounded-md overflow-hidden ">
                <div class="text-2xl font-semibold pb-4">Daily Life Task</div>
                <div class=" text-slate-800">
    <div class="bg-slate-100 rounded-md">
        <div class="flex flex-row justify-between p-3">
            <div class=" text-lg font-semibold">Detail Task</div>
        </div>
        <div class="text-3xl text-center text-green-300 p-3  font-semibold">
            <div v-for="(list, index) in lists" :key="index">
                <div v-if="list.id == $route.params.id" class=" w-full rounded-md bg-white mb-3 p-2">
                    <div class="flex flex-row" >
                        <div :class="[ list.status == 1 ? 'animate-ping h-[6px] w-[6px] mx-3 mt-[3px] absolute self-center rounded-full bg-red-400 opacity-75' : list.status == 2 ? 'animate-ping h-[6px] w-[6px] mx-3 mt-[3px] absolute self-center rounded-full bg-yellow-400 opacity-75' : list.status == 3 ? 'animate-ping h-[6px] w-[6px] mx-3 mt-[3px] absolute self-center rounded-full bg-green-400 opacity-75' : '']"></div>
                        <div :class="[list.status == 1 ? 'animate-ping h-[10px] w-[10px] mx-[14px] mt-[5px] relative self-center rounded-full bg-red-300 opacity-75' : list.status == 2 ? 'animate-ping h-[10px] w-[10px] mx-[14px] mt-[5px] relative self-center rounded-full bg-yellow-300 opacity-75' : 'animate-ping h-[10px] w-[10px] mx-[14px] mt-[5px] relative self-center rounded-full bg-green-300 opacity-75'] "></div>
                        <div class="text-lg text-start pr-3 pt-3 pb-3 text-black">{{ list.title }}</div>
                    </div>
                    <div class="text-align w-full text-slate-400 font-[500] rounded-md text-sm text-start p-3 break-words">{{ list.desc }}</div>
                    <div v-if="list.status == 1" class="p-3 mt-3 text-xl flex justify-around">
                        <button  @click ="deleteData(list.id)" class="text-slate-300"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        <button v-if="list.status == 1" @click="updateData(list.id, 2)" class="text-slate-500"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
                        <button v-if="list.status== 1" @click="updateData(list.id, 2)" class="text-slate-500"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>
                        
                    </div>
                    <div v-if="list.status == 2" class="p-3 mt-3 text-xl flex justify-around">
                        <button  @click ="deleteData(list.id)" class="text-slate-300"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        <button v-if="list.status == 2" @click="updateData(list.id, 1)" class="text-slate-500"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
                        <button v-if="list.status == 2" @click="updateData(list.id, 3)" class="text-slate-500"><i class="fa fa-chevron-right" aria-hidden="true"></i></button></div>
                    <div v-if="list.status == 3" class="p-3 mt-3 text-xl flex justify-around">
                        <button  @click ="deleteData(list.id)" class="text-slate-300"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        <button @click="deleteData(list.id)"><i class="fa fa-check" aria-hidden="true"></i></button>
                        <button v-if="list.status == 3" @click="updateData(list.id, 2)" class="text-slate-500"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
                </div>
            </div>
    </div>
    </template>