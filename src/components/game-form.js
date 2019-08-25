import React from "react"
import { navigate } from "gatsby"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const wrongMessage =
  "Lo sentimos, la respuesta es incorrecta, intentalo de nuevo. 😝"
const noSelectionMessage = "Por favor, selecciona una respuesta. 😄"
const correctMessage = "Felicidades, has ganado. 🥳🥳🥳🥳"

class GameForm extends React.Component {
  state = {
    selectedAnswer: null,
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    this.setState({
      selectedAnswer: Number(value),
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const { selectedAnswer } = this.state
    const { correctAnswer } = this.props
    if (selectedAnswer === null)
      return toast.warn(noSelectionMessage, { autoClose: 2000 })
    if (selectedAnswer === correctAnswer) {
      toast.success(correctMessage, { autoClose: 2000 })
      setTimeout(() => navigate("/"), 2000)
    } else {
      return toast.error(wrongMessage, {
        autoClose: 2000,
      })
    }
  }

  render() {
    const { answers } = this.props
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          {answers.map(answerItem => {
            const { id, answer } = answerItem
            return (
              <div className="input-group" key={id}>
                <input
                  type="radio"
                  id={id}
                  name="question"
                  value={id}
                  onChange={this.handleInputChange}
                />
                <label htmlFor={id}>{answer}</label>
              </div>
            )
          })}
          <button className="submit-button state-0 mt-3">
            <span className="pre-state-msg">Submit</span>
          </button>
        </form>
        <ToastContainer />
      </div>
    )
  }
}

export default GameForm
