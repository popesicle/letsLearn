AnimeTitles = new Mongo.Collection("titles");
UserChoices = new Mongo.Collection("userChoices");


if (Meteor.isClient) {

  // Displays the list of titles in AnimeTitles collection
  Template.body.helpers({
    titles: function(){
      return AnimeTitles.find({}, {sort: {title:1}});
    },
    shows: function(){
      if(Meteor.user()){
      return UserChoices.find({username: Meteor.user().username});
      }
      // return "ninjas"
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
    "click .deleteFromList":function(showId){
      var showId = this._id
      UserChoices.remove(showId);
    }, 
    "submit .writeReview":function(event){
      event.preventDefault();
      var review = event.target.reviewBox.value;
      var showId = this._id;
      

     
    AnimeTitles.update(showId, {$set: {review:review, reviewedBy: Meteor.user().username}});

      event.target.reviewBox.value = "";
    } 
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
