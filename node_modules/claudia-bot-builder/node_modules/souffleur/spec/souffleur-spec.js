/* global describe, it, expect */
'use srict'

const prompt = require('../index')

describe('Souffleur (prompt)', () => {
  it('should be a function', () => {
    expect(typeof prompt)
      .toBe('function')
  })

  it('should throw an error if at least one question is not provided', () =>
    expect(prompt)
      .toThrowError('First argument needs to be an array or string')
  )

  it('should throw an error if first argument is not a string or an array', () =>
    expect(() => prompt(123))
      .toThrowError('First argument needs to be an array or string')
  )

  it('should return an object with question as a key and answer as a value if just one question is passed', () => {
    prompt('question')
      .then(results =>
        expect(results)
          .toBe({
            question: 'answer'
          })
      )

    process.stdin.emit('data', 'answer')
  })

  it('should return an object with both question as keys and both answera as values if two question is passed', () => {
    prompt(['question1', 'question2'])
      .then(results =>
        expect(results)
          .toBe({
            question1: 'answer1',
            question2: 'answer2'
          })
      )

    process.stdin.emit('data', 'answer1')
    process.stdin.emit('data', 'answer2')
  })

  it('should retry if the answer is empty', () => {
    prompt('question')
      .then(results =>
        expect(results)
          .toBe({
            question: 'answer'
          })
      )

    process.stdin.emit('data', '')
    process.stdin.emit('data', 'answer')
  })

  it('should work if you have spaces in the question', () => {
    prompt('Question with spaces')
      .then(results =>
        expect(results)
          .toBe({
            'Question with spaces': 'answer'
          })
      )

    process.stdin.emit('data', 'answer')
  })

  it('should keep the last answer if two questions are the same', () => {
    prompt(['Question', 'Question'])
      .then(results =>
        expect(results)
          .toBe({
            'Question': 'Answer 2'
          })
      )

    process.stdin.emit('data', 'Answer 1')
    process.stdin.emit('data', 'Answer 2')
  })
})
