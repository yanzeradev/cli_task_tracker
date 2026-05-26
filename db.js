// Import the Node.js file system module to read and write files
const fs = require('fs');

// Set file name where the tasks is saved
const taskFile = 'tasks.json'

// ----UTILITY FUNCTIONS----

// Function to read tasks in json
function readTasks(){
    // Verify if the file exists
    if (!fs.existsSync(taskFile)){
        // if not exists, return empty array
        return [];
    }

    // Read the file as text
    const data = fs.readFileSync(taskFile, 'utf8');
    //convert the JSON text return to array
    return JSON.parse(data);
}

// Function to save tasks in JSON file
function saveTasks(tasks){
    // Convert array to JSON (with index two spaces)
    const data = JSON.stringify(tasks, null, 2);
    // write file
    fs.writeFileSync(taskFile, data);
}

// Export functions to use other files
module.exports = {
    readTasks,
    saveTasks
};