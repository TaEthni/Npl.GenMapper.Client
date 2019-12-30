import { ControlType, TemplateConfiguration } from "../template.interface";
import { boxHeight } from "./template";

export const GenMapperEastConfiguration: TemplateConfiguration = {
    id: 'churchCirclesEast',
    icons: {
        attenders: 'templates/church-circles-east/icons/attenders.png',
        believers: 'templates/church-circles-east/icons/believers.png',
        baptism: 'templates/church-circles-east/icons/baptism.png',
        leaderwithhat: 'templates/church-circles-east/icons/leaderwithhat.png',
        leadernohat: 'templates/church-circles-east/icons/leadernohat.png',
        word: 'templates/church-circles-east/icons/element-word.png',
        pray: 'templates/church-circles-east/icons/pray.png',
        fellowship: 'templates/church-circles-east/icons/fellowship.png',
        arrow: 'templates/church-circles-east/icons/arrow.png',
        worship: 'templates/church-circles-east/icons/worship.png',
        cup: 'templates/church-circles-east/icons/cup.png',
        coin: 'templates/church-circles-east/icons/coin.png',
    },
    svgMap: [
        {
            svgRef: 'topIcon1',
            iconRef: 'attenders'
        },
        {
            svgRef: 'topIcon2',
            iconRef: 'believers'
        },
        {
            svgRef: 'topIcon3',
            iconRef: 'baptism'
        },
        {
            svgRef: 'topNumber1',
            state: [
                {
                    setText: true,
                    fieldRef: 'sum_of_attendees',
                }
            ]
        },
        {
            svgRef: 'topNumber2',
            state: [
                {
                    setText: true,
                    fieldRef: 'sum_of_believers',
                }
            ]
        },
        {
            svgRef: 'topNumber3',
            state: [
                {
                    setText: true,
                    fieldRef: 'sum_of_baptized',
                }
            ]
        },
        {
            svgRef: 'icon1',
            iconRef: 'leadernohat',
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'elementLeaders',
                    fieldRefValues: [
                        {
                            value: true,
                            styleValue: 1
                        },
                        {
                            value: false,
                            styleValue: 0
                        }
                    ]
                },
                {
                    attr: 'x',
                    fieldRef: 'inside_outside_leader',
                    fieldRefValues: [
                        {
                            value: '0',
                            attrValue: boxHeight / 2.1
                        }
                    ]
                },
                {
                    setIcon: true,
                    fieldRef: 'leader_has_teachingtraining',
                    fieldRefValues: [
                        {
                            value: true,
                            iconRef: 'leaderwithhat'
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'icon2',
            iconRef: 'word',
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'elementWord',
                    fieldRefValues: [
                        {
                            value: true,
                            styleValue: 1
                        },
                        {
                            value: false,
                            styleValue: 0
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'icon3',
            iconRef: 'pray',
            attributes: {
                'height': boxHeight / 6,
                'width': boxHeight / 6
            },
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'elementPrayer',
                    fieldRefValues: [
                        {
                            value: true,
                            styleValue: 1
                        },
                        {
                            value: false,
                            styleValue: 0
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'icon4',
            iconRef: 'baptism',
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'elementBaptism',
                    fieldRefValues: [
                        {
                            value: true,
                            styleValue: 1
                        },
                        {
                            value: false,
                            styleValue: 0
                        }
                    ]
                },
                {
                    attr: 'x',
                    fieldRef: 'inside_outside_baptism',
                    fieldRefValues: [
                        {
                            value: '0',
                            attrValue: boxHeight / 1.9
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'icon5',
            iconRef: 'fellowship',
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'elementFellowship',
                    fieldRefValues: [
                        {
                            value: true,
                            styleValue: 1
                        },
                        {
                            value: false,
                            styleValue: 0
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'icon6',
            iconRef: 'arrow',
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'elementMakeDisciples',
                    fieldRefValues: [
                        {
                            value: true,
                            styleValue: 1
                        },
                        {
                            value: false,
                            styleValue: 0
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'icon7',
            iconRef: 'worship',
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'elementWorship',
                    fieldRefValues: [
                        {
                            value: true,
                            styleValue: 1
                        },
                        {
                            value: false,
                            styleValue: 0
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'icon8',
            iconRef: 'cup',
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'elementLordsSupper',
                    fieldRefValues: [
                        {
                            value: true,
                            styleValue: 1
                        },
                        {
                            value: false,
                            styleValue: 0
                        }
                    ]
                },
                {
                    attr: 'x',
                    fieldRef: 'inside_outside_the_lords_supper',
                    fieldRefValues: [
                        {
                            value: '0',
                            attrValue: boxHeight / 2.1
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'icon9',
            iconRef: 'coin',
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'elementGive',
                    fieldRefValues: [
                        {
                            value: true,
                            styleValue: 1
                        },
                        {
                            value: false,
                            styleValue: 0
                        }
                    ]
                }
            ]
        },
    ],
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
            iconRef: 'leadernohat',
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
            iconRef: 'leaderwithhat'
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
            iconRef: 'word',
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
            iconRef: 'pray',
        },
        {
            id: 'elementBaptism',
            i18nRef: 'churchCircles.elementBaptism',
            i18nDescriptionValue: 'Believer\'s baptism is practiced in your group?',
            defaultValue: false,
            type: ControlType.checkbox,
            controlOrder: 7,
            canModify: true,
            iconRef: 'baptism'
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
            iconRef: 'fellowship',
        },
        {
            id: 'elementMakeDisciples',
            i18nRef: 'churchCircles.elementMakeDisciples',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'arrow',
        },
        {
            id: 'elementWorship',
            i18nRef: 'churchCircles.elementWorship',
            i18nDescriptionValue: 'Does the group regularly worship together?',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'worship',
        },
        {
            id: 'elementLordsSupper',
            i18nRef: 'churchCircles.elementLordsSupper',
            i18nDescriptionValue: 'Is the Lord\'s supper practiced in your group?',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'cup',
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
            iconRef: 'coin',
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
            options: [
                {
                    value: true,
                },
                {
                    value: false,
                }
            ],
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
}
