$.extend({
  jYoutube: function( url, size ){
    if(url === null){ return ""; }
 
    size = (size === null) ? "big" : size;
    var vid;
    var results;
 
    results = url.match("[\?&amp;]v=([^&amp;#]*)");
 
    vid = ( results === null ) ? url : results[1];
 
    if(size == "small"){
      return "http://img.youtube.com/vi/"+vid+"/sddefault.jpg";
    } 
    else if(size == "smaller") {
      return "http://img.youtube.com/vi/"+vid+"/hqdefault.jpg";
    }
    else {
      return "http://img.youtube.com/vi/"+vid+"/maxresdefault.jpg";
    }
  }
});