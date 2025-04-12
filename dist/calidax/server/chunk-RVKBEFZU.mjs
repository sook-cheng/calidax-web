import './polyfills.server.mjs';
import{$ as A,$a as K,Ab as se,C as s,D as v,E as D,F as M,K as x,L as P,M as S,Ma as q,N as B,O as r,Oa as b,P as a,Pa as z,Q as p,R as O,Ra as h,S as w,T as L,U as Q,V as d,Va as W,W as g,X as u,Y as j,Ya as U,Z as m,Za as H,_ as E,_a as J,aa as F,ab as X,ba as G,bb as Y,ca as V,cb as Z,d as I,da as f,db as $,eb as ee,fb as te,gb as ne,hb as oe,ib as ie,jb as ae,kb as re,l as R,lb as pe,m as k,mb as me,nb as le,vb as _,wb as C,xb as N,yb as ce,z as c,zb as y}from"./chunk-NZXJKLFG.mjs";import"./chunk-5XO7ITTW.mjs";import"./chunk-S6KH3LOX.mjs";var he=["campaignsTpl"],_e=["reportsTpl"],Ce=["dataManagementTpl"],Ne=["eventsManagerTpl"];function ye(e,l){if(e&1&&m(0),e&2){let t=L().$implicit;E(t.template)}}function Te(e,l){if(e&1&&(r(0,"li",6)(1,"button",8),m(2),a(),M(3,ye,1,1,"ng-template",9),a()),e&2){let t=l.$implicit;x("ngbNavItem",t.index),c(),Q("routerLink",t.path),c(),E(t.name)}}function Me(e,l){e&1&&p(0,"app-campaigns")}function xe(e,l){e&1&&p(0,"app-reports")}function we(e,l){e&1&&p(0,"app-data-management")}function Ee(e,l){e&1&&p(0,"app-events-manager")}var ge=(()=>{class e{constructor(t){this.router=t,this.active=1,this.routes=[{index:1,path:"campaigns",name:"CAMPAIGNS",template:this.campaignsTpl},{index:2,path:"reports",name:"REPORTS",template:this.reportsTpl},{index:3,path:"data-management",name:"DATA MANAGEMENT",template:this.dataManagementTpl},{index:4,path:"events-manager",name:"EVENTS MANAGER",template:this.eventsManagerTpl}]}ngOnInit(){let t=this.router.url,n=this.routes.findIndex(o=>o.path===t.substring(1));this.active=n+1}static{this.\u0275fac=function(n){return new(n||e)(s(b))}}static{this.\u0275cmp=v({type:e,selectors:[["app-nav-bar"]],viewQuery:function(n,o){if(n&1&&(d(he,5),d(_e,5),d(Ce,5),d(Ne,5)),n&2){let i;g(i=u())&&(o.campaignsTpl=i.first),g(i=u())&&(o.reportsTpl=i.first),g(i=u())&&(o.dataManagementTpl=i.first),g(i=u())&&(o.eventsManagerTpl=i.first)}},decls:13,vars:2,consts:[["nav","ngbNav"],["campaignsTpl",""],["reportsTpl",""],["dataManagementTpl",""],["eventsManagerTpl",""],["ngbNav","",1,"nav-tabs","justify-content-center",3,"activeIdChange","activeId"],[1,"nav-item",3,"ngbNavItem"],[3,"ngbNavOutlet"],["ngbNavLink","",3,"routerLink"],["ngbNavContent",""]],template:function(n,o){if(n&1){let i=O();r(0,"ul",5,0),G("activeIdChange",function(T){return R(i),F(o.active,T)||(o.active=T),k(T)}),S(2,Te,4,3,"li",6,P),a(),p(4,"div",7),M(5,Me,1,0,"ng-template",null,1,f)(7,xe,1,0,"ng-template",null,2,f)(9,we,1,0,"ng-template",null,3,f)(11,Ee,1,0,"ng-template",null,4,f)}if(n&2){let i=j(1);A("activeId",o.active),c(2),B(o.routes),c(2),x("ngbNavOutlet",i)}},dependencies:[ae,Z,te,ee,$,oe,ne,ie,N,_,C,y,h,z],styles:[".nav-tabs[_ngcontent-%COMP%]   .nav-link[_ngcontent-%COMP%]{height:4rem;padding:0 1rem 1rem;color:#231f20;font-weight:700;font-family:Myriad Pro Bold,sans-serif;font-size:14px;border-color:var(--bs-nav-tabs-link-active-border-color)}.nav-tabs[_ngcontent-%COMP%]   .active[_ngcontent-%COMP%]{background-color:#ececec}"]})}}return e})();var ue=(()=>{class e{constructor(t,n){this.authService=t,this.router=n}logout(){let t=localStorage.getItem("id");t&&this.authService.logout(t).subscribe(()=>{localStorage.removeItem("token"),localStorage.removeItem("id"),this.router.navigate([""])})}profile(){this.router.navigate(["/profile"])}static{this.\u0275fac=function(n){return new(n||e)(s(W),s(b))}}static{this.\u0275cmp=v({type:e,selectors:[["app-protected-layout"]],features:[V([re({bootstrapGear:me,bootstrapQuestionCircle:le})])],decls:23,vars:0,consts:[[1,"app-layout"],[1,"d-flex","justify-content-between","mt-4","mx-3"],[2,"width","170px","height","55px"],["src","assets/images/logo.jpeg","alt","logo",2,"width","inherit","height","inherit","object-fit","contain"],[1,"d-flex","align-items-center","pb-2"],["ngbDropdown","",1,"d-inline-block"],["type","button","id","feedbackDropdown","ngbDropdownToggle","",1,"btn","feedback-btn"],[2,"font-size","32px","padding-left","0.75rem","color","#dcdcdc"],["type","button","id","settingsDropdown","ngbDropdownToggle","",1,"btn","icon-btn","d-flex",2,"padding","0.375rem 0.5rem"],["name","bootstrapGear",1,"icon"],["ngbDropdownMenu","","aria-labelledby","settingsDropdown"],["ngbDropdownItem","",3,"click"],["type","button",1,"btn","d-flex",2,"padding","0.375rem 0.5rem 0.375rem 0"],["name","bootstrapQuestionCircle",1,"icon"],[1,"inner-content"]],template:function(n,o){n&1&&(r(0,"div",0)(1,"div",1)(2,"div",2),p(3,"img",3),a(),p(4,"app-nav-bar"),r(5,"div",4)(6,"div",5)(7,"button",6),m(8," Feedback "),a()(),r(9,"span",7),m(10,"|"),a(),r(11,"div",5)(12,"button",8),p(13,"ng-icon",9),a(),r(14,"div",10)(15,"button",11),w("click",function(){return o.logout()}),m(16,"Logout"),a(),r(17,"button",11),w("click",function(){return o.profile()}),m(18,"Profile"),a()()(),r(19,"button",12),p(20,"ng-icon",13),a()()(),r(21,"div",14),p(22,"router-outlet"),a()())},dependencies:[q,ge,Y,X,K,J,U,H,pe],styles:[".inner-content[_ngcontent-%COMP%]{background-color:#ececec;height:fit-content;min-height:93vh}.feedback-btn[_ngcontent-%COMP%]{padding:2px 8px;background-color:#aee8f5;border-color:#aee8f5;color:#0072bc;font-size:13px}.icon-btn[_ngcontent-%COMP%]:after{display:none}"]})}}return e})();var fe=[{path:"",component:ue,children:[{path:"",redirectTo:"campaigns",pathMatch:"full"},{path:"reports",component:_},{path:"data-management",component:C},{path:"campaigns",component:N},{path:"campaigns/new-campaign",component:ce},{path:"events-manager",component:y},{path:"profile",component:se}]}];var We=(()=>{class e{static{this.\u0275fac=function(n){return new(n||e)}}static{this.\u0275mod=D({type:e})}static{this.\u0275inj=I({imports:[h.forChild(fe)]})}}return e})();export{We as ProtectedRoutesModule};
