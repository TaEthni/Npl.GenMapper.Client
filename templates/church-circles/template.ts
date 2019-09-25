import { GMTemplate } from '../template.interface';

// export interface ChurchCirclesTemplateType extends GMTemplate {
//     translations: { [key: string]: { translation: { [key: string]: ChurchCirclesTranslation } } };
// }

const boxHeight = 100;
const textHeight = 14;
const textMargin = 6;

const svgs = [
    {
        propertyName: 'name',
        type: 'text',
        attributes: {
            'x': 0,
            'y': boxHeight + textHeight
        }
    },
    {
        propertyName: 'attenders',
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
        propertyName: 'believers',
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
        propertyName: 'baptized',
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
        name: 'newlyBaptized',
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
        propertyName: 'churchType',
        type: 'radio',
        options: [
            {
                value: 'legacy',
                class: 'church-legacy',
                attributes: {
                    'rx': 0
                }
            },
            {
                value: 'existingBelievers',
                attributes: {
                    'rx': 0
                }
            }
        ]
    }
];

export const ChurchCirclesTemplate: GMTemplate = {
    version: '0.6',
    title: 'Church Circles',
    name: 'church-circles',
    format: 'churchCircles',
    icon: 'templates/church-circles/icons/display.png',
    settings: {
        'textHeight': textHeight,
        'boxHeight': boxHeight,
        'nodeActions': {
            'x': boxHeight / 2,
            'y': 0
        },
        'nodeSize': {
            'width': boxHeight * 1.5,
            'height': boxHeight * 2.1
        }
    },
    svg: {
        'big-rect': {
            // Rect with opacity 0, so that one could hover over all the square even
            // if the visible shape is circle
            'type': 'rect',
            'attributes': {
                'x': -boxHeight / 2,
                'y': -40,
                'width': boxHeight,
                'height': boxHeight + 40,
                'opacity': '0'
            }
        },
        'attenders-image': {
            'type': 'image',
            'attributes': {
                'x': -boxHeight * 0.5,
                'y': -2.8 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
                'xlink:href': 'templates/church-circles/icons/attenders.png'
            }
        },
        'believers-image': {
            'type': 'image',
            'attributes': {
                'x': -boxHeight * 0.25,
                'y': -2.8 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
                'xlink:href': 'templates/church-circles/icons/believers.png'
            }
        },
        'baptized-image': {
            'type': 'image',
            'attributes': {
                'x': boxHeight * 0.1,
                'y': -2.8 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
                'xlink:href': 'templates/church-circles/icons/element-baptism.png'
            }
        },
        'church-box': {
            'type': 'rect',
            'attributes': {
                'x': -boxHeight / 2,
                'y': 0,
                'rx': 0.5 * boxHeight,
                'width': boxHeight,
                'height': boxHeight
            }
        }
    },
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
    defaultAttributes: [
        {
            propertyName: 'leaderName',
            type: 'text',
            order: 5,
            isLabel: true,
            isVisible: true,
        },
        {
            propertyName: 'email',
            type: 'text',
            order: 6,
            isLabel: false,
            isVisible: true,
        },
        {
            propertyName: 'date',
            type: 'text',
            order: 7,
            isLabel: true,
            isVisible: true,
            deprecated: true,
        },
        {
            propertyName: 'place',
            type: 'text',
            order: 8,
            isLabel: true,
            isVisible: true,
        }
    ],
    fields: [
        {
            header: 'id',
            i18nRef: '',
            initial: 0,
            type: null,
            canModify: false,
        },
        {
            header: 'parentId',
            i18nRef: 'parentId',
            initial: null,
            type: null,
            canModify: false,
        },
        {
            header: 'newGeneration',
            i18nRef: 'churchCircles.newGeneration',
            initial: false,
            type: 'checkbox',
            canModify: true,
            order: 1,
        },
        {
            header: 'active',
            i18nRef: 'churchCircles.active',
            initial: true,
            type: 'checkbox',
            canModify: true,
            order: 2,
            // svg defined currently in genmapper.js
        },
        {
            header: 'inactiveReason',
            i18nRef: 'churchCircles.inactiveReason',
            initial: '',
            type: 'textarea',
            dependsOnFalseField: 'active',
            canModify: true,
            canModifyVisibility: true,
            order: 3,
        },
        {
            header: 'name',
            i18nRef: 'churchCircles.name',
            initial: '',
            type: 'text',
            canModify: true,
            canModifyVisibility: false,
            order: 4,
            svg: {
                type: 'text',
                attributes: {
                    'x': 0,
                    'y': boxHeight + textHeight
                }
            },
        },
        // {
        //     'header': 'startDate',
        //     'type': 'date',
        //     'canModify': true,
        //     'canModifyVisibility': false,
        //     'order': 5,
        // },
        {
            header: 'location',
            initial: '',
            type: 'geoLocation',
            canModify: true,
            canModifyVisibility: true,
        },
        {
            header: 'latitude',
            initial: null,
            type: 'hidden',
            canModify: false,
        },
        {
            header: 'longitude',
            initial: null,
            type: 'hidden',
            canModify: false,
        },
        {
            header: 'placeId',
            initial: null,
            type: 'hidden',
            canModify: false,
        },
        {
            header: 'peopleGroups',
            initial: null,
            type: 'peidSelect',
            canModify: true,
            canModifyVisibility: true,
        },
        {
            header: 'peopleGroupsNames',
            initial: null,
            type: 'hidden',
            canModify: false
        },
        {
            header: 'attenders',
            initial: 0,
            type: 'number',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                type: 'text',
                attributes: {
                    'x': -boxHeight * 0.39,
                    'y': -0.8 * textMargin
                },
                style: {
                    'text-anchor': 'center'
                }
            },
        },
        {
            header: 'believers',
            initial: 0,
            type: 'number',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'text',
                'attributes': {
                    'x': -boxHeight * 0.13,
                    'y': -0.8 * textMargin
                },
                'style': {
                    'text-anchor': 'center'
                }
            }
        },
        {
            header: 'baptized',
            initial: 0,
            type: 'number',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'text',
                'attributes': {
                    'x': boxHeight * 0.13,
                    'y': -0.8 * textMargin
                },
                'style': {
                    'text-anchor': 'center'
                }
            }
        },
        {
            header: 'newlyBaptized',
            initial: 0,
            type: 'number',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'text',
                'attributes': {
                    'x': boxHeight * 0.39,
                    'y': -0.8 * textMargin
                },
                'style': {
                    'text-anchor': 'center'
                }
            }
        },
        {
            header: 'gospelShares',
            initial: 0,
            type: 'number',
            canModify: true,
            canModifyVisibility: false
        },
        {
            header: 'church',
            initial: false,
            type: 'checkbox',
            inheritsFrom: 'church-box',
            canModify: true,
            canModifyVisibility: false,
            class: {
                'checkedTrue': 'is-church',
                'checkedFalse': 'is-not-church'
            }
        },
        {
            header: 'churchType',
            initial: 'newBelievers',
            type: 'radio',
            inheritsFrom: 'church-box',
            canModify: true,
            canModifyVisibility: false,
            values: [
                {
                    'header': 'legacy',
                    'class': 'church-legacy',
                    'attributes': {
                        'rx': 0
                    }
                },
                {
                    'header': 'existingBelievers',
                    'attributes': {
                        'rx': 0
                    }
                },
                {
                    'header': 'newBelievers'
                }
            ]
        },
        {
            header: 'elementBaptism',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.4,
                    'y': boxHeight * 0.1,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles/icons/element-baptism.png'
                }
            },
        },
        {
            header: 'elementPrayer',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.125,
                    'y': boxHeight * 0.1,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles/icons/element-prayer.png'
                }
            },
        },
        {
            header: 'elementMakeDisciples',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * 0.15,
                    'y': boxHeight * 0.1,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles/icons/element-make-disciples.png'
                }
            }
        },
        {
            header: 'elementLove',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.4,
                    'y': boxHeight * 0.375,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles/icons/element-love.png'
                }
            }
        },
        {
            header: 'elementWorship',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.125,
                    'y': boxHeight * 0.375,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles/icons/element-worship.png'
                }
            }
        },
        {
            header: 'elementLordsSupper',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * 0.15,
                    'y': boxHeight * 0.375,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles/icons/element-lords-supper.png'
                }
            }
        },
        {
            header: 'elementGive',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.4,
                    'y': boxHeight * 0.65,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles/icons/element-give.png'
                }
            },
        },
        {
            header: 'elementWord',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.125,
                    'y': boxHeight * 0.65,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles/icons/element-word.png'
                }
            },

        },
        {
            header: 'elementLeaders',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * 0.15,
                    'y': boxHeight * 0.65,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles/icons/element-leaders.png'
                }
            }
        },
        {
            header: 'threeThirds',
            initial: ['1', '2', '3', '4', '5', '6', '7'],
            type: 'multiSelect',
            canModify: true,
            canModifyVisibility: false,
            values: [
                { value: '1', header: 'threeThirdsPastoralCare' },
                { value: '2', header: 'threeThirdsWorship' },
                { value: '3', header: 'threeThirdsAccountability' },
                { value: '4', header: 'threeThirdsVisionCasting' },
                { value: '5', header: 'threeThirdsBibleTeaching' },
                { value: '6', header: 'threeThirdsPractice' },
                { value: '7', header: 'threeThirdsGoalSetting' },
            ],
            svg: {
                'type': 'text',
                'attributes': {
                    'x': boxHeight * -0.5,
                    'y': boxHeight * 0.6,
                    'transform': 'rotate(90 -56 48)',
                    'rotate': -90
                },
                'style': {
                    'text-anchor': 'center',
                    'letter-spacing': '0.35em'
                }
            }
        },
        {
            header: 'note',
            initial: '',
            type: 'textarea',
            canModify: true,
            canModifyVisibility: true,
        }
    ],
    translations: {
        en: {
            translation: {
                'churchCircles': {
                    'name': 'Church Name',
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
                    'legacy': 'Legacy',
                    'existingBelievers': 'Existing Believers',
                    'newBelievers': 'New Believers',
                    'elementBaptism': 'Element: Baptism',
                    'elementWord': 'Element: God\'s Word',
                    'elementPrayer': 'Element: Prayer',
                    'elementLordsSupper': 'Element: Lord\'s supper',
                    'elementGive': 'Element: Giving',
                    'elementLove': 'Element: Love',
                    'elementWorship': 'Element: Worship',
                    'elementLeaders': 'Element: Leaders',
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
                    'threeThirdsPastoralCare': 'Pastoral Care',
                    'threeThirdsWorship': 'Worship',
                    'threeThirdsAccountability': 'Accountability',
                    'threeThirdsVisionCasting': 'Vision Casting',
                    'threeThirdsBibleTeaching': 'Bible Teaching',
                    'threeThirdsPractice': 'Practice',
                    'threeThirdsGoalSetting': 'Goal Setting & Commission',
                    'note': 'Note'
                }
            }
        },
        de: {
            translation: {
                'churchCircles': {
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
                    'legacy': 'Traditionell',
                    'email': 'Bemerkungen',
                    'existingBelievers': 'Länger Gläubige',
                    'newGeneration': 'Generation',
                    'newBelievers': 'Neue Gläubige',
                    'elementBaptism': 'Element: Taufe',
                    'elementWord': 'Element: Lehre',
                    'elementPrayer': 'Element: Gebet',
                    'elementLordsSupper': 'Element: Abendmahl',
                    'elementGive': 'Element: Geben',
                    'elementLove': 'Element: Gemeinschaft',
                    'elementWorship': 'Element: Lobpreis',
                    'elementLeaders': 'Element: Leiter',
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
                'churchCircles': {
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
                    'legacy': 'Tradicional',
                    'newGeneration': 'Generacion',
                    'existingBelievers': 'Creyentes existentes',
                    'newBelievers': 'Nuevos creyentes',
                    'elementBaptism': 'Elemento: Bautismo',
                    'elementWord': 'Elemento: Biblia',
                    'elementPrayer': 'Elemento: Oración',
                    'elementLordsSupper': 'Elemento: Santa Cena',
                    'elementGive': 'Elemento: Dar/Generosidad',
                    'elementLove': 'Elemento: Amor',
                    'elementWorship': 'Elemento: Adorar',
                    'elementLeaders': 'Elemento: Lider',
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
                'churchCircles': {
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
                    'legacy': 'Tradiční',
                    'existingBelievers': 'Existující věřící',
                    'newBelievers': 'Noví věřící',
                    'elementBaptism': 'Prvek: Křest',
                    'elementWord': 'Prvek: Boží Slovo',
                    'elementPrayer': 'Prvek: Modlitba',
                    'elementLordsSupper': 'Prvek: Připomínka Ježíšovy oběti',
                    'elementGive': 'Prvek: Dávání',
                    'elementLove': 'Prvek: Láska',
                    'elementWorship': 'Prvek: Oslava Ježíše',
                    'elementLeaders': 'Prvek: Vedoucí',
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
                'churchCircles': {
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
                    'legacy': 'កេរ្តិ៍ដំណែល',
                    'existingBelievers': 'អ្នកជឿដែលមានស្រាប់',
                    'newBelievers': 'អ្នកជឿថ្មី',
                    'elementBaptism': 'ធាតុ: ពិធីបុណ្យជ្រមុជទឹក',
                    'elementWord': 'ធាតុ: ព្រះបន្ទូលរបស់ព្រះ',
                    'elementPrayer': 'ធាតុ: ការអធិស្ឋាន',
                    'elementLordsSupper': 'ធាតុ: ពិធីជប់លៀងរបស់ព្រះអម្ចាស់',
                    'elementGive': 'ធាតុ: ការផ្តល់',
                    'elementLove': 'ធាតុ: ស្នេហា',
                    'elementWorship': 'ធាតុ: ការថ្វាយបង្គំ',
                    'elementLeaders': 'ធាតុ: មេដឹកនាំ',
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
