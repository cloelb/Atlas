// ATLAS · original editable character vector. No externally owned character assets.
export const SKINS = ['#f3cbaa','#dfad86','#bd835f','#945b44','#623e33'];
export const HAIRS = ['#3a2822','#6d432d','#9d663a','#ce9a5b','#25252a','#b9664c','#d2bb92'];
export const OUTFITS = [
  {label:'Explorateur sauge',jacket:'#73816a',trim:'#ede0c6',pants:'#625344'},
  {label:'Cottage écru',jacket:'#d1bd9b',trim:'#fff1d7',pants:'#6b6552'},
  {label:'Forêt profonde',jacket:'#3d5549',trim:'#c7b48b',pants:'#534335'},
  {label:'Argile',jacket:'#aa765d',trim:'#eed7bd',pants:'#584337'},
  {label:'Nuit d’automne',jacket:'#373e50',trim:'#d1bb96',pants:'#34353a'}
];
export const HAIR_STYLES = [
  {key:'long',label:'Longs'}, {key:'wavy',label:'Ondulés'}, {key:'bob',label:'Carré'}, {key:'short',label:'Courts'}, {key:'curly',label:'Bouclés'}
];
export const DEFAULT_AVATAR = {gender:'fille',skin:1,hair:0,style:'long',outfit:0,accessory:'sac'};
export function sanitizeAvatar(a={}) {
  return {
    gender: a.gender==='garcon'?'garcon':'fille',
    skin: Number.isInteger(a.skin)&&a.skin>=0&&a.skin<SKINS.length?a.skin:1,
    hair: Number.isInteger(a.hair)&&a.hair>=0&&a.hair<HAIRS.length?a.hair:0,
    style: HAIR_STYLES.some(s=>s.key===a.style)?a.style:'long',
    outfit: Number.isInteger(a.outfit)&&a.outfit>=0&&a.outfit<OUTFITS.length?a.outfit:0,
    accessory: ['sac','foulard','aucun'].includes(a.accessory)?a.accessory:'sac'
  };
}
export function avatarSVG(options={}, cls='') {
  const a=sanitizeAvatar(options), skin=SKINS[a.skin], hair=HAIRS[a.hair], outfit=OUTFITS[a.outfit];
  const id='av'+Math.random().toString(36).slice(2,9);
  const round=a.gender==='fille'?'52':'48';
  const longHair=a.style==='long'||a.style==='wavy';
  const backHair = longHair ? `<path d="M55 84 C26 83 28 119 35 152 Q47 166 60 143 L118 144 Q143 168 151 141 Q159 104 130 81Z" fill="${hair}"/>` :
    a.style==='bob' ? `<path d="M48 83 Q35 116 45 134 L139 134 Q154 109 135 80Z" fill="${hair}"/>` : '';
  const crown=a.style==='curly' ? `<g fill="${hair}"><circle cx="56" cy="75" r="22"/><circle cx="73" cy="55" r="22"/><circle cx="98" cy="53" r="23"/><circle cx="125" cy="65" r="22"/><circle cx="138" cy="82" r="16"/><circle cx="45" cy="95" r="15"/></g>` :
    `<path d="M44 94 Q32 50 73 45 Q104 29 128 54 Q151 65 142 100 Q127 89 125 70 Q105 85 70 83 Q59 91 44 94Z" fill="${hair}"/>`;
  const hairFront=a.style==='short' ? `<path d="M41 85 Q48 48 93 47 Q138 46 141 83 Q124 70 116 64 Q97 82 74 74 Q63 89 41 85Z" fill="${hair}"/>` :
    a.style==='wavy' ? `<path d="M43 89 Q31 49 82 45 Q115 34 136 69 Q131 83 110 73 Q91 95 69 81 Q63 93 43 89Z" fill="${hair}"/><path d="M46 104 Q31 136 48 151 M130 99 Q145 126 134 152" fill="none" stroke="${hair}" stroke-width="13" stroke-linecap="round"/>` :
    a.style==='bob' ? `<path d="M42 98 Q35 57 80 45 Q122 36 141 81 Q135 102 124 113 L123 80 Q99 94 70 77 Q64 102 48 112Z" fill="${hair}"/>` :
    a.style==='long' ? `<path d="M42 99 Q35 62 69 49 Q94 36 113 46 Q149 57 143 105 L130 121 Q130 88 124 76 Q95 89 73 77 Q62 92 48 111Z" fill="${hair}"/>` : '';
  const scarf = a.accessory==='foulard' ? `<path d="M71 141 Q92 153 112 141 L108 161 L78 159Z" fill="#c58e67"/><path d="M110 155 L118 191 L107 191 L99 157Z" fill="#d5a078"/>` : '';
  const backpack = a.accessory==='sac' ? `<path d="M56 160 Q34 156 34 185 V210 Q36 229 55 223 L62 214 V168Z" fill="#75523a" stroke="#3e2b21" stroke-width="3"/><path d="M42 182 H56 M49 177 V214" stroke="#bd8c57" stroke-width="3"/>` : '';
  return `<svg class="atlas-avatar ${cls}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 184 282" role="img" aria-label="Personnage ${a.gender==='fille'?'fille':'garçon'}, tenue ${outfit.label}">
    <defs><radialGradient id="${id}face" cx="35%" cy="25%"><stop stop-color="#fff4df" stop-opacity=".38"/><stop offset="1" stop-color="#ad644b" stop-opacity=".15"/></radialGradient><linearGradient id="${id}coat" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".22"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#191308" stop-opacity=".22"/></linearGradient></defs>
    <ellipse cx="92" cy="264" rx="55" ry="9" fill="#16150c" opacity=".24"/>
    ${backHair}
    <path d="M74 213 L72 254 Q78 260 90 256 L96 212Z M103 211 L105 254 Q117 261 125 254 L119 211Z" fill="${outfit.pants}" stroke="#4a382f" stroke-width="2"/>
    <path d="M68 249 Q61 253 63 261 Q77 271 92 264 L94 254Z M105 254 L106 265 Q124 272 134 261 Q133 254 125 250Z" fill="#6b4835" stroke="#422e26" stroke-width="2"/>
    ${backpack}
    <path d="M67 145 Q58 145 52 167 L42 203 Q47 217 58 210 L73 180 M116 145 Q131 146 136 165 L147 202 Q145 215 133 210 L113 180" fill="${outfit.trim}" stroke="#886347" stroke-width="3" stroke-linejoin="round"/>
    <path d="M58 192 L51 207 Q49 215 58 214 Q66 210 65 201Z M129 193 L135 210 Q143 214 146 204 L140 192Z" fill="${skin}"/>
    <path d="M70 138 Q90 129 116 138 Q129 151 128 177 L122 216 Q92 225 62 216 L56 176 Q58 153 70 138Z" fill="${outfit.jacket}" stroke="#485144" stroke-width="2"/>
    <path d="M69 140 L85 155 L92 164 L105 153 L117 138" fill="none" stroke="${outfit.trim}" stroke-width="8" stroke-linecap="round"/>
    <path d="M91 169 V212 M61 184 Q92 192 125 183" fill="none" stroke="#283d33" stroke-width="2" opacity=".6"/>
    <path d="M60 150 L60 212 Q91 229 124 214 L128 160" fill="url(#${id}coat)"/>
    ${scarf}
    <path d="M76 121 L76 146 Q90 158 105 146 L105 123Z" fill="${skin}"/>
    <ellipse cx="92" cy="96" rx="${round}" ry="54" fill="${skin}" stroke="#a9765b" stroke-width="1.8"/>
    <ellipse cx="92" cy="95" rx="48" ry="52" fill="url(#${id}face)"/>
    <ellipse cx="47" cy="104" rx="8" ry="13" fill="${skin}"/><ellipse cx="138" cy="104" rx="8" ry="13" fill="${skin}"/>
    ${crown}${hairFront}
    <ellipse cx="72" cy="105" rx="5.5" ry="7" fill="#332b27"/><ellipse cx="111" cy="105" rx="5.5" ry="7" fill="#332b27"/>
    <circle cx="73.3" cy="102.5" r="2.2" fill="#fff8ea"/><circle cx="112.3" cy="102.5" r="2.2" fill="#fff8ea"/>
    <ellipse cx="61" cy="117" rx="12" ry="6" fill="#d67d74" opacity=".25"/><ellipse cx="123" cy="117" rx="12" ry="6" fill="#d67d74" opacity=".25"/>
    <path d="M84 127 Q92 134 101 126" fill="none" stroke="#8b5347" stroke-width="2.4" stroke-linecap="round"/>
    <path class="avatar-eyelid" d="M66 105 Q72 108 78 105 M104 105 Q111 108 117 105" fill="none" stroke="${hair}" stroke-width="4" stroke-linecap="round"/>
    </svg>`;
}
