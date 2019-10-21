import { GMTemplate, ControlType } from '../template.interface';

// export interface ChurchCirclesTemplateType extends GMTemplate {
//     translations: { [key: string]: { translation: { [key: string]: ChurchCirclesTranslation } } };
// }

const boxHeight = 100;
const textHeight = 14;
const textMargin = 6;

const nodeWidth = 155;
const nodeHeight = 222;

export const ChurchCircles12Template: GMTemplate = {
    id: 'churchCircles12',
    name: 'Church Circles 12 Practices',
    i18nName: 'churchCircles.ChurchCircles12',
    theme: 'churchCirclesDefault',
    defaultConfiguration: 'churchCircles12',
    settings: {
        iconUrl: 'templates/church-circles-12/icons/display.png'
    },
    svgSettings: {
        textHeight: textHeight,
        boxHeight: boxHeight,
        iconSize: boxHeight / 6,
        nodeActions: {
            x: boxHeight / 2,
            y: 0,
            height: 40,
            width: 28,
        },
        nodeBounds: {
            width: boxHeight * 1.5,
            height: boxHeight * 2.1
        },
        nodeWidth,
        nodeHeight
    },
    svgActions: [
        {
            id: 'edit-node-action',
            control: 'editNode',
            iconName: 'edit',
            attributes: {
                x: boxHeight / 2,
                y: 10,
            },
        },
        {
            id: 'add-child-node-action',
            control: 'addChildNode',
            iconName: 'add',
            attributes: {
                x: boxHeight / 2,
                y: 50,
            },
        }
    ],

    svgs: [
        {
            id: 'big-rect',
            type: 'rect',
            attributes: {
                'x': -boxHeight / 2,
                'y': -40,
                'width': boxHeight,
                'height': boxHeight + 40,
                'opacity': '0'
            }
        },
        {
            id: 'church-box',
            type: 'rect',
            attributes: {
                'x': -boxHeight / 2,
                'y': 0,
                'rx': 0.5 * boxHeight,
                'width': boxHeight,
                'height': boxHeight
            },
            style: {
                'stroke-width': 2,
                'stroke': 'black'
            }
        },
        {
            id: 'topIcon1',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.5,
                'y': -3 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
            }
        },
        {
            id: 'topIcon2',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.25,
                'y': -3 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
            }
        },
        {
            id: 'topIcon3',
            type: 'image',
            attributes: {
                'x': boxHeight * 0.1,
                'y': -3 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
            }
        },
        {
            id: 'topNumber1',
            type: 'text',
            attributes: {
                'x': -boxHeight * 0.39,
                'y': -0.8 * textMargin
            },
            style: {
                'text-anchor': 'center'
            }
        },
        {
            id: 'topNumber2',
            type: 'text',
            attributes: {
                'x': -boxHeight * 0.13,
                'y': -0.8 * textMargin
            },
            style: {
                'text-anchor': 'center'
            }
        },
        {
            id: 'topNumber3',
            type: 'text',
            attributes: {
                'x': boxHeight * 0.13,
                'y': -0.8 * textMargin
            },
            style: {
                'text-anchor': 'center'
            }
        },
        {
            id: 'topNumber4',
            type: 'text',
            attributes: {
                'x': boxHeight * 0.39,
                'y': -0.8 * textMargin
            },
            style: {
                'text-anchor': 'center'
            }
        },
        {
            id: 'leftText1',
            type: 'text',
            attributes: {
                'x': boxHeight * -0.5,
                'y': boxHeight * 0.6,
                'transform': 'rotate(90 -56 48)',
                'rotate': -90
            },
            style: {
                'text-anchor': 'center',
                'letter-spacing': '0.35em'
            }
        },
        {
            id: 'icon1',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.4,
                'y': boxHeight * 0.165,
            }
        },
        {
            id: 'icon2',
            type: 'image',
            attributes: {
                'x': -(boxHeight / 5.5),
                'y': boxHeight * 0.165,
            }
        },
        {
            id: 'icon3',
            type: 'image',
            attributes: {
                'x': boxHeight * 0.03,
                'y': boxHeight * 0.165,
            }
        },
        {
            id: 'icon4',
            type: 'image',
            attributes: {
                'x': boxHeight / 4,
                'y': boxHeight * 0.165,
            }
        },
        {
            id: 'icon5',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.4,
                'y': boxHeight * 0.4,
            }
        },
        {
            id: 'icon6',
            type: 'image',
            attributes: {
                'x': -(boxHeight / 5.5),
                'y': boxHeight * 0.4,
            }
        },
        {
            id: 'icon7',
            type: 'image',
            attributes: {
                'x': boxHeight * 0.03,
                'y': boxHeight * 0.4,
            }
        },
        {
            id: 'icon8',
            type: 'image',
            attributes: {
                'x': boxHeight / 4,
                'y': boxHeight * 0.4,
            }
        },
        {
            id: 'icon9',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.4,
                'y': boxHeight * 0.65,
            }
        },
        {
            id: 'icon10',
            type: 'image',
            attributes: {
                'x': -boxHeight / 6,
                'y': boxHeight * 0.65,
            }
        },
        {
            id: 'icon11',
            type: 'image',
            attributes: {
                'x': boxHeight * 0.03,
                'y': boxHeight * 0.65,
            }
        },
        {
            id: 'icon12',
            type: 'image',
            attributes: {
                'x': boxHeight / 4,
                'y': boxHeight * 0.65,
            }
        }
    ],

    reports: [
        {
            name: 'active',
            type: 'boolean'
        },
        {
            name: 'attenders',
            type: 'number'
        },
        {
            name: 'believers',
            type: 'number'
        },
        {
            name: 'baptized',
            type: 'number'
        },
        {
            name: 'newlyBaptized',
            type: 'number'
        },
        {
            name: 'church',
            type: 'boolean'
        }
    ],
    templateReports: [
        {
            name: 'churchFunctions',
            fields: [
                'elementBaptism',
                'elementWord',
                'elementPrayer',
                'elementLordsSupper',
                'elementGive',
                'elementLove',
                'elementWorship',
                'elementLeaders',
                'elementMakeDisciples',
                'church',
                'active'
            ],
            graph: 'verticalBarChart',
            order: 4,
        },
        {
            name: 'churchType',
            field: 'churchType',
            graph: 'pieChart',
            order: 2
        },
        {
            name: 'threeThirds',
            field: 'threeThirds',
            graph: 'pieGrid',
            order: 3
        }
    ],
    translations: {
        en: {
            translation: {
                'churchCircles12': {
                    'name': 'Group Name',
                    'leaderName': 'Leader\'s Name',
                    'email': 'Email',
                    'newGeneration': 'New Generation',
                    'peopleGroups': 'People Groups',
                    'attenders': '# of Attenders',
                    'believers': '# of Believers',
                    'baptized': '# of Baptized',
                    'newlyBaptized': '# of New Baptized (since church start)',
                    'church': 'Is church?',
                    'churchType': 'Church Type',
                    'churchFunctions': 'Church Functions',
                    'churchTypeLegacy': 'Legacy',
                    'churchTypeExistingBelievers': 'Existing Believers',
                    'churchTypeNewBelievers': 'New Believers',
                    'elementGospel': 'Element: Gospel',
                    'elementRepent': 'Element: Repent',
                    'elementBaptism': 'Element: Baptism',
                    'elementHolySpirit': 'Element: Holy Spirit',
                    'elementWord': 'Element: God\'s Word',
                    'elementPrayer': 'Element: Prayer',
                    'elementSignsWonders': 'Element: Signs and Wonders',
                    'elementLordsSupper': 'Element: Lord\'s supper',
                    'elementGive': 'Element: Giving',
                    'elementLove': 'Element: Love',
                    'elementWorship': 'Element: Worship',
                    'elementMakeDisciples': 'Element: Make disciples',
                    'gospelShares': 'Gospel shares per day',
                    'place': 'Place (City, State, Country)',
                    'location': 'Geo Location',
                    'date': 'Date of Start (Ex. 2017-01)',
                    'threeThirds': 'Elements of 3/3 process',
                    'active': 'Active',
                    'inactiveReason': 'Reason for being inactive',
                    'initialLeadersName': 'Leader\'s Name',
                    'initialPlace': 'Place',
                    'initialDate': 'Date',
                    'note': 'Note',
                    'threeThirdsPastoralCare': 'Pastoral Care',
                    'threeThirdsWorship': 'Worship',
                    'threeThirdsAccountability': 'Accountability',
                    'threeThirdsVisionCasting': 'Vision Casting',
                    'threeThirdsBibleTeaching': 'Bible Teaching',
                    'threeThirdsPractice': 'Practice',
                    'threeThirdsGoalSetting': 'Goal Setting & Commission',
                }
            }
        },
        de: {
            translation: {
                'churchCircles12': {
                    'name': 'Name der Kirche',
                    'leaderName': 'Leiter',
                    'peopleGroups': 'Sprache / Subkultur',
                    'attenders': 'Anzahl Teilnehmer',
                    'believers': 'Anzahl Gläubige',
                    'baptized': 'Anzahl Getaufte',
                    'newlyBaptized': 'Anzahl frisch Getaufte (seit Gemeindestart)',
                    'church': 'Ist Gemeinde?',
                    'churchFunctions': 'Kirchliche Funktionen',
                    'churchType': 'Gemeinde-Typ',
                    'churchTypeLegacy': 'Traditionell',
                    'email': 'Bemerkungen',
                    'churchTypeExistingBelievers': 'Länger Gläubige',
                    'newGeneration': 'Generation',
                    'churchTypeNewBelievers': 'Neue Gläubige',
                    // 'elementGospel': '',
                    // 'elementRepent': '',
                    // 'elementHolySpirit': '',
                    // 'elementSignsWonders': '',
                    'elementBaptism': 'Element: Taufe',
                    'elementWord': 'Element: Lehre',
                    'elementPrayer': 'Element: Gebet',
                    'elementLordsSupper': 'Element: Abendmahl',
                    'elementGive': 'Element: Geben',
                    'elementLove': 'Element: Gemeinschaft',
                    'elementWorship': 'Element: Lobpreis',
                    'elementMakeDisciples': 'Element: Multiplikation',
                    'gospelShares': 'Evangeliumaktien pro Tag',
                    'place': 'Ort (Stadt, Region, Land)',
                    'location': 'Adresse',
                    'date': 'Startdatum (z.B. 2017-01)',
                    'threeThirds': 'Elemente des 3/3-Prozesses (siehe Hilfe für mehr Informationen)',
                    'active': 'aktiv',
                    'inactiveReason': 'Grund inaktiv zu sein',
                    'initialLeadersName': 'Leiter',
                    'initialPlace': 'Ort',
                    'initialDate': 'Datum',
                    'threeThirdsPastoralCare': 'Pastoral Care',
                    'threeThirdsWorship': 'Worship',
                    'threeThirdsAccountability': 'Accountability',
                    'threeThirdsVisionCasting': 'Vision Casting',
                    'threeThirdsBibleTeaching': 'Bible Teaching',
                    'threeThirdsPractice': 'Practice',
                    'threeThirdsGoalSetting': 'Goal Setting & Commission',
                    'note': 'Hinweis',
                }
            }
        },
        es: {
            translation: {
                'churchCircles12': {
                    'name': 'Nombre de la iglesia',
                    'leaderName': 'Nombre de lider',
                    'inactiveReason': 'Razón para estar inactivo',
                    'initialLeadersName': 'Nombre de lider',
                    'email': 'Email',
                    'peopleGroups': 'Etnia',
                    'attenders': '# of participantes',
                    'believers': '# of creyentes',
                    'baptized': '# of bautizados',
                    'newlyBaptized': '# of nuevos bautizados (desde inicio de iglesia)',
                    'church': 'Iglesia?',
                    'churchFunctions': 'Funciones de la iglesia',
                    'churchType': 'Tipo de Iglesia',
                    'churchTypeLegacy': 'Tradicional',
                    'newGeneration': 'Generacion',
                    'churchTypeExistingBelievers': 'Creyentes existentes',
                    'churchTypeNewBelievers': 'Nuevos creyentes',
                    // 'elementGospel': '',
                    // 'elementRepent': '',
                    // 'elementHolySpirit': '',
                    // 'elementSignsWonders': '',
                    'elementBaptism': 'Elemento: Bautismo',
                    'elementWord': 'Elemento: Biblia',
                    'elementPrayer': 'Elemento: Oración',
                    'elementLordsSupper': 'Elemento: Santa Cena',
                    'elementGive': 'Elemento: Dar/Generosidad',
                    'elementLove': 'Elemento: Amor',
                    'elementWorship': 'Elemento: Adorar',
                    'elementMakeDisciples': 'Elemento: Hacer discípulos',
                    'gospelShares': 'Acciones del evangelio por día',
                    'place': 'Lugar (Ciudad, Provincia, Pais):',
                    'location': 'Ubicación geográfica',
                    'initialPlace': 'Lugar',
                    'date': 'Fecha de Inicio (Ex. 2017-01)',
                    'initialDate': 'Fecha',
                    'threeThirds': 'Elementos del proceso de 3/3  (Ver ayuda para detalles):',
                    'active': 'Activo',
                    'threeThirdsPastoralCare': 'Pastoral Care',
                    'threeThirdsWorship': 'Worship',
                    'threeThirdsAccountability': 'Accountability',
                    'threeThirdsVisionCasting': 'Vision Casting',
                    'threeThirdsBibleTeaching': 'Bible Teaching',
                    'threeThirdsPractice': 'Practice',
                    'threeThirdsGoalSetting': 'Goal Setting & Commission',
                    'note': 'Nota',
                }
            }
        },
        cs: {
            translation: {
                'churchCircles12': {
                    'name': 'Název církve',
                    'leaderName': 'Jméno vedoucího',
                    'email': 'Email',
                    'newGeneration': 'Generace',
                    'peopleGroups': 'Etnikum',
                    'attenders': 'Počet účastníků',
                    'believers': 'Počet věřících',
                    'baptized': 'Počet pokřtěných',
                    'newlyBaptized': 'Počet nově pokřtěných (od začátku skupiny)',
                    'church': 'Je církev/Boží rodina?',
                    'churchFunctions': 'Funkce církve',
                    'churchType': 'Typ církve',
                    'churchTypeLegacy': 'Tradiční',
                    'churchTypeExistingBelievers': 'Existující věřící',
                    'churchTypeNewBelievers': 'Noví věřící',
                    // 'elementGospel': '',
                    // 'elementRepent': '',
                    // 'elementHolySpirit': '',
                    // 'elementSignsWonders': '',
                    'elementBaptism': 'Prvek: Křest',
                    'elementWord': 'Prvek: Boží Slovo',
                    'elementPrayer': 'Prvek: Modlitba',
                    'elementLordsSupper': 'Prvek: Připomínka Ježíšovy oběti',
                    'elementGive': 'Prvek: Dávání',
                    'elementLove': 'Prvek: Láska',
                    'elementWorship': 'Prvek: Oslava Ježíše',
                    'elementMakeDisciples': 'Prvek: Činění učedníků',
                    'gospelShares': 'Podíl evangelia za den',
                    'place': 'Místo',
                    'location': 'Geo Umístění',
                    'date': 'Datum začátku (např. 2017-01)',
                    'threeThirds': 'Prvky 3/3 (viz nápovědu pro více info)',
                    'active': 'Aktivní',
                    'inactiveReason': 'Důvod, proč jsou neaktivní',
                    'initialLeadersName': 'Jméno',
                    'initialPlace': 'Místo',
                    'initialDate': 'Datum',
                    'threeThirdsPastoralCare': 'Vzájmená péče',
                    'threeThirdsWorship': 'Oslava Ježíše',
                    'threeThirdsAccountability': 'Návrat / Vykazatelnost',
                    'threeThirdsVisionCasting': 'Vize',
                    'threeThirdsBibleTeaching': 'Bible',
                    'threeThirdsPractice': 'Procvičování',
                    'threeThirdsGoalSetting': 'Akční kroky a modlitba',
                    'note': 'Poznámka',
                }
            }
        },
        kn: {
            translation: {
                'churchCircles12': {
                    'name': 'ឈ្មោះសាសនាចក្រ',
                    'leaderName': 'ឈ្មោះអ្នកដឹកនាំ',
                    'email': 'អ៊ីមែល',
                    'newGeneration': 'ជំនាន់​ថ្មី',
                    'peopleGroups': 'ក្រុមមនុស្ស',
                    'attenders': 'ចំនួនអ្នកចូលរួម',
                    'believers': '# នៃអ្នកជឿ',
                    'baptized': '# នៃពិធីបុណ្យជ្រមុជទឹក',
                    'newlyBaptized': '# នៃពិធីបុណ្យជ្រមុជទឹកថ្មី(ចាប់តាំងពីការចាប់ផ្តើមនៅព្រះវិហារ)',
                    'church': 'តើក្រុមជំនុំ ?',
                    'churchType': 'ប្រភេទសាសនាចក្រ',
                    'churchFunctions': 'មុខងារសាសនាចក្រ',
                    'churchTypeLegacy': 'កេរ្តិ៍ដំណែល',
                    'churchTypeExistingBelievers': 'អ្នកជឿដែលមានស្រាប់',
                    'churchTypeNewBelievers': 'អ្នកជឿថ្មី',
                    'elementBaptism': 'ធាតុ: ពិធីបុណ្យជ្រមុជទឹក',
                    // 'elementGospel': '',
                    // 'elementRepent': '',
                    // 'elementHolySpirit': '',
                    // 'elementSignsWonders': '',
                    'elementWord': 'ធាតុ: ព្រះបន្ទូលរបស់ព្រះ',
                    'elementPrayer': 'ធាតុ: ការអធិស្ឋាន',
                    'elementLordsSupper': 'ធាតុ: ពិធីជប់លៀងរបស់ព្រះអម្ចាស់',
                    'elementGive': 'ធាតុ: ការផ្តល់',
                    'elementLove': 'ធាតុ: ស្នេហា',
                    'elementWorship': 'ធាតុ: ការថ្វាយបង្គំ',
                    'elementMakeDisciples': 'ធាតុ: បង្កើតសិស្ស',
                    'gospelShares': 'ការចែករំលែកដំណឹងល្អក្នុងមួយថ្ងៃ',
                    'place': 'ទីកន្លែង(ទីក្រុង, រដ្ឋ, ប្រទេស)',
                    'location': 'ទីតាំងភូមិសាស្ដ្រ',
                    'date': 'កាលបរិច្ឆេទចាប់ផ្តើម(ឧ។ 2017 - 01)',
                    'threeThirds': 'ធាតុនៃដំណើរការ 3 / 3',
                    'active': 'សកម្ម',
                    'inactiveReason': 'មូលហេតុនៃការអសកម្ម',
                    'initialLeadersName': 'ឈ្មោះអ្នកដឹកនាំ',
                    'initialPlace': 'ទីកន្លែង',
                    'initialDate': 'កាលបរិច្ឆេទ',
                    'threeThirdsPastoralCare': 'ការថែរក្សាគ្រូគង្វាល',
                    'threeThirdsWorship': 'ការថ្វាយបង្គំ',
                    'threeThirdsAccountability': 'គណនេយ្យភាព',
                    'threeThirdsVisionCasting': 'ចក្ខុវិស័យដេញ',
                    'threeThirdsBibleTeaching': 'បង្រៀនព្រះគម្ពីរ',
                    'threeThirdsPractice': 'អនុវត្ត',
                    'threeThirdsGoalSetting': 'ការកំណត់គោលដៅ & គណៈកម្មការ',
                    'note': 'ಸೂಚನೆ',
                }
            }
        }
    }
};
