import{_ as h,m as G,b as l,G as y,c as a,a as e,t as s,F as d,h as m,n as f,P as g,l as _,o,i as b,u as w,A as u,k as x}from"./index.47f17861.js";import{g as p}from"./GamesService.be35db34.js";const B={setup(){const n=w();async function r(){try{await p.getGameById(n.params.id)}catch(t){g.error(t),_.log(t)}}async function i(){try{await p.getGroupsByGameId(n.params.id)}catch(t){g.error(t),_.log(t)}}return G(()=>{r(),i()}),{activeGame:l(()=>u.activeGame),groups:l(()=>u.groups)}},components:{GroupRowCard:y}},R={class:"row justify-content-around align-items-center"},I={class:"col-5"},k={class:"row"},C={class:"p-2 gamecard-style text-center rounded"},j=["src"],P={class:"col-6 elevation-5 rounded gamecard-style mt-3"},S={class:"p-3"},A={class:"row gamecard-style mt-3 p-3"},D={class:"col-4 rounded-3"},F=["src"],M={class:"row justify-content-center"},N=e("div",{class:"col-8 bg-light rounded elevation-5 mt-4"},[e("h2",{class:"text-center"},"Groups")],-1),V={class:"row mt-3 justify-content-center"},z={class:"col-8"},E=e("section",{class:"row"},[e("button",{href:"#",class:"float-right btn rounded-circle bg-dark d-flex justify-content-center align-items-center","data-bs-toggle":"modal","data-bs-target":"#exampleModal",title:"Create Group"},[e("i",{class:"mdi mdi-gamepad-variant fs-1"})])],-1);function L(n,r,i,t,q,H){const v=x("GroupRowCard");return o(),a("div",{class:"container-fluid bg-img",style:f(`background-image: url(${t.activeGame.bgImgAdditional})`)},[e("section",R,[e("div",I,[e("div",k,[e("h2",C,s(t.activeGame.name),1)]),e("img",{class:"game-img mt-3 rounded elevation-5",src:t.activeGame.bgImg},null,8,j)]),e("div",P,[e("p",S,s(t.activeGame.description_R),1),e("p",null,"Released "+s(t.activeGame.released)+" Genre:"+s(t.activeGame.genre),1),e("p",null," Rating:"+s(t.activeGame.rating),1)])]),e("section",A,[(o(!0),a(d,null,m(t.activeGame.screenshots,c=>(o(),a("div",D,[e("div",null,[e("img",{src:c.image,class:"img-fluid mt-3 elevation-3 img-thumbnail"},null,8,F)])]))),256))]),e("section",M,[N,e("div",V,[(o(!0),a(d,null,m(t.groups,c=>(o(),a("div",z,[b(v,{group:c},null,8,["group"])]))),256))])]),E],4)}const O=h(B,[["render",L]]);export{O as default};
