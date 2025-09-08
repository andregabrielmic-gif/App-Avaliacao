// Inicializa o EmailJS com sua Public Key logo no início
(function() {
    emailjs.init({
      publicKey: "IWjN3jAIUirfNYcQV", // Cole sua Public Key aqui
    });
})();

let selectedRating = 0;
const stars = document.querySelectorAll(".star");

// Seu código para selecionar as estrelas (continua o mesmo)
stars.forEach(star => {
  star.addEventListener("click", () => {
    selectedRating = star.getAttribute("data-value");
    stars.forEach(s => s.classList.remove("selected"));
    for (let i = 0; i < selectedRating; i++) {
      stars[i].classList.add("selected");
    }
  });
});

// Função de envio atualizada para usar o EmailJS
function enviar() {
  const feedback = document.getElementById("feedback").value;

  if (selectedRating === 0) {
    alert("Por favor, selecione uma nota!");
    return;
  }

  // Objeto com os parâmetros que serão enviados para o template do EmailJS
  const templateParams = {
    nota: selectedRating,
    feedback: feedback
  };
  
 console.log("Dados que serão enviados:", templateParams); 

  // Envia o e-mail usando o EmailJS
  emailjs.send('service_lw616h8', 'template_bd1ajml', templateParams)
    .then(function(response) {
       console.log('SUCESSO!', response.status, response.text);
       alert("Obrigado pela sua resposta!");
       
       // Limpa o formulário após o envio bem-sucedido
       document.getElementById("feedback").value = "";
       stars.forEach(s => s.classList.remove("selected"));
       selectedRating = 0;

    }, function(error) {
       console.log('FALHA...', error);
       alert("Ocorreu um erro ao enviar sua avaliação. Tente novamente.");
    });
}