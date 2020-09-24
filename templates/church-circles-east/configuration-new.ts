import { ControlType, TemplateConfiguration, ValueType } from "../template.interface";
import { boxHeight } from "./template";

export const ChurchCirclesEastConfiguration: TemplateConfiguration = {
    id: 'churchCirclesEast',
    icons: {
        attendersIcon: 'templates/church-circles-east/icons/attenders.png',
        believersIcon: 'templates/church-circles-east/icons/believers.png',
        baptismIcon: 'templates/church-circles-east/icons/baptism.png',
        leaderwithhatIcon: 'templates/church-circles-east/icons/leaderwithhat.png',
        leadernohatIcon: 'templates/church-circles-east/icons/leadernohat.png',
        wordIcon: 'templates/church-circles-east/icons/element-word.png',
        prayIcon: 'templates/church-circles-east/icons/pray.png',
        fellowshipIcon: 'templates/church-circles-east/icons/fellowship.png',
        arrowIcon: 'templates/church-circles-east/icons/arrow.png',
        worshipIcon: 'templates/church-circles-east/icons/worship.png',
        cupIcon: 'templates/church-circles-east/icons/cup.png',
        coinIcon: 'templates/church-circles-east/icons/coin.png',
    },
    fields: [
        {
            id: 'id',
            canModify: false
        },
        {
            id: 'nodeOrder',
            canModify: false,
        },
        {
            id: 'hasChildNodes',
            canModify: false,
        },
        {
            id: 'parentId',
            i18nRef: 'Common_Parent',
            type: ControlType.parentSelector,
            canModify: true,
        },
        {
            id: 'newGeneration',
            i18nRef: 'Common_NewGeneration',
            defaultValue: false,
            type: ControlType.checkbox,
            controlOrder: 1,
            canModify: true,
        },
        {
            id: 'active',
            i18nRef: 'Common_Active',
            defaultValue: true,
            type: ControlType.checkbox,
            controlOrder: 2,
            canModify: true,
            // svg defined currently in genmapper.js
        },
        {
            id: 'inactiveReason',
            i18nRef: 'churchCircles.inactiveReason',
            type: ControlType.textarea,
            controlOrder: 3,
            canModify: true,
            dependsOnFalseField: 'active',
        },
        {
            id: 'elementLeaders',
            i18nRef: 'Element_Leaders',
            i18nDescriptionValue: 'This group has an appointed leader?',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            controlOrder: 4,
            iconRef: 'leadernohatIcon',
        },
        {
            id: 'leader_has_teachingtraining',
            // i18nRef: 'churchCircles.inside_outside_leader',
            i18nRef: 'Trained Leader?',
            i18nDescriptionValue: 'Has the local leader received pastoral training that includes how to teach and preach?',
            dependsOnTrueField: 'elementLeaders',
            type: ControlType.checkbox,
            controlOrder: 5,
            canModify: true,
            iconRef: 'leaderwithhatIcon'
        },
        {
            id: 'leaderName',
            i18nRef: 'Common_LeaderName',
            i18nDescriptionValue: 'What is the name of the leader who came and established the group?',
            type: ControlType.text,
            controlOrder: 6,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 2,
            canModify: true,
            dependsOnTrueField: 'elementLeaders'
        },
        {
            id: 'inside_outside_leader',
            // i18nRef: 'churchCircles.inside_outside_leader',
            i18nValue: 'Where does the leader appointed come from?',
            dependsOnTrueField: 'elementLeaders',
            defaultValue: '0',
            canModify: true,
            type: ControlType.radio,
            controlOrder: 7,
            options: [
                {
                    value: '0',
                    i18nValue: 'From outside (different church)',
                },
                {
                    value: '1',
                    i18nValue: 'From inside the church'
                }
            ]
        },
        {
            id: 'elementWord',
            i18nRef: 'Element_Word',
            i18nDescriptionValue: 'An obedience based discipleship program has been taught in the group?',
            defaultValue: false,
            type: ControlType.checkbox,
            controlOrder: 8,
            canModify: true,
            iconRef: 'wordIcon',
            // svgElementIconRef: 'icon2',
            // iconUrl: 'templates/church-circles-east/icons/element-word.png',
        },
        {
            id: 'elementPrayer',
            i18nRef: 'Element_Prayer',
            i18nDescriptionValue: 'Does the group regularly pray together and encourage individual prayer?',
            defaultValue: false,
            type: ControlType.checkbox,
            controlOrder: 9,
            canModify: true,
            iconRef: 'prayIcon',
        },
        {
            id: 'elementBaptism',
            i18nRef: 'Element_Baptism',
            i18nDescriptionValue: 'Believer\'s baptism is practiced in your group?',
            defaultValue: false,
            type: ControlType.checkbox,
            controlOrder: 10,
            canModify: true,
            iconRef: 'baptismIcon'
        },
        {
            id: 'inside_outside_baptism',
            // i18nRef: 'churchCircles.inside_outside_baptism',
            i18nValue: 'Where does the leader who gives baptism come from?',
            dependsOnTrueField: 'elementBaptism',
            defaultValue: '0',
            canModify: true,
            type: ControlType.radio,
            controlOrder: 11,
            options: [
                {
                    value: '0',
                    i18nValue: 'From outside (different church)',
                },
                {
                    value: '1',
                    i18nValue: 'From inside the church'
                }
            ]
        },
        {
            id: 'elementLove',
            i18nRef: 'Element_Love',
            i18nDescriptionValue: 'Does the group love, encourage, and minister to each other?',
            defaultValue: false,
            type: ControlType.checkbox,
            controlOrder: 12,
            canModify: true,
            iconRef: 'fellowshipIcon',
        },
        {
            id: 'elementMakeDisciples',
            i18nRef: 'Element_MakeDisciples',
            defaultValue: false,
            type: ControlType.checkbox,
            controlOrder: 13,
            canModify: true,
            iconRef: 'arrowIcon',
        },
        {
            id: 'elementWorship',
            i18nRef: 'Element_Worship',
            i18nDescriptionValue: 'Does the group regularly worship together?',
            defaultValue: false,
            type: ControlType.checkbox,
            controlOrder: 14,
            canModify: true,
            iconRef: 'worshipIcon',
        },
        {
            id: 'elementLordsSupper',
            i18nRef: 'Element_LordsSupper',
            i18nDescriptionValue: 'Is the Lord\'s supper practiced in your group?',
            defaultValue: false,
            type: ControlType.checkbox,
            controlOrder: 15,
            canModify: true,
            iconRef: 'cupIcon',
        },
        {
            id: 'inside_outside_the_lords_supper',
            // i18nRef: 'churchCircles.inside_outside_the_lords_supper',
            i18nValue: 'Where does the leader who gives the Lord\'s Supper come from?',
            dependsOnTrueField: 'elementLordsSupper',
            defaultValue: '0',
            canModify: true,
            type: ControlType.radio,
            controlOrder: 16,
            options: [
                {
                    value: '0',
                    i18nValue: 'From outside (different church)',
                },
                {
                    value: '1',
                    i18nValue: 'From inside the church'
                }
            ]
        },
        {
            id: 'elementGive',
            i18nRef: 'Element_Give',
            i18nDescriptionValue: 'The group is collecting and offering',
            defaultValue: false,
            type: ControlType.checkbox,
            controlOrder: 18,
            canModify: true,
            iconRef: 'coinIcon',
        },
        {
            id: 'church',
            i18nRef: 'Common_IsChurch',
            i18nDescriptionValue: 'The group self identifies as a church?',
            defaultValue: false,
            type: ControlType.checkbox,
            controlOrder: 19,
            valueType: ValueType.boolean,
            canModify: true,
        },
        {
            id: 'admin0nm',
            // i18nRef: "churchCirclesWorld.country",
            i18nValue: 'Choose your country.',
            type: ControlType.countrySelector,
            controlOrder: 20,
            valueType: ValueType.string,
            canModify: true,
        },
        {
            id: 'peoples',
            i18nRef: 'Common_People',
            type: ControlType.peopleSelector,
            useValueFromFieldId: 'attenders',
            controlOrder: 21,
            canModify: false,
            iconRef: 'attendersIcon',
            fields: [
                {
                    id: 'attenders',
                    i18nRef: 'Common_NumberOfAttendees',
                    defaultValue: 0,
                    type: ControlType.number,
                    valueType: ValueType.number,
                    canModify: true,
                    iconRef: 'attendersIcon',
                },
                {
                    id: 'believers',
                    i18nRef: 'Common_NumberOfBelievers',
                    defaultValue: 0,
                    type: ControlType.number,
                    valueType: ValueType.number,
                    canModify: true,
                    iconRef: 'believersIcon',
                    validation: {
                        maxFieldRef: 'attenders',
                    }
                },
                {
                    id: 'baptized',
                    i18nRef: 'Common_NumberOfBaptized',
                    defaultValue: 0,
                    type: ControlType.number,
                    valueType: ValueType.number,
                    canModify: true,
                    iconRef: 'baptismIcon',
                    validation: {
                        maxFieldRef: 'believers',
                    }
                }
            ]
        },
        {
            id: 'name',
            i18nRef: 'Common_GroupName',
            type: ControlType.text,
            controlOrder: 22,
            valueType: ValueType.string,
            canModify: true,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 1,
        },
        {
            id: 'email',
            i18nRef: 'Common_Email',
            type: ControlType.text,
            controlOrder: 23,
            valueType: ValueType.string,
            isNodeSvgLabel: false,
            nodeSvgLabelOrder: 3,
            canModify: true,
        },
        {
            id: 'startDate',
            i18nRef: 'Common_StartDate',
            type: ControlType.date,
            controlOrder: 24,
            valueType: ValueType.date,
            canModify: true,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 3,
        },
        {
            id: 'location',
            i18nRef: 'Common_GeoLocation',
            type: ControlType.geoLocation,
            controlOrder: 25,
            valueType: ValueType.string,
            canModify: true,
        },
        {
            id: 'latitude',
            canModify: false,
            parseValueAsInt: true,
        },
        {
            id: 'longitude',
            canModify: false,
            parseValueAsInt: true,
        },
        {
            id: 'how_collected',
            i18nValue: 'How as the data for the form collected',
            type: ControlType.select,
            controlOrder: 26,
            valueType: ValueType.enum,
            canModify: true,
            nullable: true,
            options: [
                {
                    value: '1',
                    i18nValue: 'On site visit',
                },
                {
                    value: '2',
                    i18nValue: 'Leader interview',
                },
                {
                    value: '3',
                    i18nValue: 'Paper Form',
                },
                {
                    value: 'other',
                    i18nValue: 'Other',
                    isOther: true
                }
            ]
        },
        {
            id: 'how_collected_other',
            i18nValue: 'Specify other.',
            type: ControlType.text,
            controlOrder: 27,
            valueType: ValueType.string,
            canModify: true,
            dependsOnFieldId: 'how_collected',
            dependsOnFieldValue: 'other',
        },
        {
            id: 'attenders',
            i18nRef: 'Common_NumberOfAttendees',
            parseValueAsFloat: true,
            defaultValue: 0,
            // type: ControlType.peopleSelector,
            valueType: ValueType.number,
            canModify: false,
            iconRef: 'attendersIcon',
        },
        {
            id: 'believers',
            i18nRef: 'Common_NumberOfBelievers',
            parseValueAsFloat: true,
            defaultValue: 0,
            // type: ControlType.number,
            valueType: ValueType.number,
            canModify: false,
            iconRef: 'believersIcon',
        },
        {
            id: 'baptized',
            i18nRef: 'Common_NumberOfBaptized',
            parseValueAsFloat: true,
            defaultValue: 0,
            // type: ControlType.number,
            valueType: ValueType.number,
            canModify: false,
            iconRef: 'baptismIcon'
        },
        {
            id: 'note',
            i18nRef: 'Common_Note',
            type: ControlType.textarea,
            valueType: ValueType.string,
            controlOrder: 27,
            canModify: true,
        }
    ],
    svgStates: [
        {
            selector: 'church-box',
            states: [
                {
                    fieldRefId: 'church',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            'stroke-dasharray': '0',
                            'stroke': 'black',
                            'stroke-width': 2,
                        }
                    }
                },
                {
                    fieldRefId: 'church',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'stroke-dasharray': '7,7',
                            'stroke': '#e4d339',
                            'stroke-width': 4,
                        }
                    }
                },
                {
                    fieldRefId: 'active',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'stroke-opacity': 0.2,
                            'fill': 'lightgray'
                        }
                    }
                },
                {
                    fieldRefId: 'active',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            'stroke-opacity': 1,
                            'fill': 'white'
                        }
                    }
                }
            ]
        },
        {
            selector: 'topIcon1',
            iconRef: 'attendersIcon',
            tooltipFieldRef: 'attenders',
            states: [
                {
                    fieldRefId: 'active',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.4
                        }
                    }
                }
            ]
        },
        {
            selector: 'topIcon2',
            iconRef: 'believersIcon',
            tooltipFieldRef: 'believers',
            states: [
                {
                    fieldRefId: 'active',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.4
                        }
                    }
                }
            ]
        },
        {
            selector: 'topIcon3',
            iconRef: 'baptismIcon',
            tooltipFieldRef: 'baptized',
            states: [
                {
                    fieldRefId: 'active',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.4
                        }
                    }
                }
            ]
        },
        {
            selector: 'topNumber1',
            states: [
                {
                    fieldRefId: 'attenders',
                    setText: true
                }
            ]
        },
        {
            selector: 'topNumber2',
            states: [
                {
                    fieldRefId: 'believers',
                    setText: true
                }
            ]
        },
        {
            selector: 'topNumber3',
            states: [
                {
                    fieldRefId: 'baptized',
                    setText: true
                }
            ]
        },
        {
            selector: 'icon1',
            iconRef: 'leadernohatIcon',
            states: [
                {
                    fieldRefId: 'elementLeaders',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            'opacity': 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementLeaders',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'opacity': 0
                        }
                    }
                },
                {
                    fieldRefId: 'inside_outside_leader',
                    fieldRefValue: '0',
                    svg: {
                        attributes: {
                            'x': boxHeight / 2.1
                        }
                    }
                },
                {
                    fieldRefId: 'leader_has_teachingtraining',
                    fieldRefValue: true,
                    setIcon: true,
                    iconRef: 'leaderwithhatIcon'
                }
            ]
        },
        {
            selector: 'icon2',
            iconRef: 'wordIcon',
            states: [
                {
                    fieldRefId: 'elementWord',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            'opacity': 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementWord',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'opacity': 0
                        }
                    }
                }
            ]
        },
        {
            selector: 'icon3',
            iconRef: 'prayIcon',
            attributes: {
                'height': boxHeight / 6,
                'width': boxHeight / 6
            },
            states: [
                {
                    fieldRefId: 'elementPrayer',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            'opacity': 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementPrayer',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'opacity': 0
                        }
                    }
                }
            ]
        },
        {
            selector: 'icon4',
            iconRef: 'baptismIcon',
            states: [
                {
                    fieldRefId: 'elementBaptism',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            'opacity': 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementBaptism',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'opacity': 0
                        }
                    }
                },
                {
                    fieldRefId: 'inside_outside_baptism',
                    fieldRefValue: '0',
                    svg: {
                        attributes: {
                            'x': boxHeight / 1.9
                        }
                    }
                }
            ]
        },
        {
            selector: 'icon5',
            iconRef: 'fellowshipIcon',
            states: [
                {
                    fieldRefId: 'elementLove',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            'opacity': 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementLove',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'opacity': 0
                        }
                    }
                },
            ]
        },
        {
            selector: 'icon6',
            iconRef: 'arrowIcon',
            states: [
                {
                    fieldRefId: 'elementMakeDisciples',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            'opacity': 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementMakeDisciples',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'opacity': 0
                        }
                    }
                },
            ]
        },
        {
            selector: 'icon7',
            iconRef: 'worshipIcon',
            states: [
                {
                    fieldRefId: 'elementWorship',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            'opacity': 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementWorship',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'opacity': 0
                        }
                    }
                },
            ]
        },
        {
            selector: 'icon8',
            iconRef: 'cupIcon',
            states: [
                {
                    fieldRefId: 'elementLordsSupper',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            'opacity': 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementLordsSupper',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'opacity': 0
                        }
                    }
                },
                {
                    fieldRefId: 'inside_outside_the_lords_supper',
                    fieldRefValue: '0',
                    svg: {
                        attributes: {
                            'x': boxHeight / 2.1
                        }
                    }
                }
            ]
        },
        {
            selector: 'icon9',
            iconRef: 'coinIcon',
            states: [
                {
                    fieldRefId: 'elementGive',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            'opacity': 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementGive',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'opacity': 0
                        }
                    }
                }
            ]
        },
    ]
}
