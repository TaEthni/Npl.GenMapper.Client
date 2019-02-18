const boxHeight = 100;
const textHeight = 14;
const textMargin = 6;

export function moveLeaderName(d: any): number {
    let c = 1;
    if (d.data.name) { c++; }
    return boxHeight + c * textHeight;
}

export function movePlace(d: any): number {
    let c = 1;
    if (d.data.name) { c++; }
    if (d.data.leaderName) { c++; }
    return boxHeight + c * textHeight;
}

export function moveDate(d: any): number {
    let c = 1;
    if (d.data.name) { c++; }
    if (d.data.leaderName) { c++; }
    if (d.data.place) { c++; }
    return boxHeight + c * textHeight;
}

export const ChurchCirclesTemplate = {
    'version': '0.6',
    'title': 'Church Circles',
    'name': 'church-circles',
    'format': 'churchCircles',
    'settings': {
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
    'svg': {
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
                'xlink:href': 'assets/church-circles/icons/attenders.png'
            }
        },
        'believers-image': {
            'type': 'image',
            'attributes': {
                'x': -boxHeight * 0.25,
                'y': -2.8 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
                'xlink:href': 'assets/church-circles/icons/believers.png'
            }
        },
        'baptized-image': {
            'type': 'image',
            'attributes': {
                'x': boxHeight * 0.1,
                'y': -2.8 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
                'xlink:href': 'assets/church-circles/icons/element-baptism.png'
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
    'reports': [
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
    'templateReports': [
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
            isLabel: true,
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
    'fields': [
        {
            'header': 'id',
            'initial': 0,
            'type': null
        },
        {
            'header': 'parentId',
            'initial': null,
            'type': null,
            'canModifyLabel': false,
        },
        {
            'header': 'newGeneration',
            'initial': false,
            'type': 'checkbox',
            'canModifyLabel': true,
            'order': 1,
        },
        {
            'header': 'active',
            'initial': true,
            'type': 'checkbox',
            'canModifyLabel': true,
            'order': 2,
            // svg defined currently in genmapper.js
        },
        {
            'header': 'inactiveReason',
            'initial': '',
            'type': 'textarea',
            'dependsOnFalseField': 'active',
            'canModifyLabel': true,
            'canModifyVisibility': true,
            'order': 3,
        },
        {
            'header': 'name',
            'initial': '',
            'type': 'text',
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': 0,
                    'y': boxHeight + textHeight
                }
            },
            'canModifyLabel': true,
            'canModifyVisibility': false,
            'order': 4,
        },
        // {
        //     'header': 'startDate',
        //     'type': 'date',
        //     'canModifyLabel': true,
        //     'canModifyVisibility': false,
        //     'order': 5,
        // },
        {
            'header': 'location',
            'initial': '',
            'type': 'geoLocation',
            'canModifyLabel': true,
            'canModifyVisibility': true,
        },
        {
            'header': 'latitude',
            'initial': null,
            'type': 'hidden'
        },
        {
            'header': 'longitude',
            'initial': null,
            'type': 'hidden'
        },
        {
            'header': 'placeId',
            'initial': '',
            'type': 'hidden'
        },
        {
            'header': 'peopleGroups',
            'initial': null,
            'type': 'peidSelect',
            'canModifyLabel': true,
            'canModifyVisibility': true,
        },
        {
            'header': 'peopleGroupsNames',
            'initial': null,
            'type': 'hidden',
            'canModifyLabel': false,
            'canModifyVisibility': false,
        },
        {
            'header': 'attenders',
            'initial': 0,
            'type': 'text',
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': -boxHeight * 0.39,
                    'y': -0.8 * textMargin
                },
                'style': {
                    'text-anchor': 'center'
                }
            },
            'canModifyLabel': true,
            'canModifyVisibility': false,
        },
        {
            'header': 'believers',
            'initial': 0,
            'type': 'text',
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': -boxHeight * 0.13,
                    'y': -0.8 * textMargin
                },
                'style': {
                    'text-anchor': 'center'
                }
            },
            'canModifyLabel': true,
            'canModifyVisibility': false,
        },
        {
            'header': 'baptized',
            'initial': 0,
            'type': 'text',
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': boxHeight * 0.13,
                    'y': -0.8 * textMargin
                },
                'style': {
                    'text-anchor': 'center'
                }
            },
            'canModifyLabel': true,
            'canModifyVisibility': false,
        },
        {
            'header': 'newlyBaptized',
            'initial': 0,
            'type': 'text',
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': boxHeight * 0.39,
                    'y': -0.8 * textMargin
                },
                'style': {
                    'text-anchor': 'center'
                }
            },
            'canModifyLabel': true,
            'canModifyVisibility': false,
        },
        {
            'header': 'church',
            'initial': false,
            'type': 'checkbox',
            'inheritsFrom': 'church-box',
            'class': {
                'checkedTrue': 'is-church',
                'checkedFalse': 'is-not-church'
            },
            'canModifyLabel': true,
            'canModifyVisibility': false,
        },
        {
            'header': 'churchType',
            'initial': 'newBelievers',
            'type': 'radio',
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
            ],
            'canModifyLabel': true,
            'canModifyVisibility': false,
        },
        {
            'header': 'elementBaptism',
            'initial': false,
            'type': 'checkbox',
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.4,
                    'y': boxHeight * 0.1,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'assets/church-circles/icons/element-baptism.png'
                }
            },
            'canModifyLabel': true,
            'canModifyVisibility': false,
        },
        {
            'header': 'elementWord',
            'initial': false,
            'type': 'checkbox',
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.125,
                    'y': boxHeight * 0.1,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'assets/church-circles/icons/element-word.png'
                }
            },
            'canModifyLabel': true,
            'canModifyVisibility': false,
        },
        {
            'header': 'elementPrayer',
            'initial': false,
            'type': 'checkbox',
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * 0.15,
                    'y': boxHeight * 0.1,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'assets/church-circles/icons/element-prayer.png'
                }
            },
            'canModifyLabel': true,
            'canModifyVisibility': false,
        },
        {
            'header': 'elementLordsSupper',
            'initial': false,
            'type': 'checkbox',
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.4,
                    'y': boxHeight * 0.375,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'assets/church-circles/icons/element-lords-supper.png'
                }
            },
            'canModifyLabel': true,
            'canModifyVisibility': false,
        },
        {
            'header': 'elementGive',
            'initial': false,
            'type': 'checkbox',
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.125,
                    'y': boxHeight * 0.375,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'assets/church-circles/icons/element-give.png'
                }
            },
            'canModifyLabel': true,
            'canModifyVisibility': false,
        },
        {
            'header': 'elementLove',
            'initial': false,
            'type': 'checkbox',
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * 0.15,
                    'y': boxHeight * 0.375,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'assets/church-circles/icons/element-love.png'
                }
            },
            'canModifyLabel': true,
            'canModifyVisibility': false,
        },
        {
            'header': 'elementWorship',
            'initial': false,
            'type': 'checkbox',
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.4,
                    'y': boxHeight * 0.65,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'assets/church-circles/icons/element-worship.png'
                }
            },
            'canModifyLabel': true,
            'canModifyVisibility': false,
        },
        {
            'header': 'elementLeaders',
            'initial': false,
            'type': 'checkbox',
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.125,
                    'y': boxHeight * 0.65,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'assets/church-circles/icons/element-leaders.png'
                }
            },
            'canModifyLabel': true,
            'canModifyVisibility': false,
        },
        {
            'header': 'elementMakeDisciples',
            'initial': false,
            'type': 'checkbox',
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * 0.15,
                    'y': boxHeight * 0.65,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'assets/church-circles/icons/element-make-disciples.png'
                }
            },
            'canModifyLabel': true,
            'canModifyVisibility': false,
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
            },
            'canModifyLabel': true,
            'canModifyVisibility': false,
        }
    ],
    'translations': {
        en: {
            translation: {
                'churchCircles': {
                    'translationLabel': 'English',
                    // tslint:disable-next-line:max-line-length
                    'helpLegend': '<img src="assets/church-circles/genmapper-node-example-church-circles.png" style="float:right;margin:10px; margin-left:0px;" alt="legend"><h3>Legend</h3><p>Each circle represents a group / church. Dashed circle means group, full circle means church.<br>On the top the numbers describe: # total, # believers, # baptized<br>Inside the circle are the elements that are practiced in the group.<br>On the left there numbers 1 to 7 represent which elements of 3/3 process are practised:<br>1 - Personal care<br>2 - Worship<br>3 - Accountability<br>4 - Vision casting<br>5 - Bible study<br>6 - Practice<br>7 - Set goals and prayer</p><p>Click on the group to edit it.<br>Click on red (x) button to remove group.<br>Click on green (+) button to add child group.</p>',
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
                }
            }
        },
        de: {
            translation: {
                'churchCircles': {
                    'translationLabel': 'Deutsch',
                    'name': 'Name der Kirche',
                    'leaderName': 'Leiter',
                    'peopleGroups': 'Sprache / Subkultur',
                    'attenders': 'Anzahl Teilnehmer',
                    'believers': 'Anzahl Gläubige',
                    'baptized': 'Anzahl Getaufte',
                    'newlyBaptized': 'Anzahl frisch Getaufte (seit Gemeindestart)',
                    'church': 'Ist Gemeinde?',
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
                }
            }
        },
        es: {
            translation: {
                'churchCircles': {
                    'translationLabel': 'Español',
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
                }
            }
        },
        cs: {
            translation: {
                'churchCircles': {
                    'translationLabel': 'Čeština',
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
                }
            }
        }
    }
};
