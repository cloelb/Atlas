import {DEFAULT_AVATAR,sanitizeAvatar} from './avatar.js';
export const PUBLIC_MISSIONS = [
  {title:'Premier Bien',domain:'LIBERTÉ',kind:'Mission',description:'Acheter et rénover mon premier bien immobilier en partant de zéro.',steps:['Constituer mon épargne','Préparer mon apport','Comprendre les financements','Construire ma grille d’analyse','Effectuer les visites','Faire une offre','Recevoir les clés','Rénover'],symbol:'⌂'},
  {title:'Construire mon éducation',domain:'ESPRIT',kind:'Longue Route',description:'Construire, tout au long de ma vie, l’éducation que je souhaite acquérir. Commencer par la philosophie et la psychologie.',steps:['Brain Stack I — philosophie','Brain Stack I — psychologie','Lire, réfléchir, appliquer','Créer de nouvelles Missions au fil des années'],symbol:'☷'},
  {title:'Corps Capable',domain:'CORPS',kind:'Mission',description:'Une année pour développer mes capacités grâce à la callisthénie.',steps:['Bases et mobilité','Renforcement et équilibre','Travail du handstand','Travail du L-sit','Explorer d’autres mouvements'],symbol:'✧'}
];
export const CATALOG=[
  {id:'plant',name:'Plante du voyageur',cost:80,symbol:'❀',type:'maison'},
  {id:'lantern',name:'Lanterne des chemins',cost:140,symbol:'♜',type:'maison'},
  {id:'scarf',name:'Foulard de l’aventurier',cost:110,symbol:'♧',type:'personnage'},
  {id:'books',name:'Pile de livres',cost:180,symbol:'☷',type:'maison'}
];
const KEY='atlas-village-preview-v2';
const fresh=()=>({schema:2,name:'',cap:'',avatar:{...DEFAULT_AVATAR},missions:[],journal:[],xpEvents:[],items:[],createdAt:new Date().toISOString()});
function valid(p){return p&&typeof p==='object'&&p.schema===2&&Array.isArray(p.missions)&&Array.isArray(p.xpEvents)}
export function loadGame(){try{const raw=localStorage.getItem(KEY);const p=raw?JSON.parse(raw):null;if(valid(p))return {...fresh(),...p,avatar:sanitizeAvatar(p.avatar)};}catch{}return fresh()}
export function saveGame(p){try{localStorage.setItem(KEY,JSON.stringify(p));return true}catch{return false}}
export function newId(){return 'a'+Math.random().toString(36).slice(2,10)+Date.now().toString(36)}
export function earnedXp(p){return p.xpEvents.reduce((s,e)=>s+(Number(e.amount)||0),0)}
export function spentXp(p){return p.items.reduce((s,id)=>s+(CATALOG.find(x=>x.id===id)?.cost||0),0)}
export function balanceXp(p){return earnedXp(p)-spentXp(p)}
export function grantXp(p,eventId,amount){if(p.xpEvents.some(e=>e.id===eventId))return false;p.xpEvents.push({id:eventId,amount,date:new Date().toISOString()});return true}
