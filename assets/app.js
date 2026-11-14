'use strict';
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const safeUrl = url => { if (!url) return ''; if (url.startsWith('assets/') || url.startsWith('./') || url.startsWith('/')) return url; try { const u = new URL(url); return ['https:', 'http:'].includes(u.protocol) ? u.href : ''; } catch {return '';} };
const escapeHtml = str => String(str ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtDate = d => /^\d{4}-\d{2}-\d{2}$/.test(d||'') ? d.replace(/-/g,'.') : escapeHtml(d);
let data; let newsCategory='전체', tourCategory='all';
async function load(){
 try {const response=await fetch('data/site.json?ts='+Date.now(),{cache:'no-store'});if(!response.ok)throw Error('HTTP '+response.status);data=await response.json();}
 catch(e){ const stored=localStorage.getItem('jinhee-site-json');if(stored){try{data=JSON.parse(stored);}catch{}} if(!data){$('#news-grid').innerHTML='<div class="empty">데이터를 읽을 수 없습니다. 웹 서버에서 열거나 관리자 화면에서 데이터를 불러와 주세요.</div>';return;} }
 render();
}
function render(){
 const p=data.profile,meta=data.meta;
 $('#hero-photo').src=safeUrl(p.image);$('#about-photo').src=safeUrl(p.image);$('#image-credit').textContent=p.imageCredit||'';
 $('#profile-bio').textContent=p.bio||''; $('#stat-klpga').textContent=p.klpgaWins||'–';$('#stat-lpga').textContent=p.lpgaWins||'–';
 $('#profile-facts').innerHTML=[['생년월일',p.born],['국적',p.country],['프로 데뷔',p.pro],['LPGA 진출',p.lpga]].map(([label,value])=>`<div class="profile-fact"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`).join('');
 $('#milestones').innerHTML=(data.highlights||[]).map(x=>`<div class="milestone-row"><div class="year">${escapeHtml(x.year)}</div><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(x.detail)}</p><a aria-label="출처 보기" href="${escapeHtml(safeUrl(x.source))}" target="_blank" rel="noopener noreferrer">↗</a></div>`).join('');
 $('#fan-disclaimer').textContent=meta.notice||'';
 $('#resource-links').innerHTML=(data.links||[]).filter(x=>safeUrl(x.url)).map(x=>`<a target="_blank" rel="noopener noreferrer" href="${escapeHtml(safeUrl(x.url))}">${escapeHtml(x.label)} <span>↗</span></a>`).join('');
 renderTours();renderNews();renderGallery();renderCheers();
}
function renderTours(){let items=(data.tournaments||[]).filter(x=>tourCategory==='all'||x.status===tourCategory).sort((a,b)=>(b.start||'').localeCompare(a.start||''));$('#tour-list').innerHTML=items.length?items.map(x=>`<div class="tour-row"><div class="tour-date">${fmtDate(x.start)}<br>~ ${fmtDate(x.end)}</div><div class="tour-name">${escapeHtml(x.name)}${x.note?'<div class="tour-note">'+escapeHtml(x.note)+'</div>':''}</div><div class="tour-location">${escapeHtml(x.location)} · ${escapeHtml(x.status)}</div><div class="tour-result"><b>${escapeHtml(x.result||x.status)}</b></div><a target="_blank" rel="noopener noreferrer" title="공식 출처" href="${escapeHtml(safeUrl(x.source)||'https://www.lpga.com/athletes/jin-hee-im/100380/overview')}">↗</a></div>`).join(''):'<div class="empty">등록된 대회가 없습니다.</div>';}
function renderNews(){const q=($('#search-news').value||'').trim().toLowerCase();let items=(data.posts||[]).filter(x=>(newsCategory==='전체'||x.category===newsCategory)&&(!q||[x.title,x.body,x.category].join(' ').toLowerCase().includes(q))).sort((a,b)=>(b.date||'').localeCompare(a.date||''));$('#news-grid').innerHTML=items.length?items.map(x=>`<button class="news-card" data-post-id="${escapeHtml(x.id)}"><div class="news-meta"><span class="tag">${escapeHtml(x.category)}</span><span class="news-date">${fmtDate(x.date)}</span></div><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml((x.body||'').slice(0,85))}${(x.body||'').length>85?'…':''}</p><div class="news-arrow">↗</div></button>`).join(''):'<div class="empty">검색 결과가 없습니다.</div>';$$('[data-post-id]').forEach(b=>b.onclick=()=>openPost(b.dataset.postId));}
function openPost(id){const p=(data.posts||[]).find(x=>x.id===id);if(!p)return;$('#modal-category').textContent=p.category;$('#modal-title').textContent=p.title;$('#modal-date').textContent=fmtDate(p.date);$('#modal-body').textContent=p.body;const a=$('#modal-source');a.hidden=!safeUrl(p.source);if(!a.hidden)a.href=safeUrl(p.source);$('#article-modal').hidden=false;document.body.style.overflow='hidden';}
function closePost(){$('#article-modal').hidden=true;document.body.style.overflow='';}
function renderGallery(){$('#gallery-grid').innerHTML=(data.gallery||[]).map(x=>`<a class="gallery-card" target="_blank" rel="noopener noreferrer" href="${escapeHtml(safeUrl(x.link))}"><div class="gallery-image">${safeUrl(x.image)?`<img loading="lazy" src="${escapeHtml(safeUrl(x.image))}" alt="${escapeHtml(x.title)}">`:`<div class="gallery-placeholder">J✦</div>`}${x.type==='video'?'<span class="play">▶</span>':''}</div><div class="gallery-description"><small>${escapeHtml(x.type==='video'?'VIDEO':'PHOTO')} · ${fmtDate(x.date)}</small><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(x.credit)}</p></div></a>`).join('')||'<div class="empty">갤러리 준비 중</div>';}
function renderCheers(){$('#cheer-list').innerHTML=(data.cheers||[]).slice().sort((a,b)=>(b.date||'').localeCompare(a.date||'')).slice(0,8).map(x=>`<div class="cheer-item"><p>${escapeHtml(x.message)}</p><small>${escapeHtml(x.name)} · ${fmtDate(x.date)}</small></div>`).join('')||'<div class="empty">첫 응원 메시지를 등록해 보세요.</div>';}
$('#close-modal').onclick=closePost;$('#article-modal').onclick=e=>{if(e.target.id==='article-modal')closePost();};document.addEventListener('keydown',e=>{if(e.key==='Escape')closePost();});
$$('[data-tour]').forEach(b=>b.onclick=()=>{tourCategory=b.dataset.tour;$$('[data-tour]').forEach(x=>x.classList.toggle('active',x===b));renderTours();});
$$('[data-news]').forEach(b=>b.onclick=()=>{newsCategory=b.dataset.news;$$('[data-news]').forEach(x=>x.classList.toggle('active',x===b));renderNews();});
$('#search-news').addEventListener('input',renderNews);
$('#menu-toggle').onclick=()=>{const nav=$('.nav');nav.classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',nav.classList.contains('open'));};$$('.nav a').forEach(a=>a.onclick=()=>{$('.nav').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');});
load();
