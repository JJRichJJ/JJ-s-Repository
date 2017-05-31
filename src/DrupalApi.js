

export class DrupalApi {
  constructor() {

    this.config = {
      basePath: ''
    }

    this.fetchCache = new Map()

    if (typeof Drupal === 'undefined') {
      this.config.basePath = 'http://esf.cnnbfdc.com/'
    }
  }

  getConfig(name) {
    return this.config[name]
  }

  fetchData(apiPath, method) {
    const { basePath } = this.config
    const dataKey = method + '@' + this._hash(apiPath)

    if (this.fetchCache.has(dataKey)) {
      return Promise.resolve(this.fetchCache.get(dataKey))
    }

    return fetch(basePath + apiPath, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        Promise.reject(response)
      }
      return response.json()
    }).then((json) => {
      this.fetchCache.set(dataKey, json)
      return json
    })
  }

  fetchGlobal() {
    return this.fetchData('restful/components/cnnbfdc_global/base_info', 'POST')
  }
  
  fetchHousingVerification(guid) {
    return this.fetchData('restful/components/cnnbfdc_global/housing_verification_info?guid=' + guid, 'POST')
  }

  fetchFacet(facetName) {
    return this.fetchGlobal().then((json) => {
      return (typeof json.facets[facetName] === 'undefined') ? false : json.facets[facetName]
    })
  }

  _hash(str) {
    let hash = 0;
    let i = 0;
    let chr = '';

    if (str.length === 0) return hash;

    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }

    return hash;
  }
}

let drupalApiInstence = null

function getDrupalApiInstance() {
  if (drupalApiInstence === null) {
    drupalApiInstence = new DrupalApi()
    return drupalApiInstence
  }
  return drupalApiInstence
}

export default getDrupalApiInstance
