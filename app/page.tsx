"use client";

import { useMemo, useState } from "react";

type View = "Overview" | "Projects" | "Attendance" | "Work" | "Safety" | "Reports";

const projects = [
  { name: "Harbor Point Offices", client: "Northline Developments", location: "Docklands, Dublin", progress: 72, status: "Active", tone: "mint", due: "18 Sep 2026" },
  { name: "Riverside Apartments", client: "Briarstone Group", location: "Southbank, London", progress: 48, status: "Active", tone: "amber", due: "04 Nov 2026" },
  { name: "Cedar Grove School", client: "City Education Trust", location: "Cork, Ireland", progress: 91, status: "On track", tone: "violet", due: "28 Aug 2026" },
];

const activity = [
  ["AM", "Ava Morgan", "approved the daily site report", "Harbor Point Offices", "8 min ago", "mint"],
  ["JR", "Jonas Reed", "checked in", "Riverside Apartments", "24 min ago", "blue"],
  ["SP", "Sofia Patel", "flagged a material shortage", "Cedar Grove School", "42 min ago", "amber"],
  ["LW", "Liam Wong", "completed task", "Harbor Point Offices", "1 hr ago", "violet"],
];

const nav = [
  ["Overview", "⌂"], ["Projects", "▦"], ["Attendance", "◷"], ["Work", "✓"], ["Safety", "＋"], ["Reports", "▤"],
];

