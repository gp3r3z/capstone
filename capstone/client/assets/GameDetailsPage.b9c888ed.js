import{_ as G,q as y,b as l,c as s,e,t as o,F as d,i as m,n as f,P as _,l as g,o as c,j as b,u as I,A as u,p as w,k as x,m as B}from"./index.dd2c57bb.js";import{g as p}from"./GamesService.417594bd.js";const S={setup(){const a=I();async function r(){try{await p.getGameById(a.params.id)}catch(t){_.error(t),g.log(t)}}async function i(){try{await p.getGroupsByGameId(a.params.id)}catch(t){_.error(t),g.log(t)}}return y(()=>{r(),i()}),{activeGame:l(()=>u.activeGame),groups:l(()=>u.groups)}}},v=a=>(w("data-v-456cc452"),a=a(),x(),a),j={class:"row justify-content-around align-items-center"},k={class:"col-6"},C={class:"row justify-content-center mt-3"},P={class:"col-10 p-2 gamecard-style text-center rounded"},R=["src"],A={class:"col-5 elevation-5 rounded gamecard-style mt-3"},D={class:"p-3"},F={class:"row gamecard-style mt-3 p-3"},M={class:"col-4 rounded-3"},N=["src"],V={class:"container"},q=v(()=>e("div",{class:"row justify-content-center"},[e("div",{class:"col-8 bg-light rounded elevation-5 mt-4"},[e("h2",{class:"text-center"},"Groups")])],-1)),z={class:"row justify-content-around"},E={class:"col-4 mt-3"},L=v(()=>e("section",{class:"row"},[e("button",{href:"#",class:"float-right btn rounded-circle bg-dark d-flex justify-content-center align-items-center","data-bs-toggle":"modal","data-bs-target":"#exampleModal",title:"Create Group"},[e("i",{class:"mdi mdi-gamepad-variant fs-1"})])],-1));function H(a,r,i,t,J,K){const h=B("GroupCard");return c(),s("div",{class:"container-fluid bg-img",style:f(`background-image: url(${t.activeGame.bgImgAdditional})`)},[e("section",j,[e("div",k,[e("div",C,[e("h2",P,o(t.activeGame.name),1)]),e("img",{class:"game-img mt-3 rounded elevation-5",src:t.activeGame.bgImg},null,8,R)]),e("div",A,[e("p",D,o(t.activeGame.description_R),1),e("p",null,"Released "+o(t.activeGame.released)+" Genre:"+o(t.activeGame.genre),1),e("p",null," Rating:"+o(t.activeGame.rating),1)])]),e("section",F,[(c(!0),s(d,null,m(t.activeGame.screenshots,n=>(c(),s("div",M,[e("div",null,[e("img",{src:n.image,class:"img-fluid mt-3 elevation-3 img-thumbnail"},null,8,N)])]))),256))]),e("section",null,[e("div",V,[q,e("section",z,[(c(!0),s(d,null,m(t.groups,n=>(c(),s("div",E,[b(h,{group:n},null,8,["group"])]))),256))])])]),L],4)}const T=G(S,[["render",H],["__scopeId","data-v-456cc452"]]);export{T as default};
