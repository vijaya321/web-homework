import React, { useState, useEffect } from 'react'
import { Pie, defaults } from 'react-chartjs-2'
import propTypes from 'prop-types'

defaults.global.legend.position = 'right'

export default function categoryChart (props) {
  const [expense, setExpenses] = useState([])
  let hh = [0]
  let fb = [0]
  let am = [0]
  let gr = [0]
  let ut = [0]

  useEffect(() => {
    for (var item in props.expenses) {
      if (props.expenses[item].category === 'Automobile') {
        am.push(props.expenses[item].amount)
      }
      if (props.expenses[item].category === 'Food and Beverage') {
        fb.push(props.expenses[item].amount)
      }
      if (props.expenses[item].category === 'Groceries') {
        gr.push(props.expenses[item].amount)
      }
      if (props.expenses[item].category === 'House Hold') {
        hh.push(props.expenses[item].amount)
      }
      if (props.expenses[item].category === 'Utilities') {
        ut.push(props.expenses[item].amount)
      }
    }
    setExpenses(state => [am.reduce(function (acc, val) { return acc + val }, 0), ...state])
    setExpenses(state => [fb.reduce(function (acc, val) { return acc + val }, 0), ...state])
    setExpenses(state => [gr.reduce(function (acc, val) { return acc + val }, 0), ...state])
    setExpenses(state => [hh.reduce(function (acc, val) { return acc + val }, 0), ...state])
    setExpenses(state => [ut.reduce(function (acc, val) { return acc + val }, 0), ...state])
  }, [])

  return (
    <div>
      <Pie
        data={{
          labels: ['Automobile', 'Food and Beverage', 'Groceries', 'House Hold', 'Utilities'],
          datasets: [
            {
              label: '# of votes',
              data: expense,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }
          ]
        }}
        height={200}
        options={
          {
            maintainAspectRatio: false,
            layout: {
              padding: {
                height: 50,
                left: 300,
                right: 0,
                top: 0,
                bottom: 0
              }
            },
            scales: {
              legend: {
                labels: {
                  fontSize: 10
                },
                boxWidth: 20
              }
            }
          }
        }
        width={10}
      />
    </div>
  )
}

categoryChart.propTypes = {
  expenses: propTypes.expenses
}
