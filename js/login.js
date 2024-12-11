import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBMp9dEr6Wac61cDbBnHBZZOIL9eJmDgJM",
    authDomain: "detecter-risk.firebaseapp.com",
    projectId: "detecter-risk",
    storageBucket: "detecter-risk.appspot.com",
    messagingSenderId: "738197659310",
    appId: "1:738197659310:web:a397e339ecded3b42ed73f",
    measurementId: "G-VLTZ9RBQRM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.querySelector('.box-content');
const emailInput = loginForm.querySelector('input[type="text"]');
const passwordInput = loginForm.querySelector('input[type="password"]');
const loginButton = loginForm.querySelector('.login-button');
const googleLoginButton = document.querySelector('.google');

loginButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Login successful:', user);
    alert('Login bem-sucedido!');
    window.location.href = '/html/sidebar.html';
  } catch (error) {
    console.error('Login error:', error.message);
    alert('Erro no login: ' + error.message);
  }
});

googleLoginButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log('Google login successful:', user);
    alert('Login com Google bem-sucedido!');
    window.location.href = 'sidebar.html'; // Redireciona para a tela sidebar
  } catch (error) {
    console.error('Google login error:', error.message);
    alert('Erro no login com Google: ' + error.message);
  }
});

async function createAccount(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Account created:', user);
    alert('Conta criada com sucesso!');
  } catch (error) {
    console.error('Error creating account:', error.message);
    alert('Erro ao criar conta: ' + error.message);
  }
}
