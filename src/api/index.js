import diplomas from "./offline/diplomas.json"
import mentor from "./offline/mentor.json"
import parti from "./offline/parti.json"

import partEN from "./offline/certpart2022_EN.jpg"
import partUA from "./offline/certpart2022_UA.jpg"

import mentEN from "./offline/certmentor2022_EN.jpg"
import mentUA from "./offline/certmentor2022_UA.jpg"

import dipEN from "./offline/diploma2022_EN.jpg"
import dipUA from "./offline/diploma2022_UA.jpg"

export const API = {
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

export { configuration } from "./configuation"