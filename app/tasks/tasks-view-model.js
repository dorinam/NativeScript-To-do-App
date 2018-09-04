var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var Sqlite = require("nativescript-sqlite");
var Dialogs = require("ui/dialogs");

function createViewModel(database, listId) {
    var viewModel = new Observable();
    viewModel.tasks = new ObservableArray([]);
    viewModel.listId = listId;

    viewModel.insert = function() {
        Dialogs.prompt("Task Name", "").then(result => {
            database.execSQL("INSERT INTO tasks (list_id, task_name) VALUES (?, ?)", [this.listId, result.text]).then(id => {
                this.tasks.push(result.text);
            }, error => {
                console.log("INSERT ERROR", error);
            });
        });
    }

    viewModel.select = function() {
        this.tasks = new ObservableArray([]);
        database.all("SELECT task_name FROM tasks WHERE list_id = ?", [this.listId]).then(rows => {
            for(var row in rows) {
                this.tasks.push(rows[row]);
            }
        }, error => {
            console.log("SELECT ERROR", error);
        });
    }

    viewModel.select();

    return viewModel;
}

exports.createViewModel = createViewModel;