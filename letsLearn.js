AnimeTitles = new Mongo.Collection("titles")
UserChoices = new Mongo.Collection("userChoices")

if (Meteor.isClient) {

  // Displays the list of titles in AnimeTitles collection
  Template.body.helpers({
    titles: function(){
      return AnimeTitles.find();
    },
    shows: function(){
      return UserChoices.find();
    }
  });

  Template.body.events({
    "click img": function(){
      Meteor.call("addToWatchlist", this.title, this.img)
    },
    "click .deleteFromList":function(){
      Meteor.call("removeFromWatchList", this._id);
    } 
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

Meteor.methods({
  addToWatchlist: function(title, img){
    console.log("hello")
    UserChoices.insert({
      title: title,
      img: img,
      username: Meteor.user().username
    });
    console.log("welcome to the end")
  },
  removeFromWatchList:function(showId){
    UserChoices.remove(showId);
  } 
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
