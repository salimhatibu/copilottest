import { Navigate, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useMemo } from 'react'

const DEV_USER = {
  id: 'keeper-local',
  email: 'keeper@markaz.test',
  role: 'admin' as const,
}

const navSections = [
  { label: 'Desk', items: [{ to: '/', label: 'Home' }] },
  { label: 'People', items: [{ to: '/students', label: 'Students' }, { to: '/teachers', label: 'Teachers' }] },
  { label: 'Books', items: [{ to: '/expenses', label: 'Expenses' }, { to: '/reports', label: 'Reports' }] },
  { label: 'Papers', items: [{ to: '/blog', label: 'Blog' }] },
  { label: 'Office', items: [{ to: '/settings', label: 'Settings' }] },
]

const dashboardCards = [
  { title: 'In the office', value: 'KES 142,000', note: 'Fees received less salaries and expenses in this month', accent: true },
  { title: 'Fees collected', value: 'KES 278,000', note: 'Cash coming in within the current window' },
  { title: 'Salaries paid', value: 'KES 96,500', note: 'Teacher payroll in the current window' },
  { title: 'Expenses', value: 'KES 39,500', note: 'Office and maintenance costs' },
  { title: 'Still owed', value: 'KES 86,700', note: 'Open student fees across all years' },
]

const rollRows = [
  { label: 'Morning students', value: '134' },
  { label: 'Evening students', value: '84' },
  { label: 'Teachers', value: '18' },
]

const studentRows = [
  { admission: 'A-001', name: 'Amina Hassan', section: 'Morning', expected: 15000, paid: 9000, outstanding: 6000, percent: 60 },
  { admission: 'A-014', name: 'Salim Yusuf', section: 'Evening', expected: 9000, paid: 9000, outstanding: 0, percent: 100 },
  { admission: 'A-032', name: 'Mariam Ali', section: 'Morning', expected: 15000, paid: 5500, outstanding: 9500, percent: 36.7 },
]

const teacherRows = [
  { name: 'Ustadh Juma', salary: 35000, paid: 25000, balance: 10000 },
  { name: 'Ustadha Asha', salary: 28000, paid: 28000, balance: 0 },
  { name: 'Ustadh Bakari', salary: 32000, paid: 27000, balance: 5000 },
]

const expenseRows = [
  { reason: 'Maintenance', amount: 6500, date: '2026-10-02', details: 'Classroom light repair' },
  { reason: 'Books', amount: 2300, date: '2026-10-04', details: 'Amal and Tajweed book stock' },
  { reason: 'Transport', amount: 4100, date: '2026-10-05', details: 'School bus fuel' },
]

const posts = [
  { title: 'A quiet start to the morning', slug: 'quiet-start', series: 'Marriage', published: true, date: '2026-10-02' },
  { title: 'The beauty of sincerity in worship', slug: 'beauty-of-sincerity', series: 'Worship', published: true, date: '2026-10-01' },
  { title: 'Draft: modesty in speech', slug: 'modesty-in-speech', series: 'Modesty', published: false, date: '2026-10-06' },
]

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RequireDeskAccess><DeskPage /></RequireDeskAccess>} />
      <Route path="/students" element={<RequireDeskAccess><StudentsPage /></RequireDeskAccess>} />
      <Route path="/teachers" element={<RequireDeskAccess><TeachersPage /></RequireDeskAccess>} />
      <Route path="/expenses" element={<RequireDeskAccess><ExpensesPage /></RequireDeskAccess>} />
      <Route path="/reports" element={<RequireDeskAccess><ReportsPage /></RequireDeskAccess>} />
      <Route path="/settings" element={<RequireDeskAccess><SettingsPage /></RequireDeskAccess>} />
      <Route path="/blog" element={<RequireDeskAccess><BlogDeskPage /></RequireDeskAccess>} />
      <Route path="/read" element={<PublicPaperPage />} />
      <Route path="/read/saved" element={<PublicPaperPage saved />} />
      <Route path="/read/series/:slug" element={<PublicPaperPage />} />
      <Route path="/read/:slug" element={<PublicPaperPage />} />
      <Route path="*" element={<Navigate to="/read" replace />} />
    </Routes>
  )
}

