var Sqlite = require("nativescript-sqlite");
var FrameModule = require("ui/frame");
var createViewModel = require("./lists-view-model").createViewModel;

function onNavigatingTo(args) {
    var page = args.object;
    (new Sqlite("my.db")).then(db => {
        db.execSQL("CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY AUTOINCREMENT, list_name TEXT)").then(id => {
            page.bindingContext = createViewModel(db);
        }, error => {
            console.log("CREATE TABLE ERROR", error);
        });
    }, error => {
        console.log("OPEN DB ERROR", error);
    });
}

function navigateToTasks(args) {
    FrameModule.topmost().navigate({moduleName: "tasks/tasks", context: {listId: args.object.bindingContext.lists.getItem(args.index).id}});
}

exports.onNavigatingTo = onNavigatingTo;
exports.navigateToTasks = navigateToTasks;