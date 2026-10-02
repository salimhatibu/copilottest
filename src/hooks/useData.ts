import { useCallback, useEffect, useState } from 'react'

interface StudentRow {
  id: number
  admissionNumber: string
  name: string
  section: 'morning' | 'evening'
  expectedFeesCents: number
  paidCents: number
  outstandingCents: number
  percentPaid: number
}

export function useStudents() {
  const [students, setStudents] = useState<StudentRow[]>([
    {
      id: 1,
      admissionNumber: 'A-001',
      name: 'Amina Hassan',
      section: 'morning',
      expectedFeesCents: 1500000,
      paidCents: 900000,
      outstandingCents: 600000,
      percentPaid: 60,
    },
    {
      id: 2,
      admissionNumber: 'A-014',
      name: 'Salim Yusuf',
      section: 'evening',
      expectedFeesCents: 900000,
      paidCents: 900000,
      outstandingCents: 0,
      percentPaid: 100,
    },
    {
      id: 3,
      admissionNumber: 'A-032',
      name: 'Mariam Ali',
      section: 'morning',
      expectedFeesCents: 1500000,
      paidCents: 550000,
      outstandingCents: 950000,
      percentPaid: 36.7,
    },
  ])

  const getStudentById = useCallback((id: number) => students.find((s) => s.id === id), [students])
  const addStudent = useCallback(
    (student: Omit<StudentRow, 'id'>) => {
      const newId = Math.max(0, ...students.map((s) => s.id)) + 1
      setStudents((prev) => [...prev, { ...student, id: newId }])
    },
    [students],
  )

  return { students, getStudentById, addStudent }
}

export function useTeachers() {
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Ustadh Juma', expectedSalaryCents: 3500000, paidCents: 2500000, balanceCents: 1000000 },
    { id: 2, name: 'Ustadha Asha', expectedSalaryCents: 2800000, paidCents: 2800000, balanceCents: 0 },
    { id: 3, name: 'Ustadh Bakari', expectedSalaryCents: 3200000, paidCents: 2700000, balanceCents: 500000 },
  ])

  return { teachers }
}

export function useExpenses() {
  const [expenses, setExpenses] = useState([
    { id: 1, reason: 'Maintenance', amountCents: 650000, date: '2026-10-02', details: 'Classroom light repair' },
    { id: 2, reason: 'Books', amountCents: 230000, date: '2026-10-04', details: 'Amal and Tajweed book stock' },
    { id: 3, reason: 'Transport', amountCents: 410000, date: '2026-10-05', details: 'School bus fuel' },
  ])

  const total = expenses.reduce((sum, exp) => sum + exp.amountCents, 0)
  return { expenses, total }
}
