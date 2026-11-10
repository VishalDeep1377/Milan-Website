import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

const sampleEvents = [
  { id:1, title:'Pulse of the Planet', category:'Music', date:'18 DEC', time:'6:30 PM', venue:'Open Air Theatre', description:'An electric night of live bands', tag:'Flagship' },
  { id:2, title:'The Grand Canvas', category:'Fine Arts', date:'18 DEC', time:'10:00 AM', venue:'Tech Park Atrium', description:'A creative playground for artists', tag:'Creative' },
  { id:3, title:'Battle of the Beats', category:'Dance', date:'19 DEC', time:'5:00 PM', venue:'Main Auditorium', description:'Own the floor with choreography', tag:'Crowd favourite' },
  { id:4, title:'Frame by Frame', category:'Photography', date:'19 DEC', time:'9:00 AM', venue:'University Boulevard', description:'Capture the details', tag:'Open entry' },
  { id:5, title:'Mic Drop', category:'Literary', date:'20 DEC', time:'11:00 AM', venue:'Seminar Hall 2', description:'Words, wit and stage presence', tag:'New' },
  { id:6, title:'Rhythm & Roots', category:'Music', date:'20 DEC', time:'4:00 PM', venue:'Cultural Plaza', description:'Celebrate sound, tradition', tag:'Showcase' },
  { id:7, title:'Theatre Unscripted', category:'Theatre', date:'20 DEC', time:'6:00 PM', venue:'Mini Auditorium', description:'Improvise, experiment and bring a story to life', tag:'Live' },
  { id:8, title:'Pixel Playground', category:'Gaming', date:'19 DEC', time:'12:00 PM', venue:'Innovation Lab', description:'A friendly competitive arena', tag:'Competitive' }
]

function filterEvents(events, activeCategory, query) {
  const q = query.trim().toLowerCase()
  return events.filter((e) => {
    const matchesCategory = activeCategory === 'All' || e.category === activeCategory
    const searchTarget = `${e.title} ${e.category} ${e.description} ${e.venue} ${e.tag}`.toLowerCase()
    const matchesQuery = q === '' || searchTarget.includes(q)
    return matchesCategory && matchesQuery
  })
}

describe('Event Discovery & Filtering Suite', () => {
  it('should return all 8 events when category is All and query is empty', () => {
    const res = filterEvents(sampleEvents, 'All', '')
    assert.equal(res.length, 8)
  })

  it('should filter correctly by category Music', () => {
    const res = filterEvents(sampleEvents, 'Music', '')
    assert.equal(res.length, 2)
    assert.ok(res.every((e) => e.category === 'Music'))
  })

  it('should filter correctly by keyword search regardless of case', () => {
    const res = filterEvents(sampleEvents, 'All', 'auditorium')
    // Matches Main Auditorium (Battle of the Beats) and Mini Auditorium (Theatre Unscripted)
    assert.equal(res.length, 2)
  })

  it('should combine category filter and search query', () => {
    // Search 'planet' in 'Music'
    const res = filterEvents(sampleEvents, 'Music', 'planet')
    assert.equal(res.length, 1)
    assert.equal(res[0].title, 'Pulse of the Planet')

    // Search 'planet' in 'Dance' (should yield 0)
    const zeroRes = filterEvents(sampleEvents, 'Dance', 'planet')
    assert.equal(zeroRes.length, 0)
  })

  it('should return empty array for non-matching queries (triggering empty state)', () => {
    const res = filterEvents(sampleEvents, 'All', 'xyzrandomnonexistentquery123')
    assert.equal(res.length, 0)
  })
})
