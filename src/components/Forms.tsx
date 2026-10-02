import { useState } from 'react'
import type { ReactNode } from 'react'

interface StudentDetail {
  id?: number
  admissionNumber: string
  name: string
  dateOfBirth?: string
  gender: 'male' | 'female'
  section: 'morning' | 'evening'
  expectedFeesCents: number
  guardianName: string
  guardianPhone?: string
  guardianEmail?: string
  guardianPhone2?: string
  guardianEmail2?: string
}

export function StudentForm({
  onSubmit,
  onCancel,
  initialData,
}: {
  onSubmit: (data: StudentDetail) => void
  onCancel: () => void
  initialData?: StudentDetail
}) {
  const [form, setForm] = useState<StudentDetail>(initialData || {
    admissionNumber: '',
    name: '',
    gender: 'male',
    section: 'morning',
    expectedFeesCents: 0,
    guardianName: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Enrol student</h2>
        <form onSubmit={handleSubmit} className="enrollment-form">
          <div className="form-grid">
            <label>
              Admission number *
              <input
                type="text"
                value={form.admissionNumber}
                onChange={(e) => setForm({ ...form, admissionNumber: e.target.value })}
                required
              />
            </label>
            <label>
              Name *
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </label>
            <label>
              Date of birth
              <input
                type="date"
                value={form.dateOfBirth || ''}
                onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
              />
            </label>
            <label>
              Gender *
              <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value as any })}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label>
              Section *
              <select value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value as any })}>
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
              </select>
            </label>
            <label>
              Expected fees (KES) *
              <input
                type="number"
                value={form.expectedFeesCents / 100}
                onChange={(e) => setForm({ ...form, expectedFeesCents: Math.round(parseFloat(e.target.value) * 100) })}
                required
              />
            </label>
            <label>
              Guardian name *
              <input
                type="text"
                value={form.guardianName}
                onChange={(e) => setForm({ ...form, guardianName: e.target.value })}
                required
              />
            </label>
            <label>
              Guardian phone
              <input type="tel" value={form.guardianPhone || ''} onChange={(e) => setForm({ ...form, guardianPhone: e.target.value })} />
            </label>
            <label>
              Guardian email
              <input type="email" value={form.guardianEmail || ''} onChange={(e) => setForm({ ...form, guardianEmail: e.target.value })} />
            </label>
            <label>
              Second contact phone
              <input type="tel" value={form.guardianPhone2 || ''} onChange={(e) => setForm({ ...form, guardianPhone2: e.target.value })} />
            </label>
            <label>
              Second contact email
              <input type="email" value={form.guardianEmail2 || ''} onChange={(e) => setForm({ ...form, guardianEmail2: e.target.value })} />
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Save student
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export function ExpenseForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: any) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState({ reason: 'Maintenance', amountCents: 0, expenseDate: '', details: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Record expense</h2>
        <form onSubmit={handleSubmit} className="enrollment-form">
          <div className="form-grid">
            <label>
              Reason *
              <select value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })}>
                <option>Maintenance</option>
                <option>Books</option>
                <option>Food</option>
                <option>Transport</option>
                <option>Utilities</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Amount (KES) *
              <input
                type="number"
                step="0.01"
                value={form.amountCents / 100}
                onChange={(e) => setForm({ ...form, amountCents: Math.round(parseFloat(e.target.value) * 100) })}
                required
              />
            </label>
            <label>
              Date *
              <input type="date" value={form.expenseDate} onChange={(e) => setForm({ ...form, expenseDate: e.target.value })} required />
            </label>
            <label className="full-width">
              Details
              <textarea value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} />
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Save expense
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
