import { GMTemplate, ControlType } from '../template.interface';

// export interface ChurchCirclesTemplateType extends GMTemplate {
//     translations: { [key: string]: { translation: { [key: string]: ChurchCirclesTranslation } } };
// }

export const boxHeight = 100;
export const textHeight = 14;
export const textMargin = 6;
export const boxMargin = 40;

export const nodeWidth = 156;
export const nodeHeight = 222;


export const ChurchCirclesWorldTemplate: GMTemplate = {
    id: 'churchCirclesWorld',
    name: 'Church Circles World',
    i18nName: 'churchCirclesWorld.ChurchCirclesWorld',
    theme: 'churchCirclesDefault',
    defaultConfiguration: 'churchCirclesWorld',
    settings: {
        iconUrl: 'templates/church-circles-world/icons/display.png'
    },
    svgSettings: {
        textHeight: textHeight,
        boxHeight: boxHeight,
        iconSize: boxHeight / 4,
        nodeActions: {
            x: -boxHeight / 1.3,
            y: 0,
            height: 40,
            width: 28
        },
        nodeBounds: {
            width: boxHeight * 1.5,
            height: boxHeight * 2.1
        },

        nodeWidth,
        nodeHeight
    },
    svgs: [
        {
            id: 'hover-rect',
            type: 'rect',
            attributes: {
                x: -(nodeWidth / 2),
                y: -(textHeight * 3),
                height: nodeHeight - textHeight,
                width: nodeWidth,
                rx: 4,
            },
            style: {
                // fill: 'none',
                // stroke: '#999',
            }
        },
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
                'x': -boxHeight * 0.4,
                'y': -(textHeight * 2.8),
                'width': boxHeight / 5,
                'height': boxHeight / 5,
            }
        },
        {
            id: 'topIcon2',
            type: 'image',
            attributes: {
                'x': -((boxHeight / 5) / 2),
                'y': -2.8 * textHeight,
                'width': boxHeight / 5,
                'height': boxHeight / 5,
            }
        },
        {
            id: 'topIcon3',
            type: 'image',
            attributes: {
                'x': boxHeight * 0.25,
                'y': -2.8 * textHeight,
                'width': boxHeight / 5,
                'height': boxHeight / 5,
            }
        },
        {
            id: 'topNumber1',
            type: 'text',
            attributes: {
                'x': -boxHeight * 0.32,
                'y': -0.8 * textMargin,
            },
        },
        {
            id: 'topNumber2',
            type: 'text',
            attributes: {
                'x': 0,
                'y': -0.8 * textMargin
            },
        },
        {
            id: 'topNumber3',
            type: 'text',
            attributes: {
                'x': boxHeight * 0.3,
                'y': -0.8 * textMargin
            },
        },
        {
            id: 'icon1',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.4,
                'y': boxHeight * 0.1,
            }
        },
        {
            id: 'icon2',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.125,
                'y': boxHeight * 0.1,
            }
        },
        {
            id: 'icon3',
            type: 'image',
            attributes: {
                'x': boxHeight * 0.15,
                'y': boxHeight * 0.15,
                'height': boxHeight / 6,
                'width': boxHeight / 6
            }
        },
        {
            id: 'icon4',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.4,
                'y': boxHeight * 0.375,
            }
        },
        {
            id: 'icon5',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.125,
                'y': boxHeight * 0.375,
            }
        },
        {
            id: 'icon6',
            type: 'image',
            attributes: {
                'x': boxHeight * 0.15,
                'y': boxHeight * 0.375,
            }
        },
        {
            id: 'icon7',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.4,
                'y': boxHeight * 0.65,
            },
        },
        {
            id: 'icon8',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.125,
                'y': boxHeight * 0.65,
            }
        },
        {
            id: 'icon9',
            type: 'image',
            attributes: {
                'x': boxHeight * 0.15,
                'y': boxHeight * 0.65,
            }
        }
    ],
    svgActions: [
        {
            id: 'edit-node-action',
            control: 'editNode',
            iconName: 'edit',
            attributes: {
                'x': -(nodeWidth / 2) - 1,
                'y': 10
            },
        },
        {
            id: 'add-child-node-action',
            control: 'addChildNode',
            iconName: 'add',
            attributes: {
                'x': -(nodeWidth / 2) - 1,
                'y': 50
            },
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
                'churchCirclesWorld': {
                    'active': 'Active',
                    'attenders': '# of Attenders',
                    'baptized': '# of Baptized',
                    'believers': '# of Believers',
                    'churchFunctions': 'Church Functions',
                    'churchType': 'Church Type',
                    'churchTypeExistingBelievers': 'Existing Believers',
                    'churchTypeLegacy': 'Legacy',
                    'churchTypeNewBelievers': 'New Believers',
                    'date': 'Date of Start (Ex. 2017-01)',
                    'elementBaptism': 'Element: Baptism',
                    'elementGive': 'Element: Giving',
                    'elementLeaders': 'Element: Leaders',
                    'elementLordsSupper': 'Element: Lord\'s supper',
                    'elementLove': 'Element: Love',
                    'elementMakeDisciples': 'Element: Make disciples',
                    'elementPrayer': 'Element: Prayer',
                    'elementWord': 'Element: God\'s Word',
                    'elementWorship': 'Element: Worship',
                    'email': 'Email',
                    'gospelShares': 'Gospel shares per day',
                    'inactiveReason': 'Reason for being inactive',
                    'initialDate': 'Date',
                    'initialLeadersName': 'Leader\'s Name',
                    'initialPlace': 'Place',
                    'isChurch': 'Is church?',
                    'leaderName': 'Leader\'s Name',
                    'location': 'Geo Location',
                    'name': 'Church Name',
                    'newGeneration': 'New Generation',
                    'newlyBaptized': '# of New Baptized (since church start)',
                    'note': 'Note',
                    'parent': 'Parent Node',
                    'peopleGroups': 'People Groups',
                    'place': 'Place (City, State, Country)',
                    'threeThirds': 'Elements of 3/3 process',
                    'threeThirdsAccountability': 'Accountability',
                    'threeThirdsBibleTeaching': 'Bible Teaching',
                    'threeThirdsGoalSetting': 'Goal Setting & Commission',
                    'threeThirdsPastoralCare': 'Pastoral Care',
                    'threeThirdsPractice': 'Practice',
                    'threeThirdsVisionCasting': 'Vision Casting',
                    'threeThirdsWorship': 'Worship',
                }
            }
        },
        de: {
            translation: {
                'churchCirclesWorld': {
                    'active': 'aktiv',
                    'attenders': 'Anzahl Teilnehmer',
                    'baptized': 'Anzahl Getaufte',
                    'believers': 'Anzahl Gläubige',
                    'churchFunctions': 'Kirchliche Funktionen',
                    'churchType': 'Gemeinde-Typ',
                    'churchTypeExistingBelievers': 'Länger Gläubige',
                    'churchTypeLegacy': 'Traditionell',
                    'churchTypeNewBelievers': 'Neue Gläubige',
                    'date': 'Startdatum (z.B. 2017-01)',
                    'elementBaptism': 'Element: Taufe',
                    'elementGive': 'Element: Geben',
                    'elementLeaders': 'Element: Leiter',
                    'elementLordsSupper': 'Element: Abendmahl',
                    'elementLove': 'Element: Gemeinschaft',
                    'elementMakeDisciples': 'Element: Multiplikation',
                    'elementPrayer': 'Element: Gebet',
                    'elementWord': 'Element: Lehre',
                    'elementWorship': 'Element: Lobpreis',
                    'email': 'Bemerkungen',
                    'gospelShares': 'Evangeliumaktien pro Tag',
                    'inactiveReason': 'Grund inaktiv zu sein',
                    'initialDate': 'Datum',
                    'initialLeadersName': 'Leiter',
                    'initialPlace': 'Ort',
                    'isChurch': 'Ist Gemeinde?',
                    'leaderName': 'Leiter',
                    'location': 'Adresse',
                    'name': 'Name der Kirche',
                    'newGeneration': 'Generation',
                    'newlyBaptized': 'Anzahl frisch Getaufte (seit Gemeindestart)',
                    'note': 'Hinweis',
                    'parent': 'Parent Node',
                    'peopleGroups': 'Sprache / Subkultur',
                    'place': 'Ort (Stadt, Region, Land)',
                    'threeThirds': 'Elemente des 3/3-Prozesses (siehe Hilfe für mehr Informationen)',
                    'threeThirdsAccountability': 'Accountability',
                    'threeThirdsBibleTeaching': 'Bible Teaching',
                    'threeThirdsGoalSetting': 'Goal Setting & Commission',
                    'threeThirdsPastoralCare': 'Pastoral Care',
                    'threeThirdsPractice': 'Practice',
                    'threeThirdsVisionCasting': 'Vision Casting',
                    'threeThirdsWorship': 'Worship',
                }
            }
        },
        es: {
            translation: {
                'churchCirclesWorld': {
                    'active': 'Activo',
                    'attenders': '# of participantes',
                    'baptized': '# of bautizados',
                    'believers': '# of creyentes',
                    'churchFunctions': 'Funciones de la iglesia',
                    'churchType': 'Tipo de Iglesia',
                    'churchTypeExistingBelievers': 'Creyentes existentes',
                    'churchTypeLegacy': 'Tradicional',
                    'churchTypeNewBelievers': 'Nuevos creyentes',
                    'date': 'Fecha de Inicio (Ex. 2017-01)',
                    'elementBaptism': 'Elemento: Bautismo',
                    'elementGive': 'Elemento: Dar/Generosidad',
                    'elementLeaders': 'Elemento: Lider',
                    'elementLordsSupper': 'Elemento: Santa Cena',
                    'elementLove': 'Elemento: Amor',
                    'elementMakeDisciples': 'Elemento: Hacer discípulos',
                    'elementPrayer': 'Elemento: Oración',
                    'elementWord': 'Elemento: Biblia',
                    'elementWorship': 'Elemento: Adorar',
                    'email': 'Email',
                    'gospelShares': 'Acciones del evangelio por día',
                    'inactiveReason': 'Razón para estar inactivo',
                    'initialDate': 'Fecha',
                    'initialLeadersName': 'Nombre de lider',
                    'initialPlace': 'Lugar',
                    'isChurch': 'Iglesia?',
                    'leaderName': 'Nombre de lider',
                    'location': 'Ubicación geográfica',
                    'name': 'Nombre de la iglesia',
                    'newGeneration': 'Generacion',
                    'newlyBaptized': '# of nuevos bautizados (desde inicio de iglesia)',
                    'note': 'Nota',
                    'parent': 'Parent Node',
                    'peopleGroups': 'Etnia',
                    'place': 'Lugar (Ciudad, Provincia, Pais):',
                    'threeThirds': 'Elementos del proceso de 3/3  (Ver ayuda para detalles):',
                    'threeThirdsAccountability': 'Accountability',
                    'threeThirdsBibleTeaching': 'Bible Teaching',
                    'threeThirdsGoalSetting': 'Goal Setting & Commission',
                    'threeThirdsPastoralCare': 'Pastoral Care',
                    'threeThirdsPractice': 'Practice',
                    'threeThirdsVisionCasting': 'Vision Casting',
                    'threeThirdsWorship': 'Worship',
                }
            }
        },
        cs: {
            translation: {
                'churchCirclesWorld': {
                    'active': 'Aktivní',
                    'attenders': 'Počet účastníků',
                    'baptized': 'Počet pokřtěných',
                    'believers': 'Počet věřících',
                    'churchFunctions': 'Funkce církve',
                    'churchType': 'Typ církve',
                    'churchTypeExistingBelievers': 'Existující věřící',
                    'churchTypeLegacy': 'Tradiční',
                    'churchTypeNewBelievers': 'Noví věřící',
                    'date': 'Datum začátku (např. 2017-01)',
                    'elementBaptism': 'Prvek: Křest',
                    'elementGive': 'Prvek: Dávání',
                    'elementLeaders': 'Prvek: Vedoucí',
                    'elementLordsSupper': 'Prvek: Připomínka Ježíšovy oběti',
                    'elementLove': 'Prvek: Láska',
                    'elementMakeDisciples': 'Prvek: Činění učedníků',
                    'elementPrayer': 'Prvek: Modlitba',
                    'elementWord': 'Prvek: Boží Slovo',
                    'elementWorship': 'Prvek: Oslava Ježíše',
                    'email': 'Email',
                    'gospelShares': 'Podíl evangelia za den',
                    'inactiveReason': 'Důvod, proč jsou neaktivní',
                    'initialDate': 'Datum',
                    'initialLeadersName': 'Jméno',
                    'initialPlace': 'Místo',
                    'isChurch': 'Je církev/Boží rodina?',
                    'leaderName': 'Jméno vedoucího',
                    'location': 'Geo Umístění',
                    'name': 'Název církve',
                    'newGeneration': 'Generace',
                    'newlyBaptized': 'Počet nově pokřtěných (od začátku skupiny)',
                    'note': 'Poznámka',
                    'parent': 'Parent Node',
                    'peopleGroups': 'Etnikum',
                    'place': 'Místo',
                    'threeThirds': 'Prvky 3/3 (viz nápovědu pro více info)',
                    'threeThirdsAccountability': 'Návrat / Vykazatelnost',
                    'threeThirdsBibleTeaching': 'Bible',
                    'threeThirdsGoalSetting': 'Akční kroky a modlitba',
                    'threeThirdsPastoralCare': 'Vzájmená péče',
                    'threeThirdsPractice': 'Procvičování',
                    'threeThirdsVisionCasting': 'Vize',
                    'threeThirdsWorship': 'Oslava Ježíše',
                }
            }
        },
        kn: {
            translation: {
                'churchCirclesWorld': {
                    'active': 'សកម្ម',
                    'attenders': 'ចំនួនអ្នកចូលរួម',
                    'baptized': '# នៃពិធីបុណ្យជ្រមុជទឹក',
                    'believers': '# នៃអ្នកជឿ',
                    'churchFunctions': 'មុខងារសាសនាចក្រ',
                    'churchType': 'ប្រភេទសាសនាចក្រ',
                    'churchTypeExistingBelievers': 'អ្នកជឿដែលមានស្រាប់',
                    'churchTypeLegacy': 'កេរ្តិ៍ដំណែល',
                    'churchTypeNewBelievers': 'អ្នកជឿថ្មី',
                    'date': 'កាលបរិច្ឆេទចាប់ផ្តើម(ឧ។ 2017 - 01)',
                    'elementBaptism': 'ធាតុ: ពិធីបុណ្យជ្រមុជទឹក',
                    'elementGive': 'ធាតុ: ការផ្តល់',
                    'elementLeaders': 'ធាតុ: មេដឹកនាំ',
                    'elementLordsSupper': 'ធាតុ: ពិធីជប់លៀងរបស់ព្រះអម្ចាស់',
                    'elementLove': 'ធាតុ: ស្នេហា',
                    'elementMakeDisciples': 'ធាតុ: បង្កើតសិស្ស',
                    'elementPrayer': 'ធាតុ: ការអធិស្ឋាន',
                    'elementWord': 'ធាតុ: ព្រះបន្ទូលរបស់ព្រះ',
                    'elementWorship': 'ធាតុ: ការថ្វាយបង្គំ',
                    'email': 'អ៊ីមែល',
                    'gospelShares': 'ការចែករំលែកដំណឹងល្អក្នុងមួយថ្ងៃ',
                    'inactiveReason': 'មូលហេតុនៃការអសកម្ម',
                    'initialDate': 'កាលបរិច្ឆេទ',
                    'initialLeadersName': 'ឈ្មោះអ្នកដឹកនាំ',
                    'initialPlace': 'ទីកន្លែង',
                    'isChurch': 'តើក្រុមជំនុំ ?',
                    'leaderName': 'ឈ្មោះអ្នកដឹកនាំ',
                    'location': 'ទីតាំងភូមិសាស្ដ្រ',
                    'name': 'ឈ្មោះសាសនាចក្រ',
                    'newGeneration': 'ជំនាន់​ថ្មី',
                    'newlyBaptized': '# នៃពិធីបុណ្យជ្រមុជទឹកថ្មី(ចាប់តាំងពីការចាប់ផ្តើមនៅព្រះវិហារ)',
                    'note': 'ಸೂಚನೆ',
                    'parent': 'Parent Node',
                    'peopleGroups': 'ក្រុមមនុស្ស',
                    'place': 'ទីកន្លែង(ទីក្រុង, រដ្ឋ, ប្រទេស)',
                    'threeThirds': 'ធាតុនៃដំណើរការ 3 / 3',
                    'threeThirdsAccountability': 'គណនេយ្យភាព',
                    'threeThirdsBibleTeaching': 'បង្រៀនព្រះគម្ពីរ',
                    'threeThirdsGoalSetting': 'ការកំណត់គោលដៅ & គណៈកម្មការ',
                    'threeThirdsPastoralCare': 'ការថែរក្សាគ្រូគង្វាល',
                    'threeThirdsPractice': 'អនុវត្ត',
                    'threeThirdsVisionCasting': 'ចក្ខុវិស័យដេញ',
                    'threeThirdsWorship': 'ការថ្វាយបង្គំ',
                }
            }
        }
    }
};
