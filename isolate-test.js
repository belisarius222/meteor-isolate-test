if (Meteor.isClient) {
  var created = function() {
      this.count = 0;
  };
  var rendered = function() {
      this.count++;
  };

  _.each(['template1','template2','template3'], function(t) {
      Template[t].created = created;
      Template[t].rendered = function() {
          this.count++;
          console.log('Rendering '+t+': '+this.count);
      };
      Template[t].helpers({
          count: function() { console.log(this); return this.count; },
          'var': function() { return Session.get(t); }
      });
      Session.set(t, 0);
  });

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
