import fs from 'fs'
import fetch from 'node-fetch'
import Form from 'form-data'
import colors from 'colors'

import config from '../config/common'

const localize = async () => {
  const languages = {}
  for (const language of config.localize.languages) {
    console.log(`Downloading language: ${language}`.grey)
    const form = new Form()
    form.append('api_token', config.localize.poeditor.token)
    form.append('id', config.localize.poeditor.project)
    form.append('language', language)
    form.append('type', 'json')
    const response = await fetch(config.localize.poeditor.url, { method: 'POST', body: form })
    const data = await response.json()
    const file = await fetch(data.result.url)
    if (file.body._readableState.length > 0) {
      const languageJSON = await file.json()
      // for development usage, each downloaded language is placed into a partial file for viewing (or reviewing) the poeditor data structure
      fs.writeFileSync(`dist/locales_${language}.json`, JSON.stringify(languageJSON, null, 2)) // not needed for production
      const formattedLanguage = languageJSON.map(item => {
        const obj = {}
        obj[item.term] = item.definition
        return obj
      })
      languages[language] = Object.assign(...formattedLanguage)
    } else {
      console.log(`${language} has 0 entries, creating empty language object instead`.yellow)
      languages[language] = {}
    }
  }
  console.log('Writing dist/locale.json')
  fs.writeFileSync('dist/locale.json', JSON.stringify(languages, null, 2))
  // TODO: check locale.json was properly created
  console.log('Localization file created successfully'.green)
}

localize()
