const { addTask, listenTask, finishTask, deleteTask } = require('./commands');

// Process CLI arguments
const command = process.argv[2];
const argument = process.argv[3];

switch (command) {
    case 'add':
        addTask(argument);
        break;

    case 'list':
        listenTask();
        break;
    case 'done':
        finishTask(argument);
        break;
    case 'delete':
        deleteTask(argument);
        break;
    case 'help':
        help();
        break;
    default:
        console.log(`Comando desconhecido: "${command}"`);
        help();
}

// Function to help
function help(){
    console.log(`
╔══════════════════════════════════════════════╗
║        📋 CLI TASK TRACKER - AJUDA           ║
╚══════════════════════════════════════════════╝

COMANDOS DISPONÍVEIS:

  add "descrição"     Adiciona uma nova tarefa
  list                Lista todas as tarefas
  done <id>           Marca a tarefa como concluída
  delete <id>         Remove a tarefa

EXEMPLOS:

  node task.js add "Estudar JavaScript"
  node task.js add "Fazer exercícios"
  node task.js list
  node task.js done 1
  node task.js delete 2

DICA: Use aspas duplas para descrições com espaços.
`);
}