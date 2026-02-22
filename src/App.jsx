import { useState, useEffect, useRef } from "react";
import logo from "./assets/logo2.png";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Jost:wght@300;400;500;600&display=swap');`;

const css = `
*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
body { font-family:'Jost',sans-serif; }

:root {
  --bg:#f5f0ea; --bg2:#ede8e0; --surface:#e8e2d8; --surface2:#dfd9ce;
  --border:#d0c9be; --text:#3a3028; --text2:#7a6e63; --text3:#b0a498;
  --accent:#9c7c5e; --accent2:#b8987a;
  --green:#7a9b7a; --green-bg:rgba(122,155,122,0.12);
  --red:#c47a6a; --red-bg:rgba(196,122,106,0.12);
  --amber:#c4a06a; --amber-bg:rgba(196,160,106,0.12);
  --wish:#9b7a7a; --check:#7a9b7a;
  --shadow:0 2px 16px rgba(60,48,40,0.07); --shadow2:0 4px 32px rgba(60,48,40,0.12);
}
[data-dark="true"] {
  --bg:#18150f; --bg2:#201c14; --surface:#28231a; --surface2:#322c22;
  --border:#40382c; --text:#ede5d8; --text2:#9e9080; --text3:#5e5448;
  --accent:#c49a78; --accent2:#a87d5e;
  --green:#8ab48a; --green-bg:rgba(138,180,138,0.1);
  --red:#d4907c; --red-bg:rgba(212,144,124,0.1);
  --amber:#d4b07c; --amber-bg:rgba(212,176,124,0.1);
  --wish:#c49898; --check:#8ab48a;
  --shadow:0 2px 16px rgba(0,0,0,0.25); --shadow2:0 4px 32px rgba(0,0,0,0.4);
}

.app { min-height:100vh; background:var(--bg); color:var(--text); transition:background 0.3s,color 0.3s; }

.onboard-wrap { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:24px; }
.onboard-card { width:100%; max-width:460px; background:var(--surface); border:1px solid var(--border); border-radius:20px; padding:40px 36px; box-shadow:var(--shadow2); animation:fadeUp 0.4s ease; }
@keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
@keyframes slideIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

.onboard-logo { font-family:'Cormorant Garamond',serif; font-size:28px; font-weight:300; color:var(--text); margin-bottom:4px; letter-spacing:0.04em; }
.onboard-logo span,.header-logo span { color:var(--accent); }
.onboard-sub { font-size:11px; color:var(--text2); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:30px; }

.field { margin-bottom:14px; }
.field label { display:block; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:var(--text2); margin-bottom:5px; }
.inp { width:100%; padding:10px 13px; background:var(--bg); border:1px solid var(--border); border-radius:9px; font-family:'Jost',sans-serif; font-size:14px; color:var(--text); outline:none; transition:border-color 0.2s; }
.inp::placeholder { color:var(--text3); }
.inp:focus { border-color:var(--accent); }
.inp-row { display:flex; gap:10px; }
.inp-row .field { flex:1; }

.goal-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-top:6px; }
.goal-opt { padding:12px 8px; border:1px solid var(--border); border-radius:10px; cursor:pointer; text-align:center; background:var(--bg); transition:all 0.2s; }
.goal-opt:hover { border-color:var(--accent2); }
.goal-opt.selected { background:var(--accent); border-color:var(--accent); color:var(--bg); }
.goal-opt .go-icon { font-size:20px; margin-bottom:4px; }
.goal-opt .go-label { font-size:11px; letter-spacing:0.06em; text-transform:uppercase; }

.primary-btn { width:100%; padding:13px; background:var(--accent); color:var(--bg); border:none; border-radius:10px; font-family:'Jost',sans-serif; font-size:14px; font-weight:500; letter-spacing:0.06em; cursor:pointer; margin-top:22px; transition:all 0.2s; }
.primary-btn:hover { background:var(--accent2); }
.err { color:var(--red); font-size:12px; margin-top:8px; }
.switch-link { text-align:center; margin-top:14px; font-size:13px; color:var(--text2); }
.switch-link button { background:none; border:none; cursor:pointer; color:var(--accent); font-family:'Jost',sans-serif; font-size:13px; text-decoration:underline; }

.header { position:sticky; top:0; z-index:100; background:var(--bg); border-bottom:1px solid var(--border); padding:0 24px; display:flex; align-items:center; justify-content:space-between; height:56px; }
.header-logo { font-family:'Cormorant Garamond',serif; font-size:22px; font-weight:300; letter-spacing:0.04em; }
.header-right { display:flex; align-items:center; gap:8px; }
.icon-btn { width:34px; height:34px; border:1px solid var(--border); background:var(--surface); border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:14px; color:var(--text2); transition:all 0.2s; flex-shrink:0; }
.icon-btn:hover,.icon-btn.active { background:var(--accent); color:var(--bg); border-color:var(--accent); }

.nav { display:flex; padding:0 24px; border-bottom:1px solid var(--border); background:var(--bg); overflow-x:auto; scrollbar-width:none; }
.nav::-webkit-scrollbar { display:none; }
.nav-btn { padding:12px 14px; background:none; border:none; border-bottom:2px solid transparent; cursor:pointer; font-family:'Jost',sans-serif; font-size:11px; font-weight:400; letter-spacing:0.1em; text-transform:uppercase; color:var(--text2); transition:all 0.2s; white-space:nowrap; }
.nav-btn.active { color:var(--accent); border-bottom-color:var(--accent); }
.nav-btn:hover { color:var(--text); }

.content { padding:24px; max-width:680px; margin:0 auto; }
.section-title { font-family:'Cormorant Garamond',serif; font-size:19px; font-weight:400; color:var(--text); margin-bottom:14px; letter-spacing:0.03em; }
.section-title small { font-family:'Jost',sans-serif; font-size:10px; color:var(--text2); letter-spacing:0.08em; text-transform:uppercase; margin-left:10px; vertical-align:middle; }
.divider { height:1px; background:var(--border); margin:22px 0; }
.empty { text-align:center; padding:28px; color:var(--text2); font-size:13px; letter-spacing:0.05em; }

.summary-card { background:var(--surface); border:1px solid var(--border); border-radius:18px; padding:22px; margin-bottom:22px; box-shadow:var(--shadow); }
.cal-row { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:18px; }
.cal-chip { flex:1; min-width:90px; background:var(--bg); border:1px solid var(--border); border-radius:12px; padding:14px 16px; }
.cal-chip-label { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:var(--text2); margin-bottom:6px; }
.cal-chip-val { font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:400; color:var(--text); line-height:1; }
.cal-chip-val span { font-family:'Jost',sans-serif; font-size:11px; color:var(--text2); margin-left:3px; }
.cal-chip-val.green { color:var(--green); }
.cal-chip-val.red { color:var(--red); }
.cal-chip-val.amber { color:var(--amber); }
.net-banner { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; border-radius:12px; }
.net-banner.deficit { background:var(--green-bg); border:1px solid rgba(122,155,122,0.25); }
.net-banner.surplus { background:var(--red-bg); border:1px solid rgba(196,122,106,0.25); }
.net-banner.zero { background:var(--amber-bg); border:1px solid rgba(196,160,106,0.25); }
.net-label { font-size:13px; font-weight:500; }
.net-label.deficit { color:var(--green); }
.net-label.surplus { color:var(--red); }
.net-label.zero { color:var(--amber); }
.net-desc { font-size:11px; color:var(--text2); margin-top:2px; }
.net-num { font-family:'Cormorant Garamond',serif; font-size:32px; font-weight:400; }
.net-num.deficit { color:var(--green); }
.net-num.surplus { color:var(--red); }
.net-num.zero { color:var(--amber); }

.steps-card { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:18px 20px; margin-bottom:20px; display:flex; align-items:center; gap:18px; }
.steps-icon { font-size:24px; flex-shrink:0; color:var(--accent); }
.steps-content { flex:1; }
.steps-label { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:var(--text2); margin-bottom:6px; }
.steps-row { display:flex; align-items:center; gap:12px; }
.steps-inp { width:100px; padding:7px 11px; background:var(--bg); border:1px solid var(--border); border-radius:8px; font-family:'Jost',sans-serif; font-size:20px; font-weight:300; color:var(--accent); outline:none; }
.steps-inp:focus { border-color:var(--accent); }
.steps-burned { font-size:13px; color:var(--green); font-weight:500; }

.add-form { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:16px; margin-bottom:18px; }
.form-row { display:flex; gap:8px; flex-wrap:wrap; align-items:flex-end; }
.form-field { display:flex; flex-direction:column; gap:5px; }
.form-field label { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:var(--text2); }
.f-name { flex:2; min-width:130px; }
.f-num { flex:1; min-width:75px; }
.add-btn { padding:10px 18px; background:var(--accent); color:var(--bg); border:none; border-radius:9px; font-family:'Jost',sans-serif; font-size:13px; font-weight:500; letter-spacing:0.05em; cursor:pointer; transition:all 0.2s; align-self:flex-end; white-space:nowrap; }
.add-btn:hover { background:var(--accent2); }

.food-item { display:flex; align-items:center; gap:12px; padding:12px 15px; background:var(--surface); border:1px solid var(--border); border-radius:11px; margin-bottom:7px; animation:slideIn 0.2s ease; }
.food-dot { width:7px; height:7px; border-radius:50%; background:var(--accent); flex-shrink:0; }
.food-name { flex:1; font-size:14px; color:var(--text); }
.food-meta { font-size:12px; color:var(--text2); margin-right:4px; }
.food-cal { font-size:14px; font-weight:500; color:var(--accent); }
.del-btn { background:none; border:none; cursor:pointer; color:var(--text3); font-size:17px; padding:2px 6px; border-radius:4px; transition:all 0.2s; opacity:0; }
.food-item:hover .del-btn,.list-item:hover .del-btn,.weekly-task:hover .del-btn { opacity:1; }
.del-btn:hover { color:var(--red); }

.date-nav { display:flex; align-items:center; gap:10px; margin-bottom:20px; }
.date-nav-btn { width:30px; height:30px; border:1px solid var(--border); background:var(--surface); border-radius:50%; cursor:pointer; font-size:14px; color:var(--text2); transition:all 0.2s; display:flex; align-items:center; justify-content:center; }
.date-nav-btn:hover { background:var(--accent); color:var(--bg); border-color:var(--accent); }
.date-str { font-size:13px; color:var(--text); letter-spacing:0.04em; flex:1; }

.list-item { display:flex; align-items:center; gap:12px; padding:12px 15px; background:var(--surface); border:1px solid var(--border); border-radius:11px; margin-bottom:7px; animation:slideIn 0.2s ease; }
.checkbox { width:20px; height:20px; border:1.5px solid var(--border); border-radius:5px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all 0.2s; background:var(--bg); color:transparent; font-size:11px; }
.checkbox:hover { border-color:var(--wish); }
.item-text { flex:1; font-size:14px; color:var(--text); }
.tag { font-size:10px; padding:3px 8px; border-radius:12px; background:var(--bg2); color:var(--text2); letter-spacing:0.07em; text-transform:uppercase; }
.tag.wish { background:rgba(155,122,122,0.12); color:var(--wish); }

.schedule-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:22px; }
.schedule-card { background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:16px 18px; }
.schedule-card label { display:block; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:var(--text2); margin-bottom:7px; }
.time-inp { width:100%; padding:8px 10px; background:var(--bg); border:1px solid var(--border); border-radius:8px; font-family:'Jost',sans-serif; font-size:22px; font-weight:300; color:var(--accent); outline:none; }
.time-inp:focus { border-color:var(--accent); }
.habit-row { display:flex; align-items:center; justify-content:space-between; padding:13px 15px; background:var(--surface); border:1px solid var(--border); border-radius:11px; margin-bottom:8px; }
.habit-info { display:flex; align-items:center; gap:12px; }
.habit-icon { font-size:17px; color:var(--accent); }
.habit-name { font-size:14px; color:var(--text); }
.habit-sub { font-size:11px; color:var(--text2); margin-top:2px; }
.habit-actions { display:flex; align-items:center; gap:10px; }
.steps-goal-inp { width:80px; padding:6px 10px; background:var(--bg); border:1px solid var(--border); border-radius:6px; font-family:'Jost',sans-serif; font-size:13px; color:var(--text); outline:none; text-align:center; }
.toggle { width:40px; height:22px; background:var(--border); border-radius:11px; cursor:pointer; position:relative; transition:background 0.2s; border:none; }
.toggle::after { content:''; position:absolute; width:16px; height:16px; background:var(--bg); border-radius:50%; top:3px; left:3px; transition:left 0.2s; }
.toggle.on { background:var(--check); }
.toggle.on::after { left:21px; }

.week-days { display:flex; gap:5px; margin-bottom:14px; }
.day-col { flex:1; text-align:center; }
.day-label { font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:var(--text2); margin-bottom:6px; }
.day-date { font-size:12px; color:var(--text); margin-bottom:8px; }
.track-cell { width:100%; aspect-ratio:1; border-radius:7px; border:1px solid var(--border); background:var(--surface); cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:12px; transition:all 0.2s; margin-bottom:4px; }
.track-cell.done { background:var(--green-bg); border-color:var(--check); color:var(--check); }
.track-cell.today-cell { border-color:var(--accent); }
.habit-track-row { margin-bottom:10px; }
.habit-track-label { font-size:11px; color:var(--text2); margin-bottom:5px; display:flex; align-items:center; gap:6px; }
.pdf-btn { display:flex; align-items:center; gap:8px; padding:11px 20px; background:var(--surface); border:1px solid var(--border); border-radius:10px; cursor:pointer; font-family:'Jost',sans-serif; font-size:13px; color:var(--text); transition:all 0.2s; margin-top:22px; width:100%; justify-content:center; letter-spacing:0.05em; }
.pdf-btn:hover { background:var(--accent); color:var(--bg); border-color:var(--accent); }

/* REMINDERS */
.notif-banner { display:flex; align-items:center; gap:12px; padding:13px 16px; border-radius:11px; margin-bottom:20px; font-size:13px; }
.notif-banner.pending { background:var(--amber-bg); border:1px solid rgba(196,160,106,0.3); color:var(--amber); }
.notif-banner.granted { background:var(--green-bg); border:1px solid rgba(122,155,122,0.3); color:var(--green); }
.notif-banner.denied { background:var(--red-bg); border:1px solid rgba(196,122,106,0.3); color:var(--red); }
.notif-banner button { margin-left:auto; padding:6px 14px; background:var(--amber); color:var(--bg); border:none; border-radius:7px; font-family:'Jost',sans-serif; font-size:12px; cursor:pointer; font-weight:500; }

.reminder-card { background:var(--surface); border:1px solid var(--border); border-radius:14px; margin-bottom:10px; overflow:hidden; animation:slideIn 0.2s ease; }
.reminder-header { display:flex; align-items:center; gap:12px; padding:14px 16px; cursor:pointer; user-select:none; transition:background 0.15s; }
.reminder-header:hover { background:var(--surface2); }
.reminder-habit-icon { font-size:18px; color:var(--accent); }
.reminder-habit-name { flex:1; font-size:14px; color:var(--text); font-weight:500; }
.reminder-count { font-size:11px; color:var(--text2); background:var(--bg); border:1px solid var(--border); border-radius:20px; padding:3px 9px; }
.reminder-chevron { font-size:13px; color:var(--text3); transition:transform 0.2s; display:inline-block; }
.reminder-chevron.open { transform:rotate(90deg); }
.reminder-body { border-top:1px solid var(--border); padding:14px 16px; background:var(--bg2); }
.reminder-timers { display:flex; flex-direction:column; gap:7px; margin-bottom:14px; }
.reminder-timer { display:flex; align-items:center; gap:10px; padding:10px 14px; background:var(--surface); border:1px solid var(--border); border-radius:9px; }
.timer-dot { width:7px; height:7px; border-radius:50%; background:var(--green); animation:pulse 2s infinite; flex-shrink:0; }
.timer-time { font-family:'Cormorant Garamond',serif; font-size:20px; font-weight:400; color:var(--accent); flex:1; }
.timer-label-txt { font-size:12px; color:var(--text2); }
.del-timer-btn { background:none; border:none; cursor:pointer; color:var(--text3); font-size:16px; padding:2px 6px; border-radius:4px; transition:all 0.2s; opacity:0; }
.reminder-timer:hover .del-timer-btn { opacity:1; }
.del-timer-btn:hover { color:var(--red); }
.add-timer-row { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }
.timer-time-inp { padding:8px 12px; background:var(--surface); border:1px solid var(--border); border-radius:8px; font-family:'Jost',sans-serif; font-size:14px; color:var(--text); outline:none; flex-shrink:0; }
.timer-time-inp:focus { border-color:var(--accent); }
.timer-lbl-inp { flex:1; min-width:100px; padding:8px 12px; background:var(--surface); border:1px solid var(--border); border-radius:8px; font-family:'Jost',sans-serif; font-size:14px; color:var(--text); outline:none; }
.timer-lbl-inp::placeholder { color:var(--text3); }
.timer-lbl-inp:focus { border-color:var(--accent); }
.add-timer-btn { padding:8px 16px; background:var(--accent); color:var(--bg); border:none; border-radius:8px; font-family:'Jost',sans-serif; font-size:12px; font-weight:500; cursor:pointer; transition:all 0.2s; white-space:nowrap; }
.add-timer-btn:hover { background:var(--accent2); }

/* WEEKLY TASKS */
.add-weekly-form { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:16px; margin-bottom:20px; }
.day-selector { display:flex; gap:6px; flex-wrap:wrap; margin-top:6px; }
.day-chip { padding:6px 12px; border:1px solid var(--border); border-radius:20px; background:var(--bg); font-size:11px; color:var(--text2); cursor:pointer; letter-spacing:0.06em; text-transform:uppercase; transition:all 0.2s; }
.day-chip.sel { background:var(--accent); border-color:var(--accent); color:var(--bg); }
.weekly-task { display:flex; align-items:center; gap:12px; padding:13px 16px; background:var(--surface); border:1px solid var(--border); border-radius:11px; margin-bottom:7px; animation:slideIn 0.2s ease; }
.task-check { width:22px; height:22px; border:1.5px solid var(--border); border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:all 0.2s; background:var(--bg); color:transparent; font-size:12px; }
.task-check.done { background:var(--check); border-color:var(--check); color:var(--bg); }
.weekly-task-info { flex:1; }
.weekly-task-name { font-size:14px; color:var(--text); margin-bottom:3px; }
.weekly-task-name.struck { text-decoration:line-through; opacity:0.45; }
.weekly-task-meta { font-size:11px; color:var(--text2); display:flex; align-items:center; gap:6px; }
.day-badge { padding:2px 8px; background:var(--accent); color:var(--bg); border-radius:10px; font-size:10px; letter-spacing:0.08em; text-transform:uppercase; }
.day-badge.today-badge { background:var(--green); }
.today-section-label { font-size:12px; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:10px; display:flex; align-items:center; gap:8px; }

/* PROFILE */
.profile-card { background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:22px; margin-bottom:14px; }
.profile-avatar { width:56px; height:56px; border-radius:50%; background:var(--surface2); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; font-size:26px; margin-bottom:14px; }
.profile-name { font-family:'Cormorant Garamond',serif; font-size:24px; font-weight:400; margin-bottom:4px; }
.profile-header-row { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:4px; }
.goal-badge { display:inline-flex; align-items:center; gap:5px; padding:5px 12px; border-radius:20px; font-size:11px; font-weight:500; letter-spacing:0.07em; text-transform:uppercase; margin-top:8px; }
.goal-badge.loss { background:var(--green-bg); color:var(--green); }
.goal-badge.gain { background:var(--red-bg); color:var(--red); }
.goal-badge.maintain { background:var(--amber-bg); color:var(--amber); }
.bmi-row { display:flex; gap:10px; flex-wrap:wrap; margin-top:16px; }
.bmi-chip { padding:10px 14px; border-radius:10px; border:1px solid var(--border); background:var(--bg); }
.bmi-chip-label { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:var(--text2); margin-bottom:4px; }
.bmi-chip-val { font-size:18px; font-weight:400; font-family:'Cormorant Garamond',serif; color:var(--text); }
.bmi-chip-val span { font-size:11px; font-family:'Jost',sans-serif; color:var(--text2); margin-left:3px; }
.edit-btn { padding:8px 16px; background:none; border:1px solid var(--border); border-radius:9px; font-family:'Jost',sans-serif; font-size:12px; letter-spacing:0.07em; text-transform:uppercase; color:var(--text2); cursor:pointer; transition:all 0.2s; }
.edit-btn:hover { border-color:var(--accent); color:var(--accent); }
.edit-btn.save { background:var(--accent); border-color:var(--accent); color:var(--bg); }
.edit-btn.cancel:hover { border-color:var(--red); color:var(--red); }
.edit-row { display:flex; gap:10px; flex-wrap:wrap; margin-top:16px; }
.edit-field { display:flex; flex-direction:column; gap:5px; flex:1; min-width:80px; }
.edit-field label { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:var(--text2); }
.goal-edit-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-top:6px; }
.goal-edit-opt { padding:10px 6px; border:1px solid var(--border); border-radius:9px; cursor:pointer; text-align:center; background:var(--bg); transition:all 0.2s; font-size:12px; color:var(--text2); letter-spacing:0.06em; text-transform:uppercase; }
.goal-edit-opt.sel { background:var(--accent); border-color:var(--accent); color:var(--bg); }
.saved-flash { font-size:12px; color:var(--green); letter-spacing:0.06em; animation:fadeIn 0.3s ease; }
.logout-btn { padding:9px 18px; background:none; border:1px solid var(--border); border-radius:9px; font-family:'Jost',sans-serif; font-size:13px; color:var(--text2); cursor:pointer; margin-top:18px; transition:all 0.2s; }
.logout-btn:hover { border-color:var(--red); color:var(--red); }
`;

