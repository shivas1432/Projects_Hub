"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Download, QrCode, Copy, Check } from "lucide-react"
import QRCode from "qrcode"

export default function Component() {
  const [text, setText] = useState("")
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [size, setSize] = useState("200")
  const [errorLevel, setErrorLevel] = useState("M")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateQRCode = async () => {
    if (!text.trim()) return

    setIsGenerating(true)
    try {
      const url = await QRCode.toDataURL(text, {
        width: Number.parseInt(size),
        errorCorrectionLevel: errorLevel as "L" | "M" | "Q" | "H",
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
      setQrCodeUrl(url)
    } catch (error) {
      console.error("Error generating QR code:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadQRCode = () => {
    if (!qrCodeUrl) return

    const link = document.createElement("a")
    link.download = "qrcode.png"
    link.href = qrCodeUrl
    link.click()
  }

  const copyToClipboard = async () => {
    if (!qrCodeUrl) return

    try {
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy image:", error)
    }
  }

  useEffect(() => {
    if (text.trim()) {
      const debounceTimer = setTimeout(() => {
        generateQRCode()
      }, 500)
      return () => clearTimeout(debounceTimer)
    } else {
      setQrCodeUrl("")
    }
  }, [text, size, errorLevel])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <QrCode className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">QR Code Generator</h1>
          </div>
          <p className="text-gray-600">Generate QR codes for text, URLs, and more</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Enter Content</CardTitle>
              <CardDescription>Type or paste the text, URL, or data you want to encode</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter text, URL, or any data..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="150">150x150</SelectItem>
                      <SelectItem value="200">200x200</SelectItem>
                      <SelectItem value="300">300x300</SelectItem>
                      <SelectItem value="400">400x400</SelectItem>
                      <SelectItem value="500">500x500</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="error-level">Error Correction</Label>
                  <Select value={errorLevel} onValueChange={setErrorLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Low (7%)</SelectItem>
                      <SelectItem value="M">Medium (15%)</SelectItem>
                      <SelectItem value="Q">Quartile (25%)</SelectItem>
                      <SelectItem value="H">High (30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={generateQRCode} className="w-full" disabled={!text.trim() || isGenerating}>
                {isGenerating ? "Generating..." : "Generate QR Code"}
              </Button>
            </CardContent>
          </Card>

          {/* QR Code Display Section */}
          <Card>
            <CardHeader>
              <CardTitle>Generated QR Code</CardTitle>
              <CardDescription>Your QR code will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                {qrCodeUrl ? (
                  <>
                    <div className="bg-white p-4 rounded-lg shadow-sm border">
                      <img
                        src={qrCodeUrl || "/placeholder.svg"}
                        alt="Generated QR Code"
                        className="max-w-full h-auto"
                      />
                    </div>

                    <div className="flex gap-2 w-full">
                      <Button onClick={downloadQRCode} variant="outline" className="flex-1 bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button onClick={copyToClipboard} variant="outline" className="flex-1 bg-transparent">
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg w-full">
                    <QrCode className="w-16 h-16 mb-4" />
                    <p className="text-center">
                      {text.trim() ? "Generating QR code..." : "Enter content above to generate QR code"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Examples */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Examples</CardTitle>
            <CardDescription>Click on any example to try it out</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 text-left justify-start bg-transparent"
                onClick={() => setText("https://www.example.com")}
              >
                <div>
                  <div className="font-medium">Website URL</div>
                  <div className="text-sm text-gray-500">https://www.example.com</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 text-left justify-start bg-transparent"
                onClick={() => setText("Hello, World! This is a QR code.")}
              >
                <div>
                  <div className="font-medium">Text Message</div>
                  <div className="text-sm text-gray-500">Hello, World!</div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 text-left justify-start bg-transparent"
                onClick={() => setText("mailto:contact@example.com?subject=Hello")}
              >
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-gray-500">contact@example.com</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
