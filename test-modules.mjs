import assert from 'node:assert/strict';
import {avatarSVG,DEFAULT_AVATAR,sanitizeAvatar,SKINS,HAIRS,OUTFITS} from '../src/avatar.js';
import {grantXp,earnedXp,balanceXp,CATALOG,PUBLIC_MISSIONS} from '../src/data.js';
for(const gender of ['fille','garcon'])for(const skin of SKINS.keys())for(const hair of HAIRS.keys()){
 const svg=avatarSVG({...DEFAULT_AVATAR,gender,skin,hair});
 assert.match(svg,/^<svg/);assert.match(svg,/<\/svg>$/);assert(svg.includes(gender==='fille'?'fille':'garçon'));
}
assert.equal(sanitizeAvatar({gender:'malformed',skin:999,style:'unknown'}).skin,1);
const game={xpEvents:[],items:[]};
assert.equal(grantXp(game,'stage-1',40),true);
assert.equal(grantXp(game,'stage-1',40),false);
assert.equal(earnedXp(game),40);assert.equal(balanceXp(game),40);
assert.equal(PUBLIC_MISSIONS.length,3);assert.equal(CATALOG.length,4);assert.equal(OUTFITS.length,5);
console.log('PASS: 70 avatar combinations; avatar sanitization; XP deduplication; starter datasets');
