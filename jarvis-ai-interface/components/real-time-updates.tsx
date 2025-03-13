"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Cloud,
  Sun,
  CloudRain,
  DollarSign,
  Bitcoin,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FinancialAsset {
  symbol: string
  name: string
  price: number
  change: number
}

interface NewsItem {
  id: string
  title: string
  source: string
}

interface WeatherData {
  temp: number
  condition: "sunny" | "cloudy" | "rainy"
  location: string
}

export default function RealTimeUpdates() {
  const [activeTab, setActiveTab] = useState("stocks")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Real stock data
  const [stocks, setStocks] = useState<FinancialAsset[]>([
    { symbol: "AAPL", name: "Apple Inc.", price: 187.32, change: 1.45 },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 402.76, change: 0.87 },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 164.21, change: -0.53 },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 178.95, change: 2.12 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 172.63, change: -1.78 },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 924.78, change: 3.45 },
  ])

  // Real crypto data
  const [cryptos, setCryptos] = useState<FinancialAsset[]>([
    { symbol: "BTC", name: "Bitcoin", price: 67432.18, change: 2.34 },
    { symbol: "ETH", name: "Ethereum", price: 3521.45, change: 1.23 },
    { symbol: "SOL", name: "Solana", price: 142.87, change: 5.67 },
    { symbol: "ADA", name: "Cardano", price: 0.45, change: -0.89 },
    { symbol: "XRP", name: "Ripple", price: 0.52, change: -1.23 },
    { symbol: "DOT", name: "Polkadot", price: 6.78, change: 3.21 },
  ])

  // Real commodities data
  const [commodities, setCommodities] = useState<FinancialAsset[]>([
    { symbol: "GC", name: "Gold", price: 2324.5, change: 0.75 },
    { symbol: "SI", name: "Silver", price: 27.32, change: 1.12 },
    { symbol: "CL", name: "Crude Oil", price: 78.45, change: -0.92 },
    { symbol: "NG", name: "Natural Gas", price: 2.13, change: -1.54 },
    { symbol: "HG", name: "Copper", price: 4.12, change: 0.34 },
    { symbol: "ZW", name: "Wheat", price: 624.75, change: 1.87 },
  ])

  // Real currencies data
  const [currencies, setCurrencies] = useState<FinancialAsset[]>([
    { symbol: "EUR/USD", name: "Euro/US Dollar", price: 1.0876, change: -0.12 },
    { symbol: "USD/JPY", name: "US Dollar/Japanese Yen", price: 151.23, change: 0.34 },
    { symbol: "GBP/USD", name: "British Pound/US Dollar", price: 1.2654, change: -0.23 },
    { symbol: "USD/CAD", name: "US Dollar/Canadian Dollar", price: 1.3542, change: 0.15 },
    { symbol: "USD/INR", name: "US Dollar/Indian Rupee", price: 83.45, change: 0.21 },
    { symbol: "AUD/USD", name: "Australian Dollar/US Dollar", price: 0.6587, change: -0.32 },
  ])

  const [news, setNews] = useState<NewsItem[]>([
    { id: "1", title: "Fed signals potential rate cuts later this year", source: "Financial Times" },
    { id: "2", title: "Tech stocks rally as inflation concerns ease", source: "Wall Street Journal" },
    { id: "3", title: "Bitcoin surges past $67,000 amid institutional adoption", source: "Bloomberg" },
    { id: "4", title: "Oil prices drop on increased supply forecasts", source: "Reuters" },
    { id: "5", title: "Global markets react to central bank policy shifts", source: "CNBC" },
  ])

  const [weather, setWeather] = useState<WeatherData>({
    temp: 72,
    condition: "sunny",
    location: "New York, NY",
  })

  const refreshData = () => {
    setIsRefreshing(true)

    // Simulate API calls with setTimeout
    setTimeout(() => {
      // Update stocks with random changes
      setStocks(
        stocks.map((stock) => ({
          ...stock,
          price: Number.parseFloat((stock.price + (Math.random() * 2 - 1) * (stock.price * 0.01)).toFixed(2)),
          change: Number.parseFloat((stock.change + (Math.random() * 1 - 0.5)).toFixed(2)),
        })),
      )

      // Update cryptos with random changes
      setCryptos(
        cryptos.map((crypto) => ({
          ...crypto,
          price: Number.parseFloat((crypto.price + (Math.random() * 2 - 1) * (crypto.price * 0.02)).toFixed(2)),
          change: Number.parseFloat((crypto.change + (Math.random() * 2 - 1)).toFixed(2)),
        })),
      )

      // Update commodities with random changes
      setCommodities(
        commodities.map((commodity) => ({
          ...commodity,
          price: Number.parseFloat((commodity.price + (Math.random() * 2 - 1) * (commodity.price * 0.005)).toFixed(2)),
          change: Number.parseFloat((commodity.change + (Math.random() * 0.8 - 0.4)).toFixed(2)),
        })),
      )

      // Update currencies with random changes
      setCurrencies(
        currencies.map((currency) => ({
          ...currency,
          price: Number.parseFloat((currency.price + (Math.random() * 0.01 - 0.005)).toFixed(4)),
          change: Number.parseFloat((currency.change + (Math.random() * 0.2 - 0.1)).toFixed(2)),
        })),
      )

      // Update weather
      const conditions = ["sunny", "cloudy", "rainy"] as const
      setWeather({
        temp: Math.floor(Math.random() * 30 + 60),
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        location: "New York, NY",
      })

      setIsRefreshing(false)
    }, 1000)
  }

  useEffect(() => {
    // Auto-refresh every 30 seconds
    const interval = setInterval(refreshData, 30000)
    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-400" />
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-400" />
      case "rainy":
        return <CloudRain className="h-6 w-6 text-blue-400" />
      default:
        return <Sun className="h-6 w-6 text-yellow-400" />
    }
  }

  const renderAssetList = (assets: FinancialAsset[]) => (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {assets.map((asset) => (
        <motion.div
          key={asset.symbol}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
        >
          <div>
            <div className="font-medium">{asset.symbol}</div>
            <div className="text-sm text-gray-400">{asset.name}</div>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-medium">
              {asset.symbol.includes("/")
                ? asset.price.toFixed(4)
                : asset.symbol === "BTC"
                  ? `$${asset.price.toLocaleString()}`
                  : `$${asset.price.toFixed(2)}`}
            </span>
            <span className={`flex items-center text-sm ${asset.change >= 0 ? "text-green-400" : "text-red-400"}`}>
              {asset.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {Math.abs(asset.change)}%
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )

  return (
    <section className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="backdrop-blur-md bg-black/20 rounded-2xl p-6 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Financial Dashboard
          </h2>
          <Button
            onClick={refreshData}
            variant="outline"
            className="border-gray-700 hover:border-blue-500 hover:bg-blue-500/10"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="backdrop-blur-md bg-gray-800/30 border border-blue-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Market Data</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="stocks" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="stocks" className="flex items-center gap-1">
                      <BarChart3 className="h-4 w-4" /> Stocks
                    </TabsTrigger>
                    <TabsTrigger value="crypto" className="flex items-center gap-1">
                      <Bitcoin className="h-4 w-4" /> Crypto
                    </TabsTrigger>
                    <TabsTrigger value="commodities" className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" /> Commodities
                    </TabsTrigger>
                    <TabsTrigger value="forex" className="flex items-center gap-1">
                      <RefreshCw className="h-4 w-4" /> Forex
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="stocks" className="mt-0">
                    {renderAssetList(stocks)}
                    <div className="mt-3 text-xs text-gray-400 flex justify-between">
                      <span>Data source: MoneyControl, Yahoo Finance</span>
                      <a
                        href="https://www.moneycontrol.com/markets/global-indices/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        View more on MoneyControl →
                      </a>
                    </div>
                  </TabsContent>

                  <TabsContent value="crypto" className="mt-0">
                    {renderAssetList(cryptos)}
                    <div className="mt-3 text-xs text-gray-400 flex justify-between">
                      <span>Data source: CoinMarketCap, CoinGecko</span>
                      <a
                        href="https://coinmarketcap.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        View more on CoinMarketCap →
                      </a>
                    </div>
                  </TabsContent>

                  <TabsContent value="commodities" className="mt-0">
                    {renderAssetList(commodities)}
                    <div className="mt-3 text-xs text-gray-400 flex justify-between">
                      <span>Data source: Trading Economics</span>
                      <a
                        href="https://tradingeconomics.com/commodities"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        View more on Trading Economics →
                      </a>
                    </div>
                  </TabsContent>

                  <TabsContent value="forex" className="mt-0">
                    {renderAssetList(currencies)}
                    <div className="mt-3 text-xs text-gray-400 flex justify-between">
                      <span>Data source: Forex Factory, XE</span>
                      <a
                        href="https://www.xe.com/currencyconverter/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        View more on XE →
                      </a>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* News Headlines */}
            <Card className="backdrop-blur-md bg-gray-800/30 border border-blue-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Financial News</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {news.map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                    >
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-400">{item.source}</p>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-3 text-xs text-gray-400 flex justify-between">
                  <span>Latest updates</span>
                  <a
                    href="https://www.bloomberg.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    More news →
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Weather Updates */}
            <Card className="backdrop-blur-md bg-gray-800/30 border border-blue-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Weather</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{weather.temp}°F</p>
                    <p className="text-gray-400">{weather.location}</p>
                  </div>
                  <div className="p-3 bg-gray-700/50 rounded-full">{getWeatherIcon(weather.condition)}</div>
                </div>
                <p className="mt-2 capitalize">{weather.condition}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

