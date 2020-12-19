import React from 'react'
import './App.css'

const MoneyBook = props => {
  const [books, setBooks] = React.useState([])
  // const DATA_URI = 'http://192.168.33.10:3000/budget.json'
  const DATA_URI = 'http://localhost:8080/budget.json'
  // ComponentDidMountの代わり
  React.useEffect(() => {
    window
      .fetch(DATA_URI)
      .then(res => res.json())
      .then(json => setBooks(json))
  }, [])

  return (
    <>
      <Title>小遣い帳</Title>
      <InitialView books={books} />
    </>
  )
}
const Title = props => <h1>props.children</h1>

const InitialView = props =>
  props.books.length === 0 ? (
    <div>LoadingPage</div>
  ) : (
    <TableView books={props.books} />
  )

const TableView = props => {
  const headings = props.books[0]
  const books = props.books.slice(1)
  return (
    <table className='book'>
      <MatrixHeader headings={headings} />
      <MatrixBody books={books} />
    </table>
  )
}

const MatrixHeader = props => (
  <thead>
    <tr>
      {props.headings.map(heading => (
        <th key={heading}>{heading}</th>
      ))}
    </tr>
  </thead>
)

const MatrixBody = props => (
  <tbody>
    {props.books.map(book => (
      <BookItem book={book} key={book.date + book.item} />
    ))}
  </tbody>
)

const BookItem = props => {
  const { date, item, amount } = props.book
  const isNegative = amount => amount < 0
  return (
    <tr>
      <td>{date}</td>
      <td>{item}</td>
      <td>{!isNegative(amount) ? amount : null}</td>
      <td>{isNegative(amount) ? Math.abs(amount) : null}</td>
    </tr>
  )
}

export default MoneyBook
