import React from 'react'
import './App.css'

class JangKengGame extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      player: null,
      computer: null,
      judgement: null
    }
    this.lang = 'en'
    this.i18n = {
      ja: {
        title: 'じゃんけん ポン!',
        hands: ['グー', 'チョキ', 'パー'],
        judgements: ['引き分け', '勝ち', '負け'],
        header: ['あなた', 'コンピュータ', '勝ち負け']
      },
      cn: {
        title: '简肯蓬',
        hands: ['石头', '剪刀', '布'],
        judgements: ['和局', '胜', '败'],
        header: ['您', '电脑', '胜负']
      },
      en: {
        title: 'Rock Paper Scissors',
        hands: ['Rock', 'Scissors', 'Paper'],
        judgements: ['draw', 'win', 'lose'],
        header: ['You', 'Computer', 'WinLose']
      }
    }
  }

  componentDidMount () {
    this.setState({ player: 0, computer: 0, judgement: 0 })
  }

  judge (cpu, user) {
    return (cpu - user + 3) % 3
  }

  handleClick (value) {
    const userHand = Object.values(value)[0]
    const cpuHand = (userHand + 2) % 3
    const judgement = this.judge(cpuHand, userHand)
    this.setState({ player: userHand, computer: cpuHand, judgement: judgement })
  }

  render () {
    const title = this.i18n[this.lang].title
    return (
      <>
        <h1>{title}</h1>
        <InputBox
          hands={this.i18n[this.lang].hands}
          onClick={v => this.handleClick(v)}
        />
        <TableView status={this.state} lang={this.i18n[this.lang]} />
      </>
    )
  }
}

const TableView = props => {
  const { player, computer, judgement } = props.status
  const { hands, judgements, header } = props.lang
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
        <button key={v} onClick={() => onClick({ i })}>
          {v}
        </button>
      ))}
    </>
  )
}

export default JangKengGame
