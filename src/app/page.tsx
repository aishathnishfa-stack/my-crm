'use client'

import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

export default function Home() {
  const [contacts, setContacts] = useState<any[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetchContacts()
  }, [])

  async function fetchContacts() {
    const { data, error } = await supabase.from('contacts').select('*')
    if (error) {
      console.error('Error fetching contacts:', error)
    } else {
      setContacts(data)
    }
  }

  async function addContact() {
    if (!name) return
    const { error } = await supabase.from('contacts').insert([{ name, email }])
    if (error) {
      console.error('Error adding contact:', error)
    } else {
      setName('')
      setEmail('')
      fetchContacts()
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>My CRM - Contacts</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={addContact}>Add Contact</button>
      </div>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} — {contact.email}
          </li>
        ))}
      </ul>
    </div>
  )
}