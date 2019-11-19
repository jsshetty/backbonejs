var ToDoItemView = Backbone.View.extend({
    tagName: "tr",
    className: "todo",
    css: 'text-decoration:line-through;',
    events: {
        "click #deleteButton": "removeTodo",
        "click #statusCheckbox": "updateStatus"
    },

    initialize: function(option){
        if(!option || !option.model) {
            throw new Error("Model is not there")
        }
        this.bus = option.bus;
    },
    render: function() {
        if(this.model.isValid()){
            var checked = this.model.get("completed") ? "checked" : "";
        this.$el.attr('id', this.model.get("id")).html("<input id='statusCheckbox' type='checkbox'"+checked+">"+this.model.get("title")+"  <button id='deleteButton' style='font-size: 50%'>delete</button>")
          // To escape executing JS --> escape
          //this.$el.html(this.model.escape("description"))
           if(this.model.get("completed") === true) {
            this.$el.css({
                'text-decoration': "line-through"
               });
        }
        } else {
            console.log(this.model.validError);
        }
        return this
    },
    removeTodo: function() {
        console.log(this.model);
        this.model.destroy();
        this.bus.trigger("deleteTodo", this.model, this)
    },
    updateStatus: function(e) {
        var element = $("#"+this.model.get("id"));
        if(e.currentTarget.checked) {
            console.log(e.currentTarget.checked);
            $("#"+this.model.get("id")).css("text-decoration", "line-through");
            this.model.set("completed", true)
            this.model.save();
            this.bus.trigger("updateStatus", this.model)
        } else {
            $("#"+this.model.get("id")).css("text-decoration", "none");
            this.model.set("completed", false)
            this.model.save();
            this.bus.trigger("updateStatus", this.model)
        }
    } 
})