export default function Home() {
  const [view, setView] = useState<View>("Overview");
  const [dark, setDark] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [toast, setToast] = useState("");
  const [query, setQuery] = useState("");

  const filteredProjects = useMemo(() => projects.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())), [query]);
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2800); };

  return (
    <main className={dark ? "shell dark" : "shell"}>
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark" aria-hidden="true"><span>S</span><i /></span><span>SiteTrack <em>Pro</em></span></div>
        <div className="workspace-switch"><span className="workspace-dot" /> Northline Construction <span>⌄</span></div>
        <p className="nav-label">Workspace</p>
        <nav aria-label="Main navigation">
          {nav.map(([label, icon]) => <button key={label} className={view === label ? "nav-item active" : "nav-item"} onClick={() => setView(label as View)}><span>{icon}</span>{label}{label === "Safety" && <i className="nav-badge">3</i>}</button>)}
        </nav>
        <p className="nav-label">Manage</p>
        <button className="nav-item" onClick={() => notify("Worker directory is ready for review")}><span>♙</span>Workers</button>
        <button className="nav-item" onClick={() => notify("Materials inventory synced")}><span>⬡</span>Materials</button>
        <button className="nav-item" onClick={() => notify("Settings opened")}><span>⚙</span>Settings</button>
        <div className="sidebar-bottom"><div className="sync"><span className="online-dot" /><div><strong>All systems normal</strong><small>Last synced just now</small></div></div><div className="profile"><div className="avatar green">AM</div><div><strong>Ava Morgan</strong><small>Super Admin</small></div><span>•••</span></div></div>
      </aside>

      <section className="main-area">
        <header className="topbar"><div className="mobile-brand"><span className="brand-mark" aria-hidden="true"><span>S</span><i /></span>SiteTrack <em>Pro</em></div><div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{view}</strong></div><div className="top-actions"><button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">{dark ? "☼" : "☾"}</button><button className="icon-button notification" onClick={() => notify("You have 3 notifications")}>♧<i>3</i></button><div className="avatar green">AM</div></div></header>
        <div className="content">
          <div className="welcome-row"><div><p className="eyebrow">Wednesday, 12 August 2026</p><h1>{view === "Overview" ? "Good morning, Ava" : view}</h1><p className="subhead">{view === "Overview" ? "Here’s what’s happening across your sites today." : `Stay on top of ${view.toLowerCase()} across every active site.`}</p></div><div className="header-actions"><button className="secondary" onClick={() => notify("Report export prepared")}>⇩ Export</button><button className="primary" onClick={() => notify("New project form opened")}>＋ New project</button></div></div>

          {view === "Overview" && <>
            <div className="metric-grid">
              <Metric title="Active projects" value="08" change="+2 this month" icon="▦" tone="blue" />
              <Metric title="Workers present" value="184" change="92% of workforce" icon="♙" tone="mint" />
              <Metric title="Work completion" value="68.4%" change="+4.8% vs last week" icon="↗" tone="violet" />
              <Metric title="Safety issues" value="03" change="1 needs attention" icon="＋" tone="amber" alert />
            </div>
            <div className="section-grid"><section className="panel progress-panel"><div className="panel-heading"><div><h2>Project progress</h2><p>Planned vs actual completion</p></div><button className="more">•••</button></div><div className="chart-wrap"><div className="y-axis"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div><div className="chart"><div className="grid-lines" /><div className="bars"><Bar label="Harbor Point" planned={78} actual={72} /><Bar label="Riverside" planned={54} actual={48} /><Bar label="Cedar Grove" planned={88} actual={91} /><Bar label="Oak Works" planned={42} actual={36} /></div><div className="legend"><span><i className="legend-box plan" />Planned</span><span><i className="legend-box actual" />Actual</span></div></div></div></section>
              <section className="panel attendance-panel"><div className="panel-heading"><div><h2>Today’s attendance</h2><p>12 Aug · All projects</p></div><button className="more">•••</button></div><div className="donut-row"><div className="donut"><div><strong>92%</strong><small>Present</small></div></div><div className="att-stats"><div><i className="dot present" /><span>Present</span><b>184</b></div><div><i className="dot late" /><span>Late</span><b>12</b></div><div><i className="dot absent" /><span>Absent</span><b>19</b></div></div></div><button className="text-link" onClick={() => setView("Attendance")}>View attendance →</button></section></div>
            <div className="section-grid lower"><section className="panel projects-panel"><div className="panel-heading"><div><h2>Active projects</h2><p>3 of 8 projects need your attention</p></div><button className="text-link" onClick={() => setView("Projects")}>View all →</button></div><div className="project-list">{projects.map((p) => <ProjectRow key={p.name} project={p} />)}</div></section>
              <section className="panel activity-panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Latest updates from your sites</p></div><button className="more">•••</button></div><div className="activity-list">{activity.map(([initials, name, action, project, time, tone]) => <div className="activity" key={name}><div className={`avatar ${tone}`}>{initials}</div><div><p><strong>{name}</strong> {action}</p><small>{project} · {time}</small></div></div>)}</div><button className="text-link" onClick={() => notify("Activity log opened")}>View activity log →</button></section></div>
            <section className="quick-panel"><div><h2>Quick actions</h2><p>Common tasks for your day</p></div><button onClick={() => {setCheckedIn(!checkedIn); notify(checkedIn ? "Check-in undone" : "Attendance marked for today")}}><span className="quick-icon mint-bg">◷</span><span><strong>{checkedIn ? "Undo check-in" : "Mark attendance"}</strong><small>{checkedIn ? "You’re checked in" : "Start a site shift"}</small></span><b>→</b></button><button onClick={() => notify("Daily report started")}><span className="quick-icon violet-bg">▤</span><span><strong>Daily site report</strong><small>Log today’s progress</small></span><b>→</b></button><button onClick={() => notify("Safety inspection started")}><span className="quick-icon amber-bg">＋</span><span><strong>Safety inspection</strong><small>Run a site checklist</small></span><b>→</b></button></section>
          </>}

          {view !== "Overview" && <ViewContent view={view} query={query} setQuery={setQuery} projects={filteredProjects} checkedIn={checkedIn} setCheckedIn={setCheckedIn} notify={notify} />}
        </div>
        <div className="mobile-nav">{nav.slice(0, 5).map(([label, icon]) => <button key={label} className={view === label ? "selected" : ""} onClick={() => setView(label as View)}><span>{icon}</span>{label}</button>)}</div>
      </section>
      {toast && <div className="toast">✓ {toast}</div>}
    </main>
  );
}

