"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { updateSettings } from "@/actions/settings-actions"
import { useToast } from "@/hooks/use-toast"

interface SettingsFormProps {
  initialSettings: any
}

export default function SettingsForm({ initialSettings }: SettingsFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultSettings = {
    theme: "dark",
    accentColor: "blue",
    notifications: true,
    voiceEnabled: true,
    defaultStocks: [],
    defaultCryptos: [],
    ...initialSettings,
  }

  const [settings, setSettings] = useState(defaultSettings)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("theme", settings.theme)
    formData.append("accentColor", settings.accentColor)
    formData.append("notifications", settings.notifications ? "on" : "off")
    formData.append("voiceEnabled", settings.voiceEnabled ? "on" : "off")

    settings.defaultStocks.forEach((stock: string) => {
      formData.append("defaultStocks", stock)
    })

    settings.defaultCryptos.forEach((crypto: string) => {
      formData.append("defaultCryptos", crypto)
    })

    const result = await updateSettings(formData)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Settings updated successfully!",
      })
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="data">Data Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="backdrop-blur-md bg-gray-800/30 border border-blue-500/20">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <RadioGroup
                    value={settings.theme}
                    onValueChange={(value) => setSettings({ ...settings, theme: value })}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                      <Label
                        htmlFor="theme-dark"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700 bg-gray-900 p-4 hover:border-blue-500 cursor-pointer [&:has([data-state=checked])]:border-blue-500"
                      >
                        <div className="mb-2 h-6 w-6 rounded-full bg-gray-900 border border-gray-700" />
                        <span>Dark</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                      <Label
                        htmlFor="theme-light"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700 bg-gray-900 p-4 hover:border-blue-500 cursor-pointer [&:has([data-state=checked])]:border-blue-500"
                      >
                        <div className="mb-2 h-6 w-6 rounded-full bg-white border border-gray-300" />
                        <span>Light</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                      <Label
                        htmlFor="theme-system"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700 bg-gray-900 p-4 hover:border-blue-500 cursor-pointer [&:has([data-state=checked])]:border-blue-500"
                      >
                        <div className="mb-2 h-6 w-6 rounded-full bg-gradient-to-r from-white to-gray-900 border border-gray-300" />
                        <span>System</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Accent Color</Label>
                  <RadioGroup
                    value={settings.accentColor}
                    onValueChange={(value) => setSettings({ ...settings, accentColor: value })}
                    className="grid grid-cols-5 gap-4"
                  >
                    <div>
                      <RadioGroupItem value="blue" id="color-blue" className="sr-only" />
                      <Label
                        htmlFor="color-blue"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700 bg-gray-900 p-4 hover:border-blue-500 cursor-pointer [&:has([data-state=checked])]:border-blue-500"
                      >
                        <div className="mb-2 h-6 w-6 rounded-full bg-blue-500" />
                        <span>Blue</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="purple" id="color-purple" className="sr-only" />
                      <Label
                        htmlFor="color-purple"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700 bg-gray-900 p-4 hover:border-blue-500 cursor-pointer [&:has([data-state=checked])]:border-blue-500"
                      >
                        <div className="mb-2 h-6 w-6 rounded-full bg-purple-500" />
                        <span>Purple</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="green" id="color-green" className="sr-only" />
                      <Label
                        htmlFor="color-green"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700 bg-gray-900 p-4 hover:border-blue-500 cursor-pointer [&:has([data-state=checked])]:border-blue-500"
                      >
                        <div className="mb-2 h-6 w-6 rounded-full bg-green-500" />
                        <span>Green</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="red" id="color-red" className="sr-only" />
                      <Label
                        htmlFor="color-red"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700 bg-gray-900 p-4 hover:border-blue-500 cursor-pointer [&:has([data-state=checked])]:border-blue-500"
                      >
                        <div className="mb-2 h-6 w-6 rounded-full bg-red-500" />
                        <span>Red</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="orange" id="color-orange" className="sr-only" />
                      <Label
                        htmlFor="color-orange"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-gray-700 bg-gray-900 p-4 hover:border-blue-500 cursor-pointer [&:has([data-state=checked])]:border-blue-500"
                      >
                        <div className="mb-2 h-6 w-6 rounded-full bg-orange-500" />
                        <span>Orange</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card className="backdrop-blur-md bg-gray-800/30 border border-blue-500/20">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications</Label>
                    <p className="text-sm text-gray-400">Receive notifications about updates and alerts</p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Voice Assistant</Label>
                    <p className="text-sm text-gray-400">Enable voice commands and responses</p>
                  </div>
                  <Switch
                    checked={settings.voiceEnabled}
                    onCheckedChange={(checked) => setSettings({ ...settings, voiceEnabled: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <Card className="backdrop-blur-md bg-gray-800/30 border border-blue-500/20">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Default Stocks</Label>
                  <p className="text-sm text-gray-400 mb-2">Select stocks to display on your dashboard</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "META", "NFLX"].map((stock) => (
                      <div key={stock} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`stock-${stock}`}
                          checked={settings.defaultStocks.includes(stock)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSettings({
                                ...settings,
                                defaultStocks: [...settings.defaultStocks, stock],
                              })
                            } else {
                              setSettings({
                                ...settings,
                                defaultStocks: settings.defaultStocks.filter((s: string) => s !== stock),
                              })
                            }
                          }}
                          className="rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500"
                        />
                        <label htmlFor={`stock-${stock}`} className="text-sm">
                          {stock}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Default Cryptocurrencies</Label>
                  <p className="text-sm text-gray-400 mb-2">Select cryptocurrencies to display on your dashboard</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {["BTC", "ETH", "SOL", "ADA", "XRP", "DOT", "DOGE", "SHIB"].map((crypto) => (
                      <div key={crypto} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`crypto-${crypto}`}
                          checked={settings.defaultCryptos.includes(crypto)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSettings({
                                ...settings,
                                defaultCryptos: [...settings.defaultCryptos, crypto],
                              })
                            } else {
                              setSettings({
                                ...settings,
                                defaultCryptos: settings.defaultCryptos.filter((c: string) => c !== crypto),
                              })
                            }
                          }}
                          className="rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500"
                        />
                        <label htmlFor={`crypto-${crypto}`} className="text-sm">
                          {crypto}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </form>
  )
}

