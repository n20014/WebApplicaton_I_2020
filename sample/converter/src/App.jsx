import React from 'react'
import './App.css'

const TitleView = props => <h1>{props.children}</h1>
const LoadingView = props => <h1>{props.text}</h1>
const InitialView = props => (props.state.loading
  ? <LoadingView text='Now Loading...' />
  : <MainView state={props.state} onUpdate={props.onUpdate} />
)

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      rate: 103,
      items: { usd: null, jpn: null }
    }
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount () {
    this.setState({ loading: false, items: { usd: 0, jpn: 0 } })
  }

  render () {
    console.log(this.state)
    return <InitialView state={this.state} onUpdate={this.handleUpdate} />
  }

  handleUpdate (event) {
    if (!event.target.value) return 
    const [name, value] = [event.target.name, parseInt(event.target.value)]
    const [yen, dollar] = name === 'JPN'
      ? [value, value * this.state.rate]
      : [(value / this.state.rate).toFixed(2), value]

    this.setState({
      items: {
        usd: dollar,
        jpn: yen
      }
    })
  }
}

const MainView = props => {
  const { jpn, usd } = props.state.items
  return (
    <>
      <TitleView>Converter</TitleView>
      <TestForm name='JPN' value={jpn} onChange={props.onUpdate} />
      <TestForm name='USD' value={usd} onChange={props.onUpdate} />
    </>
  )
}

const TestForm = props => {
  return (
    <label>{props.name}:
      <input type='number' name={props.name} value={props.value} onChange={props.onChange} />
    </label>
  )
}

export default App