function RequireDeskAccess({ children }: { children: ReactNode }) {
  const isHosted = import.meta.env.PROD
  const allowed = !isHosted || DEV_USER.role === 'admin'

  if (!allowed) {
    return <LockedPage />
  }

  return <>{children}</>
}

function LockedPage() {
  return (
    <div className="locked-shell">
      <div className="locked-card">
        <p className="eyebrow">Access restricted</p>
        <h1>Desk access is not open.</h1>
        <p>Only the keeper with the admin role may open the books.</p>
        <div className="locked-actions">
          <NavLink className="primary-button" to="/read">Read the papers</NavLink>
          <button type="button" className="secondary-button" onClick={() => window.location.assign('/login')}>Sign out</button>
        </div>
      </div>
    </div>
  )
}

function LoginPage() {
  return (
    <div className="login-shell">
      <div className="particle-field" aria-hidden="true" />
      <div className="login-card">
        <p className="eyebrow login-eyebrow">Markaz al-Imaam ash-Shaafi'iy</p>
        <h1>Open the gate.</h1>
        <div className="auth-mode-tabs">
          <button type="button" className="auth-tab active">Sign in</button>
          <button type="button" className="auth-tab">Create account</button>
          <button type="button" className="auth-tab">Forgot password</button>
        </div>
        <form className="auth-form">
          <label>
            Email
            <input type="email" placeholder="keeper@example.com" />
          </label>
          <label>
            Password
            <input type="password" placeholder="••••••••" />
          </label>
          <button type="submit" className="primary-button full-width">Sign in</button>
        </form>
        <NavLink className="paper-link" to="/read">Read the papers</NavLink>
      </div>
    </div>
  )
}

