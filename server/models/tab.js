var mongoose = require("mongoose");

var tabSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  venueId: {type: mongoose.Schema.Types.ObjectId, ref: 'Venue'},
  items: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'Item'}
  ],
  openedAt: {
    type: Date,
    default: Date.now
  },
  closedAt: {
    type: Date
  }
});

const Tab = module.exports = mongoose.model('Tab', tabSchema);

// Create tab
module.exports.create = function (tab, callback) {
  var newTab = new Tab();
  newTab.userId = tab.userId;
  newTab.venueId = tab.venueId;
  newTab.save(function (err, data) {
    if (err) throw err;
    callback(data);
  });
};

// Get users tabs
module.exports.getTabsByUserId = function (userId, callback) {
  Tab.find({
    userId: userId
  }).populate('venueId').exec(callback);
};

//Get venue tabs
module.exports.getTabsByVenueId = function (venueId, callback){
  Tab.find({
    venueId : venueId
  }).populate().exec(callback);
};

//Add item to item array on tab
module.exports.addItemToTab = function (tab, callback) {

  Tab.findByIdAndUpdate(tab.id,
    {$push: {items: tab.item}},
    {safe: true, upsert: false},
    function (err, data) {
      if (err) console.log(err);
      //console.log(data);
    }
  );
};

//Remove an item to item array on tab
module.exports.removeItemFromTab = function (tab, callback) {
  Tab.findByIdAndUpdate(tab.id,
    {$pull: {items: tab.item}},
    {safe: true, upsert: false},
    function (err, data) {
      if (err) console.log(err);
      //console.log(data);
    }
  );
};

//Set closed at date to current time
module.exports.closeTab = function (id, callback) {
  Tab.findByIdAndUpdate(id,
    {closedAt: Date.now()},
    {safe: true, upsert: false},
    function (err, data) {
      if (err) console.log(err);
      console.log(data);
    }
  );
};