import { ControlType, TemplateConfiguration } from '../template.interface';

export const ChurchCircles12Configuration: TemplateConfiguration = {
    id: 'churchCircles12',
    icons: {
        attendersIcon: 'templates/church-circles-12/icons/attenders.png',
        believersIcon: 'templates/church-circles-12/icons/believers.png',
        baptismIcon: 'templates/church-circles-12/icons/element-baptism.png',
        elementGospelIcon: 'templates/church-circles-12/icons/element-gospel.png',
        elementRepentIcon: 'templates/church-circles-12/icons/element-repent.png',
        elementBaptismIcon: 'templates/church-circles-12/icons/element-baptism.png',
        elementHolySpiritIcon: 'templates/church-circles-12/icons/element-holy-spirit.png',
        elementWordIcon: 'templates/church-circles-12/icons/element-word.png',
        elementLoveIcon: 'templates/church-circles-12/icons/element-love.png',
        elementLordsSupperIcon: 'templates/church-circles-12/icons/element-lords-supper.png',
        elementPrayerIcon: 'templates/church-circles-12/icons/element-prayer.png',
        elementSignsWondersIcon: 'templates/church-circles-12/icons/element-signs-wonders.png',
        elementGiveIcon: 'templates/church-circles-12/icons/element-give.png',
        elementWorshipIcon: 'templates/church-circles-12/icons/element-worship.png',
        elementMakeDisciplesIcon: 'templates/church-circles-12/icons/element-make-disciples.png',
    },
    svgStates: [
        {
            selector: 'church-box',
            states: [
                {
                    fieldRefId: 'church',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            'stroke-dasharray': '0'
                        }
                    }
                },
                {
                    fieldRefId: 'church',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'stroke-dasharray': '7,7'
                        }
                    }
                },
                {
                    fieldRefId: 'churchType',
                    fieldRefValue: 'legacy',
                    svg: {
                        attributes: {
                            'rx': 0
                        },
                        style: {
                            'stroke': 'green',
                            'stroke-width': 4
                        }
                    }
                },
                {
                    fieldRefId: 'churchType',
                    fieldRefValue: 'existingBelievers',
                    svg: {
                        attributes: {
                            'rx': 0
                        }
                    }
                },
                {
                    fieldRefId: 'active',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'stroke-opacity': 0.2
                        }
                    }
                },
                {
                    fieldRefId: 'active',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            'stroke-opacity': 1
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
            tooltipFieldRef: 'attenders',
            states: [
                {
                    fieldRefId: 'attenders',
                    setText: true
                }
            ]
        },
        {
            selector: 'topNumber2',
            tooltipFieldRef: 'believers',
            states: [
                {
                    fieldRefId: 'believers',
                    setText: true
                }
            ]
        },
        {
            selector: 'topNumber3',
            tooltipFieldRef: 'baptized',
            states: [
                {
                    fieldRefId: 'baptized',
                    setText: true
                }
            ]
        },
        {
            selector: 'topNumber4',
            tooltipFieldRef: 'newlyBaptized',
            states: [
                {
                    fieldRefId: 'newlyBaptized',
                    setText: true
                }
            ]
        },
        {
            selector: 'leftText1',
            tooltipFieldRef: 'threeThirds',
            states: [
                {
                    fieldRefId: 'threeThirds',
                    setText: true
                }
            ]
        },
        {
            selector: 'icon1',
            iconRef: 'elementGospelIcon',
            tooltipFieldRef: 'elementGospel',
            states: [
                {
                    fieldRefId: 'elementGospel',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            opacity: 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementGospel',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2
                        }
                    }
                }
            ]
        },
        {
            selector: 'icon2',
            iconRef: 'elementRepentIcon',
            tooltipFieldRef: 'elementRepent',
            states: [
                {
                    fieldRefId: 'elementRepent',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            opacity: 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementRepent',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2
                        }
                    }
                }
            ]
        },
        {
            selector: 'icon3',
            iconRef: 'elementBaptismIcon',
            tooltipFieldRef: 'elementBaptism',
            states: [
                {
                    fieldRefId: 'elementBaptism',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            opacity: 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementBaptism',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2
                        }
                    }
                }
            ]
        },
        {
            selector: 'icon4',
            iconRef: 'elementHolySpiritIcon',
            tooltipFieldRef: 'elementHolySpirit',
            states: [
                {
                    fieldRefId: 'elementHolySpirit',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            opacity: 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementHolySpirit',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2
                        }
                    }
                }
            ]
        },
        {
            selector: 'icon5',
            iconRef: 'elementWordIcon',
            tooltipFieldRef: 'elementWord',
            states: [
                {
                    fieldRefId: 'elementWord',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            opacity: 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementWord',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2
                        }
                    }
                }
            ]
        },
        {
            selector: 'icon6',
            iconRef: 'elementLoveIcon',
            tooltipFieldRef: 'elementLove',
            states: [
                {
                    fieldRefId: 'elementLove',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            opacity: 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementLove',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2
                        }
                    }
                }
            ]
        },
        {
            selector: 'icon7',
            iconRef: 'elementLordsSupperIcon',
            tooltipFieldRef: 'elementLordsSupper',
            states: [
                {
                    fieldRefId: 'elementLordsSupper',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            opacity: 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementLordsSupper',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2
                        }
                    }
                }
            ]
        },
        {
            selector: 'icon8',
            iconRef: 'elementPrayerIcon',
            tooltipFieldRef: 'elementPrayer',
            states: [
                {
                    fieldRefId: 'elementPrayer',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            opacity: 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementPrayer',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2
                        }
                    }
                }
            ]
        },
        {
            selector: 'icon9',
            iconRef: 'elementSignsWondersIcon',
            tooltipFieldRef: 'elementSignsWonders',
            states: [
                {
                    fieldRefId: 'elementSignsWonders',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            opacity: 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementSignsWonders',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2
                        }
                    }
                }
            ]
        },
        {
            selector: 'icon10',
            iconRef: 'elementGiveIcon',
            tooltipFieldRef: 'elementGive',
            states: [
                {
                    fieldRefId: 'elementGive',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            opacity: 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementGive',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2
                        }
                    }
                }
            ]
        },
        {
            selector: 'icon11',
            iconRef: 'elementWorshipIcon',
            tooltipFieldRef: 'elementWorship',
            states: [
                {
                    fieldRefId: 'elementWorship',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            opacity: 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementWorship',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2
                        }
                    }
                }
            ]
        },
        {
            selector: 'icon12',
            iconRef: 'elementMakeDisciplesIcon',
            tooltipFieldRef: 'elementMakeDisciples',
            states: [
                {
                    fieldRefId: 'elementMakeDisciples',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            opacity: 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementMakeDisciples',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2
                        }
                    }
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
            options: [
                {
                    value: "1",
                    i18nRef: 'churchCircles12.threeThirdsPastoralCare'
                },
                {
                    value: "2",
                    i18nRef: 'churchCircles12.threeThirdsWorship'
                },
                {
                    value: "3",
                    i18nRef: 'churchCircles12.threeThirdsAccountability'
                },
                {
                    value: "4",
                    i18nRef: 'churchCircles12.threeThirdsVisionCasting'
                },
                {
                    value: "5",
                    i18nRef: 'churchCircles12.threeThirdsBibleTeaching'
                },
                {
                    value: "6",
                    i18nRef: 'churchCircles12.threeThirdsPractice'
                },
                {
                    value: "7",
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
