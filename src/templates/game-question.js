import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import GameForm from "../components/game-form"
import Panel from "../components/panel"
import { gameGrade, gameTopic } from "../utils/helpers"

const GameQuestion = ({ data }) => {
  const { juegosJson } = data
  const { topic, grade, question } = juegosJson
  const { name, intro, correct, answers } = question
  return (
    <Layout>
      <div className="px-5">
        <h1 className="mt-0 article__content__title">
          Juego de {gameTopic(topic)} para {gameGrade(grade)}{" "}
        </h1>
        {intro !== "" && <Panel>{intro}</Panel>}
        <p>{name}</p>
        <GameForm answers={answers} correctAnswer={correct} />
      </div>
    </Layout>
  )
}

export default GameQuestion

export const pageQuery = graphql`
  query($topic: String, $grade: String) {
    juegosJson(topic: { eq: $topic }, grade: { eq: $grade }) {
      id
      topic
      grade
      question {
        intro
        name
        answers {
          id
          answer
        }
        correct
      }
    }
  }
`
