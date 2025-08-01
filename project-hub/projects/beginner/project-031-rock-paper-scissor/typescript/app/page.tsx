"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw } from "lucide-react"

type Choice = "rock" | "paper" | "scissors" | null
type GameResult = "win" | "lose" | "tie" | null

const choices = [
  { id: "rock", name: "Rock", emoji: "🪨", gradient: "from-slate-500 to-slate-700" },
  { id: "paper", name: "Paper", emoji: "📄", gradient: "from-zinc-500 to-zinc-700" },
  { id: "scissors", name: "Scissors", emoji: "✂️", gradient: "from-gray-500 to-gray-700" },
]

export default function Component() {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null)
  const [computerChoice, setComputerChoice] = useState<Choice>(null)
  const [playerScore, setPlayerScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [gameResult, setGameResult] = useState<GameResult>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const getRandomChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * 3)
    return choices[randomIndex].id as Choice
  }

  const determineWinner = (player: Choice, computer: Choice): GameResult => {
    if (player === computer) return "tie"

    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      return "win"
    }

    return "lose"
  }

  const playGame = (choice: Choice) => {
    if (isPlaying) return

    setIsPlaying(true)
    setPlayerChoice(choice)
    setShowResult(false)

    // Simulate computer thinking with delay
    setTimeout(() => {
      const computerSelection = getRandomChoice()
      setComputerChoice(computerSelection)

      const result = determineWinner(choice, computerSelection)
      setGameResult(result)

      // Update scores
      if (result === "win") {
        setPlayerScore((prev) => prev + 1)
      } else if (result === "lose") {
        setComputerScore((prev) => prev + 1)
      }

      setShowResult(true)
      setIsPlaying(false)
    }, 1500)
  }

  const resetGame = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setGameResult(null)
    setShowResult(false)
    setPlayerScore(0)
    setComputerScore(0)
  }

  const getResultMessage = () => {
    switch (gameResult) {
      case "win":
        return "🎉 You Win!"
      case "lose":
        return "😔 You Lose!"
      case "tie":
        return "🤝 It's a Tie!"
      default:
        return ""
    }
  }

  const getResultColor = () => {
    switch (gameResult) {
      case "win":
        return "text-emerald-400"
      case "lose":
        return "text-rose-400"
      case "tie":
        return "text-amber-400"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            Rock Paper Scissors
          </h1>
          <p className="text-xl text-gray-400">Choose your weapon and battle the computer!</p>
        </div>

        {/* Score Board */}
        <Card className="mb-8 bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">You</h3>
                <Badge
                  variant="secondary"
                  className="text-2xl px-4 py-2 bg-emerald-500/10 text-emerald-200 border-emerald-500/20"
                >
                  {playerScore}
                </Badge>
              </div>
              <div className="text-4xl text-white font-bold">VS</div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Computer</h3>
                <Badge
                  variant="secondary"
                  className="text-2xl px-4 py-2 bg-rose-500/10 text-rose-200 border-rose-500/20"
                >
                  {computerScore}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Area */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Player Side */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Your Choice</h3>
            <div className="h-32 flex items-center justify-center">
              {playerChoice ? (
                <div
                  className={`w-24 h-24 rounded-full bg-gradient-to-br ${choices.find((c) => c.id === playerChoice)?.gradient} flex items-center justify-center text-4xl shadow-2xl transform transition-all duration-500 ${showResult ? "scale-110" : "scale-100"}`}
                >
                  {choices.find((c) => c.id === playerChoice)?.emoji}
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center text-white/50">
                  ?
                </div>
              )}
            </div>
          </div>

          {/* Result */}
          <div className="text-center flex flex-col justify-center">
            {showResult && (
              <div className={`text-3xl font-bold mb-4 animate-bounce ${getResultColor()}`}>{getResultMessage()}</div>
            )}
            {isPlaying && <div className="text-2xl text-white animate-pulse">Computer is thinking...</div>}
          </div>

          {/* Computer Side */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Computer's Choice</h3>
            <div className="h-32 flex items-center justify-center">
              {computerChoice ? (
                <div
                  className={`w-24 h-24 rounded-full bg-gradient-to-br ${choices.find((c) => c.id === computerChoice)?.gradient} flex items-center justify-center text-4xl shadow-2xl transform transition-all duration-500 ${showResult ? "scale-110" : "scale-100"}`}
                >
                  {choices.find((c) => c.id === computerChoice)?.emoji}
                </div>
              ) : isPlaying ? (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-4xl shadow-2xl animate-spin">
                  🤖
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center text-white/50">
                  ?
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Choice Buttons */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {choices.map((choice) => (
            <Button
              key={choice.id}
              onClick={() => playGame(choice.id as Choice)}
              disabled={isPlaying}
              className={`h-24 text-2xl font-bold bg-gradient-to-br ${choice.gradient} hover:scale-105 transform transition-all duration-200 shadow-xl border-0 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl">{choice.emoji}</span>
                <span className="text-sm">{choice.name}</span>
              </div>
            </Button>
          ))}
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <Button
            onClick={resetGame}
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Game
          </Button>
        </div>
      </div>
    </div>
  )
}