function DeskPage() {
  const location = useLocation()
  const windowLabel = '1 October 2026 through 14 October 2026'

  return (
    <DeskLayout>
      <header className="content-topbar">
        <div>
          <p className="eyebrow">Today at a glance</p>
          <h1>14 Safar 1448 AH</h1>
          <div className="date-row">
            <span>Thursday, 14 October 2026</span>
            <span>•</span>
            <span>١٤ صفر ١٤٤٨</span>
          </div>
        </div>
        <blockquote className="quote-block">
          <p>“Knowledge is not only learned by the tongue but also by the heart and the soul.”</p>
          <footer>Timeless Seeds of Advice</footer>
        </blockquote>
      </header>

      <section className="panel-block">
        <div className="section-heading-row">
          <h2>Accounts</h2>
          <span>{windowLabel}</span>
        </div>
        <div className="stat-grid">
          {dashboardCards.map((card) => (
            <div key={card.title} className={`stat-card ${card.accent ? 'pink-edge' : ''}`}>
              <div className="stat-caption">{card.title}</div>
              <div className="stat-value">{card.value}</div>
              <div className="stat-note">{card.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel-block split-block">
        <div className="roll-block">
          <div className="section-heading-row compact">
            <h2>The roll</h2>
          </div>
          <div className="roll-list">
            {rollRows.map((row) => (
              <div key={row.label} className="roll-row">
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="hadith-card">
          <div className="section-heading-row compact">
            <h2>Hadith of the day</h2>
          </div>
          <p className="hadith-chapter">Book of Wedlock • سنن النبي في النكاح</p>
          <p className="hadith-header">Narrated by: Anas ibn Malik</p>
          <p className="hadith-text">“The Prophet said, ‘When a man marries, he has fulfilled half of his faith. So let him fear Allah for the other half.’”</p>
          <p className="hadith-arabic">قال النبي ﷺ: «إذا تزوج العبد فقد استكمل نصف الدين، فليتق الله في النصف الباقي.»</p>
          <p className="hadith-reference">Sahih al-Bukhari, Book of Wedlock, Hadith 5193</p>
        </div>
      </section>
    </DeskLayout>
  )
}

function StudentsPage() {
  return (
    <DeskLayout>
      <header className="page-header">
        <div>
          <p className="eyebrow">People</p>
          <h1>Students</h1>
        </div>
        <button type="button" className="primary-button">Enrol student</button>
      </header>

      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>Admission</th>
              <th>Name</th>
              <th>Section</th>
              <th>Expected</th>
              <th>Paid</th>
              <th>Outstanding</th>
              <th>% paid</th>
            </tr>
          </thead>
          <tbody>
            {studentRows.map((student) => (
              <tr key={student.admission}>
                <td>{student.admission}</td>
                <td>{student.name}</td>
                <td>{student.section}</td>
                <td>KES {student.expected.toLocaleString()}</td>
                <td>KES {student.paid.toLocaleString()}</td>
                <td>KES {student.outstanding.toLocaleString()}</td>
                <td>{student.percent.toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DeskLayout>
  )
}

function TeachersPage() {
  return (
    <DeskLayout>
      <header className="page-header">
        <div>
          <p className="eyebrow">People</p>
          <h1>Teachers</h1>
        </div>
        <button type="button" className="primary-button">Add teacher</button>
      </header>
      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Expected salary</th>
              <th>Paid</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {teacherRows.map((teacher) => (
              <tr key={teacher.name}>
                <td>{teacher.name}</td>
                <td>KES {teacher.salary.toLocaleString()}</td>
                <td>KES {teacher.paid.toLocaleString()}</td>
                <td>KES {teacher.balance.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DeskLayout>
  )
}

function ExpensesPage() {
  return (
    <DeskLayout>
      <header className="page-header">
        <div>
          <p className="eyebrow">Books</p>
          <h1>Expenses</h1>
        </div>
        <button type="button" className="primary-button">Record expense</button>
      </header>
      <div className="summary-row">
        <strong>Total spent: KES 13,900</strong>
      </div>
      <div className="table-shell">
        <table>
          <thead>
            <tr>
              <th>Reason</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {expenseRows.map((expense) => (
              <tr key={`${expense.reason}-${expense.date}`}>
                <td>{expense.reason}</td>
                <td>KES {expense.amount.toLocaleString()}</td>
                <td>{expense.date}</td>
                <td>{expense.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DeskLayout>
  )
}

function ReportsPage() {
  return (
    <DeskLayout>
      <header className="page-header">
        <div>
          <p className="eyebrow">Books</p>
          <h1>Reports</h1>
        </div>
        <button type="button" className="primary-button">Generate current report</button>
      </header>
      <div className="report-list">
        <div className="report-item">
          <span>Monthly • 01 Oct 2026 – 31 Oct 2026</span>
          <button type="button" className="secondary-button">Download</button>
        </div>
        <div className="report-item">
          <span>Biweekly • 16 Oct 2026 – 31 Oct 2026</span>
          <button type="button" className="secondary-button">Download</button>
        </div>
      </div>
    </DeskLayout>
  )
}

function SettingsPage() {
  return (
    <DeskLayout>
      <header className="page-header">
        <div>
          <p className="eyebrow">Office</p>
          <h1>Settings</h1>
        </div>
      </header>
      <div className="settings-grid">
        <label>Short markaz name <input defaultValue="MARKAZ" /></label>
        <label>Currency symbol <input defaultValue="KES" /></label>
        <label>Postal address <input defaultValue="P.O. Box 3011-80100, Mombasa" /></label>
        <label>Account name <input defaultValue="Ahlul Athar Registered Trustees" /></label>
        <label>Bank <input defaultValue="Gulf African Bank" /></label>
        <label>Paybill <input defaultValue="985050" /></label>
        <label>Account number <input defaultValue="0700004102" /></label>
      </div>
    </DeskLayout>
  )
}

function BlogDeskPage() {
  return (
    <div className="paper-admin-shell">
      <header className="paper-admin-masthead">
        <div className="brand-wrap">
          <span className="brand-name">The سلفية mindset</span>
        </div>
        <div className="masthead-links">
          <span>14 October 2026</span>
          <span>Series</span>
          <button type="button" className="secondary-button small">Sign out</button>
        </div>
      </header>

      <div className="admin-steps">
        <span className="step current">01 Desk</span>
        <span className="step">02 The posts</span>
        <span className="step">03 Write</span>
        <span className="step">04 Analytics</span>
      </div>

      <div className="blog-dashboard">
        <div className="blog-panel">
          <h2>Desk</h2>
          <p>5 public posts</p>
          <p>Drawer is not empty.</p>
        </div>
        <div className="blog-panel">
          <h2>Doors</h2>
          <ul>
            <li><a href="/read">The posts</a></li>
            <li><a href="/blog">Write</a></li>
            <li><a href="/reports">Analytics</a></li>
          </ul>
        </div>
      </div>
      <div className="post-list-box">
        {posts.map((post) => (
          <div key={post.slug} className="draft-row">
            <span>{post.title}</span>
            <span>{post.series}</span>
            <span>{post.published ? 'Published' : 'Draft'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PublicPaperPage({ saved = false }: { saved?: boolean }) {
  const { slug } = useParams()
  const isArticle = Boolean(slug)

  return (
    <div className="paper-shell">
      <header className="paper-masthead">
        <div className="paper-heading">
          <div className="issue-date">14 October 2026 • 14 Safar 1448 AH</div>
          <h1>The سلفية mindset</h1>
          <p>“Your daily dose of salafiyyah.”</p>
        </div>

        <nav className="paper-nav" aria-label="Paper sections">
          <NavLink to="/read">The papers</NavLink>
          <NavLink to="/read/saved">Saved</NavLink>
          <span className="series-label">Series</span>
          <span className="series-list">Marriage • Modesty • Worship</span>
          {isArticle && <span>The piece</span>}
          <span>Letters</span>
        </nav>
      </header>

      <main className="paper-content">
        {!isArticle && (
          <>
            <section className="paper-grid">
              <article className="paper-story">
                <p className="kicker">Marriage</p>
                <h2>A quiet start to the morning</h2>
                <p className="story-meta">14 October 2026</p>
                <p>In the life of a believer, the first acts of the day set the tone for the heart and the home. A little discipline, a little gratitude, and a prayer before the rush of the world.</p>
                <p><NavLink to="/read/quiet-start">Read more</NavLink></p>
              </article>

              <aside className="paper-rail">
                <h3>Saved papers</h3>
                {saved ? <p>No saved papers yet.</p> : <p>Keep a few pieces you want to return to.</p>}
              </aside>
            </section>
          </>
        )}

        {isArticle && (
          <article className="paper-story article-story">
            <p className="kicker">Marriage</p>
            <h2>A quiet start to the morning</h2>
            <p className="story-meta">14 October 2026</p>
            <p>When the day begins with remembrance, the rest of the hours are shaped by it. We rise in due time, we do not rush, and we make room for gratitude before haste.</p>
            <p>The home bears the mark of the heart. In marriage, kindness, patience, and sincerity are the quiet strengths that make a household steady.</p>
            <div className="story-actions">
              <button type="button">♥ Like</button>
              <button type="button">Save</button>
              <button type="button">Share</button>
              <button type="button">Letters</button>
            </div>
          </article>
        )}
      </main>
    </div>
  )
}

function DeskLayout({ children }: { children: ReactNode }) {
  return (
    <div className="office-shell">
      <aside className="office-rail">
        <div className="mark-card">
          <div className="mark-stack">M</div>
          <div>
            <strong>MARKAZ</strong>
            <small>Imam ash-Shafi'i</small>
          </div>
        </div>

        {navSections.map((section) => (
          <div key={section.label} className="nav-section">
            <div className="nav-label">{section.label}</div>
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="nav-icon">•</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </aside>

      <main className="office-main">
        <div className="top-strip">
          <button type="button" className="menu-button" aria-label="Open menu">☰</button>
          <div className="top-strip-actions">
            <span className="report-pill">Report ready</span>
            <button type="button" className="icon-button">?</button>
            <button type="button" className="theme-switch" aria-label="Toggle theme">☀︎ / ☾</button>
            <button type="button" className="signout-button">Sign out</button>
          </div>
        </div>
        <div className="content-column">{children}</div>
      </main>
    </div>
  )
}

export default App
