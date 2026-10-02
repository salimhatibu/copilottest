import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  boolean,
  date,
  unique,
  primaryKey,
  varchar,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Settings
export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  shortName: varchar('short_name', { length: 50 }).notNull().default('MARKAZ'),
  currencySymbol: varchar('currency_symbol', { length: 5 }).notNull().default('KES'),
  postalAddress: text('postal_address'),
  accountName: varchar('account_name', { length: 100 }),
  bank: varchar('bank', { length: 100 }),
  paybill: varchar('paybill', { length: 20 }),
  accountNumber: varchar('account_number', { length: 50 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Students
export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  admissionNumber: varchar('admission_number', { length: 50 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  dateOfBirth: date('date_of_birth'),
  gender: varchar('gender', { length: 10 }).notNull(), // 'male' or 'female'
  section: varchar('section', { length: 20 }).notNull(), // 'morning' or 'evening'
  expectedFeesCents: integer('expected_fees_cents').notNull(), // stored as cents
  guardianName: varchar('guardian_name', { length: 100 }).notNull(),
  guardianPhone: varchar('guardian_phone', { length: 20 }),
  guardianEmail: varchar('guardian_email', { length: 100 }),
  guardianPhone2: varchar('guardian_phone_2', { length: 20 }),
  guardianEmail2: varchar('guardian_email_2', { length: 100 }),
  lastReminderSentAt: timestamp('last_reminder_sent_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Student fee payments
export const studentPayments = pgTable('student_payments', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  amountCents: integer('amount_cents').notNull(),
  paymentDate: date('payment_date').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Teachers
export const teachers = pgTable('teachers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  dateOfBirth: date('date_of_birth'),
  gender: varchar('gender', { length: 10 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  nationalId: varchar('national_id', { length: 50 }),
  mPesaName: varchar('mpesa_name', { length: 100 }),
  mPesaNumber: varchar('mpesa_number', { length: 20 }),
  expectedSalaryCents: integer('expected_salary_cents').notNull(),
  expectedReleaseDate: date('expected_release_date'),
  paidInAdvance: boolean('paid_in_advance').notNull().default(false),
  section: varchar('section', { length: 50 }).notNull(), // 'morning', 'evening', or 'both'
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Teacher salary payments
export const salaryPayments = pgTable('salary_payments', {
  id: serial('id').primaryKey(),
  teacherId: integer('teacher_id').notNull().references(() => teachers.id, { onDelete: 'cascade' }),
  amountCents: integer('amount_cents').notNull(),
  paymentDate: date('payment_date').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Expenses
export const expenses = pgTable('expenses', {
  id: serial('id').primaryKey(),
  reason: varchar('reason', { length: 50 }).notNull(), // 'Maintenance', 'Books', 'Food', 'Transport', 'Utilities', 'Other'
  customLabel: varchar('custom_label', { length: 100 }), // for 'Other' reason
  amountCents: integer('amount_cents').notNull(),
  expenseDate: date('expense_date').notNull(),
  details: text('details'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Blog posts
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  body: text('body').notNull(),
  seriesId: integer('series_id').references(() => series.id),
  coverImageUrl: text('cover_image_url'),
  published: boolean('published').notNull().default(false),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Blog series
export const series = pgTable('series', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Post analytics
export const postAnalytics = pgTable(
  'post_analytics',
  {
    id: serial('id').primaryKey(),
    postId: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
    sessionId: varchar('session_id', { length: 100 }).notNull(),
    eventType: varchar('event_type', { length: 50 }).notNull(), // 'view', 'impression', 'click'
    dwellSeconds: integer('dwell_seconds'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    unique: unique().on(table.postId, table.sessionId, table.eventType),
  })
)

// Post likes (per session)
export const postLikes = pgTable(
  'post_likes',
  {
    id: serial('id').primaryKey(),
    postId: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
    sessionId: varchar('session_id', { length: 100 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    unique: unique().on(table.postId, table.sessionId),
  })
)

// Post saves (per session)
export const postSaves = pgTable(
  'post_saves',
  {
    id: serial('id').primaryKey(),
    postId: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
    sessionId: varchar('session_id', { length: 100 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => ({
    unique: unique().on(table.postId, table.sessionId),
  })
)

// Post comments
export const postComments = pgTable('post_comments', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  sessionId: varchar('session_id', { length: 100 }).notNull(),
  body: text('body').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// Newsletter subscribers
export const newsletterSubscribers = pgTable(
  'newsletter_subscribers',
  {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull(),
    unsubscribeToken: varchar('unsubscribe_token', { length: 100 }).notNull().unique(),
    subscribedAt: timestamp('subscribed_at').notNull().defaultNow(),
  },
  (table) => ({
    unique: unique().on(table.email),
  })
)

// Reports
export const reports = pgTable('reports', {
  id: serial('id').primaryKey(),
  period: varchar('period', { length: 20 }).notNull(), // 'biweekly' or 'monthly'
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  blobUrl: text('blob_url').notNull(),
  isRead: boolean('is_read').notNull().default(false),
  generatedAt: timestamp('generated_at').notNull().defaultNow(),
})

// Hadith notes
export const hadithNotes = pgTable('hadith_notes', {
  id: serial('id').primaryKey(),
  hijriDate: varchar('hijri_date', { length: 20 }).notNull(), // stored as YYYY-MM-DD Hijri
  note: text('note').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// Keeper onboarding state
export const keeperOnboarding = pgTable('keeper_onboarding', {
  id: serial('id').primaryKey(),
  keeperId: varchar('keeper_id', { length: 255 }).notNull().unique(),
  completedTutorial: boolean('completed_tutorial').notNull().default(false),
  lastTutorialAt: timestamp('last_tutorial_at'),
})
