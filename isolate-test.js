if (Meteor.isClient) {

  RenderCounts = new Meteor.Collection(null);

  Meteor.startup(function(){
    var counts = [
      {templateName: 'a',count: 0},
      {templateName: 'b',count: 0},
    ];

    RenderCounts.remove({});
    _.each(counts,function(c){
      RenderCounts.insert(c);
    });

    Session.set('a',0);
    Session.set('b',0);
  });

  Template.hello.helpers({
    counts: function(){
      console.log(this);
      return RenderCounts.find();
    },
  });

  Template.countDisplay.helpers({
    count: function(){
      console.log(this);
      return this.count;
    },
  });

  Template.a.helpers({
    getA: function(){
      return Session.get('a');
    },
  });

  Template.b.helpers({
    getB: function(){
      return Session.get('b');
    },
  });

  Template.a.events({
    'click button': function(){
      Session.set('a',Session.get('a')+1);
    },
  });

  Template.b.events({
    'click button': function(){
      Session.set('b',Session.get('b')+1);
    },
  });

  Template.a.rendered = function(){
    RenderCounts.update({templateName: 'a'},{$inc: {count: 1}});
  };

  Template.b.rendered = function(){
    RenderCounts.update({templateName: 'b'},{$inc: {count: 1}});
  };
}