import readline from 'readline'

/** Asks a question in the terminal; `hidden` echoes "*" instead of the typed characters. */
export const ask = (question: string, hidden = false): Promise<string> =>
  new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true })
    if (hidden) {
      ;(rl as unknown as { _writeToOutput: (s: string) => void })._writeToOutput = (s: string) => {
        process.stdout.write(s.includes(question) ? s : '*')
      }
    }
    rl.question(question, (answer) => {
      rl.close()
      if (hidden) process.stdout.write('\n')
      resolve(answer.trim())
    })
  })

/** Asks for a password twice; exits when it is too short or the two entries differ. */
export const askNewPassword = async (): Promise<string> => {
  const password = await ask('Parola (min. 8 caractere): ', true)
  if (password.length < 8) {
    console.error('Parola trebuie să aibă cel puțin 8 caractere.')
    process.exit(1)
  }
  if ((await ask('Repetă parola: ', true)) !== password) {
    console.error('Parolele nu coincid.')
    process.exit(1)
  }
  return password
}

export const askEmail = async (): Promise<string> => {
  const email = (await ask('Email: ')).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error('Adresa de email nu este validă.')
    process.exit(1)
  }
  return email
}
