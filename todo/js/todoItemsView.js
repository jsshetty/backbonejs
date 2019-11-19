var ToDoItemsView = Backbone.View.extend({
    tagName: "table",
    initialize: function(option){
        if(!option || !option.collection) {
            throw new Error("Model is not there")
        }
        this.collection = option.collection;
        this.bus = option.bus;
        this.collection.on("add", this.addToDoItem, this);
        this.bus.on("updateStatus", this.updateStatus, this);
        this.bus.on("deleteTodo", this.deleteTodo, this);
        this.bus.on("addToDoItem", this.addToDoItem, this);
    },

    events: {
    },

    keyAction:  function(e) {
        var code = e.keyCode || e.which;
        if(code === 13 && ($('#addButton').attr("disabled") !== 'disabled')) {
            this.addTodo();
        }
    },

    addTodo: function() {
        var input = this.$el.find("#addToDo");
        var todoValue = input.val();
        console.log("addTodo triggered");
        if(todoValue && !todoValue.includes("<")) {
            var model = new ToDoItem({title: todoValue, completed:false});
            input.val("")
            // option 1
            // this.$el.append(new ToDoItemView({model:model}).render().$el)
    
            // option 2
            //this.collection.add(model);

            // this.collection.add(toDoItem);
            // model.save();
            //model.addTodo(this);
        } else {
            // input.attr("placeholder","Please enter valid value")
            input.css("border-color", "red");
            $('#addButton').attr("disabled", 'disabled');
        }
    },

    addToDoItem: function(toDoItem) {
        console.log("addToDoItem triggered");
        this.$el.prepend(new ToDoItemView({model:toDoItem, bus:this.bus}).render().$el)
        this.updateOpenTodo();
    },

    updateStatus: function(toDoItem) {
        var tobeupdatemodel = this.collection.filter(function(mdl){return mdl.id === toDoItem.id});
        this.collection[tobeupdatemodel] = toDoItem;
        this.updateOpenTodo();
        this.updateLocalStorage(this.collection);
    },

    deleteTodo: function(todo, view) {
        this.collection.remove(todo);
        view.remove();
        this.updateOpenTodo();
        // this.updateLocalStorage(this.collection);
    },

    getOpenTodo: function() {
        return openItems = this.collection.filter(function(mdl) {
           return mdl.get('completed') === false}).length;
        },

    updateOpenTodo: function(model){
        $("#openTodo").text(""+this.getOpenTodo());
    },

    inputFocusOut: function() {
        $("#addButton").focus();
    },

    inputFocusIn: function() {
        $("#addToDo").val("")
        $("#addToDo").css("border-color", "black");
        $("#addButton").removeAttr("disabled");
    },

    updateLocalStorage: function() {
        window.localStorage.setItem(
            'toDo',
            JSON.stringify({
              conditions: {
                userId: "1234",
                buildNo: "1234"
              },
              collection: this.collection
            }))
    },

    render: function() {
        var _ctr = this
        _ctr.$el.append(new AddTodoView({bus:this.bus}).render().$el)
        _ctr.$el.append("Open Items: <span id='openTodo'>"+this.getOpenTodo()+"</span>")

        this.collection.each(function(model) {
            _ctr.$el.append(new ToDoItemView({model:model, bus:_ctr.bus}).render().$el)
        })
        return this
    },

    processUpdateAddressesAPIResponse: function(responseMap) {
        var responseArray = responseMap["SUCCESS"];
        console.log(responseArray);
        this.addToDoItem(responseArray);
        this.updateLocalStorage(this.collection);
        console.log("todo add::; success");
    },

    processErrorAddressesAPIResponse: function(responseMap){
        console.log("todo add::; failed");
    }
})