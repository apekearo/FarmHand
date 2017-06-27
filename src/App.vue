<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1></h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
  <div id="chat">
        <input type="text" v-model.trim="messageInput" @keyup.enter="send(messageInput)">
    </div>
</template>

<script>
import * as Firebase from 'firebase'
import Geohash from 'latlon-geohash'

export default {
  name: 'chat',
  data () {
    return {
      room: null,
      precision: 6,
      db: null,
      messageInput:'##'
    }
  },
  mounted(){
this.db = Firebase.initializeApp({
    apiKey: "AIzaSyCbY-BQ0s-i-9iZKcfJHjnPXCRsDooHzcE",
    authDomain: "kopperlfarmhand-1492557353717.firebaseapp.com",
    databaseURL: "https://kopperlfarmhand-1492557353717.firebaseio.com",
    projectId: "kopperlfarmhand-1492557353717",
    storageBucket: "kopperlfarmhand-1492557353717.appspot.com",
    messagingSenderId: "954578208640"
  })
  this.init()
  },
  methods: {
  init() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          var geohash = Geohash.encode(position.coords.latitude, position.coords.longitude, this.precision);

          // initilize the room based on geohash
          this.room = this.db.database().ref().child('rooms/' + geohash)
        }, (err) => {
          // error handling here
        })
      } else {
        console.error('Cannot access geolocation')
      }
    },
     send(messageInput) {
      // A data entry.
      let data = {
        message: messageInput
      };

      // Get a key for a new message.
      let key = this.room.push().key;
      this.room.child('messages/' + key).set(data)
      
      // clean the message
      this.messageInput = ''
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
