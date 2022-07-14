"use strict";(self["webpackChunkgame_logs"]=self["webpackChunkgame_logs"]||[]).push([[18],{6344:function(s,c,t){t.r(c),t.d(c,{default:function(){return W}});var r=t(6252),e=t(3577),o=t(9963);const a=s=>((0,r.dD)("data-v-29541cb0"),s=s(),(0,r.Cn)(),s),d={id:"product"},l={key:0,id:"product-container"},i={id:"product-detail"},u={id:"title"},n={id:"product-display"},p=["src"],g=["src","alt"],m={id:"product-card"},_=["src","alt"],h=a((()=>(0,r._)("label",null," ABOUT THE GAME ",-1))),v={style:{}},k=a((()=>(0,r._)("br",null,null,-1))),w=a((()=>(0,r._)("br",null,null,-1))),b=a((()=>(0,r._)("br",null,null,-1))),f=a((()=>(0,r._)("br",null,null,-1))),S=a((()=>(0,r._)("br",null,null,-1))),y=a((()=>(0,r._)("br",null,null,-1))),I=a((()=>(0,r._)("br",null,null,-1))),C=a((()=>(0,r._)("br",null,null,-1))),D={id:"btn-input"},j={class:"content-scroll"},E={class:"data-panel"},P=["src","alt"],O=a((()=>(0,r._)("div",{id:"play-btn"},null,-1))),U={class:"data-panel"},A=["src","alt"],q={class:"data-panel"},z=["src","alt"],T={class:"data-panel"},V=["src","alt"],R={class:"data-panel"},F=["src","alt"],L={class:"data-panel"},N=["src","alt"],B={class:"data-panel"},J=["src","alt"],M={key:1,id:"error"};function G(s,c,a,G,H,Z){return(0,r.wg)(),(0,r.iD)("div",d,[H.product?((0,r.wg)(),(0,r.iD)("div",l,[(0,r._)("div",i,[(0,r._)("h1",u,(0,e.zw)(H.product.name),1),(0,r._)("div",n,[H.showImg?(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("iframe",{key:0,id:"product-vid",src:"https://www.youtube.com/embed/"+H.product.video+"?modestbranding=1"},null,8,p)),(0,r.wy)((0,r._)("img",{id:"product-img",src:t(4563)("./"+H.product.img_src+"/"+H.product.img_src+".jpg"),alt:H.product.name},null,8,g),[[o.F8,H.showImg]])]),(0,r.wy)((0,r._)("span",m,[(0,r._)("img",{id:"product-cover",src:t(4563)("./"+H.product.img_src+"/"+H.product.img_src+".jpg"),alt:H.product.name},null,8,_),h,(0,r._)("p",v,[(0,r.Uk)("  "+(0,e.zw)(H.product.description),1),k,w,(0,r.Uk)(" DEVELOPER: "+(0,e.zw)(H.product.company),1),b,f,(0,r.Uk)(" RELEASE DATE: "+(0,e.zw)(H.product.release_date),1),S,y,(0,r.Uk)(" PLATFORMS: "+(0,e.zw)(H.product.platform),1),I,C]),(0,r._)("div",D,[H.saved?(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("button",{key:0,class:"save-btn",onClick:c[0]||(c[0]=(...s)=>Z.save&&Z.save(...s))},"Save")),H.saved?((0,r.wg)(),(0,r.iD)("button",{key:1,class:"saved-btn",onClick:c[1]||(c[1]=(...s)=>Z.remove&&Z.remove(...s))}," SAVED! ")):(0,r.kq)("",!0)])],512),[[o.F8,H.checked]])]),(0,r._)("div",j,[(0,r._)("div",E,[(0,r._)("img",{id:"sub-vid",src:t(4563)("./"+H.product.img_src+"/"+H.product.img_src+".jpg"),alt:H.product.name,onClick:c[2]||(c[2]=(...s)=>Z.focusVid&&Z.focusVid(...s))},null,8,P),O]),(0,r._)("div",U,[(0,r._)("img",{src:t(4563)("./"+H.product.img_src+"/"+H.product.img_src+".jpg"),alt:H.product.name,onClick:c[3]||(c[3]=s=>Z.focusImg(s.composedPath))},null,8,A)]),(0,r._)("div",q,[(0,r._)("img",{src:t(4563)("./"+H.product.img_src+"/"+H.product.img_src+".jpg"),alt:H.product.name,onClick:c[4]||(c[4]=s=>Z.focusImg(s.composedPath))},null,8,z)]),(0,r._)("div",T,[(0,r._)("img",{src:t(4563)("./"+H.product.img_src+"/"+H.product.img_src+".jpg"),alt:H.product.name,onClick:c[5]||(c[5]=s=>Z.focusImg(s.composedPath))},null,8,V)]),(0,r._)("div",R,[(0,r._)("img",{src:t(4563)("./"+H.product.img_src+"/"+H.product.img_src+".jpg"),alt:H.product.name,onClick:c[6]||(c[6]=s=>Z.focusImg(s.composedPath))},null,8,F)]),(0,r._)("div",L,[(0,r._)("img",{src:t(4563)("./"+H.product.img_src+"/"+H.product.img_src+".jpg"),alt:H.product.name,onClick:c[7]||(c[7]=s=>Z.focusImg(s.composedPath))},null,8,N)]),(0,r._)("div",B,[(0,r._)("img",{src:t(4563)("./"+H.product.img_src+"/"+H.product.img_src+".jpg"),alt:H.product.name,onClick:c[8]||(c[8]=s=>Z.focusImg(s.composedPath))},null,8,J)])])])):(0,r.kq)("",!0),H.product?(0,r.kq)("",!0):((0,r.wg)(),(0,r.iD)("div",M,"NO PRODUCT"))])}var H=t(9669),Z=t.n(H),x={name:"Product",props:["productDetails"],data(){return{user:Object,product:Object,saved:!1,checked:!1,showImg:!1}},created(){localStorage.product&&(this.product=JSON.parse(localStorage.product)),sessionStorage.user?(this.user=JSON.parse(sessionStorage.user),this.checkSaveStatus()):(this.saved=!1,this.checked=!0)},methods:{async save(){sessionStorage.user?await Z().post("../api/server.php",{action:"save",user:this.user[0].id,game:this.product.id}).then((s=>{console.log(s),this.saved=!0})):console.log("User not logged in!")},async remove(){sessionStorage.user?await Z().post("../api/server.php",{action:"remove",user:this.user[0].id,game:this.product.id}).then((s=>{console.log(s),this.saved=!1})):console.log("User not logged in!")},async checkSaveStatus(){sessionStorage.user?await Z().post("../api/server.php",{action:"checkSaved",user:this.user[0].id,game:this.product.id}).then((s=>{this.saved=0!=s.data.length})):console.log("User not logged in!"),this.checked=!0},focusVid(){this.showImg=!1},focusImg(s){this.showImg=!0,document.getElementById("product-img").src=s.target.src}}},K=t(3744);const Q=(0,K.Z)(x,[["render",G],["__scopeId","data-v-29541cb0"]]);var W=Q}}]);
//# sourceMappingURL=product.652022e9.js.map