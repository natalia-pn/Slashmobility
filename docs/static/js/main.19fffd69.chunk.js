(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){e.exports=a(20)},17:function(e,t,a){},19:function(e,t,a){},20:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(9),s=a.n(c),o=(a(17),a(11)),i=a(6),l=a(1),u=a(2),m=a(4),v=a(3),f=a(5),h=a(10),p=function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.getSearchName,a=e.query;return n.a.createElement("div",{className:"Search-bar"},n.a.createElement("label",{htmlFor:"search-field",className:"Search-field__label"}),n.a.createElement("input",{type:"text",id:"search-field",className:"Search-field__input",placeholder:"Search",onChange:t,value:a}),n.a.createElement("i",{className:"material-icons Magnify"},"search"))}}]),t}(r.Component),d=function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.favouritesTotal,a=e.getSearchName,r=e.query;return n.a.createElement("header",{className:"App-header"},n.a.createElement("div",{className:"Header__content"},n.a.createElement("i",{className:"material-icons Hand-tapping"},"touch_app"),n.a.createElement(p,{getSearchName:a,query:r}),n.a.createElement("div",{className:"Favourites-counter__container"},n.a.createElement("i",{className:"material-icons Header__heart"},"favorite"),n.a.createElement("span",{className:"Favourites__counter"},t))))}}]),t}(r.Component),S=(a(19),function(e){return fetch("https://itunes.apple.com/search?term="+e).then(function(e){return e.json()})}),y=function(e){function t(){var e,a;Object(l.a)(this,t);for(var r=arguments.length,n=new Array(r),c=0;c<r;c++)n[c]=arguments[c];return(a=Object(m.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(n)))).addDefaultPicture=function(e){e.currentTarget.src="https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"},a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.image,a=e.trackName,r=e.collectionName,c=e.favouriteStatus,s=e.id,o=e.selectFavourites,i=!0===c?"favorite":"favorite_border";return n.a.createElement("li",{className:"Song__item"},n.a.createElement("img",{className:"Song__sleeve",src:t,onError:this.addDefaultPicture,alt:r}),n.a.createElement("div",{className:"Card__info"},n.a.createElement("p",{className:"Song__title"},a),n.a.createElement("p",{className:"Song__album"},r)),n.a.createElement("button",{type:"button",className:"Favourites__heart",value:s,onClick:o},n.a.createElement("i",{className:"material-icons"},i)))}}]),t}(r.Component),g=function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.resultsArray,a=e.selectFavourites;return n.a.createElement("ul",{className:"Songs__list"},t.map(function(e){return n.a.createElement(y,{key:e.trackId,id:e.trackId,image:e.artworkUrl100,trackName:e.trackName,collectionName:e.collectionName,selectFavourites:a,favouriteStatus:e.favouriteStatus})}))}}]),t}(r.Component),b=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(m.a)(this,Object(v.a)(t).call(this,e))).getSongs=Object(h.debounce)(function(){var e=a.state.query;S(e).then(function(e){var t=e.results.map(function(e){return Object(i.a)({},e,{favouriteStatus:!1})});a.checkFavouritesLocalStorage(t)}),a.setState({resultsArray:[]})},1e3),a.getSearchName=function(e){var t=e.currentTarget.value;a.setState({query:t}),a.getSongs()},a.selectFavourites=function(e){var t=a.state,r=t.resultsArray,n=t.favArray,c=e.currentTarget.value,s=Object(o.a)(n),l=r.map(function(e){if(e.trackId===parseInt(c)&&!1===e.favouriteStatus)return s.push(e.trackId),console.log(e.favouriteStatus),Object(i.a)({},e,{favouriteStatus:!0});if(e.trackId===parseInt(c)&&!0===e.favouriteStatus){var t=s.indexOf(e.trackId);return s.splice(t,1),console.log(e.favouriteStatus),Object(i.a)({},e,{favouriteStatus:!1})}return e});a.setState({resultsArray:l,favArray:s}),a.saveFavouritesLS("favSongs",s)},a.saveFavouritesLS=function(e,t){localStorage.setItem(e,JSON.stringify(t))},a.checkFavouritesLocalStorage=function(e){var t=e,r=JSON.parse(localStorage.getItem("favSongs"));if(null!==r){var n=!0,c=!1,s=void 0;try{for(var o,i=t[Symbol.iterator]();!(n=(o=i.next()).done);n=!0){var l=o.value,u=!0,m=!1,v=void 0;try{for(var f,h=r[Symbol.iterator]();!(u=(f=h.next()).done);u=!0){f.value===parseInt(l.trackId)&&(l.favouriteStatus=!0)}}catch(p){m=!0,v=p}finally{try{u||null==h.return||h.return()}finally{if(m)throw v}}}}catch(p){c=!0,s=p}finally{try{n||null==i.return||i.return()}finally{if(c)throw s}}}a.setState({resultsArray:t})},a.state={favArray:[],resultsArray:[],query:""},a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=JSON.parse(localStorage.getItem("favSongs"));null!==e&&this.setState({favArray:e}),console.log(e)}},{key:"render",value:function(){var e=this.state,t=e.resultsArray,a=e.favArray,r=this.getSearchName,c=this.selectFavourites,s=a.length;return console.log("favArray",a),console.log(t),n.a.createElement("div",{className:"App"},n.a.createElement(d,{getSearchName:r,favouritesTotal:s}),n.a.createElement("main",{className:"Main-section"},n.a.createElement(g,{resultsArray:t,selectFavourites:c})))}}]),t}(r.Component);s.a.render(n.a.createElement(b,null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.19fffd69.chunk.js.map