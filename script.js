
const minhaLista = new LinkedList();

// Função para adicionar um elemento no Inicio// Função para adicionar um elemento na lista com base na prioridade
function adicionarElemento() {
  const descricao = document.getElementById("txtnovaTarefa").value.trim(); // Remove espaços vazios
  const prioridade = parseInt(document.getElementById("txtnovaPrioridade").value.trim(), 10); // Converte para número

  if (descricao !== "" && !isNaN(prioridade) && prioridade > 0) {
    const novaTarefa = new Tarefa(descricao, prioridade, obterDataAtual(), obterHoraAtual());

    let inserido = false;
    let indexTarefaASerAdicionada = 0;

    for (const tarefa of minhaLista) {
      if (tarefa.prioridade > prioridade) {
        minhaLista.addAtIndex(indexTarefaASerAdicionada, novaTarefa);
        inserido = true;
        break;
      }
      indexTarefaASerAdicionada++;
    }

    if (!inserido) {
      minhaLista.addLast(novaTarefa);
    }

    console.log(minhaLista.toString());

    // Limpar input
    document.getElementById("txtnovaTarefa").value = "";
    document.getElementById("txtnovaPrioridade").value = "";
    document.getElementById("txtnovaTarefa").focus();

    atualizarLista();
    return;
  } 
  alert("Por favor, insira uma descrição válida e uma prioridade maior que 0.");
}


function tarefaMaisAntiga() {

  if (!minhaLista.isEmpty()) {
    const mensagem = document.getElementById("mensagem-remocao");
    let tarefaMaisAntiga = minhaLista.getFirst();
    if (tarefaMaisAntiga) {
      mensagem.innerHTML = "Tarefa maisa antiga: " + tarefaMaisAntiga;
      mensagem.style.display = "block";
    }
    return;
  }
  alert("Lista de Tarefas Vazia!");
}

function resolverTarefa() {
  if (!minhaLista.isEmpty()) {
    const tarefaRealizada = minhaLista.removeFirst();
    mostrarMensagemRemocao(tarefaRealizada);
    atualizarLista();
  } else {
    alert("Lista de Tarefas Vazia!");
  }

}


//--------------------------------------------------------------------------------------------
function mostrarMensagemRemocao(tarefaRealizada) {
  const mensagem = document.getElementById("mensagem-remocao");
  mensagem.innerHTML = "Tarefa realizada: " + tarefaRealizada.descricao;
  mensagem.style.display = "block";
}
//-------------------------------------------------------------------------------------------- 
// Função para atualizar a exibição da fila
function atualizarLista() {
  const listaTarefas =
    document.getElementById("list_listadeTarefas");
  const lblTarefas =
    document.getElementById("lblmostraTarefas");
  listaTarefas.innerHTML = "";    // limpar antes de mostrar
  if (!minhaLista.isEmpty()) {
    lblTarefas.innerHTML = "Lista de Tarefas";
    // limpar antes de mostrar
    for (const tarefa of minhaLista) {
      const novaLinha = document.createElement("li");
      novaLinha.innerHTML = tarefa.toString();
      listaTarefas.appendChild(novaLinha);
    }
  }
  else {
    lblTarefas.innerHTML = "Lista de Tarefas Vazia";
  }

}
//--------------------------------------------------------------------------------------------
//FUNÇÕES COMPLEMENTARES PARA A APLICAÇÃO
//-----------------------------------------

// funcao data
function obterDataAtual() {
  let dataAtual = new Date();
  let dia = dataAtual.getDate();
  let mes = dataAtual.getMonth() + 1; // Adiciona 1 porque o mês inicia do zero
  let ano = dataAtual.getFullYear();
  // Formata a data como "dd/mm/aaaa"
  let dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
  return dataFormatada;
}
//--------------------------------------------------------------------------------------------
function obterHoraAtual() {
  const data = new Date();
  const hora = data.getHours().toString().padStart(2, '0');
  const minuto = data.getMinutes().toString().padStart(2, '0');
  const segundo = data.getSeconds().toString().padStart(2, '0');
  return `${hora}:${minuto}:${segundo}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
  const [h1, m1, s1] = hora1.split(':').map(Number);
  const [h2, m2, s2] = hora2.split(':').map(Number);

  const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);

  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;

  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}
//--------------------------------------------------------------------------------------------
function calcularDiferencaDias(dataInicial, dataFinal) {
  // Converte as datas em milissegundos
  const msPorDia = 24 * 60 * 60 * 1000; // Quantidade de milissegundos em um dia
  const [diaIni, mesIni, anoIni] = dataInicial.split('/').map(Number);
  const [diaFim, mesFim, anoFim] = dataFinal.split('/').map(Number);
  // Cria objetos Date com as datas fornecidas
  const dataIni = new Date(anoIni, mesIni - 1, diaIni); // Subtrai 1 do mês porque o mês inicia do zero
  const dataFim = new Date(anoFim, mesFim - 1, diaFim);
  // Calcula a diferença em milissegundos entre as duas datas
  const diferencaMs = dataFim - dataIni;
  // Converte a diferença de milissegundos para dias e arredonda para baixo
  const diferencaDias = Math.floor(diferencaMs / msPorDia);
  return diferencaDias;
}
//--------------------------------------------------------------------------------------------
function converterDataFormatoISO8601(data) {
  const partes = data.split('/');
  const dia = partes[0].padStart(2, '0');
  const mes = partes[1].padStart(2, '0');
  const ano = partes[2];
  return `${ano}-${mes}-${dia}`;
}
//--------------------------------------------------------------------------------------------
function comparaTarefasDataHora(tarefa1, tarefa2) {
  const dataHoraTarefa1 = new Date(`${converterDataFormatoISO8601(tarefa1.data)}T${tarefa1.hora}`);
  const dataHoraTarefa2 = new Date(`${converterDataFormatoISO8601(tarefa2.data)}T${tarefa2.hora}`);
  if (dataHoraTarefa1.getTime() < dataHoraTarefa2.getTime()) {
    return tarefa1;
  } else {
    return tarefa2;
  }
}
//--------------------------------------------------------------------------------------------
function saveLinkedListToLocalStorage() {
  console.log("saveLinkedListToLocalStorage");
  let listaParaSalvar = [];
  for (const item of minhaLista) {
    listaParaSalvar.push({
      _descricao: item.descricao,
      _prioridade: item.prioridade,
      _data: item.data,
      _hora: item.hora
    });
    console.log(item.toString());
  };
  let jsonStr = JSON.stringify(listaParaSalvar);
  console.log(jsonStr);
  localStorage.setItem('myLinkedList', jsonStr);
  alert("Lista salva com sucesso!");
}
//-----------------------------
function loadLinkedListFromLocalStorage() {
  console.log("loadLinkedListFromLocalStorage");
  let jsonStr = localStorage.getItem('myLinkedList');
  if (jsonStr) {
    let listaCarregada = JSON.parse(jsonStr);
    for (let i = 0; i < listaCarregada.length; i++) {
      let obj = listaCarregada[i];
      let novaTarefa = new Tarefa(obj._descricao, obj._prioridade, obj._data, obj._hora);
      console.log(novaTarefa.toString());
      minhaLista.addLast(novaTarefa);
    }
    atualizarLista();
    alert("Lista carregada com sucesso!");
  }
}
//----------  ----------------------------------------------------------------------------------