$.extend({jYoutube:function(t,u){if(null===t)return"";u=null===u?"big":u;var e,l;return l=t.match("[?&amp;]v=([^&amp;#]*)"),e=null===l?t:l[1],"small"==u?"http://img.youtube.com/vi/"+e+"/sddefault.jpg":"smaller"==u?"http://img.youtube.com/vi/"+e+"/hqdefault.jpg":"http://img.youtube.com/vi/"+e+"/maxresdefault.jpg"}});