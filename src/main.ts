import './style.css';

// URL do backend local. Certifique-se de que o servidor Python está rodando.
const BACKEND_URL = 'http://210.173.152.148:8000/ocr'; // <-- SUBSTITUA PELO SEU IP!

// Seleciona os elementos do DOM
const dropZone = document.getElementById('drop-zone')!;
const outputTextArea = document.getElementById('transcription-output') as HTMLTextAreaElement;
const statusDiv = document.getElementById('status')!;

// Adiciona a classe 'dragover' quando um arquivo é arrastado sobre a zona
dropZone.addEventListener('dragover', (event) => {
  event.preventDefault(); // Previne o comportamento padrão do navegador
  dropZone.classList.add('dragover');
});

// Remove a classe 'dragover' quando o arquivo sai da zona
dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

// Processa os arquivos quando eles são soltos na zona
dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.classList.remove('dragover');

  const files = event.dataTransfer?.files;

  if (files && files.length > 0) {
    handleFileUpload(files);
  }
});

async function handleFileUpload(files: FileList) {
  // Cria um objeto FormData para enviar os arquivos
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  // Atualiza o status para o usuário
  statusDiv.textContent = `Enviando ${files.length} arquivo(s)... Aguarde o processamento.`;
  outputTextArea.value = ''; // Limpa a área de texto anterior

  try {
    // Envia a requisição para o backend
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      body: formData,
    });

    // Verifica se a requisição foi bem-sucedida
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Erro no servidor: ${response.statusText}`);
    }

    // Extrai o JSON da resposta
    const data = await response.json();

    // Atualiza a área de texto com a transcrição
    outputTextArea.value = data.transcription;
    statusDiv.textContent = 'Transcrição concluída!';

  } catch (error) {
    console.error('Erro ao fazer upload:', error);
    statusDiv.textContent = `Erro: ${error instanceof Error ? error.message : String(error)}. Verifique se o servidor backend está rodando.`;
  }
}