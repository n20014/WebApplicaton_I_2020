import React from 'react'
import './App.css'

const TitleView = props => <h1>{props.children}</h1>
const LoadingView = props => <h1>{props.text}</h1>
const InitialView = props => (props.state.loading
  ? <LoadingView text='Now Loading...' />
  : <MainView state={props.state} />
)

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount () {
    this.setState({ loading: false })
  }

  render () {
    console.log(this.state)
    return <InitialView state={this.state}  />
  }
}

class MainView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      height: null,
      weight: null,
      bmi: null
    }
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    console.log(this.state)
    return (
      <>
        <TitleView>BMI</TitleView>
        <TestForm onChange={this.handleUpdate} onSubmit={this.handleSubmit} />
        <TestView value={this.state.bmi} />
      </>
    )
  }

  handleUpdate (event) {
    const [name, value] = [event.target.name, parseInt(event.target.value, 10)]
    this.setState({ [name]: value })
  }

  handleSubmit () {
    const { height, weight } = this.state
    if (height && weight) {
      this.setState({ bmi: (weight / height ** 2 / 10000) })
    }
  }
}

const TestView = props => (
  <div>BMI:{props.value}</div>
)

const TestForm = props => (
  <>
    <TestInput name='height' onChange={props.onChange} />
    <TestInput name='weight' onChange={props.onChange} />
    <button onClick={props.onSubmit}>Calculate</button>
  </>
)

const TestInput = props => {
  return (
    <label>{props.name}:
      <input type='number' name={props.name} onChange={props.onChange} />
    </label>
  )
}

export default App
