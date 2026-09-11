// List of available locales
const availableLocales = ['es', 'en']

// Default locale.
const defaultLanguage = 'es'

let language = defaultLanguage

let pageLanguage = defaultLanguage

// Locale translations.
const locales = {
    es: {
        nav: {
            cvContact: 'Currículum y contacto'
        },

        home: {
            name: 'Carlos Sánchez'
        },

        who: {
            title: '¿Quién es Carlos?'
        },

        about: {
            title: '¡Hola!',
            paragraph1:
                'Soy Carlos, desarrollador de software y alguien a quien le gusta entender cómo funcionan las cosas y convertir ideas en aplicaciones que realmente puedan ser utilizadas.',
            paragraph2:
                'Mi camino en el desarrollo web me ha llevado a trabajar tanto en frontend como en backend, pasando por tecnologías como JavaScript, TypeScript, C#, .NET, React y Blazor. También he tenido la oportunidad de trabajar con bases de datos y participar en proyectos donde no solo se trata de escribir código, sino de encontrar la mejor forma de resolver un problema.',
            paragraph3:
                'Disfruto aprender cosas nuevas, enfrentarme a problemas que al principio parecen complicados y, sobre todo, ver cómo una idea va tomando forma hasta convertirse en algo funcional.',
            paragraph4:
                'Actualmente sigo construyendo mi experiencia como desarrollador y buscando nuevos retos que me permitan seguir aprendiendo, mejorar mis habilidades y crear mejores soluciones.'
        },

        cv: {
            title: 'Currículum',
            description: 'Puedes descargar mi currículum en cualquier momento.',
            link: 'Aquí'
        },

        contact: {
            title: 'Contacto',
            subtitle: 'Comencemos una conversación.',
            description:
                '¿Tienes un proyecto en mente o una oportunidad para mí? ¡Contáctame!'
        },

        location: {
            country: 'Hidalgo, México'
        },

        footer: {
            copyright:
                '© 2026 Carlos Isaac Sánchez Calva. Todos los derechos reservados.'
        }
    },

    en: {
        nav: {
            cvContact: 'Resume & Contact'
        },

        home: {
            name: 'Carlos Sánchez'
        },

        who: {
            title: 'Who is Carlos?'
        },

        about: {
            title: 'Hello!',
            paragraph1:
                'I’m Carlos, a software developer who enjoys understanding how things work and turning ideas into applications that people can actually use.',
            paragraph2:
                'My journey in web development has led me to work on both frontend and backend development, using technologies such as JavaScript, TypeScript, C#, .NET, React, and Blazor. I’ve also had the opportunity to work with databases and take part in projects where it’s not just about writing code, but about finding the best way to solve a problem.',
            paragraph3:
                'I enjoy learning new things, taking on problems that seem complicated at first, and, above all, seeing an idea take shape until it becomes something functional.',
            paragraph4:
                'I’m currently continuing to build my experience as a developer and looking for new challenges that allow me to keep learning, improve my skills, and create better solutions.'
        },

        cv: {
            title: 'Resume',
            description: 'You can download my resume at any time.',
            link: 'Here'
        },

        contact: {
            title: 'Contact',
            subtitle: 'Let’s start a conversation.',
            description:
                'Have a project in mind or an opportunity for me? Get in touch!'
        },

        location: {
            country: 'Hidalgo, Mexico'
        },

        footer: {
            copyright: '© 2026 Carlos Isaac Sánchez Calva. All rights reserved.'
        }
    }
}

const languageSelect = document.getElementById('language')

languageSelect.addEventListener('change', () => {
    language = languageSelect.value
    pageLanguage = language

    translatePage()
})

function translatePage() {
    // Get all page elements to be translated.
    const elements = document.querySelectorAll('[data-i18n]')

    // Get JSON object of translations.
    const json = locales[pageLanguage]

    // On each element, found the translation from JSON file & update.
    elements.forEach((element) => {
        const key = element.getAttribute('data-i18n')
        let text = key
            .split('.')
            .reduce((obj, i) => (obj ? obj[i] : null), json)

        // Does this text have any variables? (eg {something})
        const variables = text.match(/{(.*?)}/g)
        if (variables) {
            // Iterate each variable in the text.
            variables.forEach((variable) => {
                // Filter all `data-*` attributes for this element to find the matching key.
                Object.entries(element.dataset).filter(([key, value]) => {
                    if (`{${key}}` === variable) {
                        try {
                            // Attempt to run actual JavaScript code.
                            text = text.replace(
                                `${variable}`,
                                new Function(`return (${value})`)()
                            )
                        } catch (error) {
                            // Probably just static text replacement.
                            text = text.replace(`${variable}`, value)
                        }
                    }
                })
            })
        }

        // Regular text replacement for given locale.
        element.innerHTML = text
    })

    // Set <html> tag lang attribute.
    const htmlElement = document.querySelector('html')
    htmlElement.setAttribute('lang', pageLanguage)
}

translatePage()
