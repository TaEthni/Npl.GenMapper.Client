import { ControlType, TemplateConfiguration } from '../template.interface';

export const ChurchCircles12Configuration: TemplateConfiguration = {
    id: 'churchCircles12',
    icons: {
        attenders: 'templates/church-circles-12/icons/attenders.png',
        believers: 'templates/church-circles-12/icons/believers.png',
        baptism: 'templates/church-circles-12/icons/element-baptism.png',
        elementGospel: 'templates/church-circles-12/icons/element-gospel.png',
        elementRepent: 'templates/church-circles-12/icons/element-repent.png',
        elementBaptism: 'templates/church-circles-12/icons/element-baptism.png',
        elementHolySpirit: 'templates/church-circles-12/icons/element-holy-spirit.png',
        elementWord: 'templates/church-circles-12/icons/element-word.png',
        elementLove: 'templates/church-circles-12/icons/element-love.png',
        elementLordsSupper: 'templates/church-circles-12/icons/element-lords-supper.png',
        elementPrayer: 'templates/church-circles-12/icons/element-prayer.png',
        elementSignsWonders: 'templates/church-circles-12/icons/element-signs-wonders.png',
        elementGive: 'templates/church-circles-12/icons/element-give.png',
        elementWorship: 'templates/church-circles-12/icons/element-worship.png',
        elementMakeDisciples: 'templates/church-circles-12/icons/element-make-disciples.png',
    },
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
            iconRef: 'elementGospel',
            tooltipFieldRef: 'elementGospel',
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'elementGospel',
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
            iconRef: 'elementRepent',
            tooltipFieldRef: 'elementRepent',
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'elementRepent',
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
            svgRef: 'icon4',
            iconRef: 'elementHolySpirit',
            tooltipFieldRef: 'elementHolySpirit',
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'elementHolySpirit',
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
            svgRef: 'icon6',
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
            svgRef: 'icon7',
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
            svgRef: 'icon8',
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
            svgRef: 'icon9',
            iconRef: 'elementSignsWonders',
            tooltipFieldRef: 'elementSignsWonders',
            state: [
                {
                    style: 'opacity',
                    fieldRef: 'elementSignsWonders',
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
            svgRef: 'icon10',
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
            svgRef: 'icon11',
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
            svgRef: 'icon12',
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
        }
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
            i18nRef: 'churchCircles12.parent',
            type: ControlType.parentSelector,
            canModify: true,
        },
        {
            id: 'elementGospel',
            i18nRef: 'churchCircles12.elementGospel',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementGospel'
        },
        {
            id: 'elementRepent',
            i18nRef: 'churchCircles12.elementRepent',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementRepent'
        },
        {
            id: 'elementBaptism',
            i18nRef: 'churchCircles12.elementBaptism',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementBaptism'
        },
        {
            id: 'elementHolySpirit',
            i18nRef: 'churchCircles12.elementHolySpirit',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementHolySpirit'
        },
        {
            id: 'elementWord',
            i18nRef: 'churchCircles12.elementWord',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementWord',
        },
        {
            id: 'elementLove',
            i18nRef: 'churchCircles12.elementLove',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementLove',
        },
        {
            id: 'elementLordsSupper',
            i18nRef: 'churchCircles12.elementLordsSupper',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementLordsSupper',
        },
        {
            id: 'elementPrayer',
            i18nRef: 'churchCircles12.elementPrayer',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementPrayer',
        },
        {
            id: 'elementSignsWonders',
            i18nRef: 'churchCircles12.elementSignsWonders',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementSignsWonders'
        },
        {
            id: 'elementGive',
            i18nRef: 'churchCircles12.elementGive',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementGive',
        },
        {
            id: 'elementWorship',
            i18nRef: 'churchCircles12.elementWorship',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementWorship',
        },
        {
            id: 'elementMakeDisciples',
            i18nRef: 'churchCircles12.elementMakeDisciples',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementMakeDisciples'
        },
        {
            id: 'attenders',
            i18nRef: 'churchCircles12.attenders',
            defaultValue: 0,
            type: ControlType.number,
            canModify: true,
            iconRef: 'attenders',
        },
        {
            id: 'believers',
            i18nRef: 'churchCircles12.believers',
            defaultValue: 0,
            type: ControlType.number,
            canModify: true,
            iconRef: 'believers',
        },
        {
            id: 'baptized',
            i18nRef: 'churchCircles12.baptized',
            defaultValue: 0,
            type: ControlType.number,
            canModify: true,
            iconRef: 'elementBaptism'
        },
        {
            id: 'newlyBaptized',
            i18nRef: 'churchCircles12.newlyBaptized',
            defaultValue: 0,
            type: ControlType.number,
            canModify: true,
        },
        {
            id: 'gospelShares',
            i18nRef: 'churchCircles12.gospelShares',
            defaultValue: 0,
            type: ControlType.number,
            canModify: true,
        },
        {
            id: 'newGeneration',
            i18nRef: 'churchCircles12.newGeneration',
            defaultValue: false,
            type: ControlType.checkbox,
            controlOrder: 1,
            canModify: true,
        },
        {
            id: 'active',
            i18nRef: 'churchCircles12.active',
            defaultValue: true,
            type: ControlType.checkbox,
            controlOrder: 2,
            canModify: true,
            // svg defined currently in genmapper.js
        },
        {
            id: 'inactiveReason',
            i18nRef: 'churchCircles12.inactiveReason',
            type: ControlType.textarea,
            controlOrder: 3,
            canModify: true,
            dependsOnFalseField: 'active',
        },
        {
            id: 'name',
            i18nRef: 'churchCircles12.name',
            type: ControlType.text,
            controlOrder: 4,
            canModify: true,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 1,
        },
        {
            id: 'leaderName',
            i18nRef: 'churchCircles12.leaderName',
            type: ControlType.text,
            controlOrder: 5,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 2,
            canModify: true,
        },
        {
            id: 'email',
            i18nRef: 'churchCircles12.email',
            type: ControlType.text,
            controlOrder: 6,
            isNodeSvgLabel: false,
            nodeSvgLabelOrder: 3,
            canModify: true,
        },
        {
            id: 'startDate',
            i18nRef: 'churchCircles12.date',
            type: ControlType.date,
            controlOrder: 7,
            canModify: true,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 3,
        },
        {
            id: 'date',
            i18nRef: 'churchCircles12.date',
            canModify: false,
            type: ControlType.none,
            deprecated: true,
        },
        {
            id: 'place',
            i18nRef: 'churchCircles12.place',
            type: ControlType.text,
            controlOrder: 9,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 4,
            deprecated: true,
            canModify: true,
        },
        {
            id: 'location',
            i18nRef: 'churchCircles12.location',
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
            id: 'church',
            i18nRef: 'churchCircles12.isChurch',
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
            i18nRef: 'churchCircles12.churchType',
            defaultValue: 'newBelievers',
            type: ControlType.radio,
            canModify: true,
            options: [
                {
                    value: 'legacy',
                    i18nRef: 'churchCircles12.churchTypeLegacy',
                },
                {
                    value: 'existingBelievers',
                    i18nRef: 'churchCircles12.churchTypeExistingBelievers',
                },
                {
                    value: 'newBelievers',
                    i18nRef: 'churchCircles12.churchTypeNewBelievers',
                }
            ]
        },
        {
            id: 'threeThirds',
            i18nRef: 'churchCircles12.threeThirds',
            defaultValue: [],
            type: ControlType.multiSelect,
            canModify: true,
            parseOptionValueAsInt: true,
            options: [
                {
                    value: 1,
                    i18nRef: 'churchCircles12.threeThirdsPastoralCare'
                },
                {
                    value: 2,
                    i18nRef: 'churchCircles12.threeThirdsWorship'
                },
                {
                    value: 3,
                    i18nRef: 'churchCircles12.threeThirdsAccountability'
                },
                {
                    value: 4,
                    i18nRef: 'churchCircles12.threeThirdsVisionCasting'
                },
                {
                    value: 5,
                    i18nRef: 'churchCircles12.threeThirdsBibleTeaching'
                },
                {
                    value: 6,
                    i18nRef: 'churchCircles12.threeThirdsPractice'
                },
                {
                    value: 7,
                    i18nRef: 'churchCircles12.threeThirdsGoalSetting'
                },
            ],
        },
        {
            id: 'note',
            i18nRef: 'churchCircles12.note',
            type: ControlType.textarea,
            canModify: true,
        }
    ],
}