function calcBMR(w, h, age, gender) {
  const b = 10 * w + 6.25 * h - 5 * age;
  return gender === "male" ? b + 5 : b - 161;
}
function calcTDEE(bmr) {
  return Math.round(bmr * 1.375);
}
function calcBMI(w, h) {
  const hm = h / 100;
  return (w / (hm * hm)).toFixed(1);
}
function bmiCat(b) {
  if (b < 18.5) return "Underweight";
  if (b < 25) return "Normal";
  if (b < 30) return "Overweight";
  return "Obese";
}
function stepsBurned(s) {
  return Math.round(s * 0.04);
}
function todayKey() {
  return new Date().toISOString().split("T")[0];
}
function dateOffset(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
}
function fmtDate(k) {
  if (k === todayKey()) return "Today";
  if (k === dateOffset(-1)) return "Yesterday";
  const d = new Date(k + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function getWeekDates() {
  const t = new Date();
  const day = t.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const mon = new Date(t);
  mon.setDate(t.getDate() + diff);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(mon);
    d.setDate(mon.getDate() + i);
    return d;
  });
}
function currentDayName() {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][new Date().getDay()];
}
function fmt12(t) {
  const [h, m] = t.split(":").map(Number);
  const ap = h >= 12 ? "PM" : "AM";
  const hr = h % 12 || 12;
  return `${hr}:${String(m).padStart(2, "0")} ${ap}`;
}

