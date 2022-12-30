import axios from "axios"

import diplomas from "./offline/diplomas.json"
import mentor from "./offline/mentor.json"
import parti from "./offline/parti.json"

import partEN from "./offline/certpart2022_EN.jpg"
import partUA from "./offline/certpart2022_UA.jpg"

import mentEN from "./offline/certmentor2022_EN.jpg"
import mentUA from "./offline/certmentor2022_UA.jpg"

import dipEN from "./offline/diploma2022_EN.jpg"
import dipUA from "./offline/diploma2022_UA.jpg"

axios.defaults.baseURL = "http://localhost:8000/"

export const API = {
    autocomplete: async (type) => {
        return axios.get(`autocomplate?type=${type}`)
    },
    generate: async (username, type, lang) => {
        const params = new URLSearchParams({ username, type, lang }).toString()
        return axios
            .get(`generate?${params}`, { responseType: "arraybuffer", responseEncoding: "base64" })
    },
    thubnail: (type) => {
        return axios.defaults.baseURL + 'tumbnail/' + type
    },

    offline: {
        FetchData: (type) => {
            switch (type) {
                case 'mentor': return mentor
                case 'diplomas': return diplomas
                case 'participant': return parti

                default:
                    return null
            }
        },
        FetchIMG: (type) => {
            switch (type) {

                case 'mentor': return [mentEN, mentUA]
                case 'diplomas': return [dipEN, dipUA]
                case 'participant': return [partEN, partUA]

                default:
                    return null
            }
        },
        thubnail: (type) => {
            switch (type) {

                case 'mentor': return mentEN
                case 'diplomas': return dipEN
                case 'participant': return partEN

                default:
                    return null
            }
        }
    }
}

export const configuration = {
    "participant": {
        "mapping": {
            "ua": {
                "nameUA": {
                    "pos": [0, 1830],
                    "color": [0, 0, 0],
                    "fontsize": 150,
                    "centerX": true
                }
            },
            "en": {
                "nameEN": {
                    "pos": [0, 1830],
                    "color": [0, 0, 0],
                    "fontsize": 150,
                    "centerX": true
                }
            }
        }
    },
    "mentor": {
        "mapping": {
            "ua": {
                "nameUA": {
                    "pos": [0, 1080],
                    "color": [0, 0, 0],
                    "fontsize": 150,
                    "centerX": true
                }
            },
            "en": {
                "nameEN": {
                    "pos": [0, 1080],
                    "color": [0, 0, 0],
                    "fontsize": 150,
                    "centerX": true
                }
            }
        }
    },
    "diplomas": {
        "mapping": {
            "ua": {
                "nameUA": {
                    "pos": [0, 1660],
                    "color": [0, 0, 0],
                    "fontsize": 135,
                    "centerX": true
                },
                "nominationUA": {
                    "pos": [751.76, 2352],
                    "color": [0, 0, 0],
                    "fontsize": 90,
                    "centerX": false
                },
                "placeUA": {
                    "pos": [1363, 1870],
                    "color": [0, 0, 0],
                    "fontsize": 100,
                    "centerX": false
                }
            },
            "en": {
                "nameEN": {
                    "pos": [0, 1660],
                    "color": [0, 0, 0],
                    "fontsize": 135,
                    "centerX": true
                },
                "nominationEN": {
                    "pos": [751.76, 2352],
                    "color": [0, 0, 0],
                    "fontsize": 90,
                    "centerX": false
                },
                "placeEN": {
                    "pos": [1050, 1870],
                    "color": [0, 0, 0],
                    "fontsize": 100,
                    "centerX": false
                }
            }
        }
    }
}