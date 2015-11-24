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
    "click .titles > img": function(title, img){
      var title = this.title;
      var img = this.img;

      if (UserChoices.find({title: title, username: Meteor.user().username}, {$limit: 1}).count()) {
        console.log("ninjas")
        return
      }
        UserChoices.insert({
          title: title,
          img: img,
          username: Meteor.user().username
      });
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