// --- FIXED STORAGE FUNCTIONS TO USE NATIVE LOCAL STORAGE ---
async function sGet(k) {
  try {
    const r = localStorage.getItem(k);
    return r ? JSON.parse(r) : null;
  } catch {
    return null;
  }
}
async function sSet(k, v) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
}
// ---------------------------------------------------------

const DEFAULT_HABITS = [
  {
    id: "skincare",
    icon: "✦",
    name: "Skincare",
    sub: "Morning & night routine",
    type: "toggle",
  },
  {
    id: "diet",
    icon: "◈",
    name: "Proper Diet",
    sub: "Balanced meals today",
    type: "toggle",
  },
  {
    id: "steps",
    icon: "◉",
    name: "Walking Steps",
    sub: "Daily step goal",
    type: "steps",
  },
  {
    id: "water",
    icon: "◇",
    name: "Water Intake",
    sub: "Stay hydrated",
    type: "toggle",
  },
  {
    id: "sleep",
    icon: "◑",
    name: "Quality Sleep",
    sub: "Restful sleep",
    type: "toggle",
  },
];
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const DAYS_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function useNotifCheck(reminders, weeklyTasks, profile) {
  const timerRef = useRef(null);

  useEffect(() => {
    // If no user is logged in OR they didn't provide an email, stop here.
    if (!profile || !profile.email) return;

    if (timerRef.current) clearInterval(timerRef.current);

    const check = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const timeNow = `${hh}:${mm}`;
      const dayNow = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ][now.getDay()];

      // --- CHECK DAILY HABIT TIMERS ---
      (reminders || []).forEach((r) => {
        (r.timers || []).forEach((t) => {
          if (t.time === timeNow) {
            // Trigger Backend Email for Habit
            fetch(
              "https://project-t-backend-production.up.railway.app/send-reminder",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  to: profile.email,
                  subject: `⏰ Time for ${r.habitName}`,
                  text: t.label || `Time for your ${r.habitName} routine!`,
                }),
              },
            ).catch((err) => console.error("Email API failed:", err));
          }
        });
      });

      // --- CHECK WEEKLY TASK TIMERS ---
      (weeklyTasks || []).forEach((task) => {
        if (
          task.day === dayNow &&
          task.reminderTime === timeNow &&
          !task.doneThisWeek
        ) {
          // Trigger Backend Email for Weekly Task
          fetch(
            "https://project-t-backend-production.up.railway.app/send-reminder",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                to: profile.email,
                subject: `📋 Weekly Task: ${task.name}`,
                text: `Don't forget to complete your task: ${task.name}`,
              }),
            },
          ).catch((err) => console.error("Email API failed:", err));
        }
      });
    };

    // Check the clock every 60 seconds
    timerRef.current = setInterval(check, 60000);
    return () => clearInterval(timerRef.current);
  }, [reminders, weeklyTasks, profile]);
}

