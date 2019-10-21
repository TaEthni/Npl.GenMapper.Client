import { GMTemplate } from '../template.interface';

const boxHeight = 80;
const textHeight = 14;
const textMargin = 6;

export const DisciplesTemplate: GMTemplate = {
    'version': '0.2',
    'title': 'Disciples',
    'name': 'disciples',
    'format': 'disciples',

    'settings': {
        'boxHeight': boxHeight,
        'nodeActions': {
            'x': boxHeight / 3,
            'y': 0
        },
        'nodeSize': {
            'width': boxHeight * 1,
            'height': boxHeight * 1.8
        }
    },
    'svg': {
        'big-rect': {
            'type': 'rect',
            'attributes': {
                'x': -boxHeight * 0.3,
                'y': 0,
                'width': (boxHeight * 0.6) + 32,
                'height': boxHeight * 1.05,
                'opacity': '0'
            }
        },
        'box': {
            'type': 'rect',
            'attributes': {
                'x': -boxHeight * 0.3,
                'y': 0,
                'width': boxHeight * 0.6,
                'height': boxHeight * 1.05
            }
        }
    },
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
            'canModify': false
        },
        {
            'header': 'name',
            'initialTranslationCode': 'name',
            'type': 'text',
            'canModify': true,
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': 0,
                    'y': -textMargin - textHeight
                }
            }
        },
        {
            'header': 'date',
            'initial': null,
            'type': 'text',
            'canModify': true,
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': 0,
                    'y': -4
                }
            }
        },
        {
            'header': 'believer',
            'initial': true,
            'type': 'checkbox',
            'canModify': true,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * -0.28,
                    'y': boxHeight * 0,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/disciples/icons/believer.png'
                }
            }
        },
        {
            'header': 'baptized',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * 0,
                    'y': boxHeight * 0,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/disciples/icons/baptism.png'
                }
            }
        },
        {
            'header': 'word',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * -0.28,
                    'y': boxHeight * 0.25,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/disciples/icons/word.png'
                }
            }
        },
        {
            'header': 'prayer',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * 0,
                    'y': boxHeight * 0.25,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/disciples/icons/prayer.png'
                }
            }
        },
        {
            'header': 'shares',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * -0.25,
                    'y': boxHeight * 0.5,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/disciples/icons/shares.png'
                }
            }
        },
        {
            'header': 'accountable',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * 0,
                    'y': boxHeight * 0.5,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/disciples/icons/accountable.png'
                }
            }
        },
        {
            'header': 'discipleship',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * -0.25,
                    'y': boxHeight * 0.75,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/disciples/icons/discipleship.png'
                }
            }
        },
        {
            'header': 'inChurch',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * 0,
                    'y': boxHeight * 0.75,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'templates/disciples/icons/in-church.png'
                }
            }
        },
        {
            'header': 'discipleType',
            'initial': 'individual',
            'type': 'radio',
            'canModify': true,
            'inheritsFrom': 'box',
            'values': [
                {
                    'header': 'individual',
                    'class': 'disciple-individual',
                    'attributes': {
                        'rx': 10
                    }
                },
                {
                    'header': 'facilitatesGroup',
                    'class': 'disciple-facilitates-group',
                    'attributes': {
                        'rx': 10
                    }
                },
                {
                    'header': 'facilitatesChurch',
                    'class': 'disciple-facilitates-church',
                    'attributes': {
                        'rx': 0
                    }
                }
            ]
        },
        {
            'header': 'timothy',
            'initial': false,
            'type': 'checkbox',
            'canModify': true,
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * -0.3,
                    'y': -4 - textHeight,
                    'width': boxHeight * 0.6,
                    'height': 2,
                    'xlink:href': 'templates/disciples/icons/redline.png'
                }
            }
        },
        {
            'header': 'active',
            'initial': true,
            'type': 'checkbox',
            'canModify': true,
            // svg defined currently in genmapper.js
        }
    ],
    'translations': {
        en: {
            translation: {
                'disciples': {
                    'helpLegend': '<p>This version of GenMapper is for mapping individual disciples, not groups/churches. Each rectangle represents a disciple.</p><p>Click on the disciple to edit.<br>Click on red (x) button to remove a disciple.<br>Click on green (+) button to add child disciple.</p>',
                    'name': 'Name',
                    'date': 'Date of start following Christ',
                    'believer': 'Is believer?',
                    'baptized': 'Is baptized?',
                    'word': 'Abides in Word',
                    'prayer': 'Abides in Prayer',
                    'shares': 'Shares Jesus',
                    'accountable': 'Is accountable',
                    'discipleship': 'Has discipleship',
                    'inChurch': "Part of God's family",
                    'timothy': 'Is Timothy (key disciple)?',
                    'discipleType': 'Disciple type',
                    'individual': 'Individual',
                    'facilitatesGroup': 'Facilitates Group',
                    'facilitatesChurch': 'Facilitates Church',
                    'active': 'Active'
                }
            }
        },
        cs: {
            translation: {
                'disciples': {
                    'helpLegend': '<p>Tato šablona GenMapperu je pro mapování jednotlivých učedníků, ne skupin/církví. Každý obdélník znázorňuje jednoho učedníka.<br><br>Klikni na učedníka pro editaci.<br>Klikni na červené tlačítko (x) pro odstranění učedníka.<br>Klikni na zelené tlačítko (+) pro přidání učedníka.</p>',
                    'name': 'Jméno',
                    'date': 'Datum uvěření',
                    'believer': 'Věřící',
                    'baptized': 'Pokřtěný',
                    'word': 'Zůstává v Božím Slovu',
                    'prayer': 'Pravidelně se modlí',
                    'shares': 'Sdílí Ježíše',
                    'accountable': 'Je vykazatelný',
                    'discipleship': 'Má učednictví',
                    'inChurch': 'Součástí Boží rodiny',
                    'timothy': 'Timoteus (klíčový učedník)',
                    'discipleType': 'Typ učedníka',
                    'individual': 'Jednotlivec',
                    'facilitatesGroup': 'Provází skupinu',
                    'facilitatesChurch': 'Provází Boží rodinu',
                    'active': 'Aktivní'
                }
            }
        }
    }
};
