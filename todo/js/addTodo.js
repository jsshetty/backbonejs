var AddTodo = Backbone.Model.extend({
    urlRoot: "https://jsonplaceholder.typicode.com/todos",
    validate: function(attr){
        if(!attr.title){
            return "description required!"
        }
    },

    addTodo: function(caller) {
        console.log(caller);
        var map = {};
        var options = {
                success: function(model, resp, xhr) {		    		
                    map["SUCCESS"] = model;
                    console.log(resp);
                    console.log(xhr);
                    caller.processUpdateAddressesAPIResponse(map);
                },
                
                fail: function(model, resp, xhr) {
                
                },
    
                error: function(model, resp, xhr) {	
                    map["ERROR"] = model;
                    console.log(resp);
                    console.log(xhr);
                    //TODO: call a different method for error callback
                    caller.processErrorAddressesAPIResponse(map);		       
                }
                
            /*	headers:{  'qbn.ptc.authid': '1002499456',
                           'qbn.ptc.ticket': 'V1-128-Q3rvoxg63ghn90dqrimhff',
                }*/
        };	    
        return Backbone.sync('create', this, options);
       }
    
})