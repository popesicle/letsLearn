AnimeTitles = new Mongo.Collection("titles")
UserChoices = new Mongo.Collection("userChoices")

if (Meteor.isClient) {

  // Displays the list of titles in AnimeTitles collection
  Template.body.helpers({
    titles: function(){
      return AnimeTitles.find({}, {sort: {title:1}});
    },
    shows: function(){
      return UserChoices.find({username: Meteor.user().username},);
    }
  });

  Template.body.events({
    "click img": function(){
      Meteor.call("addToWatchlist", this.title, this.img)
    },
    "click .deleteFromList":function(){
      Meteor.call("removeFromWatchList", this._id);
    }, 
    "submit .writeReview":function(event){
      event.preventDefault();
      var review = event.target.reviewBox.value;

      Meteor.call("addReview", review, this._id)

      event.target.reviewBox.value = "";
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
  } ,
  addReview:function(review, showId){
    AnimeTitles.update(showId, {$set: {review: review}});
  }
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
