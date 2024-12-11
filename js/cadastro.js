import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

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

const form = document.querySelector('#register-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nomeCompleto = form.querySelector('input[placeholder="Nome Completo"]').value.trim();
    const email = form.querySelector('input[placeholder="E-mail"]').value.trim();
    const usuario = form.querySelector('input[placeholder="Usuário"]').value.trim();
    const senha = form.querySelector('input[placeholder="Senha"]').value;
    const confirmarSenha = form.querySelector('input[placeholder="Confirme a Senha"]').value;

    if (!nomeCompleto || !email || !usuario || !senha || !confirmarSenha) {
        alert('Todos os campos são obrigatórios.');
        return;
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem. Tente novamente.');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        await updateProfile(user, {
            displayName: nomeCompleto,
        });

        alert('Usuário cadastrado com sucesso!');
        window.location.href = '/html/sidebar.html';
    } catch (error) {
        console.error(error);
        alert(`Erro ao cadastrar: ${error.message}`);
    }
});
