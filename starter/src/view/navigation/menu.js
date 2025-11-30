export default [
  {id:"1",icon:'tui-icon ti-chinese-lantern',label:'tuiIntro',title:'TechUI简介',parentId:null,isParent:false,order:1},
  
  {id:"2",icon:'tui-icon ti-atom-alt',label:'basicModule',title:'基础模块',parentId:null,isParent:true,order:2},
    {id:"2A",label:'tuiServiceDemo',title:'tService',parentId:"2",isParent:false,order:1},
    {id:"2B",label:'adaptiveDemo',title:'适配面板',parentId:"2",isParent:false,order:2},
    {id:"2C",label:'backgroundDemo',title:'背景',parentId:"2",isParent:false,order:3},
    {id:"2D",label:'iconsDemo',title:'内置图标',parentId:"2",isParent:false,order:4},
    {id:"2E",label:'audioDemo',title:'提示音',parentId:"2",isParent:false,order:5},
    {id:"2F",label:'i18nDemo',title:'多语言',parentId:"2",isParent:false,order:6},
];