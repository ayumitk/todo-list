import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyC_kqJCdQAkPFvA0mPjNKrsYxjSGMLzH-o',
  authDomain: 'todo-list-b0c9c.firebaseapp.com',
  databaseURL: 'https://todo-list-b0c9c.firebaseio.com/',
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