function RemindersTab({ reminders, setReminders, currentUser }) {
  const [openId, setOpenId] = useState(null);
  const [newTime, setNewTime] = useState("08:00");
  const [newLabel, setNewLabel] = useState("");
  const [showAddRem, setShowAddRem] = useState(false); // Controls the panel visibility

  const save = async (updated) => {
    setReminders(updated);
    await sSet(`reminders_${currentUser}`, updated);
  };

  const addTimer = async (habitId) => {
    if (!newTime) return;
    const updated = reminders.map((r) =>
      r.id !== habitId
        ? r
        : {
            ...r,
            timers: [
              ...(r.timers || []),
              { id: Date.now(), time: newTime, label: newLabel.trim() },
            ],
          },
    );
    await save(updated);
    setNewLabel("");
  };

  const delTimer = async (habitId, timerId) => {
    const updated = reminders.map((r) =>
      r.id !== habitId
        ? r
        : { ...r, timers: (r.timers || []).filter((t) => t.id !== timerId) },
    );
    await save(updated);
  };

  const addNewReminderList = async (newList) => {
    const updated = [...reminders, newList];
    await save(updated);
    setShowAddRem(false); // Hides panel after adding
  };

  const delReminderList = async (id) => {
    const updated = reminders.filter((r) => r.id !== id);
    await save(updated);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <div className="section-title" style={{ marginBottom: 0 }}>
          Reminders <small>multiple timers per habit</small>
        </div>
        <button
          className="plus-habit-btn"
          onClick={() => setShowAddRem((v) => !v)}
        >
          {showAddRem ? "✕ Cancel" : "+ Add Reminder"}
        </button>
      </div>

      {showAddRem && <AddReminderPanel onAdd={addNewReminderList} />}

      {reminders.map((r) => {
        const isOpen = openId === r.id;
        const isCustom = r.id.startsWith("rem_"); // Checks if it was manually created here

        return (
          <div key={r.id} className="reminder-card">
            <div
              className="reminder-header"
              onClick={() => setOpenId(isOpen ? null : r.id)}
            >
              <div className="reminder-habit-icon">{r.icon}</div>
              <div className="reminder-habit-name">{r.habitName}</div>
              <div className="reminder-count">
                {(r.timers || []).length} timer
                {(r.timers || []).length !== 1 ? "s" : ""}
              </div>
              <span className={`reminder-chevron${isOpen ? " open" : ""}`}>
                ›
              </span>
            </div>
            {isOpen && (
              <div className="reminder-body">
                <div className="reminder-timers">
                  {(r.timers || []).length === 0 && (
                    <div
                      style={{
                        fontSize: 12,
                        color: "var(--text2)",
                        padding: "4px 0",
                      }}
                    >
                      No timers yet. Add one below.
                    </div>
                  )}
                  {(r.timers || []).map((t) => (
                    <div key={t.id} className="reminder-timer">
                      <div className="timer-dot" />
                      <div className="timer-time">{fmt12(t.time)}</div>
                      {t.label && (
                        <div className="timer-label-txt">{t.label}</div>
                      )}
                      <button
                        className="del-timer-btn"
                        onClick={() => delTimer(r.id, t.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="add-timer-row">
                  <input
                    className="timer-time-inp"
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                  />
                  <input
                    className="timer-lbl-inp"
                    placeholder='Label e.g. "Morning"'
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTimer(r.id)}
                  />
                  <button
                    className="add-timer-btn"
                    onClick={() => addTimer(r.id)}
                  >
                    + Add Timer
                  </button>
                </div>

                {isCustom && (
                  <div
                    style={{
                      marginTop: 14,
                      paddingTop: 14,
                      borderTop: "1px solid var(--border)",
                      textAlign: "right",
                    }}
                  >
                    <button
                      className="del-habit-btn"
                      style={{
                        display: "inline-flex",
                        width: "auto",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        gap: "6px",
                        border: "1px solid var(--border)",
                        background: "transparent",
                      }}
                      onClick={() => delReminderList(r.id)}
                    >
                      × Delete Category
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

function WeeklyTasksTab({ weeklyTasks, setWeeklyTasks, currentUser }) {
  const [taskName, setTaskName] = useState("");
  const [taskDay, setTaskDay] = useState("Monday");
  const [taskTime, setTaskTime] = useState("09:00");
  const todayDay = currentDayName();
  const save = async (updated) => {
    setWeeklyTasks(updated);
    await sSet(`weekly_${currentUser}`, updated);
  };
  const addTask = async () => {
    if (!taskName.trim()) return;
    await save([
      ...weeklyTasks,
      {
        id: Date.now(),
        name: taskName.trim(),
        day: taskDay,
        reminderTime: taskTime,
        doneThisWeek: false,
      },
    ]);
    setTaskName("");
    setTaskDay("Monday");
    setTaskTime("09:00");
  };
  const toggleDone = async (id) =>
    await save(
      weeklyTasks.map((t) =>
        t.id === id ? { ...t, doneThisWeek: !t.doneThisWeek } : t,
      ),
    );
  const delTask = async (id) =>
    await save(weeklyTasks.filter((t) => t.id !== id));
  const grouped = DAYS.reduce((acc, d) => {
    acc[d] = weeklyTasks.filter((t) => t.day === d);
    return acc;
  }, {});

  return (
    <>
      <div className="section-title">Add Weekly Task</div>
      <div className="add-weekly-form">
        <div className="form-row" style={{ marginBottom: 12 }}>
          <div className="form-field" style={{ flex: 2, minWidth: 140 }}>
            <label>Task name</label>
            <input
              className="inp"
              placeholder="e.g. Oil hair, Iron clothes, Wash bedding..."
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
          </div>
          <div className="form-field" style={{ flex: 1, minWidth: 90 }}>
            <label>Remind at</label>
            <input
              className="inp"
              type="time"
              value={taskTime}
              onChange={(e) => setTaskTime(e.target.value)}
            />
          </div>
        </div>
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text2)",
              marginBottom: 8,
            }}
          >
            Day of the week
          </div>
          <div className="day-selector">
            {DAYS.map((d) => (
              <div
                key={d}
                className={`day-chip${taskDay === d ? " sel" : ""}`}
                onClick={() => setTaskDay(d)}
              >
                {d.slice(0, 3)}
              </div>
            ))}
          </div>
        </div>
        <button className="add-btn" style={{ width: "100%" }} onClick={addTask}>
          + Add Task
        </button>
      </div>

      {weeklyTasks.length === 0 && (
        <div className="empty">No weekly tasks yet</div>
      )}
      {DAYS.map((day) => {
        const tasks = grouped[day];
        if (!tasks.length) return null;
        const isToday = day === todayDay;
        return (
          <div key={day} style={{ marginBottom: 20 }}>
            <div
              className="today-section-label"
              style={{ color: isToday ? "var(--accent)" : "var(--text2)" }}
            >
              {day}
              {isToday && (
                <span
                  style={{
                    fontSize: 10,
                    padding: "2px 8px",
                    background: "var(--accent)",
                    color: "var(--bg)",
                    borderRadius: 10,
                  }}
                >
                  Today
                </span>
              )}
            </div>
            {tasks.map((task) => (
              <div key={task.id} className="weekly-task">
                <div
                  className={`task-check${task.doneThisWeek ? " done" : ""}`}
                  onClick={() => toggleDone(task.id)}
                >
                  {task.doneThisWeek ? "✓" : ""}
                </div>
                <div className="weekly-task-info">
                  <div
                    className={`weekly-task-name${task.doneThisWeek ? " struck" : ""}`}
                  >
                    {task.name}
                  </div>
                  <div className="weekly-task-meta">
                    <span
                      className={`day-badge${isToday ? " today-badge" : ""}`}
                    >
                      {day.slice(0, 3)}
                    </span>
                    reminder {fmt12(task.reminderTime)}
                  </div>
                </div>
                <button className="del-btn" onClick={() => delTask(task.id)}>
                  ×
                </button>
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}

function ProfileTab({ profile, onSave, onLogout }) {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    age: profile.age,
    weight: profile.weight,
    height: profile.height,
    gender: profile.gender,
    goal: profile.goal,
    email: profile.email || "",
    phone: profile.phone || "",
  });
  useEffect(() => {
    setForm({
      age: profile.age,
      weight: profile.weight,
      height: profile.height,
      gender: profile.gender,
      goal: profile.goal,
      email: profile.email || "",
      phone: profile.phone || "",
    });
  }, [profile]);
  const handleSave = async () => {
    await onSave({
      age: +form.age,
      weight: +form.weight,
      height: +form.height,
      gender: form.gender,
      goal: form.goal,
      email: form.email,
      phone: form.phone,
    });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  const handleCancel = () => {
    setForm({
      age: profile.age,
      weight: profile.weight,
      height: profile.height,
      gender: profile.gender,
      goal: profile.goal,
    });
    setEditing(false);
  };
  const bmi = calcBMI(+form.weight, +form.height);
  const bmr = calcBMR(+form.weight, +form.height, +form.age, form.gender);
  const tdee = calcTDEE(bmr);
  const goalLabels = {
    loss: "Weight Loss",
    gain: "Weight Gain",
    maintain: "Maintain",
  };
  const goalIcons = { loss: "↓", gain: "↑", maintain: "◎" };
  return (
    <>
      <div className="profile-card">
        <div className="profile-header-row">
          <div className="profile-avatar">◉</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {saved && <span className="saved-flash">✓ Saved</span>}
            {!editing ? (
              <button className="edit-btn" onClick={() => setEditing(true)}>
                Edit Profile
              </button>
            ) : (
              <>
                <button className="edit-btn save" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="edit-btn cancel"
                  style={{ marginLeft: 8 }}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
        <div className="profile-name">{profile.name}</div>
        <div className={`goal-badge ${form.goal}`}>
          {goalIcons[form.goal]} {goalLabels[form.goal]}
        </div>
        {!editing && (profile.email || profile.phone) && (
          <div
            style={{
              marginTop: 12,
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            {profile.email && (
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text2)",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                📬 {profile.email}
              </div>
            )}
            {profile.phone && (
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text2)",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                📱 {profile.phone}
              </div>
            )}
          </div>
        )}
        {editing && (
          <>
            <div className="edit-row">
              <div className="edit-field">
                <label>Age</label>
                <input
                  className="inp"
                  type="number"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>
              <div className="edit-field">
                <label>Weight (kg)</label>
                <input
                  className="inp"
                  type="number"
                  value={form.weight}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}
                />
              </div>
              <div className="edit-field">
                <label>Height (cm)</label>
                <input
                  className="inp"
                  type="number"
                  value={form.height}
                  onChange={(e) => setForm({ ...form, height: e.target.value })}
                />
              </div>
              <div className="edit-field">
                <label>Sex</label>
                <select
                  className="inp"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="edit-row">
              <div className="edit-field">
                <label>Email</label>
                <input
                  className="inp"
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="edit-field">
                <label>Phone</label>
                <input
                  className="inp"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text2)",
                  marginBottom: 7,
                }}
              >
                Goal
              </div>
              <div className="goal-edit-grid">
                {[
                  { v: "loss", l: "🍃 Lose" },
                  { v: "maintain", l: "⚖ Maintain" },
                  { v: "gain", l: "💪 Gain" },
                ].map((g) => (
                  <div
                    key={g.v}
                    className={`goal-edit-opt${form.goal === g.v ? " sel" : ""}`}
                    onClick={() => setForm({ ...form, goal: g.v })}
                  >
                    {g.l}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        <div className="bmi-row" style={{ marginTop: editing ? 16 : 0 }}>
          {[
            { label: "BMI", val: bmi, unit: bmiCat(+bmi) },
            { label: "TDEE", val: tdee, unit: "kcal/day" },
            { label: "BMR", val: Math.round(bmr), unit: "kcal" },
            { label: "Weight", val: form.weight, unit: "kg" },
            { label: "Height", val: form.height, unit: "cm" },
            { label: "Age", val: form.age, unit: "yrs" },
          ].map((c) => (
            <div key={c.label} className="bmi-chip">
              <div className="bmi-chip-label">{c.label}</div>
              <div className="bmi-chip-val">
                {c.val}
                <span>{c.unit}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="logout-btn" onClick={onLogout}>
          Sign out
        </button>
      </div>
      <div
        className="profile-card"
        style={{ fontSize: "13px", color: "var(--text2)", lineHeight: "1.9" }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "17px",
            color: "var(--text)",
            marginBottom: "10px",
          }}
        >
          How your numbers are calculated
        </div>
        <div>
          BMI = weight ÷ height² ={" "}
          <strong style={{ color: "var(--text)" }}>
            {bmi} ({bmiCat(+bmi)})
          </strong>
        </div>
        <div>
          BMR (Mifflin-St Jeor) ={" "}
          <strong style={{ color: "var(--text)" }}>
            {Math.round(bmr)} kcal
          </strong>
        </div>
        <div>
          TDEE (BMR × 1.375 lightly active) ={" "}
          <strong style={{ color: "var(--text)" }}>{tdee} kcal/day</strong>
        </div>
        <div>Steps burned = steps × 0.04 kcal</div>
      </div>
    </>
  );
}

/* ── ADD HABIT PANEL CSS (injected via style tag in component) ── */
const habitPanelCss = `
.plus-habit-btn {
  display:flex; align-items:center; gap:6px;
  padding:8px 16px;
  background:var(--accent); color:var(--bg);
  border:none; border-radius:20px;
  font-family:'Jost',sans-serif; font-size:12px; font-weight:500;
  letter-spacing:0.07em; text-transform:uppercase;
  cursor:pointer; transition:all 0.2s; white-space:nowrap;
}
.plus-habit-btn:hover { background:var(--accent2); }

.add-habit-panel {
  background:var(--surface); border:1px solid var(--border);
  border-radius:16px; padding:20px; margin-bottom:18px;
  animation:slideIn 0.25s ease;
}
.add-habit-panel-title {
  font-family:'Cormorant Garamond',serif; font-size:17px; font-weight:400;
  color:var(--text); margin-bottom:16px; letter-spacing:0.03em;
}
.habit-icon-grid {
  display:flex; flex-wrap:wrap; gap:8px; margin-top:6px;
}
.habit-icon-opt {
  width:36px; height:36px; border:1px solid var(--border);
  border-radius:9px; background:var(--bg); cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  font-size:18px; transition:all 0.15s;
}
.habit-icon-opt:hover { border-color:var(--accent2); background:var(--surface2); }
.habit-icon-opt.sel { background:var(--accent); border-color:var(--accent); }

.ai-desc-btn {
  padding:7px 14px; background:none; border:1px solid var(--accent);
  border-radius:8px; font-family:'Jost',sans-serif; font-size:12px;
  color:var(--accent); cursor:pointer; transition:all 0.2s;
  display:flex; align-items:center; gap:6px; white-space:nowrap;
}
.ai-desc-btn:hover { background:var(--accent); color:var(--bg); }
.ai-desc-btn:disabled { opacity:0.5; cursor:not-allowed; }
.ai-loading { display:inline-block; animation:pulse 1s infinite; }

.del-habit-btn {
  width:22px; height:22px; border-radius:50%;
  background:none; border:1px solid var(--border);
  cursor:pointer; font-size:13px; color:var(--text3);
  display:flex; align-items:center; justify-content:center;
  transition:all 0.2s; flex-shrink:0;
}
.del-habit-btn:hover { background:var(--red-bg); border-color:var(--red); color:var(--red); }
`;

const HABIT_ICONS = [
  "◆",
  "★",
  "♡",
  "☀",
  "◈",
  "✦",
  "◉",
  "◇",
  "◑",
  "⬡",
  "⟡",
  "◎",
  "❋",
  "⊕",
  "⊛",
  "☽",
  "⚡",
  "✿",
  "⬟",
  "◐",
];

function AddHabitPanel({ onAdd }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("◆");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiErr, setAiErr] = useState("");

  const generateDesc = async () => {
    if (!name.trim()) {
      setAiErr("Enter a habit name first.");
      return;
    }
    setAiLoading(true);
    setAiErr("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 80,
          messages: [
            {
              role: "user",
              content: `Write a short, motivating description for a daily habit called "${name.trim()}". Max 10 words. No quotes. Just the description.`,
            },
          ],
        }),
      });
      const data = await res.json();
      const text = (data.content || [])
        .map((c) => c.text || "")
        .join("")
        .trim();
      setDesc(text || "");
    } catch (e) {
      setAiErr("Could not generate — please type your own.");
    }
    setAiLoading(false);
  };

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd({
      id: `custom_${Date.now()}`,
      name: name.trim(),
      sub: desc.trim() || name.trim(),
      icon,
      type: "toggle",
    });
    setName("");
    setDesc("");
    setIcon("◆");
  };

  return (
    <>
      <style>{habitPanelCss}</style>
      <div className="add-habit-panel">
        <div className="add-habit-panel-title">New Daily Habit</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text2)",
                marginBottom: 5,
              }}
            >
              Habit Name
            </div>
            <input
              className="inp"
              placeholder="e.g. Journaling, Reading, Meditation..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
          </div>
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text2)",
                marginBottom: 5,
              }}
            >
              Icon
            </div>
            <div className="habit-icon-grid">
              {HABIT_ICONS.map((ic) => (
                <div
                  key={ic}
                  className={`habit-icon-opt${icon === ic ? " sel" : ""}`}
                  onClick={() => setIcon(ic)}
                >
                  {ic}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text2)",
                marginBottom: 5,
              }}
            >
              Description
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <textarea
                className="inp"
                placeholder="Write a short description, or use AI ✦"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{ resize: "vertical", minHeight: 56, flex: 1 }}
              />
              <button
                className="ai-desc-btn"
                onClick={generateDesc}
                disabled={aiLoading}
                title="Generate with AI"
              >
                {aiLoading ? <span className="ai-loading">✦</span> : "✦"}{" "}
                {aiLoading ? "Thinking…" : "AI"}
              </button>
            </div>
            {aiErr && (
              <div style={{ fontSize: 11, color: "var(--red)", marginTop: 4 }}>
                {aiErr}
              </div>
            )}
          </div>
          <button
            className="add-btn"
            style={{ width: "100%" }}
            onClick={handleAdd}
          >
            + Add Habit
          </button>
        </div>
      </div>
    </>
  );
}

function AddReminderPanel({ onAdd }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("◆");

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd({
      id: `rem_${Date.now()}`,
      habitName: name.trim(),
      icon,
      timers: [],
    });
    setName("");
    setIcon("◆");
  };

  return (
    <>
      <style>{habitPanelCss}</style>
      <div className="add-habit-panel">
        <div className="add-habit-panel-title">New Reminder Category</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text2)",
                marginBottom: 5,
              }}
            >
              Reminder Name
            </div>
            <input
              className="inp"
              placeholder="e.g. Take Vitamins, Call Mom..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
          </div>
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text2)",
                marginBottom: 5,
              }}
            >
              Icon
            </div>
            <div className="habit-icon-grid">
              {HABIT_ICONS.map((ic) => (
                <div
                  key={ic}
                  className={`habit-icon-opt${icon === ic ? " sel" : ""}`}
                  onClick={() => setIcon(ic)}
                >
                  {ic}
                </div>
              ))}
            </div>
          </div>
          <button
            className="add-btn"
            style={{ width: "100%" }}
            onClick={handleAdd}
          >
            + Add Reminder
          </button>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [screen, setScreen] = useState("login");
  const [tab, setTab] = useState("food");
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [dayOffset, setDayOffset] = useState(0);
  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [reg, setReg] = useState({
    name: "",
    pass: "",
    age: "",
    weight: "",
    height: "",
    gender: "female",
    goal: "loss",
  });
  const [foodLog, setFoodLog] = useState([]);
  const [foodSteps, setFoodSteps] = useState("");
  const [fName, setFName] = useState("");
  const [fGrams, setFGrams] = useState("");
  const [fCal, setFCal] = useState("");
  const [wishItems, setWishItems] = useState([]);
  const [wishInput, setWishInput] = useState("");
  const [wishLink, setWishLink] = useState(""); // NEW: State for Wishlist Links
  const [wakeTime, setWakeTime] = useState("06:30");
  const [sleepTime, setSleepTime] = useState("22:30");
  const [trackData, setTrackData] = useState({});
  const [stepGoal, setStepGoal] = useState(8000);
  const [reminders, setReminders] = useState([]);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [customHabits, setCustomHabits] = useState([]);
  const [removedHabits, setRemovedHabits] = useState([]);
  const [showAddHabit, setShowAddHabit] = useState(false);
  const iframeRef = useRef(null);

  // Hook receives profile so Nodemailer can access the user's email
  useNotifCheck(reminders, weeklyTasks, profile);

  const viewDay = dayOffset === 0 ? todayKey() : dateOffset(dayOffset);
  const isToday = viewDay === todayKey();
  const weekDays = getWeekDates();
  const todayStr = todayKey();

  useEffect(() => {
    (async () => {
      const u = await sGet("current_user");
      if (u) {
        const p = await sGet(`profile_${u}`);
        if (p) {
          setCurrentUser(u);
          setProfile(p);
          setScreen("app");
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      const log = await sGet(`food_${currentUser}_${viewDay}`);
      setFoodLog(log || []);
      const s = await sGet(`steps_${currentUser}_${viewDay}`);
      setFoodSteps(s !== null ? String(s) : "");
      const w = await sGet(`wish_${currentUser}`);
      setWishItems(w || []);
      const sc = await sGet(`schedule_${currentUser}`);
      if (sc) {
        setWakeTime(sc.wake || "06:30");
        setSleepTime(sc.sleep || "22:30");
      }
      // Automatically clear habit data older than the current week's Monday
      const td = await sGet(`track_${currentUser}`);
      if (td) {
        const currentMon = getWeekDates()[0].toISOString().split("T")[0];
        const cleanedTd = {};
        let hasOldData = false;

        Object.entries(td).forEach(([k, v]) => {
          const dateStr = k.split("_")[0];
          // Keep data if it belongs to this week (Monday onwards)
          if (dateStr >= currentMon) {
            cleanedTd[k] = v;
          } else {
            hasOldData = true; // Flag that we found data from previous weeks
          }
        });

        setTrackData(cleanedTd);
        if (hasOldData) await sSet(`track_${currentUser}`, cleanedTd);
      } else {
        setTrackData({});
      }
      const sg = await sGet(`stepgoal_${currentUser}`);
      if (sg) setStepGoal(sg);
      const wt = await sGet(`weekly_${currentUser}`);
      setWeeklyTasks(wt || []);
      const ch = await sGet(`customhabits_${currentUser}`);
      const chArr = ch || [];
      setCustomHabits(chArr);
      const rh = await sGet(`removedhabits_${currentUser}`);
      setRemovedHabits(rh || []);
      const rhArr = rh || [];
      const allH = [
        ...DEFAULT_HABITS.filter((h) => !rhArr.includes(h.id)),
        ...chArr,
      ];
      const rem = await sGet(`reminders_${currentUser}`);
      if (rem) {
        const remIds = rem.map((r) => r.id);
        const missing = allH
          .filter((h) => !remIds.includes(h.id))
          .map((h) => ({
            id: h.id,
            habitName: h.name,
            icon: h.icon || "◆",
            timers: [],
          }));
        const merged = missing.length ? [...rem, ...missing] : rem;
        setReminders(merged);
        if (missing.length) await sSet(`reminders_${currentUser}`, merged);
      } else {
        const init = allH.map((h) => ({
          id: h.id,
          habitName: h.name,
          icon: h.icon || "◆",
          timers: [],
        }));
        setReminders(init);
        await sSet(`reminders_${currentUser}`, init);
      }
    })();
  }, [currentUser, viewDay]);

  const handleLogin = async () => {
    setError("");
    const p = await sGet(`profile_${loginName.trim().toLowerCase()}`);
    if (!p) {
      setError("User not found.");
      return;
    }
    if (p.pass !== loginPass) {
      setError("Incorrect password.");
      return;
    }
    const u = loginName.trim().toLowerCase();
    setCurrentUser(u);
    setProfile(p);
    await sSet("current_user", u);
    setScreen("app");
  };
  const handleRegister = async () => {
    setError("");
    const { name, pass, age, weight, height, goal, gender, email, phone } = reg;
    if (!name || !pass || !age || !weight || !height) {
      setError("Please fill all fields.");
      return;
    }
    const u = name.trim().toLowerCase();
    if (await sGet(`profile_${u}`)) {
      setError("Username taken.");
      return;
    }
    const p = {
      name: name.trim(),
      pass,
      age: +age,
      weight: +weight,
      height: +height,
      goal,
      gender,
      email: email || "",
      phone: phone || "",
    };
    await sSet(`profile_${u}`, p);
    await sSet("current_user", u);
    setCurrentUser(u);
    setProfile(p);
    setScreen("app");
  };
  const logout = async () => {
    await sSet("current_user", null);
    setCurrentUser(null);
    setProfile(null);
    setScreen("login");
    setLoginName("");
    setLoginPass("");
    setTab("food");
  };

  const addFood = async () => {
    if (!fName || !fCal) return;
    const updated = [
      ...foodLog,
      {
        id: Date.now(),
        name: fName.trim(),
        grams: +fGrams || null,
        cal: +fCal,
      },
    ];
    setFoodLog(updated);
    await sSet(`food_${currentUser}_${viewDay}`, updated);
    setFName("");
    setFGrams("");
    setFCal("");
  };
  const delFood = async (id) => {
    const updated = foodLog.filter((f) => f.id !== id);
    setFoodLog(updated);
    await sSet(`food_${currentUser}_${viewDay}`, updated);
  };
  const updateFoodSteps = async (val) => {
    setFoodSteps(val);
    await sSet(`steps_${currentUser}_${viewDay}`, val === "" ? 0 : +val);
  };

  // NEW: Updated wishlist logic for links
  const addWish = async () => {
    if (!wishInput.trim()) return;

    let formattedLink = wishLink.trim();
    if (formattedLink && !/^https?:\/\//i.test(formattedLink)) {
      formattedLink = "https://" + formattedLink;
    }

    const updated = [
      ...wishItems,
      { id: Date.now(), text: wishInput.trim(), link: formattedLink },
    ];
    setWishItems(updated);
    await sSet(`wish_${currentUser}`, updated);

    setWishInput("");
    setWishLink("");
  };

  const removeWish = async (id) => {
    const updated = wishItems.filter((i) => i.id !== id);
    setWishItems(updated);
    await sSet(`wish_${currentUser}`, updated);
  };
  const saveSchedule = async (wake, sleep) =>
    await sSet(`schedule_${currentUser}`, { wake, sleep });
  const toggleTrack = async (habitId, dk) => {
    const key = `${dk}_${habitId}`;
    const updated = { ...trackData, [key]: !trackData[key] };
    setTrackData(updated);
    await sSet(`track_${currentUser}`, updated);
  };
  const isTracked = (habitId, dk) => !!trackData[`${dk}_${habitId}`];
  const generateReport = async () => {
    // 1. Open the window immediately to bypass mobile popup blockers
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<div style='font-family:sans-serif; padding: 40px; text-align:center;'>Generating your beautiful report... please wait.</div>",
    );

    // 2. Fetch the last 7 days of data
    let totalSteps = 0;
    let totalCals = 0;
    let totalBurned = 0;
    const calData = [];
    const netData = [];

    for (const d of weekDays) {
      const dk = d.toISOString().split("T")[0];

      // Fetch steps
      const s = await sGet(`steps_${currentUser}_${dk}`);
      const st = s ? +s : 0;
      totalSteps += st;
      const burnedToday = Math.round(st * 0.04);
      totalBurned += burnedToday;

      // Fetch food
      const log = await sGet(`food_${currentUser}_${dk}`);
      const cals = (log || []).reduce((sum, f) => sum + f.cal, 0);
      totalCals += cals;
      calData.push(cals);
      netData.push(cals - burnedToday);
    }

    const avgCals = Math.round(totalCals / 7);
    const avgSteps = Math.round(totalSteps / 7);
    const avgNet = Math.round((totalCals - totalBurned) / 7);

    // 3. Process Habit Data for the Table
    const allHabitsReport = [
      ...DEFAULT_HABITS.filter((h) => !removedHabits.includes(h.id)),
      ...customHabits,
    ];
    let totalPossible = allHabitsReport.length * 7;
    let totalDone = 0;
    let bestStreak = 0;
    let habitRowsHtml = "";

    allHabitsReport.forEach((h) => {
      let habitDoneCount = 0;
      let currentStreak = 0;
      let maxStreak = 0;
      let daysHtml = "";

      weekDays.forEach((d) => {
        const dk = d.toISOString().split("T")[0];
        const isDone = isTracked(h.id, dk);
        if (isDone) {
          habitDoneCount++;
          currentStreak++;
          if (currentStreak > maxStreak) maxStreak = currentStreak;
          totalDone++;
          daysHtml += `<td><span class="day-cell done">✓</span></td>`;
        } else {
          currentStreak = 0;
          const isFuture = d.getTime() > new Date(todayStr).getTime();
          daysHtml += isFuture
            ? `<td><span class="day-cell skip">-</span></td>`
            : `<td><span class="day-cell miss">✕</span></td>`;
        }
      });

      if (maxStreak > bestStreak) bestStreak = maxStreak;
      const pct = Math.round((habitDoneCount / 7) * 100);

      habitRowsHtml += `
        <tr>
          <td>
            <div class="habit-name-cell">
              <div class="habit-icon-box">${h.icon || "✦"}</div>
              <div>
                <div class="habit-name-text">${h.name}</div>
                <div class="habit-name-sub">${h.sub || "Daily task"}</div>
              </div>
            </div>
          </td>
          ${daysHtml}
          <td>
            <div class="progress-wrap"><div class="progress-bar" style="width:${pct}%"></div></div>
            <div class="progress-pct">${pct}%</div>
          </td>
          <td><span class="streak-badge">🔥 ${maxStreak}</span></td>
        </tr>
      `;
    });

    const overallCompletion =
      totalPossible === 0 ? 0 : Math.round((totalDone / totalPossible) * 100);

    // 4. Body Metrics
    const bmiVal = profile ? calcBMI(+profile.weight, +profile.height) : 0;
    const bmrVal = profile
      ? calcBMR(+profile.weight, +profile.height, +profile.age, profile.gender)
      : 0;
    const tdeeVal = profile ? calcTDEE(bmrVal) : 0;

    // 5. Generate Bar Charts
    const daysInitial = ["M", "T", "W", "T", "F", "S", "S"];
    let calChartHtml = "";
    calData.forEach((c, i) => {
      const hPct = Math.min(100, (c / 3000) * 100);
      calChartHtml += `<div class="bar-col"><div class="bar-fill" style="height:${hPct}%"></div><div class="bar-label">${daysInitial[i]}</div></div>`;
    });

    let netChartHtml = "";
    netData.forEach((n, i) => {
      let colorClass = n < 0 ? "deficit" : "";
      let fillStyle = n > 0 ? "background:var(--red);" : "";
      let hPct = Math.min(100, (Math.abs(n) / 1000) * 100);
      netChartHtml += `<div class="bar-col"><div class="bar-fill ${colorClass}" style="height:${hPct}%; ${fillStyle}"></div><div class="bar-label">${daysInitial[i]}</div></div>`;
    });

    // 6. Dynamic Insights
    let insightsHtml = "";
    if (overallCompletion >= 80) {
      insightsHtml += `<div class="insight-row"><div class="insight-dot pos"></div><div class="insight-text"><strong>Excellent habit consistency.</strong> You hit ${overallCompletion}% completion this week. Keep up the great momentum!</div></div>`;
    } else {
      insightsHtml += `<div class="insight-row"><div class="insight-dot neu"></div><div class="insight-text"><strong>Room for improvement.</strong> You hit ${overallCompletion}% completion. Try focusing on your easiest habits first to build momentum.</div></div>`;
    }

    if (avgNet < 0) {
      insightsHtml += `<div class="insight-row"><div class="insight-dot pos"></div><div class="insight-text"><strong>Calorie deficit achieved.</strong> You maintained an average daily deficit of ${Math.abs(avgNet)} kcal. Well aligned with weight loss goals.</div></div>`;
    } else if (avgNet > 0) {
      insightsHtml += `<div class="insight-row"><div class="insight-dot neu"></div><div class="insight-text"><strong>Calorie surplus.</strong> You had an average daily surplus of ${avgNet} kcal.</div></div>`;
    } else {
      insightsHtml += `<div class="insight-row"><div class="insight-dot pos"></div><div class="insight-text"><strong>Perfectly balanced.</strong> Calories in matched calories out this week!</div></div>`;
    }

    if (avgSteps < 10000) {
      insightsHtml += `<div class="insight-row"><div class="insight-dot neu"></div><div class="insight-text"><strong>Step count below target.</strong> Averaged ${avgSteps.toLocaleString()} steps/day. Try short walks after meals to hit that 10k mark.</div></div>`;
    } else {
      insightsHtml += `<div class="insight-row"><div class="insight-dot pos"></div><div class="insight-text"><strong>Great activity levels!</strong> You crushed the 10k step goal, averaging ${avgSteps.toLocaleString()} steps/day.</div></div>`;
    }

    // 7. Inject into your HTML Template
    const reportHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>LifeTrack — Weekly Report</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');
    :root {
      --bg: #faf7f3; --bg2: #f2ece3; --surface: #ffffff;
      --border: #e0d8ce; --border2: #cfc8bc; --text: #2a2218;
      --text2: #7a6e5e; --text3: #b0a494; --accent: #8c6a44;
      --accent2: #a07850; --gold: #c49a5e; --gold-light: rgba(196,154,94,0.12);
      --green: #5a7a5a; --green-bg: rgba(90,122,90,0.1);
      --red: #a05050; --red-bg: rgba(160,80,80,0.1);
      --amber: #a08040; --amber-bg: rgba(160,128,64,0.1);
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: var(--bg); font-family: 'Jost', sans-serif; color: var(--text); -webkit-font-smoothing: antialiased; }
    
    .download-bar { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: var(--text); padding: 10px 32px; display: flex; align-items: center; justify-content: space-between; }
    .download-bar-brand { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 300; color: #ede5d8; letter-spacing: 0.08em; }
    .download-bar-brand span { color: #c49a78; }
    .download-btn { display: flex; align-items: center; gap: 8px; padding: 9px 22px; background: var(--gold); color: var(--text); border: none; border-radius: 50px; font-family: 'Jost', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
    .download-btn:hover { background: var(--accent2); color: #fff; }
    
    .page { max-width: 820px; margin: 60px auto 0; padding: 0 24px 60px; }
    .report { background: var(--surface); border: 1px solid var(--border); box-shadow: 0 2px 40px rgba(0,0,0,0.08); overflow: hidden; }
    
    .cover { background: var(--text); padding: 52px 56px 44px; position: relative; overflow: hidden; }
    .cover::before { content: ''; position: absolute; top: 0; right: 0; width: 280px; height: 280px; border-left: 1px solid rgba(196,154,94,0.15); border-bottom: 1px solid rgba(196,154,94,0.15); border-radius: 0 0 0 100%; }
    .cover-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 40px; }
    .cover-logo { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 300; color: #ede5d8; letter-spacing: 0.1em; }
    .cover-logo span { color: #c49a78; }
    .cover-badge { font-size: 10px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); background: rgba(196,154,94,0.12); border: 1px solid rgba(196,154,94,0.25); padding: 5px 14px; border-radius: 20px; }
    .cover-title { font-family: 'Cormorant Garamond', serif; font-size: 52px; font-weight: 300; color: #ede5d8; line-height: 1.0; margin-bottom: 6px; position: relative; z-index: 1; }
    .cover-title em { font-style: italic; color: #c49a78; }
    .cover-subtitle { font-size: 13px; font-weight: 300; color: #6e5e50; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 32px; position: relative; z-index: 1; }
    
    .cover-meta { display: flex; gap: 32px; flex-wrap: wrap; position: relative; z-index: 1; }
    .cover-meta-label { font-size: 9px; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: #5e4e40; margin-bottom: 3px; }
    .cover-meta-val { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 400; color: #ede5d8; letter-spacing: 0.02em; }
    
    .gold-rule { height: 3px; background: linear-gradient(90deg, var(--accent), var(--gold), #d4b070, var(--gold), var(--accent)); }
    
    .section { padding: 40px 56px; border-bottom: 1px solid var(--border); }
    .section-label { font-size: 9px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 6px; }
    .section-title { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; color: var(--text); margin-bottom: 24px; }
    
    .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
    .summary-stat { background: var(--surface); padding: 24px 20px; text-align: center; }
    .summary-stat-val { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 300; line-height: 1; margin-bottom: 6px; }
    .summary-stat-val.green { color: var(--green); } .summary-stat-val.gold { color: var(--gold); }
    .summary-stat-val.amber { color: var(--amber); } .summary-stat-val.red { color: var(--red); }
    .summary-stat-unit { font-size: 12px; font-weight: 400; color: var(--text2); margin-left: 2px; }
    .summary-stat-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text3); }
    
    .habit-table { width: 100%; border-collapse: collapse; }
    .habit-table thead tr { border-bottom: 2px solid var(--border2); }
    .habit-table th { font-size: 9px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text3); padding: 0 10px 10px; text-align: center; }
    .habit-table th:first-child { text-align: left; padding-left: 0; }
    .habit-table td { padding: 14px 10px; border-bottom: 1px solid var(--border); text-align: center; vertical-align: middle; }
    .habit-table td:first-child { text-align: left; padding-left: 0; }
    .habit-name-cell { display: flex; align-items: center; gap: 12px; }
    .habit-icon-box { width: 34px; height: 34px; border-radius: 8px; background: var(--bg2); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
    .habit-name-text { font-size: 14px; font-weight: 500; color: var(--text); }
    .habit-name-sub { font-size: 11px; color: var(--text3); margin-top: 1px; }
    
    .day-cell { width: 32px; height: 32px; border-radius: 7px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 500; }
    .day-cell.done { background: var(--green-bg); color: var(--green); border: 1px solid rgba(90,122,90,0.25); }
    .day-cell.miss { background: var(--red-bg); color: var(--red); border: 1px solid rgba(160,80,80,0.15); }
    .day-cell.skip { background: var(--bg2); color: var(--text3); border: 1px solid var(--border); }
    
    .progress-wrap { width: 80px; height: 6px; background: var(--bg2); border-radius: 3px; overflow: hidden; margin: 0 auto 4px; }
    .progress-bar { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--accent), var(--gold)); }
    .progress-pct { font-size: 12px; font-weight: 600; color: var(--text2); }
    .streak-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; color: var(--gold); background: var(--gold-light); border: 1px solid rgba(196,154,94,0.2); padding: 3px 10px; border-radius: 20px; }
    
    .nutrition-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .nutrition-card { background: var(--bg); border: 1px solid var(--border); border-radius: 12px; padding: 20px 22px; }
    .nutrition-card-label { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text3); margin-bottom: 4px; }
    .nutrition-card-val { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 400; color: var(--text); margin-bottom: 12px; }
    .nutrition-card-val span { font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 300; color: var(--text3); margin-left: 4px; }
    
    .bar-chart { display: flex; align-items: flex-end; gap: 4px; height: 40px; }
    .bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 3px; height: 100%; }
    .bar-fill { width: 100%; border-radius: 3px 3px 0 0; background: linear-gradient(180deg, var(--accent), var(--gold)); min-height: 4px; }
    .bar-fill.deficit { background: linear-gradient(180deg, var(--green), #8ab48a); }
    .bar-label { font-size: 8px; letter-spacing: 0.05em; color: var(--text3); text-transform: uppercase; }
    
    .body-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
    .body-metric { background: var(--bg); border: 1px solid var(--border); border-radius: 10px; padding: 16px 18px; }
    .body-metric-label { font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text3); margin-bottom: 6px; }
    .body-metric-val { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; color: var(--text); }
    .body-metric-unit { font-family: 'Jost', sans-serif; font-size: 11px; color: var(--text3); margin-left: 3px; }
    .body-metric-note { font-size: 10px; color: var(--text3); margin-top: 4px; }
    
    .insights-list { display: flex; flex-direction: column; gap: 12px; }
    .insight-row { display: flex; align-items: flex-start; gap: 14px; padding: 16px 18px; border-radius: 10px; border: 1px solid var(--border); background: var(--bg); }
    .insight-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }
    .insight-dot.pos { background: var(--green); } .insight-dot.neu { background: var(--amber); }
    .insight-text { font-size: 13px; color: var(--text); line-height: 1.55; }
    
    .report-footer { padding: 24px 56px; background: var(--bg2); border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
    .report-footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 15px; font-weight: 300; color: var(--text2); letter-spacing: 0.08em; }
    .report-footer-logo span { color: var(--accent); }
    .report-footer-note { font-size: 10px; color: var(--text3); letter-spacing: 0.05em; text-align: right; }
    
    @media print {
      body { background: #fff; }
      .download-bar { display: none; }
      .page { margin: 0; padding: 0; }
      .report { box-shadow: none; border: none; }
      .section { padding: 28px 44px; }
      .cover { padding: 40px 44px 36px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .bar-fill, .day-cell, .progress-bar, .streak-badge { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="download-bar">
    <div class="download-bar-brand">life<span>·</span>track</div>
    <button class="download-btn" onclick="window.print()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Download PDF
    </button>
  </div>

  <div class="page">
  <div class="report">
    <div class="cover">
      <div class="cover-top">
        <div class="cover-logo">life<span>·</span>track</div>
        <div class="cover-badge">Weekly Report</div>
      </div>
      <div class="cover-title">Wellness<br/><em>Report</em></div>
      <div class="cover-subtitle">Personal Health & Habit Summary</div>
      <div class="cover-meta">
        <div class="cover-meta-item">
          <div class="cover-meta-label">Member</div>
          <div class="cover-meta-val">${profile?.name || "User"}</div>
        </div>
        <div class="cover-meta-item">
          <div class="cover-meta-label">Period</div>
          <div class="cover-meta-val">${weekDays[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${weekDays[6].toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
        </div>
        <div class="cover-meta-item">
          <div class="cover-meta-label">Generated</div>
          <div class="cover-meta-val">${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
        </div>
      </div>
    </div>
    <div class="gold-rule"></div>

    <div class="section">
      <div class="section-label">Overview</div>
      <div class="section-title">Week at a Glance</div>
      <div class="summary-grid">
        <div class="summary-stat">
          <div class="summary-stat-val green">${overallCompletion}<span class="summary-stat-unit">%</span></div>
          <div class="summary-stat-label">Habit Completion</div>
        </div>
        <div class="summary-stat">
          <div class="summary-stat-val gold">${bestStreak}</div>
          <div class="summary-stat-label">Best Streak</div>
        </div>
        <div class="summary-stat">
          <div class="summary-stat-val amber">${avgCals.toLocaleString()}<span class="summary-stat-unit">kcal</span></div>
          <div class="summary-stat-label">Avg Daily Intake</div>
        </div>
        <div class="summary-stat">
          <div class="summary-stat-val green">${totalSteps.toLocaleString()}<span class="summary-stat-unit" style="font-size:11px">steps</span></div>
          <div class="summary-stat-label">Total Steps</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-label">Daily Habits</div>
      <div class="section-title">Habit Tracker</div>
      <table class="habit-table">
        <thead>
          <tr>
            <th style="width:220px">Habit</th>
            <th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>
            <th>Rate</th><th>Streak</th>
          </tr>
        </thead>
        <tbody>
          ${habitRowsHtml}
        </tbody>
      </table>
    </div>

    <div class="section">
      <div class="section-label">Nutrition</div>
      <div class="section-title">Calorie Summary</div>
      <div class="nutrition-grid">
        <div class="nutrition-card">
          <div class="nutrition-card-label">Daily Calories Consumed</div>
          <div class="nutrition-card-val">${avgCals.toLocaleString()} <span>kcal avg</span></div>
          <div class="bar-chart">${calChartHtml}</div>
        </div>
        <div class="nutrition-card">
          <div class="nutrition-card-label">Net Calories (Deficit / Surplus)</div>
          <div class="nutrition-card-val" style="color:var(--green)">${avgNet > 0 ? "+" : ""}${avgNet.toLocaleString()} <span>kcal avg</span></div>
          <div class="bar-chart">${netChartHtml}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-label">Body Metrics</div>
      <div class="section-title">Health Indicators</div>
      <div class="body-metrics">
        <div class="body-metric"><div class="body-metric-label">BMI</div><div class="body-metric-val">${bmiVal}<span class="body-metric-unit"></span></div><div class="body-metric-note">${profile ? bmiCat(bmiVal) : "—"}</div></div>
        <div class="body-metric"><div class="body-metric-label">Weight</div><div class="body-metric-val">${profile?.weight || "0"}<span class="body-metric-unit">kg</span></div><div class="body-metric-note">Current</div></div>
        <div class="body-metric"><div class="body-metric-label">Height</div><div class="body-metric-val">${profile?.height || "0"}<span class="body-metric-unit">cm</span></div><div class="body-metric-note">—</div></div>
        <div class="body-metric"><div class="body-metric-label">BMR</div><div class="body-metric-val">${Math.round(bmrVal).toLocaleString()}<span class="body-metric-unit">kcal</span></div><div class="body-metric-note">Resting burn</div></div>
        <div class="body-metric"><div class="body-metric-label">TDEE</div><div class="body-metric-val">${tdeeVal.toLocaleString()}<span class="body-metric-unit">kcal</span></div><div class="body-metric-note">Total expenditure</div></div>
        <div class="body-metric"><div class="body-metric-label">Avg Steps/Day</div><div class="body-metric-val">${avgSteps.toLocaleString()}<span class="body-metric-unit"></span></div><div class="body-metric-note" style="color:var(--amber)">Weekly average</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-label">Analysis</div>
      <div class="section-title">Weekly Insights</div>
      <div class="insights-list">
        ${insightsHtml}
      </div>
    </div>

    <div class="report-footer">
      <div class="report-footer-logo">life<span>·</span>track</div>
      <div class="report-footer-note">
        Generated ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}<br/>
        Personal data — for private use only
      </div>
    </div>
  </div>
  </div>
</body>
</html>
    `;

    // 8. Write the HTML to the new tab
    printWindow.document.open();
    printWindow.document.write(reportHTML);
    printWindow.document.close();

    // 8. Wait a tiny bit for styles/fonts to load, then trigger native print
    setTimeout(() => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.focus();
        iframeRef.current.contentWindow.print();
      }

      // Clean up the iframe AFTER the print dialog closes (No more manual clear pop-up!)
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 800);
  };

  const totalEaten = foodLog.reduce((s, f) => s + f.cal, 0);
  const burned = stepsBurned(+foodSteps || 0);
  const netCal = totalEaten - burned;
  const isDeficit = netCal < 0;
  const isZero = netCal === 0;
  const netClass = isZero ? "zero" : isDeficit ? "deficit" : "surplus";

  const goalLabels = {
    loss: "Weight Loss",
    gain: "Weight Gain",
    maintain: "Maintain",
  };
  const goalIcons = { loss: "↓", gain: "↑", maintain: "◎" };

  if (screen === "login" || screen === "register")
    return (
      <>
        <style>
          {FONTS}
          {css}
        </style>
        <div className="app" data-dark={dark}>
          <div className="onboard-wrap">
            <div className="onboard-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <div
                    className="onboard-logo"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={logo}
                      alt="LifeTrack Logo"
                      style={{ height: "36px", width: "auto" }}
                    />
                    life<span>·</span>track
                  </div>
                  <div className="onboard-sub">
                    your personal wellness companion
                  </div>
                </div>
                <button className="icon-btn" onClick={() => setDark(!dark)}>
                  {dark ? "☀" : "◑"}
                </button>
              </div>
              {screen === "login" ? (
                <>
                  <div className="field">
                    <label>Username</label>
                    <input
                      className="inp"
                      placeholder="your username"
                      value={loginName}
                      onChange={(e) => setLoginName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    />
                  </div>
                  <div className="field">
                    <label>Password</label>
                    <input
                      className="inp"
                      type="password"
                      placeholder="••••••"
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    />
                  </div>
                  {error && <div className="err">{error}</div>}
                  <button className="primary-btn" onClick={handleLogin}>
                    Sign In
                  </button>
                  <div className="switch-link">
                    No account?{" "}
                    <button
                      onClick={() => {
                        setScreen("register");
                        setError("");
                      }}
                    >
                      Create one
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="inp-row">
                    <div className="field" style={{ flex: 1 }}>
                      <label>Username</label>
                      <input
                        className="inp"
                        placeholder="e.g. priya"
                        value={reg.name}
                        onChange={(e) =>
                          setReg({ ...reg, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="field" style={{ flex: 1 }}>
                      <label>Password</label>
                      <input
                        className="inp"
                        type="password"
                        placeholder="••••••"
                        value={reg.pass}
                        onChange={(e) =>
                          setReg({ ...reg, pass: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="inp-row">
                    <div className="field" style={{ flex: 1 }}>
                      <label>Email</label>
                      <input
                        className="inp"
                        type="email"
                        placeholder="you@email.com"
                        value={reg.email || ""}
                        onChange={(e) =>
                          setReg({ ...reg, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="field" style={{ flex: 1 }}>
                      <label>Phone (with country code)</label>
                      <input
                        className="inp"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={reg.phone || ""}
                        onChange={(e) =>
                          setReg({ ...reg, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text2)",
                      background: "var(--bg2)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      padding: "9px 12px",
                      marginBottom: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    📬 Your email & phone will be used to send reminder
                    notifications for habits and weekly tasks. Both are optional
                    but recommended.
                  </div>
                  <div className="inp-row">
                    <div className="field" style={{ flex: 1 }}>
                      <label>Age</label>
                      <input
                        className="inp"
                        type="number"
                        placeholder="25"
                        value={reg.age}
                        onChange={(e) =>
                          setReg({ ...reg, age: e.target.value })
                        }
                      />
                    </div>
                    <div className="field" style={{ flex: 1 }}>
                      <label>Weight (kg)</label>
                      <input
                        className="inp"
                        type="number"
                        placeholder="62"
                        value={reg.weight}
                        onChange={(e) =>
                          setReg({ ...reg, weight: e.target.value })
                        }
                      />
                    </div>
                    <div className="field" style={{ flex: 1 }}>
                      <label>Height (cm)</label>
                      <input
                        className="inp"
                        type="number"
                        placeholder="165"
                        value={reg.height}
                        onChange={(e) =>
                          setReg({ ...reg, height: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label>Biological Sex</label>
                    <select
                      className="inp"
                      value={reg.gender}
                      onChange={(e) =>
                        setReg({ ...reg, gender: e.target.value })
                      }
                    >
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Your Goal</label>
                    <div className="goal-grid">
                      {[
                        { v: "loss", icon: "🍃", l: "Lose Weight" },
                        { v: "maintain", icon: "⚖", l: "Maintain" },
                        { v: "gain", icon: "💪", l: "Gain Weight" },
                      ].map((g) => (
                        <div
                          key={g.v}
                          className={`goal-opt${reg.goal === g.v ? " selected" : ""}`}
                          onClick={() => setReg({ ...reg, goal: g.v })}
                        >
                          <div className="go-icon">{g.icon}</div>
                          <div className="go-label">{g.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {error && <div className="err">{error}</div>}
                  <button className="primary-btn" onClick={handleRegister}>
                    Create Account
                  </button>
                  <div className="switch-link">
                    Have an account?{" "}
                    <button
                      onClick={() => {
                        setScreen("login");
                        setError("");
                      }}
                    >
                      Sign in
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <style>
        {FONTS}
        {css}
      </style>
      <div className="app" data-dark={dark}>
        <div className="header">
          <div
            className="header-logo"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <img
              src={logo}
              alt="LifeTrack Logo"
              style={{ height: "28px", width: "auto" }}
            />
            life<span>·</span>track
          </div>
          <div className="header-right">
            <button
              className="icon-btn"
              onClick={() => setDark(!dark)}
              title="Toggle theme"
            >
              {dark ? "☀" : "◑"}
            </button>
            <button
              className={`icon-btn${tab === "profile" ? " active" : ""}`}
              onClick={() => setTab("profile")}
              title="Profile"
              style={{ fontSize: 18 }}
            >
              ⌂
            </button>
          </div>
        </div>
        <nav className="nav">
          {[
            ["food", "Food"],
            ["wishlist", "Wishlist"],
            ["schedule", "Schedule"],
            ["tracking", "Tracking"],
            ["reminders", "Reminders"],
            ["weekly", "Weekly"],
          ].map(([v, l]) => (
            <button
              key={v}
              className={`nav-btn${tab === v ? " active" : ""}`}
              onClick={() => setTab(v)}
            >
              {l}
            </button>
          ))}
        </nav>
        <div className="content">
          {tab === "food" && (
            <>
              <div className="date-nav">
                <button
                  className="date-nav-btn"
                  onClick={() => setDayOffset((d) => d - 1)}
                >
                  ‹
                </button>
                <div className="date-str">{fmtDate(viewDay)}</div>
                {dayOffset < 0 && (
                  <button
                    className="date-nav-btn"
                    onClick={() => setDayOffset((d) => d + 1)}
                  >
                    ›
                  </button>
                )}
              </div>
              <div className="summary-card">
                <div className="cal-row">
                  <div className="cal-chip">
                    <div className="cal-chip-label">Consumed</div>
                    <div className="cal-chip-val">
                      {totalEaten}
                      <span>kcal</span>
                    </div>
                  </div>
                  <div className="cal-chip">
                    <div className="cal-chip-label">Burned</div>
                    <div className="cal-chip-val green">
                      −{burned}
                      <span>kcal</span>
                    </div>
                  </div>
                  <div className="cal-chip">
                    <div className="cal-chip-label">Net</div>
                    <div className={`cal-chip-val ${netClass}`}>
                      {isDeficit ? "−" : "+"}
                      {Math.abs(netCal)}
                      <span>kcal</span>
                    </div>
                  </div>
                </div>
                <div className={`net-banner ${netClass}`}>
                  <div>
                    <div className={`net-label ${netClass}`}>
                      {isZero
                        ? "Perfectly balanced"
                        : isDeficit
                          ? "Calorie Deficit ↓"
                          : "Calorie Surplus ↑"}
                    </div>
                    <div className="net-desc">
                      {isZero
                        ? "Calories in = calories out"
                        : isDeficit
                          ? `Burned ${Math.abs(netCal)} kcal more than consumed`
                          : `Consumed ${netCal} kcal more than burned`}
                    </div>
                  </div>
                  <div className={`net-num ${netClass}`}>
                    {isDeficit ? "−" : "+"}
                    {Math.abs(netCal)}
                  </div>
                </div>
              </div>
              <div className="steps-card">
                <div className="steps-icon">◉</div>
                <div className="steps-content">
                  <div className="steps-label">
                    Steps {isToday ? "today" : fmtDate(viewDay)}
                  </div>
                  <div className="steps-row">
                    <input
                      className="steps-inp"
                      type="number"
                      placeholder="0"
                      value={foodSteps}
                      onChange={(e) => updateFoodSteps(e.target.value)}
                      readOnly={!isToday}
                    />
                    <span className="steps-burned">≈ {burned} kcal burned</span>
                  </div>
                </div>
              </div>
              {isToday && (
                <>
                  <div className="section-title">Log Food</div>
                  <div className="add-form">
                    <div className="form-row">
                      <div className="form-field f-name">
                        <label>Food name</label>
                        <input
                          className="inp"
                          placeholder="e.g. Idli, Rice, Apple..."
                          value={fName}
                          onChange={(e) => setFName(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && addFood()}
                        />
                      </div>
                      <div className="form-field f-num">
                        <label>Grams</label>
                        <input
                          className="inp"
                          type="number"
                          placeholder="100g"
                          value={fGrams}
                          onChange={(e) => setFGrams(e.target.value)}
                        />
                      </div>
                      <div className="form-field f-num">
                        <label>Calories</label>
                        <input
                          className="inp"
                          type="number"
                          placeholder="kcal"
                          value={fCal}
                          onChange={(e) => setFCal(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && addFood()}
                        />
                      </div>
                      <button className="add-btn" onClick={addFood}>
                        + Add
                      </button>
                    </div>
                  </div>
                </>
              )}
              <div className="section-title">
                Food Log <small>{fmtDate(viewDay)}</small>
              </div>
              {foodLog.length === 0 && (
                <div className="empty">
                  No food logged {isToday ? "yet today" : "on this day"}
                </div>
              )}
              {foodLog.map((f) => (
                <div key={f.id} className="food-item">
                  <div className="food-dot" />
                  <div className="food-name">{f.name}</div>
                  {f.grams && <div className="food-meta">{f.grams}g</div>}
                  <div className="food-cal">{f.cal} kcal</div>
                  {isToday && (
                    <button className="del-btn" onClick={() => delFood(f.id)}>
                      ×
                    </button>
                  )}
                </div>
              ))}
            </>
          )}

          {tab === "wishlist" && (
            <>
              <div className="section-title">
                Wish List{" "}
                <span className="tag wish" style={{ marginLeft: 10 }}>
                  things to get
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  marginBottom: 18,
                }}
              >
                <input
                  className="inp"
                  placeholder="Item name (e.g. Smartwatch)"
                  value={wishInput}
                  onChange={(e) => setWishInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addWish()}
                />
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    className="inp"
                    placeholder="Paste link here (optional)"
                    value={wishLink}
                    onChange={(e) => setWishLink(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addWish()}
                    style={{ flex: 1 }}
                  />
                  <button className="add-btn" onClick={addWish}>
                    + Add
                  </button>
                </div>
              </div>

              {wishItems.length === 0 && (
                <div className="empty">Nothing on your wishlist yet</div>
              )}

              {wishItems.map((item) => (
                <div
                  key={item.id}
                  className="list-item"
                  style={{ alignItems: "flex-start" }}
                >
                  <div
                    className="checkbox"
                    onClick={() => removeWish(item.id)}
                    style={{ marginTop: 2 }}
                  >
                    ✓
                  </div>

                  <div
                    className="item-text"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <span>{item.text}</span>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "12px",
                          color: "var(--accent)",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontWeight: "500",
                        }}
                      >
                        🔗 Visit Link
                      </a>
                    )}
                  </div>

                  <button
                    className="del-btn"
                    onClick={() => removeWish(item.id)}
                    style={{ marginLeft: "auto" }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </>
          )}

          {tab === "schedule" && (
            <>
              <div className="section-title">Daily Schedule</div>
              <div className="schedule-grid">
                <div className="schedule-card">
                  <label>Wake Up</label>
                  <input
                    className="time-inp"
                    type="time"
                    value={wakeTime}
                    onChange={(e) => {
                      setWakeTime(e.target.value);
                      saveSchedule(e.target.value, sleepTime);
                    }}
                  />
                </div>
                <div className="schedule-card">
                  <label>Sleep Time</label>
                  <input
                    className="time-inp"
                    type="time"
                    value={sleepTime}
                    onChange={(e) => {
                      setSleepTime(e.target.value);
                      saveSchedule(wakeTime, e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="divider" />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 14,
                }}
              >
                <div className="section-title" style={{ marginBottom: 0 }}>
                  Daily Habits
                </div>
                <button
                  className="plus-habit-btn"
                  onClick={() => setShowAddHabit((v) => !v)}
                >
                  {showAddHabit ? "✕ Cancel" : "+ Add Habit"}
                </button>
              </div>

              {showAddHabit && (
                <AddHabitPanel
                  onAdd={async (habit) => {
                    const updated = [...customHabits, habit];
                    setCustomHabits(updated);
                    await sSet(`customhabits_${currentUser}`, updated);
                    // add to reminders too
                    const remUpdate = [
                      ...reminders,
                      {
                        id: habit.id,
                        habitName: habit.name,
                        icon: habit.icon || "◆",
                        timers: [],
                      },
                    ];
                    setReminders(remUpdate);
                    await sSet(`reminders_${currentUser}`, remUpdate);
                    setShowAddHabit(false);
                  }}
                />
              )}

              {removedHabits.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--text2)",
                      marginBottom: 8,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {removedHabits.length} default habit
                    {removedHabits.length > 1 ? "s" : ""} hidden —
                    {DEFAULT_HABITS.filter((h) =>
                      removedHabits.includes(h.id),
                    ).map((h) => (
                      <button
                        key={h.id}
                        onClick={async () => {
                          const updated = removedHabits.filter(
                            (id) => id !== h.id,
                          );
                          setRemovedHabits(updated);
                          await sSet(`removedhabits_${currentUser}`, updated);
                          const remUpd = [
                            ...reminders,
                            {
                              id: h.id,
                              habitName: h.name,
                              icon: h.icon,
                              timers: [],
                            },
                          ];
                          setReminders(remUpd);
                          await sSet(`reminders_${currentUser}`, remUpd);
                        }}
                        style={{
                          marginLeft: 6,
                          padding: "2px 10px",
                          background: "var(--surface2)",
                          border: "1px solid var(--border)",
                          borderRadius: 12,
                          fontSize: 11,
                          color: "var(--accent)",
                          cursor: "pointer",
                          fontFamily: "'Jost',sans-serif",
                          transition: "all 0.2s",
                        }}
                      >
                        + restore {h.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {[
                ...DEFAULT_HABITS.filter((h) => !removedHabits.includes(h.id)),
                ...customHabits,
              ].map((h) => (
                <div key={h.id} className="habit-row">
                  <div className="habit-info">
                    <div className="habit-icon">{h.icon || "◆"}</div>
                    <div>
                      <div className="habit-name">{h.name}</div>
                      <div className="habit-sub">{h.sub}</div>
                    </div>
                  </div>
                  <div className="habit-actions">
                    {h.type === "steps" && (
                      <input
                        className="steps-goal-inp"
                        type="number"
                        value={stepGoal}
                        onChange={(e) => {
                          setStepGoal(e.target.value);
                          sSet(`stepgoal_${currentUser}`, e.target.value);
                        }}
                        placeholder="Goal"
                      />
                    )}
                    <button
                      className={`toggle${isTracked(h.id, todayStr) ? " on" : ""}`}
                      onClick={() => toggleTrack(h.id, todayStr)}
                    />
                    <button
                      className="del-habit-btn"
                      onClick={async () => {
                        const isDefault = DEFAULT_HABITS.find(
                          (d) => d.id === h.id,
                        );
                        if (isDefault) {
                          const updated = [...removedHabits, h.id];
                          setRemovedHabits(updated);
                          await sSet(`removedhabits_${currentUser}`, updated);
                        } else {
                          const updated = customHabits.filter(
                            (c) => c.id !== h.id,
                          );
                          setCustomHabits(updated);
                          await sSet(`customhabits_${currentUser}`, updated);
                        }
                        const remUpd = reminders.filter((r) => r.id !== h.id);
                        setReminders(remUpd);
                        await sSet(`reminders_${currentUser}`, remUpd);
                      }}
                      title="Remove habit"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}

          {tab === "tracking" && (
            <>
              <div className="section-title">Weekly Overview</div>
              <div className="week-days">
                {weekDays.map((d, i) => (
                  <div key={i} className="day-col">
                    <div className="day-label">{DAYS_SHORT[i]}</div>
                    <div className="day-date">{d.getDate()}</div>
                  </div>
                ))}
              </div>
              {[
                ...DEFAULT_HABITS.filter((h) => !removedHabits.includes(h.id)),
                ...customHabits,
              ].map((h) => (
                <div key={h.id} className="habit-track-row">
                  <div className="habit-track-label">
                    <span>{h.icon || "◆"}</span>
                    <span>{h.name}</span>
                  </div>
                  <div style={{ display: "flex", gap: "5px" }}>
                    {weekDays.map((d, i) => {
                      const dk = d.toISOString().split("T")[0];
                      const isT = dk === todayStr;
                      const done = isTracked(h.id, dk);
                      return (
                        <div
                          key={i}
                          className={`track-cell${done ? " done" : ""}${isT ? " today-cell" : ""}`}
                          style={{ flex: 1 }}
                          onClick={() => toggleTrack(h.id, dk)}
                        >
                          {done ? "✓" : ""}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              <button className="pdf-btn" onClick={generateReport}>
                ↓ Download Weekly Report & Clear Data
              </button>
            </>
          )}

          {tab === "reminders" && (
            <RemindersTab
              reminders={reminders}
              setReminders={setReminders}
              currentUser={currentUser}
            />
          )}

          {tab === "weekly" && (
            <WeeklyTasksTab
              weeklyTasks={weeklyTasks}
              setWeeklyTasks={setWeeklyTasks}
              currentUser={currentUser}
            />
          )}

          {tab === "profile" && profile && (
            <ProfileTab
              profile={profile}
              goalLabels={goalLabels}
              goalIcons={goalIcons}
              onSave={async (updated) => {
                const merged = { ...profile, ...updated };
                await sSet(`profile_${currentUser}`, merged);
                setProfile(merged);
              }}
              onLogout={logout}
            />
          )}
        </div>
      </div>
      {/* Hidden iframe for printing */}
      <iframe ref={iframeRef} style={{ display: "none" }} title="print-frame" />
    </>
  );
}
