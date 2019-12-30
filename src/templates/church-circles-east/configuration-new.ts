import { ControlType, TemplateConfiguration } from "../template.interface";
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
            id: 'nodeOrder',
            canModify: false,
        },
        {
            id: 'hasChildNodes',
            canModify: false,
        },
        {
            id: 'id',
            canModify: false
        },
        {
            id: 'parentId',
            i18nRef: 'churchCircles.parent',
            type: ControlType.parentSelector,
            canModify: true,
        },
        {
            id: 'admin0nm',
            // i18nRef: "churchCirclesWorld.country",
            i18nValue: 'Choose your country.',
            type: ControlType.select,
            canModify: true,
        },
        {
            id: 'admin1nm',
            // i18nRef: "churchCirclesWorld.country",
            i18nValue: 'Province, State, or Atoll',
            type: ControlType.text,
            canModify: true,
        },
        {
            id: 'newGeneration',
            i18nRef: 'churchCircles.newGeneration',
            defaultValue: false,
            type: ControlType.checkbox,
            controlOrder: 1,
            canModify: true,
        },
        {
            id: 'active',
            i18nRef: 'churchCircles.active',
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
            i18nRef: 'churchCircles.elementLeaders',
            i18nDescriptionValue: 'This group has an appointed leader?',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            controlOrder: 4,
            iconRef: 'leadernohatIcon',
            // svgElementIconRef: 'icon1',
            // iconUrl: 'templates/church-circles-east/icons/leadernohat.png',
        },
        {
            id: 'leader_has_teachingtraining',
            // i18nRef: 'churchCircles.inside_outside_leader',
            i18nValue: 'Trained Leader?',
            i18nDescriptionValue: 'Has the local leader received pastoral training that includes how to teach and preach?',
            dependsOnTrueField: 'elementLeaders',
            type: ControlType.checkbox,
            controlOrder: 4,
            canModify: true,
            iconRef: 'leaderwithhatIcon'
        },
        {
            id: 'leaderName',
            i18nRef: 'churchCircles.leaderName',
            type: ControlType.text,
            controlOrder: 4,
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
            defaultValue: '1',
            canModify: true,
            type: ControlType.radio,
            controlOrder: 4,
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
            i18nRef: 'churchCircles.elementWord',
            i18nDescriptionValue: 'An obedience based discipleship program has been taught in the group?',
            defaultValue: false,
            type: ControlType.checkbox,
            controlOrder: 5,
            canModify: true,
            iconRef: 'wordIcon',
            // svgElementIconRef: 'icon2',
            // iconUrl: 'templates/church-circles-east/icons/element-word.png',
        },
        {
            id: 'elementPrayer',
            i18nRef: 'churchCircles.elementPrayer',
            i18nDescriptionValue: 'Does the group regularly pray together and encourage individual prayer?',
            defaultValue: false,
            type: ControlType.checkbox,
            controlOrder: 6,
            canModify: true,
            iconRef: 'prayIcon',
        },
        {
            id: 'elementBaptism',
            i18nRef: 'churchCircles.elementBaptism',
            i18nDescriptionValue: 'Believer\'s baptism is practiced in your group?',
            defaultValue: false,
            type: ControlType.checkbox,
            controlOrder: 7,
            canModify: true,
            iconRef: 'baptismIcon'
        },
        {
            id: 'inside_outside_baptism',
            // i18nRef: 'churchCircles.inside_outside_baptism',
            i18nValue: 'Where does the leader who gives baptism come from?',
            dependsOnTrueField: 'elementBaptism',
            canModify: true,
            type: ControlType.radio,
            controlOrder: 8,
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
            id: 'elementFellowship',
            i18nRef: 'churchCircles.elementLove',
            i18nDescriptionValue: 'Does the group love, encourage, and minister to each other?',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'fellowshipIcon',
        },
        {
            id: 'elementMakeDisciples',
            i18nRef: 'churchCircles.elementMakeDisciples',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'arrowIcon',
        },
        {
            id: 'elementWorship',
            i18nRef: 'churchCircles.elementWorship',
            i18nDescriptionValue: 'Does the group regularly worship together?',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'worshipIcon',
        },
        {
            id: 'elementLordsSupper',
            i18nRef: 'churchCircles.elementLordsSupper',
            i18nDescriptionValue: 'Is the Lord\'s supper practiced in your group?',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'cupIcon',
        },
        {
            id: 'inside_outside_the_lords_supper',
            // i18nRef: 'churchCircles.inside_outside_the_lords_supper',
            i18nValue: 'Where does the leader who gives the Lord\'s Supper come from?',
            dependsOnTrueField: 'elementLordsSupper',
            canModify: true,
            type: ControlType.radio,
            controlOrder: 4,
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
            i18nRef: 'churchCircles.elementGive',
            i18nDescriptionValue: 'The group is collecting and offering',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'coinIcon',
        },
        {
            id: 'name',
            i18nRef: 'churchCircles.name',
            type: ControlType.text,
            controlOrder: 4,
            canModify: true,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 1,
        },
        {
            id: 'email',
            i18nRef: 'churchCircles.email',
            type: ControlType.text,
            controlOrder: 6,
            isNodeSvgLabel: false,
            nodeSvgLabelOrder: 3,
            canModify: true,
        },
        {
            id: 'startDate',
            i18nRef: 'churchCircles.date',
            type: ControlType.date,
            controlOrder: 7,
            canModify: true,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 3,
        },
        {
            id: 'startedbyanother',
            // i18nRef: 'ChurchCircles.startedbyanother',
            i18nValue: 'Started By Another',
            type: ControlType.text,
            canModify: true,
            nullable: true,
        },
        {
            id: 'nameofmotherchurch',
            // i18nRef: 'ChurchCircles.nameofmotherchurch',
            i18nValue: 'What is the name of the group that started this group?',
            type: ControlType.text,
            canModify: true,
            nullable: true,
        },
        {
            id: 'nameofstartingleader',
            // i18nRef: 'ChurchCircles.nameofstartingleader',
            i18nValue: 'What is the name of the leader who came and established the group',
            type: ControlType.text,
            canModify: true,
            nullable: true,
        },
        {
            id: 'place',
            i18nRef: 'churchCircles.place',
            type: ControlType.text,
            controlOrder: 9,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 4,
            deprecated: true,
            canModify: true,
        },
        {
            id: 'location',
            i18nRef: 'churchCircles.location',
            type: ControlType.geoLocation,
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
            id: 'placeId',
            canModify: false,
        },
        {
            id: 'church',
            i18nRef: 'churchCircles.isChurch',
            i18nDescriptionValue: 'The group self identifies as a church?',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
        },
        {
            id: 'how_collected',
            i18nValue: 'How as the data for the form collected',
            type: ControlType.select,
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
            canModify: true,
            dependsOnFieldId: 'how_collected',
            dependsOnFieldValue: 'other',
        },
        {
            id: 'majority_peoplegroup',
            i18nValue: 'Whats is the majority people group of this group?',
            type: ControlType.text,
            canModify: true,
        },
        {
            id: 'peoplegroup_label',
            canModify: false,
        },
        {
            id: 'nameothermajoritypeoplegroup',
            i18nValue: 'Please name the majority people group that is not in the list',
            canModify: true,
            dependsOnFieldId: 'majority_peoplegroup',
            dependsOnFieldValue: 'other'
        },
        {
            id: 'majoritypg_attendee_count',
            i18nValue: 'How many attend this group from this people group?',
            type: ControlType.number,
            defaultValue: 0,
            canModify: true,
        },
        {
            id: 'majoritypg_believer_count',
            i18nValue: 'How many from this people group are believers?',
            type: ControlType.number,
            defaultValue: 0,
            canModify: true,
        },
        {
            id: 'majoritypg_baptized_count',
            i18nValue: 'How many from this people group have been baptized?',
            type: ControlType.number,
            defaultValue: 0,
            canModify: true,
        },
        {
            id: 'sum_of_attendees',
            canModify: false,
            sumOfFields: ['majoritypg_attendee_count']
        },
        {
            id: 'sum_of_believers',
            canModify: false,
            sumOfFields: ['majoritypg_believer_count']
        },
        {
            id: 'sum_of_baptized',
            canModify: false,
            sumOfFields: ['majoritypg_baptized_count']
        }
    ],
    svgStates: [
        {
            selector: 'topIcon1',
            iconRef: 'attendersIcon'
        },
        {
            selector: 'topIcon2',
            iconRef: 'believersIcon'
        },
        {
            selector: 'topIcon3',
            iconRef: 'baptismIcon'
        },
        {
            selector: 'topNumber1',
            states: [
                {
                    setText: true,
                    fieldRef: 'sum_of_attendees',
                }
            ]
        },
        {
            selector: 'topNumber2',
            states: [
                {
                    setText: true,
                    fieldRef: 'sum_of_believers',
                }
            ]
        },
        {
            selector: 'topNumber3',
            states: [
                {
                    setText: true,
                    fieldRef: 'sum_of_baptized',
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
                    fieldRefId: 'elementFellowship',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            'opacity': 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementFellowship',
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
            iconRef: 'cup',
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
