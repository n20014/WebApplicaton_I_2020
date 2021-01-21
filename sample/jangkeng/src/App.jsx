import React from 'react'
import './App.css'

class JangKengGame extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      basics: {
        player: null,
        computer: null,
        judgement: null
      },
      i18n: null
    }
    this.URI = 'http://localhost:8080/i18n.json'
    this.LANG = 'en'
  }

  componentDidMount () {
    window
      .fetch(this.URI)
      .then(res => res.json())
      .then(json => json[this.LANG])
      .then(data => this.setState({ i18n: data }))
  }

  judge (cpu, user) {
    return (cpu - user + 3) % 3
  }

  handleClick (hand) {
    const userHand = hand
    const cpuHand = Math.floor(Math.random() * 3)
    const judgement = this.judge(cpuHand, userHand)
    this.setState({
      basics: { player: userHand, computer: cpuHand, judgement: judgement }
    })
  }

  render () {
    if (!this.state.i18n) return <div> Now Loading...</div>
    const { title, hands } = this.state.i18n
    return (
      <>
        <h1>{title}</h1>
        <InputBox hands={hands} onClick={v => this.handleClick(v)} />
        <TableView status={this.state} />
      </>
    )
  }
}

const TableView = props => {
  const { player, computer, judgement } = props.status.basics
  const { hands, judgements, header } = props.status.i18n
  const contents = [
    [header[0], hands[player]],
    [header[1], hands[computer]],
    [header[2], judgements[judgement]]
  ]
  return (
    <table>
      <tbody>
        {contents.map(([header, content]) => (
          <tr key={header}>
            <th>{header}</th>
            <td>{content}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const InputBox = props => {
  const { hands, onClick } = props
  return (
    <>
      {hands.map((v, i) => (
        <button key={v} onClick={() => onClick(i)}>
          {v}
        </button>
      ))}
    </>
  )
}

export default JangKengGame
