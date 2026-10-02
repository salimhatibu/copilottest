export interface StudentPaymentRecord {
  id: number
  studentId: number
  amountCents: number
  paymentDate: string
  notes?: string
}

export function StudentPaymentsList({
  payments,
  onAdd,
  onDelete,
}: {
  payments: StudentPaymentRecord[]
  onAdd: (payment: Omit<StudentPaymentRecord, 'id'>) => void
  onDelete: (id: number) => void
}) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ amountCents: 0, paymentDate: '', notes: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd({
      studentId: 0,
      amountCents: form.amountCents,
      paymentDate: form.paymentDate,
      notes: form.notes,
    })
    setForm({ amountCents: 0, paymentDate: '', notes: '' })
    setShowForm(false)
  }

  return (
    <div className="section-block">
      <div className="section-heading-row">
        <h3>Fee payments</h3>
        <button type="button" className="secondary-button small" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Record payment'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="quick-form">
          <div className="form-row">
            <label>
              Amount (KES)
              <input
                type="number"
                step="0.01"
                value={form.amountCents / 100}
                onChange={(e) => setForm({ ...form, amountCents: Math.round(parseFloat(e.target.value) * 100) })}
                required
              />
            </label>
            <label>
              Date
              <input type="date" value={form.paymentDate} onChange={(e) => setForm({ ...form, paymentDate: e.target.value })} required />
            </label>
            <label>
              Notes
              <input type="text" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </label>
            <button type="submit" className="primary-button">Save</button>
          </div>
        </form>
      )}

      {payments.length === 0 ? (
        <p className="empty-state">No payments recorded.</p>
      ) : (
        <div className="payment-list">
          {payments.map((payment) => (
            <div key={payment.id} className="payment-row">
              <div>
                <strong>KES {(payment.amountCents / 100).toLocaleString()}</strong>
                <span>{payment.paymentDate}</span>
              </div>
              {payment.notes && <p>{payment.notes}</p>}
              <button type="button" className="delete-button" onClick={() => onDelete(payment.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import { useState } from 'react'
