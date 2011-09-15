//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require_self
//= require_tree .

jQuery(function($){

window.App = Spine.Controller.create({
  el: $("body"),

  elements: {
    "#sidebar": "sidebarEl",
    "#messages": "messagesEl",
    "#searches": "searchesEl",
    "#settings": "settingsEl"
  },

  init: function(){
    this.messages = Messages.init({el: this.messagesEl});
    this.sidebar  = Sidebar.init({el: this.sidebarEl});
    this.searches = Searches.init({el: this.searchesEl});
    this.settings = Settings.init({el: this.settingsEl});
    this.assets   = Assets.init({messages: this.messages});

    // Make sure only one view is visible
    this.manager = Spine.Controller.Manager.init();
    this.manager.addAll(this.messages, this.searches, this.settings);

    // Remove selected sidebar items when searching
    this.manager.bind("change", this.proxy(function(current){
      if (current == this.searches) this.sidebar.deactivate();
    }));

    Message.fetch();
    Channel.fetch();
  }
}).init();

});

function isImageUrl(str) {
  var exts = ["jpg", "jpeg", "gif", "png"];
  if(str.indexOf("http://") == 0) {
    for(var x=0; x <= exts.length; x++) {
      if (str.indexOf(exts[x]) != -1) {return true;}
    }
  }
  return false;
}
