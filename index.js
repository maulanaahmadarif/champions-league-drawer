const Table = require('cli-table')

const log = console.log

// Still looking for the real data (API), but for the sake of illustration i use mock data base on UEFA Champions League 2018 - 2019
const mockdata = require('./mock.json')

// Make the data random by shuffling
function randomizeArr(arr) {
  let cIndex = arr.length, tempValue, randomIndex
  while (cIndex != 0) {
    randomIndex = Math.floor(Math.random() * cIndex)
    cIndex -= 1

    tempValue = arr[cIndex]
    arr[cIndex] = arr[randomIndex]
    arr[randomIndex] = tempValue
  } 
  return arr
}

const data = randomizeArr(mockdata)

// Save the drawing data here
let drawingResult = []

// Loop over the data, I know it O(n^2) and you should avoid that
for (let i = 0;i < data.length;i++) {
  for (let j = 0;j < data.length;j++) {
    const cIndex = data[i]
    const againstIndex = data[j]
    // This is the match up logic, to follow the procedure (see README)
    if (againstIndex.club !== cIndex.club && againstIndex.country !== cIndex.country && againstIndex.group !== cIndex.group && againstIndex.last_positions !== cIndex.last_positions) {
      const drawOne = drawingResult.map(c => c.club).indexOf(againstIndex.club)
      const drawTwo = drawingResult.map(c => c.club).indexOf(cIndex.club)
      if (drawOne === -1 && drawTwo === -1) {
        cIndex.last_positions > againstIndex.last_positions ? drawingResult.push(cIndex, againstIndex) : drawingResult.push(againstIndex, cIndex)
      }
    }
  }
}

// Help me to create a beautiful table in terminal
const table = new Table({
  head: ['#', 'Home (first leg)', 'Away (first leg)'],
  colWidths: [10, 50, 50]
})

let counter = 1

for (let i = 0;i < drawingResult.length;i += 2) {
  table.push([counter, drawingResult[i].club, drawingResult[i + 1].club])
  counter++
}

log(table.toString())
