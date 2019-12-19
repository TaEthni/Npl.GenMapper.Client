import { ControlType, TemplateConfiguration } from '../template.interface';

export const ChurchCirclesConfiguration: TemplateConfiguration = {
    id: 'churchCircles',
    icons: {
        attenders: 'templates/church-circles/icons/attenders.png',
        believers: 'templates/church-circles/icons/believers.png',
        baptism: 'templates/church-circles/icons/element-baptism.png',
        elementBaptism: 'templates/church-circles/icons/element-baptism.png',
        elementPrayer: 'templates/church-circles/icons/element-prayer.png',
        elementMakeDisciples: 'templates/church-circles/icons/element-make-disciples.png',
        elementLove: 'templates/church-circles/icons/element-love.png',
        elementWorship: 'templates/church-circles/icons/element-worship.png',
        elementLordsSupper: 'templates/church-circles/icons/element-lords-supper.png',
        elementGive: 'templates/church-circles/icons/element-give.png',
        elementWord: 'templates/church-circles/icons/element-word.png',
        elementLeaders: 'templates/church-circles/icons/element-leaders.png',
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
            id: 'elementBaptism',
            i18nRef: 'churchCircles.elementBaptism',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementBaptism'
        },
        {
            id: 'elementPrayer',
            i18nRef: 'churchCircles.elementPrayer',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementPrayer',
        },
        {
            id: 'elementMakeDisciples',
            i18nRef: 'churchCircles.elementMakeDisciples',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementMakeDisciples'
        },
        {
            id: 'elementLove',
            i18nRef: 'churchCircles.elementLove',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementLove',
        },
        {
            id: 'elementWorship',
            i18nRef: 'churchCircles.elementWorship',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementWorship',
        },
        {
            id: 'elementLordsSupper',
            i18nRef: 'churchCircles.elementLordsSupper',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementLordsSupper',
        },
        {
            id: 'elementGive',
            i18nRef: 'churchCircles.elementGive',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementGive',
        },
        {
            id: 'elementWord',
            i18nRef: 'churchCircles.elementWord',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementWord',
        },
        {
            id: 'elementLeaders',
            i18nRef: 'churchCircles.elementLeaders',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementLeaders',
        },
        {
            id: 'attenders',
            i18nRef: 'churchCircles.attenders',
            defaultValue: 0,
            type: ControlType.number,
            canModify: true,
            iconRef: 'attenders',
        },
        {
            id: 'believers',
            i18nRef: 'churchCircles.believers',
            defaultValue: 0,
            type: ControlType.number,
            canModify: true,
            iconRef: 'believers',
        },
        {
            id: 'baptized',
            i18nRef: 'churchCircles.baptized',
            defaultValue: 0,
            type: ControlType.number,
            canModify: true,
            iconRef: 'elementBaptism'
        },
        {
            id: 'newlyBaptized',
            i18nRef: 'churchCircles.newlyBaptized',
            defaultValue: 0,
            type: ControlType.number,
            canModify: true,
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
            id: 'leaderName',
            i18nRef: 'churchCircles.leaderName',
            type: ControlType.text,
            controlOrder: 5,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 2,
            canModify: true,
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
            id: 'date',
            i18nRef: 'churchCircles.date',
            canModify: false,
            type: ControlType.none,
            deprecated: true,
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
            parseValueAsFloat: true,
        },
        {
            id: 'longitude',
            canModify: false,
            parseValueAsFloat: true,
        },
        {
            id: 'placeId',
            canModify: false,
        },
        {
            id: 'gospelShares',
            i18nRef: 'churchCircles.gospelShares',
            defaultValue: 0,
            type: ControlType.number,
            canModify: true,
        },
        {
            id: 'church',
            i18nRef: 'churchCircles.isChurch',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            options: [
                {
                    value: true,
                    svgRefClass: 'is-church',
                },
                {
                    value: false,
                    svgRefClass: 'is-not-church'
                }
            ],
        },
        {
            id: 'churchType',
            i18nRef: 'churchCircles.churchType',
            defaultValue: 'newBelievers',
            type: ControlType.radio,
            canModify: true,
            options: [
                {
                    value: 'legacy',
                    i18nRef: 'churchCircles.churchTypeLegacy',
                    // svgRefOptions: {
                    //     target: '.node-church-box',
                    //     attributes: {
                    //         'rx': 0,
                    //     },
                    //     style: {
                    //         'stroke-width': 4,
                    //         'stroke': 'green'
                    //     }
                    // }
                },
                {
                    value: 'existingBelievers',
                    i18nRef: 'churchCircles.churchTypeExistingBelievers',
                    // svgRefOptions: {
                    //     target: '.node-church-box',
                    //     attributes: {
                    //         'rx': 0,
                    //     }
                    // }
                },
                {
                    value: 'newBelievers',
                    i18nRef: 'churchCircles.churchTypeNewBelievers',
                }
            ]
        },
        {
            id: 'threeThirds',
            i18nRef: 'churchCircles.threeThirds',
            defaultValue: [],
            type: ControlType.multiSelect,
            canModify: true,
            parseOptionValueAsInt: true,
            options: [
                {
                    value: "1",
                    i18nRef: 'churchCircles.threeThirdsPastoralCare'
                },
                {
                    value: "2",
                    i18nRef: 'churchCircles.threeThirdsWorship'
                },
                {
                    value: "3",
                    i18nRef: 'churchCircles.threeThirdsAccountability'
                },
                {
                    value: "4",
                    i18nRef: 'churchCircles.threeThirdsVisionCasting'
                },
                {
                    value: "5",
                    i18nRef: 'churchCircles.threeThirdsBibleTeaching'
                },
                {
                    value: "6",
                    i18nRef: 'churchCircles.threeThirdsPractice'
                },
                {
                    value: "7",
                    i18nRef: 'churchCircles.threeThirdsGoalSetting'
                },
            ],
        },
        {
            id: 'note',
            i18nRef: 'churchCircles.note',
            type: ControlType.textarea,
            canModify: true,
        }
    ],
    svgMap: [
        {
            svgRef: 'church-box',
            state: [
                {
                    style: 'stroke-dasharray',
                    fieldRef: 'church',
                    fieldRefValues: [
                        {
                            value: true,
                            styleValue: '0'
                        },
                        {
                            value: false,
                            styleValue: '7,7'
                        }
                    ]
                },
                {
                    style: 'stroke-width',
                    fieldRef: 'churchType',
                    fieldRefValues: [
                        {
                            value: 'legacy',
                            styleValue: 4,
                        }
                    ]
                },
                {
                    style: 'stroke-opacity',
                    fieldRef: 'active',
                    fieldRefValues: [
                        {
                            value: false,
                            styleValue: 0.2
                        }
                    ]
                },
                {
                    style: 'stroke',
                    fieldRef: 'churchType',
                    fieldRefValues: [
                        {
                            value: 'legacy',
                            styleValue: 'green',
                        }
                    ]
                },
                {
                    attr: 'rx',
                    fieldRef: 'churchType',
                    fieldRefValues: [
                        {
                            value: 'legacy',
                            styleValue: 0,
                        },
                        {
                            value: 'existingBelievers',
                            styleValue: 0,
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'topIcon1',
            iconRef: 'attenders',
            tooltipFieldRef: 'attenders',
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'active',
                    fieldRefValues: [
                        {
                            value: false,
                            styleValue: 0.4
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'topIcon2',
            iconRef: 'believers',
            tooltipFieldRef: 'believers',
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'active',
                    fieldRefValues: [
                        {
                            value: false,
                            styleValue: 0.4
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'topIcon3',
            iconRef: 'baptism',
            tooltipFieldRef: 'baptized',
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'active',
                    fieldRefValues: [
                        {
                            value: false,
                            styleValue: 0.4
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'topNumber1',
            tooltipFieldRef: 'attenders',
            state: [
                {
                    fieldRef: 'attenders',
                    setText: true,
                }
            ]
        },
        {
            svgRef: 'topNumber2',
            tooltipFieldRef: 'believers',
            state: [
                {
                    fieldRef: 'believers',
                    setText: true,
                }
            ]
        },
        {
            svgRef: 'topNumber3',
            tooltipFieldRef: 'baptized',
            state: [
                {
                    fieldRef: 'baptized',
                    setText: true,
                }
            ]
        },
        {
            svgRef: 'topNumber4',
            tooltipFieldRef: 'newlyBaptized',
            state: [
                {
                    fieldRef: 'newlyBaptized',
                    setText: true,
                }
            ]
        },
        {
            svgRef: 'leftText1',
            tooltipFieldRef: 'threeThirds',
            state: [
                {
                    fieldRef: 'threeThirds',
                    setText: true
                }
            ]
        },
        {
            svgRef: 'icon1',
            iconRef: 'elementBaptism',
            tooltipFieldRef: 'elementBaptism',
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
                            styleValue: 0.2
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'icon2',
            iconRef: 'elementPrayer',
            tooltipFieldRef: 'elementPrayer',
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
                            styleValue: 0.2
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'icon3',
            iconRef: 'elementMakeDisciples',
            tooltipFieldRef: 'elementMakeDisciples',
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
                            styleValue: 0.2
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'icon4',
            iconRef: 'elementLove',
            tooltipFieldRef: 'elementLove',
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'elementLove',
                    fieldRefValues: [
                        {
                            value: true,
                            styleValue: 1
                        },
                        {
                            value: false,
                            styleValue: 0.2
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'icon5',
            iconRef: 'elementWorship',
            tooltipFieldRef: 'elementWorship',
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
                            styleValue: 0.2
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'icon6',
            iconRef: 'elementLordsSupper',
            tooltipFieldRef: 'elementLordsSupper',
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
                            styleValue: 0.2
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'icon7',
            iconRef: 'elementGive',
            tooltipFieldRef: 'elementGive',
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
                            styleValue: 0.2
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'icon8',
            iconRef: 'elementWord',
            tooltipFieldRef: 'elementWord',
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
                            styleValue: 0.2
                        }
                    ]
                }
            ]
        },
        {
            svgRef: 'icon9',
            iconRef: 'elementLeaders',
            tooltipFieldRef: 'elementLeaders',
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
                            styleValue: 0.2
                        }
                    ]
                }
            ]
        }
    ],
}
