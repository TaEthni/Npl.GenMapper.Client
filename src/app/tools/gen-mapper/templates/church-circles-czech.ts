const boxHeight = 80;
const textHeight = 14;
const textMargin = 6;

export function moveLeadersName(d: any): number {
    let c = 1;
    if (d.data.name) { c++; }
    return boxHeight + c * textHeight;
}


export function moveMentor(d: any): number {
    let c = 1;
    if (d.data.name) { c++; }
    if (d.data.leadersName) { c++; }
    return boxHeight + c * textHeight;
}

export function movePlace(d: any): number {
    let c = 1;
    if (d.data.name) { c++; }
    if (d.data.leadersName) { c++; }
    if (d.data.mentor) { c++; }
    return boxHeight + c * textHeight;
}

export function moveDate(d: any): number {
    let c = 1;
    if (d.data.name) { c++; }
    if (d.data.leadersName) { c++; }
    if (d.data.mentor) { c++; }
    if (d.data.place) { c++; }
    return boxHeight + c * textHeight;
}

export const ChurchCirclesCzechTemplate = {
    'version': '0.3',
    'title': 'Church Circles Czech',
    'name': 'church-circles-czech',
    'format': 'churchCirclesCzech',
    'translations': {
        en: {
            translation: {
                'churchCirclesCzech': {
                    'translationLabel': 'English',
                    'helpLegend': '<img src="assets/church-circles-czech/genmapper-node-example-church-circles-czech.png" style="float:right;margin:10px; margin-left:0px;" alt="legend"><h3>Legend</h3><p>Each circle represents a group / church. Dashed circle means group, full circle means church.<br>On the top the numbers describe: # total, # believers, # baptized, # newly baptized.<br>Inside the circle are the elements that are practiced in the group.<br>On the left there numbers 1 to 7 represent which elements of 3/3 process are practised:<br>1 - Personal care<br>2 - Worship<br>3 - Accountability<br>4 - Vision casting<br>5 - Bible study<br>6 - Practice<br>7 - Set goals and prayer</p><p>Click on the group to edit it.<br>Click on red (x) button to remove group.<br>Click on green (+) button to add child group.</p>',
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
                    'helpLegend': '<img src="assets/church-circles-czech/genmapper-node-example-church-circles-czech.png" style="float:right;margin:10px; margin-left:0px;" alt="legend"><h3>Legenda</h3><p>Každý kruh(čtverec) symbolizuje skupinu nebo Boží rodinu(církev). Přerušovaná čára značí skupinu, plná čára Boží rodinu.<br>Tvar značí typ církve:<br><ul><li>kruh - Boží rodina s většinou nových věřících</li><li>čtverec - Boží rodina s většinou existujících věřících</li><li>zelený čtverec - sbor</li></ul><br>Čísla nahoře značí: Počet účastníků / věřících / pokřtěných / nově pokřtěných.<br>Uvnitř kruhu jsou prvky, které skupina dělá.<br><br>Čísla vlevo od 1 do 7 značí prvky 3/3, která skupina dělá:<br>1 - vzájemná péče<br>2 - oslava Ježíše<br>3 - vykazatelnost<br>4 - sdílení vize<br>5 - studium Bible<br>6 - procvičování <br>7 - akční kroky a modlitba</p><p>Klikni na skupinu pro editaci.<br>Klikni na červené tlačítko (x) pro odstranění skupiny.<br>Klikni na zelené tlačítko (+) pro přidání dceřinné skupiny.</p>',
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
    },
    'settings': {
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
                'href': 'assets/church-circles-czech/icons/attenders.png'
            }
        },
        'believers-image': {
            'type': 'image',
            'attributes': {
                'x': -boxHeight * 0.25,
                'y': -2.5 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
                'href': 'assets/church-circles-czech/icons/believers.png'
            }
        },
        'baptized-image': {
            'type': 'image',
            'attributes': {
                'x': boxHeight * 0,
                'y': -2.5 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
                'href': 'assets/church-circles-czech/icons/baptism.png'
            }
        },
        'new-baptized-image': {
            'type': 'image',
            'attributes': {
                'x': boxHeight * 0.25,
                'y': -2.5 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
                'href': 'assets/church-circles-czech/icons/new-baptism.png'
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
    'fields': [
        {
            'header': 'id',
            'initial': 0,
            'type': null
        },
        {
            'header': 'parentId',
            'initial': null,
            'type': null
        },
        {
            'header': 'newGeneration',
            'initial': false,
            'type': 'checkbox'
        },
        {
            'header': 'active',
            'initial': true,
            'type': 'checkbox'
            // svg defined currently in genmapper.js
        },
        {
            'header': 'name',
            'initialTranslationCode': 'initialName',
            'type': 'text',
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': 0,
                    'y': boxHeight + textHeight
                }
            }
        },
        {
            'header': 'leadersName',
            'initialTranslationCode': 'initialLeadersName',
            'type': 'text',
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': 0,
                    'y': moveLeadersName
                }
            }
        },
        {
            'header': 'mentor',
            'initialTranslationCode': 'mentor',
            'type': 'text',
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': 0,
                    'y': moveMentor
                }
            }
        },
        {
            'header': 'place',
            'initialTranslationCode': 'initialPlace',
            'type': 'text',
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': 0,
                    'y': movePlace
                },
            }
        },
        {
            'header': 'location',
            'initial': '',
            'type': 'geoLocation'
        },
        {
            'header': 'placeId',
            'initial': '',
            'type': null
        },
        {
            'header': 'date',
            'initialTranslationCode': 'initialDate',
            'type': 'text',
            'svg': {
                'type': 'text',
                'attributes': {
                    'x': 0,
                    'y': moveDate
                }
            }
        },
        {
            'header': 'attenders',
            'initial': 0,
            'type': 'text',
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
            'svg': {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.4,
                    'y': boxHeight * 0.1,
                    'width': boxHeight / 4,
                    'height': boxHeight / 4,
                    'xlink:href': 'assets/church-circles-czech/icons/baptism.png'
                }
            }
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
                    'xlink:href': 'assets/church-circles-czech/icons/element-word.png'
                }
            }
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
                    'xlink:href': 'assets/church-circles-czech/icons/element-prayer.png'
                }
            }
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
                    'xlink:href': 'assets/church-circles-czech/icons/element-lords-supper.png'
                }
            }
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
                    'xlink:href': 'assets/church-circles-czech/icons/element-give.png'
                }
            }
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
                    'xlink:href': 'assets/church-circles-czech/icons/element-love.png'
                }
            }
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
                    'xlink:href': 'assets/church-circles-czech/icons/element-worship.png'
                }
            }
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
                    'xlink:href': 'assets/church-circles-czech/icons/element-leaders.png'
                }
            }
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
                    'xlink:href': 'assets/church-circles-czech/icons/element-make-disciples.png'
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
            'type': 'textarea'
        }
    ]
};