function Metric({ title, value, change, icon, tone, alert }: { title: string; value: string; change: string; icon: string; tone: string; alert?: boolean }) { return <div className="metric panel"><div className={`metric-icon ${tone}`}>{icon}</div><div><p>{title}</p><strong>{value}</strong><small className={alert ? "alert-copy" : "positive-copy"}>{alert ? "● " : "↗ "}{change}</small></div></div>; }
function Bar({ label, planned, actual }: { label: string; planned: number; actual: number }) { return <div className="bar-group"><div className="bar-pair"><span className="bar planned" style={{ height: `${planned}%` }} /><span className="bar actual" style={{ height: `${actual}%` }} /></div><small>{label}</small></div>; }
function ProjectRow({ project }: { project: typeof projects[number] }) { return <div className="project-row"><div className={`project-mark ${project.tone}`}>{project.name.slice(0, 1)}</div><div className="project-meta"><strong>{project.name}</strong><small>{project.location} · Due {project.due}</small></div><div className="progress"><div><span style={{ width: `${project.progress}%` }} /></div><b>{project.progress}%</b></div><span className={`status ${project.tone}`}>{project.status}</span><button className="row-arrow">→</button></div>; }

function ViewContent({ view, query, setQuery, projects, checkedIn, setCheckedIn, notify }: { view: View; query: string; setQuery: (v: string) => void; projects: typeof projects; checkedIn: boolean; setCheckedIn: (v: boolean) => void; notify: (v: string) => void }) {
  if (view === "Projects") return <><div className="filter-row"><div className="search">⌕<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search projects" /></div><button className="secondary">All statuses⌄</button><button className="secondary">Sort by⌄</button></div><section className="panel table-panel"><div className="table-heading"><h2>Projects <span>08</span></h2><small>Showing {projects.length} projects</small></div>{projects.map((p) => <ProjectRow key={p.name} project={p} />)}</section></>;
  const data = view === "Attendance" ? [["184", "Present today"], ["12", "Late check-ins"], ["19", "Absent"], ["07:42", "Avg. check-in"]] : view === "Work" ? [["68.4%", "Overall progress"], ["24", "Open tasks"], ["08", "Due this week"], ["03", "Blocked"]] : view === "Safety" ? [["03", "Open issues"], ["98%", "PPE compliance"], ["12", "Inspections"], ["00", "Incidents"]] : [["24", "Reports ready"], ["08", "Projects covered"], ["184", "Workers"], ["92%", "Data completeness"]];
  return <><div className="metric-grid">{data.map(([value, label], i) => <Metric key={label} title={label} value={value} change={i === 0 ? "Updated just now" : "Across all sites"} icon={["↗", "▤", "◷", "✓"][i]} tone={["blue", "mint", "violet", "amber"][i]} />)}</div><section className="panel detail-panel"><div className="panel-heading"><div><h2>{view === "Attendance" ? "Site attendance" : view === "Work" ? "Work packages & tasks" : view === "Safety" ? "Safety & compliance" : "Report centre"}</h2><p>{view === "Attendance" ? "Live check-in activity across active projects" : "Keep every update moving with a clear audit trail."}</p></div><button className="primary" onClick={() => notify(`${view} action started`)}>＋ New {view === "Reports" ? "report" : view === "Work" ? "task" : view.toLowerCase()}</button></div>{view === "Attendance" && <div className="checkin-card"><div><span className="eyebrow">Quick check-in</span><h3>{checkedIn ? "You’re checked in at Harbor Point" : "Mark your attendance in one tap"}</h3><p>GPS verification enabled · Device trusted · 08:14 AM</p></div><button className={checkedIn ? "secondary" : "primary"} onClick={() => { setCheckedIn(!checkedIn); notify(checkedIn ? "Check-in undone" : "Attendance marked") }}>{checkedIn ? "Undo check-in" : "Check in now"}</button></div>}<div className="empty-table"><div className="empty-symbol">{view === "Safety" ? "＋" : view === "Reports" ? "▤" : view === "Work" ? "✓" : "◷"}</div><h3>Everything is up to date</h3><p>New activity will appear here as your teams update the site.</p></div></section></>;
}
