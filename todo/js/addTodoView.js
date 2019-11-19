var AddTodoView = Backbone.View.extend({
    tagName: "table",
    initialize: function(option){
        this.model = new AddTodo()
        this.modelBinder = new Backbone.ModelBinder();
        this.bus = option.bus;
    },

    events: {
        "click #addButton": "addTodo",
        "focusout #addToDo": "inputFocusOut",
        'keypress': 'keyAction',
        "click #addToDo": "inputFocusIn"
    },

    keyAction:  function(e) {
        var code = e.keyCode || e.which;
        if(code === 13 && ($('#addButton').attr("disabled") !== 'disabled')) {
            this.addTodo();
        }
    },

    addTodo: function() {
        this.model.addTodo(this);
        var input = this.$el.find("#addToDo");
        input.val("")

        //var todoValue = input.val();

        //if(todoValue && !todoValue.includes("<")) {
            //var model = new ToDoItem({title: todoValue, completed:false});
            // option 1
            // this.$el.append(new ToDoItemView({model:model}).render().$el)
    
            // option 2
            //this.collection.add(model);

            // this.collection.add(toDoItem);
            // model.save();
        // } else {
        //     // input.attr("placeholder","Please enter valid value")
        //     input.css("border-color", "red");
        //     $('#addButton').attr("disabled", 'disabled');
        // }
    },

    inputFocusOut: function() {
        $("#addButton").focus();
    },

    inputFocusIn: function() {
        $("#addToDo").val("")
        $("#addToDo").css("border-color", "black");
        $("#addButton").removeAttr("disabled");
    },

    render: function() {
        var _ctr = this
        _ctr.$el.append("<input data-name='title' id='addToDo' type='text' autofocus placeholder='Add a Todo...' >")
        _ctr.$el.append("<button id='addButton' type='submit'>Add </button>")
        //this.modelBinder = Backbone.ModelBinder;
        this.modelBinder.bind(this.model, this.el, Backbone.ModelBinder.createDefaultBindings(this.el, 'data-name'));
        return this
    },

    processUpdateAddressesAPIResponse: function(responseMap) {
        var responseArray = responseMap["SUCCESS"];
        console.log(responseArray);
        var rmodel = new ToDoItem({title: responseArray.title, completed:false});
        this.bus.trigger("addToDoItem", rmodel);
        console.log("todo add::; success");
    },

    processErrorAddressesAPIResponse: function(responseMap){
        console.log("todo add::; failed");
    }
})