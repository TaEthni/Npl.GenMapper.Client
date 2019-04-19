import { GMTemplate } from '../template.interface';

const boxHeight = 80;
const textHeight = 14;
const textMargin = 6;

export const ChurchCirclesCzechTemplate: GMTemplate = {
    'version': '0.3',
    'title': 'Church Circles Czech',
    'name': 'church-circles-czech',
    'format': 'churchCirclesCzech',
    'settings': {
        'textHeight': textHeight,
        'boxHeight': boxHeight,
        'nodeActions': {
            'x': boxHeight / 2,
            'y': 0
        },
        'nodeSize': {
            'width': boxHeight * 1.5,
            'height': boxHeight * 2.6
        }
    },
    'svg': {
        'big-rect': {
            // Rect with opacity 0, so that one could hover over all the square even
            // if the visible shape is circle
            'type': 'rect',
            'attributes': {
                'x': -boxHeight / 2,
                'y': 0,
                'width': boxHeight,
                'height': boxHeight,
                'opacity': '0'
            }
        },
        'attenders-image': {
            'type': 'image',
            'attributes': {
                'x': -boxHeight * 0.52,
                'y': -2.5 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
                'xlink:href': 'templates/church-circles-czech/icons/attenders.png'
            }
        },
        'believers-image': {
            'type': 'image',
            'attributes': {
                'x': -boxHeight * 0.25,
                'y': -2.5 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
                'xlink:href': 'templates/church-circles-czech/icons/believers.png'
            }
        },
        'baptized-image': {
            'type': 'image',
            'attributes': {
                'x': boxHeight * 0,
                'y': -2.5 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
                'xlink:href': 'templates/church-circles-czech/icons/baptism.png'
            }
        },
        'new-baptized-image': {
            'type': 'image',
            'attributes': {
                'x': boxHeight * 0.25,
                'y': -2.5 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
                'xlink:href': 'templates/church-circles-czech/icons/new-baptism.png'
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
    'defaultAttributes': [
        {
            propertyName: 'leadersName',
            type: 'text',
            order: 4,
            isLabel: true,
            isVisible: true,
        },
        {
            propertyName: 'mentor',
            type: 'text',
            order: 5,
            isLabel: true,
            isVisible: true,
        },
        {
            propertyName: 'date',
            type: 'text',
            order: 6,
            isLabel: true,
            isVisible: true,
            deprecated: true,
        },
        {
            propertyName: 'place',
            type: 'text',
            order: 7,
            isLabel: true,
            isVisible: true,
        }
    ],
    'fields': [
        {
            'header': 'id',
            'initial': 0,
            'type': null,
            'canModify': false,
        },
        {
            'header': 'parentId',
            'initial': null,
            'type': null,
            'canModify': false,
        },
        {
            'header': 'newGeneration',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'order': 1,
        },
        {
            'header': 'active',
            'initial': true,
            'type': 'checkbox',
            'canModify': true,
            'order': 2,
            // svg defined currently in genmapper.js
        },
        {
            'header': 'name',
            'initialTranslationCode': 'initialName',
            'type': 'text',
            'canModify': true,
            'canModifyVisibility': true,
            'order': 3,
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': 0,
                    'y': boxHeight + textHeight
                }
            }
        },
        {
            'header': 'location',
            'initial': '',
            'type': 'geoLocation',
            'canModify': true,
            'canModifyVisibility': true
        },
        {
            'header': 'latitude',
            'initial': null,
            'type': 'hidden',
            'canModify': false
        },
        {
            'header': 'longitude',
            'initial': null,
            'type': 'hidden',
            'canModify': false
        },
        {
            'header': 'placeId',
            'initial': '',
            'type': 'hidden',
            'canModify': false
        },
        {
            'header': 'attenders',
            'initial': 0,
            'type': 'text',
            'canModify': true,
            'canModifyVisibility': false,
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': -boxHeight * 0.39,
                    'y': -0.5 * textMargin
                },
                'style': {
                    'text-anchor': 'center'
                }
            }
        },
        {
            'header': 'believers',
            'initial': 0,
            'type': 'text',
            'canModify': true,
            'canModifyVisibility': false,
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': -boxHeight * 0.13,
                    'y': -0.5 * textMargin
                },
                'style': {
                    'text-anchor': 'center'
                }
            }
        },
        {
            'header': 'baptized',
            'initial': 0,
            'type': 'text',
            'canModify': true,
            'canModifyVisibility': false,
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': boxHeight * 0.13,
                    'y': -0.5 * textMargin
                },
                'style': {
                    'text-anchor': 'center'
                }
            }
        },
        {
            'header': 'newlyBaptized',
            'initial': 0,
            'type': 'text',
            'canModify': true,
            'canModifyVisibility': false,
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': boxHeight * 0.39,
                    'y': -0.5 * textMargin
                },
                'style': {
                    'text-anchor': 'center'
                }
            }
        },
        {
            'header': 'church',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'canModifyVisibility': false,
            'inheritsFrom': 'church-box',
            'class': {
                'checkedTrue': 'is-church',
                'checkedFalse': 'is-not-church'
            }
        },
        {
            'header': 'churchType',
            'initial': 'newBelievers',
            'type': 'radio',
            'canModify': true,
            'canModifyVisibility': false,
            'inheritsFrom': 'church-box',
            'values': [
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
            'header': 'elementBaptism',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'canModifyVisibility': false,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.4,
                    'y': boxHeight * 0.1,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles-czech/icons/baptism.png'
                }
            }
        },
        {
            'header': 'elementWord',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'canModifyVisibility': false,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.125,
                    'y': boxHeight * 0.1,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles-czech/icons/element-word.png'
                }
            }
        },
        {
            'header': 'elementPrayer',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'canModifyVisibility': false,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * 0.15,
                    'y': boxHeight * 0.1,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles-czech/icons/element-prayer.png'
                }
            }
        },
        {
            'header': 'elementLordsSupper',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'canModifyVisibility': false,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.4,
                    'y': boxHeight * 0.375,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles-czech/icons/element-lords-supper.png'
                }
            }
        },
        {
            'header': 'elementGive',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'canModifyVisibility': false,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.125,
                    'y': boxHeight * 0.375,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles-czech/icons/element-give.png'
                }
            }
        },
        {
            'header': 'elementLove',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'canModifyVisibility': false,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * 0.15,
                    'y': boxHeight * 0.375,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles-czech/icons/element-love.png'
                }
            }
        },
        {
            'header': 'elementWorship',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'canModifyVisibility': false,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.4,
                    'y': boxHeight * 0.65,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles-czech/icons/element-worship.png'
                }
            }
        },
        {
            'header': 'elementLeaders',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'canModifyVisibility': false,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.125,
                    'y': boxHeight * 0.65,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles-czech/icons/element-leaders.png'
                }
            }
        },
        {
            'header': 'elementMakeDisciples',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'canModifyVisibility': false,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * 0.15,
                    'y': boxHeight * 0.65,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/church-circles-czech/icons/element-make-disciples.png'
                }
            }
        },
        {
            'header': 'threeThirds',
            'initial': ['1', '2', '3', '4', '5', '6', '7'],
            'type': 'multiSelect',
            'values': [
                { value: '1', header: 'threeThirdsPastoralCare' },
                { value: '2', header: 'threeThirdsWorship' },
                { value: '3', header: 'threeThirdsAccountability' },
                { value: '4', header: 'threeThirdsVisionCasting' },
                { value: '5', header: 'threeThirdsBibleTeaching' },
                { value: '6', header: 'threeThirdsPractice' },
                { value: '7', header: 'threeThirdsGoalSetting' },
            ],
            'canModify': true,
            'canModifyVisibility': false,
            'svg': {
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
            'header': 'note',
            'initial': ' ',
            'type': 'textarea',
            'canModify': true,
            'canModifyVisibility': true,
        }
    ],
    'translations': {
        en: {
            translation: {
                'churchCirclesCzech': {
                    'translationLabel': 'English',
                    'name': 'Group Name',
                    'leadersName': "Leader's Name",
                    'mentor': 'Mentor',
                    'newGeneration': 'New Generation',
                    'attenders': '# of Attenders',
                    'believers': '# of Believers',
                    'baptized': '# of Baptized',
                    'newlyBaptized': '# of New Baptized (since church start)',
                    'church': 'Is church?',
                    'churchType': 'Church Type',
                    'legacy': 'Legacy',
                    'existingBelievers': 'Existing Believers',
                    'newBelievers': 'New Believers',
                    'elementBaptism': 'Element: Baptism',
                    'elementWord': "Element: God's Word",
                    'elementPrayer': 'Element: Prayer',
                    'elementLordsSupper': "Element: Lord's supper",
                    'elementGive': 'Element: Giving',
                    'elementLove': 'Element: Love',
                    'elementWorship': 'Element: Worship',
                    'elementLeaders': 'Element: Leaders',
                    'elementMakeDisciples': 'Element: Make disciples',
                    'place': 'Place',
                    'location': 'Geo Location',
                    'date': 'Date of Start (Finish)',
                    'threeThirds': 'Elements of 3/3 process (1=Care, 2=Worship, 3=Accountability, 4=Vision, 5=Bible, 6=Practice, 7=Goals and prayer)',
                    'active': 'Active',
                    'note': 'Note',
                    'initialName': 'Group',
                    'initialLeadersName': 'Leader',
                    'initialPlace': 'Place',
                    'initialDate': 'Date',
                    'threeThirdsPastoralCare': 'Care',
                    'threeThirdsWorship': 'Worship',
                    'threeThirdsAccountability': 'Accountability',
                    'threeThirdsVisionCasting': 'Vision',
                    'threeThirdsBibleTeaching': 'Bible',
                    'threeThirdsPractice': 'Practice',
                    'threeThirdsGoalSetting': 'Goals & Prayer',
                }
            }
        },
        cs: {
            translation: {
                'churchCirclesCzech': {
                    'translationLabel': 'Čeština',
                    'name': 'Jméno skupiny',
                    'leadersName': 'Jméno vedoucího',
                    'mentor': 'Mentor',
                    'attenders': 'Počet účastníků',
                    'believers': 'Počet věřících',
                    'baptized': 'Počet pokřtěných',
                    'newlyBaptized': 'Počet nově pokřtěných (od začátku skupiny)',
                    'church': 'Je církev/Boží rodina?',
                    'churchType': 'Typ církve (dle většiny účastníků)',
                    'legacy': 'Sbor',
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
                    'place': 'Místo',
                    'date': 'Datum začátku (popř. konce)',
                    'threeThirds': 'Prvky 3/3 (1=Péče, 2=Oslava Ježíše, 3=Vykazatelnost, 4=Vize, 5=Bible, 6=Procvičování, 7=Cíle a modlitba)',
                    'active': 'Aktivní',
                    'note': 'Poznámka',
                    'initialName': 'Skupina',
                    'initialLeadersName': 'Vedoucí',
                    'initialPlace': 'Místo',
                    'initialDate': 'Datum',
                    'threeThirdsPastoralCare': 'Vzájmená péče',
                    'threeThirdsWorship': 'Oslava Ježíše',
                    'threeThirdsAccountability': 'Návrat / Vykazatelnost',
                    'threeThirdsVisionCasting': 'Vize',
                    'threeThirdsBibleTeaching': 'Bible',
                    'threeThirdsPractice': 'Procvičování',
                    'threeThirdsGoalSetting': 'Akční kroky a modlitba',
                }
            }
        }
    }
};

