
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.
$(document).ready(function(){
    // var ToDoItem = new ToDoItem({description: "todo 1"})
   // var localStorage = new Backbone.LocalStorage("todo")

    var toDoItems = new ToDoItems();
    toDoItems.fetch();
    var bus = _.extend({}, Backbone.Events);
    var toDoItemView = new ToDoItemsView({collection:toDoItems,bus:bus})
    $("body").append(toDoItemView.render().$el)
})