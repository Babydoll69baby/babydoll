"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Check, Menu, X } from "lucide-react"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-white">
      <div className="fixed inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover opacity-5 pointer-events-none" />

      <header className="relative z-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                JARVIS
              </span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#features" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">
              Features
            </a>
            <a href="#pricing" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">
              Pricing
            </a>
            <a href="#faq" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">
              FAQ
            </a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Link href="/login" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign up
            </Link>
          </div>
        </nav>

        {/* Mobile menu */}
        <div className={`lg:hidden ${mobileMenuOpen ? "fixed inset-0 z-50" : "hidden"}`}>
          <div className="fixed inset-0 bg-gray-900/80" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-800">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold">AI</span>
                </div>
                <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  JARVIS
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-700">
                <div className="space-y-2 py-6">
                  <a
                    href="#features"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#pricing"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </a>
                  <a
                    href="#faq"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    FAQ
                  </a>
                </div>
                <div className="py-6 space-y-2">
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero section */}
        <div className="relative isolate pt-14">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Your Personal AI Assistant for the Future
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
                JARVIS is a futuristic AI assistant that helps you manage tasks, track financial markets, generate code,
                and more. Experience the future of AI assistance today.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/register"
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Get started
                </Link>
                <a href="#features" className="text-sm font-semibold leading-6 text-white flex items-center">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16 relative"
            >
              <div className="backdrop-blur-md bg-black/20 rounded-2xl p-6 border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.3)] w-full max-w-4xl">
                <img
                  src="/placeholder.svg?height=600&width=1000"
                  alt="JARVIS AI Interface Preview"
                  className="rounded-lg w-full"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Features section */}
        <div id="features" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Powerful Features
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Experience the future of AI assistance with these cutting-edge features
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="backdrop-blur-md bg-black/20 rounded-2xl p-6 border border-blue-500/20"
                >
                  <dt className="text-xl font-semibold leading-7 text-white">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                        />
                      </svg>
                    </div>
                    Task Management
                  </dt>
                  <dd className="mt-1 text-base leading-7 text-gray-300">
                    Create, organize, and manage your tasks and notes with our intuitive interface. Never forget
                    important information again.
                  </dd>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="backdrop-blur-md bg-black/20 rounded-2xl p-6 border border-blue-500/20"
                >
                  <dt className="text-xl font-semibold leading-7 text-white">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                        />
                      </svg>
                    </div>
                    Financial Dashboard
                  </dt>
                  <dd className="mt-1 text-base leading-7 text-gray-300">
                    Track stocks, cryptocurrencies, commodities, and forex markets in real-time. Make informed financial
                    decisions with comprehensive data.
                  </dd>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="backdrop-blur-md bg-black/20 rounded-2xl p-6 border border-blue-500/20"
                >
                  <dt className="text-xl font-semibold leading-7 text-white">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                        />
                      </svg>
                    </div>
                    AI Code Generator
                  </dt>
                  <dd className="mt-1 text-base leading-7 text-gray-300">
                    Generate code snippets in multiple programming languages with our advanced AI. Boost your
                    productivity and solve coding challenges faster.
                  </dd>
                </motion.div>
              </dl>
            </div>
          </div>
        </div>

        {/* Pricing section */}
        <div id="pricing" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Simple, Transparent Pricing
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">Choose the plan that works best for you</p>
            </div>
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="backdrop-blur-md bg-black/20 rounded-2xl p-8 border border-blue-500/20 flex flex-col"
              >
                <h3 className="text-xl font-semibold leading-8 text-white">Basic</h3>
                <p className="mt-4 text-sm leading-6 text-gray-300">
                  Perfect for individuals getting started with AI assistance.
                </p>
                <div className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">$9</span>
                  <span className="text-sm font-semibold leading-6 text-gray-300">/month</span>
                </div>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-500" />
                    <span>Task Management</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-500" />
                    <span>Basic Financial Dashboard</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-500" />
                    <span>Limited Code Generation</span>
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="mt-8 block rounded-md bg-blue-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Get started
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="backdrop-blur-md bg-blue-950/30 rounded-2xl p-8 border border-blue-500/40 flex flex-col ring-1 ring-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              >
                <h3 className="text-xl font-semibold leading-8 text-white">Pro</h3>
                <p className="mt-4 text-sm leading-6 text-gray-300">
                  For professionals who need advanced AI capabilities.
                </p>
                <div className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">$29</span>
                  <span className="text-sm font-semibold leading-6 text-gray-300">/month</span>
                </div>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-500" />
                    <span>Advanced Task Management</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-500" />
                    <span>Full Financial Dashboard</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-500" />
                    <span>Unlimited Code Generation</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-500" />
                    <span>Voice Commands</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-500" />
                    <span>Priority Support</span>
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="mt-8 block rounded-md bg-blue-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Get started
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="backdrop-blur-md bg-black/20 rounded-2xl p-8 border border-blue-500/20 flex flex-col"
              >
                <h3 className="text-xl font-semibold leading-8 text-white">Enterprise</h3>
                <p className="mt-4 text-sm leading-6 text-gray-300">For organizations that need custom AI solutions.</p>
                <div className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-white">$99</span>
                  <span className="text-sm font-semibold leading-6 text-gray-300">/month</span>
                </div>
                <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-300">
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-500" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-500" />
                    <span>Custom Integrations</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-500" />
                    <span>Advanced Analytics</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-500" />
                    <span>Dedicated Account Manager</span>
                  </li>
                  <li className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-blue-500" />
                    <span>24/7 Premium Support</span>
                  </li>
                </ul>
                <Link
                  href="/register"
                  className="mt-8 block rounded-md bg-blue-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Contact sales
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* FAQ section */}
        <div id="faq" className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Frequently Asked Questions
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Find answers to common questions about JARVIS AI Assistant
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl divide-y divide-gray-700">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="py-6"
              >
                <h3 className="text-lg font-semibold leading-7 text-white">What is JARVIS AI Assistant?</h3>
                <p className="mt-3 text-base leading-7 text-gray-300">
                  JARVIS is a futuristic AI assistant that helps you manage tasks, track financial markets, generate
                  code, and more. It's designed to be your personal AI companion for productivity and information.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="py-6"
              >
                <h3 className="text-lg font-semibold leading-7 text-white">How does the financial dashboard work?</h3>
                <p className="mt-3 text-base leading-7 text-gray-300">
                  Our financial dashboard pulls real-time data from various sources to provide you with up-to-date
                  information on stocks, cryptocurrencies, commodities, and forex markets. You can customize which
                  assets you want to track.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="py-6"
              >
                <h3 className="text-lg font-semibold leading-7 text-white">Can I use JARVIS on mobile devices?</h3>
                <p className="mt-3 text-base leading-7 text-gray-300">
                  Yes, JARVIS is fully responsive and works on all devices including smartphones and tablets. You can
                  access all features on the go.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="py-6"
              >
                <h3 className="text-lg font-semibold leading-7 text-white">Is my data secure?</h3>
                <p className="mt-3 text-base leading-7 text-gray-300">
                  We take security seriously. All your data is encrypted and stored securely. We never share your
                  personal information with third parties without your consent.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="py-6"
              >
                <h3 className="text-lg font-semibold leading-7 text-white">Can I cancel my subscription anytime?</h3>
                <p className="mt-3 text-base leading-7 text-gray-300">
                  Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation
                  fees.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-400">
              &copy; 2025 JARVIS AI Assistant. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

