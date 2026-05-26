// Import db.js
const { readTasks, saveTasks } = require('./db');

// Add a new task
function addTask(description){
    // Check if description exists
    if (!description){
        console.log("Erro: não existe uma descrição para essa tarefa.");
        console.log('Você precisa inserir uma, exemplo: node tasks_cli.js add "Tarefa 1"');
        return;
    }

    // Read existing tasks
    const tasks = readTasks();

    // Create a new task
    const newTask = {
        id: tasks.length + 1, // ID using lenght array
        description: description,
        finish: false,
        createAt: new Date().toISOString() // capture actually date
    };

    // Add tasks to the array
    tasks.push(newTask);

    // Save new file
    saveTasks(tasks);

    console.log(`Tarefa adicionada com sucesso! (ID: ${newTask.id})`);
    console.log(`Descrição: ${description}`)
}

// Listen all tasks
function listenTask(){
    const tasks = readTasks();

    // Verify not tasks exists
    if (tasks.length === 0){
        console.log("Nenhuma tarefa encontrada. Adicione com: node tasks_cli.js add 'Sua tarefa'");
        return;
    }

    // Shows the header
    console.log('\n SUAS TAREFAS:');
    console.log('-'.repeat(40));

    // For each task, shows a formatted line
    tasks.forEach(task => {
        const status = task.finish ? '✓' : ' ';
        console.log(`${task.id}. [${status}] ${task.description}`);
    });

    console.log('-'.repeat(40));
    console.log(`Total: ${tasks.length} tarefa(s)\n`)
}

// Selection task as finish
function finishTask(id){
    // Check if exists ID
    if (!id) {
        console.log('Erro: Você precisa fornecer o ID da tarefa');
        console.log('Exemplo: node tasks_cli.js done 1')
        return;
    }

    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === parseInt(id));

    // Check if exists task
    if (index === -1) {
        console.log(`Erro: Tarefa com ID ${id} não encontrada`);
        console.log(`Use "node tasks_cli.js list, para ver os IDs disponíveis`);
        return;
    }
    
    // Check if it's already done
    if (tasks[index].finish){
        console.log(`A tarefa "${tasks[index].description}" já estava concluida`);
        return;
    }

    // To mark to finish
    tasks[index].finish = true;
    saveTasks(tasks);
    
    console.log(`Tarefa "${tasks[index].description}" concluída!"`);
}

// Delete task
function deleteTask(id){
    // Check exists id
    if (!id){
        console.log(`Você precisa fornecer o id da tarefa.`)
        console.log('Exemplo: node tasks_cli.js delete 1')
        return;
    }

    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === parseInt(id));

    // Check if exists task
    if (index === -1) {
        console.log(`Erro: Tarefa com ID ${id} não encontrada`);
        console.log(`Use "node tasks_cli.js list, para ver os IDs disponíveis`);
        return;
    }

    const removeTask = tasks[index];
    tasks.splice(index, 1); // Remove as array

    // Adjusting the IDs sequentially
    tasks.forEach((task, idx) => {
        task.id = idx + 1;
    });

    saveTasks(tasks);
    console.log(`Tarefa "${removeTask.description}" foi removida!`);
}

// Export commands to defult file
module.exports = {
    addTask,
    listenTask,
    finishTask,
    deleteTask
};

