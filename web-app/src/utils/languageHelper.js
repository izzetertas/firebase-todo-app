export const getUserLanguage = () => {
  if(localStorage.getItem('userLanguage')) {
    return localStorage.getItem('userLanguage')
  }

  return navigator.language.split('-')[0]
}

export const setUserLanguage = (language) => {
  localStorage.setItem('userLanguage', language)
}
