// Define a chave da API para acessar o OpenWeatherMap
const apiKey = "1c319db69c5dd82e48152638f9326bb9";

// Função que atualiza os elementos da página com os dados da previsão do tempo
function atualizarElementos(data) {
  // Define o texto do elemento com id "descricao" como a descrição do clima
  document.getElementById("descricao").textContent = data.weather[0].description;
  // Define o texto do elemento com id "temperatura" como a temperatura atual
  document.getElementById("temperatura").textContent = `${data.main.temp}°C`;
  // Define o conteúdo do elemento com id "icone" como a imagem correspondente ao clima
  document.getElementById("icone").innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">`;
  // Define o texto do elemento com id "sensacao" como a sensação térmica atual
  document.getElementById("sensacao").textContent = `: ${data.main.feels_like}°C`;
  // Define o texto do elemento com id "minima" como a temperatura mínima do dia
  document.getElementById("minima").textContent = `Mínima: ${data.main.temp_min}°C`;
  // Define o texto do elemento com id "maxima" como a temperatura máxima do dia
  document.getElementById("maxima").textContent = `Máxima: ${data.main.temp_max}°C`;
  // Define o texto do elemento com id "umidade" como a umidade relativa do ar
  document.getElementById("umidade").textContent = `Umidade: ${data.main.humidity}%`;
}

// Função que consulta a previsão do tempo para uma determinada cidade
async function consultarPrevisao(cidade) {
  // Define a URL da API para a consulta da previsão do tempo com base na cidade informada
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;

  try {
    // Faz uma requisição HTTP assíncrona para a API do OpenWeatherMap
    const response = await fetch(url);
    // Extrai os dados da resposta HTTP como objeto JSON
    const data = await response.json();
    // Atualiza os elementos da página com os dados da previsão do tempo
    atualizarElementos(data);
  } catch (error) {
    // Exibe o erro no console do navegador
    console.log(error);
  }
}

// Função que consulta a previsão do tempo com base na localização atual do usuário
async function consultarPrevisaoPorLocalizacao() {
  try {
    // Obtém a posição atual do usuário por meio do navegador
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    // Obtém as coordenadas de latitude e longitude da posição atual do usuário
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    // Define a URL da API para a consulta da previsão do tempo com base nas coordenadas
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt_br&units=metric`;
    // Faz uma requisição HTTP assíncrona à API do OpenWeatherMap com base na URL definida
const response = await fetch(url);
// Converte a resposta da API em um objeto JavaScript
const data = await response.json();
// Chama a função atualizarElementos, passando o objeto de dados como argumento, para atualizar a exibição na página
atualizarElementos(data);
} catch (error) {
// Em caso de erro, exibe uma mensagem de erro no console do navegador
console.log(error);
}
}

// Adiciona um ouvinte de evento para o botão de buscar previsão do tempo por cidade
document.getElementById("btn-buscar").addEventListener("click", function(event) {
// Impede o comportamento padrão do formulário de ser submetido quando o botão é clicado
event.preventDefault();
// Obtém o valor digitado no campo de cidade
const cidade = document.getElementById("cidade").value;
// Chama a função consultarPrevisao, passando a cidade como argumento, para buscar a previsão do tempo
consultarPrevisao(cidade);
});

// Adiciona um ouvinte de evento para o botão de buscar previsão do tempo com base na localização atual do usuário
document.getElementById("btn-localizacao").addEventListener("click", function(event) {
// Impede o comportamento padrão do formulário de ser submetido quando o botão é clicado
event.preventDefault();
// Chama a função consultarPrevisaoPorLocalizacao para buscar a previsão do tempo com base na localização atual do usuário
consultarPrevisaoPorLocalizacao();
});
