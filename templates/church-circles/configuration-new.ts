import { ControlType, TemplateConfiguration } from '../template.interface';

export const ChurchCirclesConfiguration: TemplateConfiguration = {
    id: 'churchCircles',
    icons: {
        attendersIcon: 'templates/church-circles/icons/attenders.png',
        believersIcon: 'templates/church-circles/icons/believers.png',
        baptismIcon: 'templates/church-circles/icons/element-baptism.png',
        elementBaptismIcon: 'templates/church-circles/icons/element-baptism.png',
        elementPrayerIcon: 'templates/church-circles/icons/element-prayer.png',
        elementMakeDisciplesIcon: 'templates/church-circles/icons/element-make-disciples.png',
        elementLoveIcon: 'templates/church-circles/icons/element-love.png',
        elementWorshipIcon: 'templates/church-circles/icons/element-worship.png',
        elementLordsSupperIcon: 'templates/church-circles/icons/element-lords-supper.png',
        elementGiveIcon: 'templates/church-circles/icons/element-give.png',
        elementWordIcon: 'templates/church-circles/icons/element-word.png',
        elementLeadersIcon: 'templates/church-circles/icons/element-leaders.png',
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
            i18nRef: 'Common_InactiveReason',
            type: ControlType.textarea,
            controlOrder: 3,
            canModify: true,
            dependsOnFalseField: 'active',
        },
        {
            id: 'elementBaptism',
            i18nRef: 'Element_Baptism',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementBaptismIcon'
        },
        {
            id: 'elementPrayer',
            i18nRef: 'Element_Prayer',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementPrayerIcon',
        },
        {
            id: 'elementMakeDisciples',
            i18nRef: 'Element_MakeDisciples',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementMakeDisciplesIcon'
        },
        {
            id: 'elementLove',
            i18nRef: 'Element_Love',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementLoveIcon',
        },
        {
            id: 'elementWorship',
            i18nRef: 'Element_Worship',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementWorshipIcon',
        },
        {
            id: 'elementLordsSupper',
            i18nRef: 'Element_LordsSupper',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementLordsSupperIcon',
        },
        {
            id: 'elementGive',
            i18nRef: 'Element_Give',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementGiveIcon',
        },
        {
            id: 'elementWord',
            i18nRef: 'Element_Word',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementWordIcon',
        },
        {
            id: 'elementLeaders',
            i18nRef: 'Element_Leaders',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
            iconRef: 'elementLeadersIcon',
        },
        {
            id: 'attenders',
            i18nRef: 'Common_NumberOfAttenders',
            defaultValue: 0,
            type: ControlType.number,
            canModify: true,
            iconRef: 'attendersIcon',
        },
        {
            id: 'believers',
            i18nRef: 'Common_NumberOfBelievers',
            defaultValue: 0,
            type: ControlType.number,
            canModify: true,
            iconRef: 'believersIcon',
        },
        {
            id: 'baptized',
            i18nRef: 'Common_NumberOfBaptized',
            defaultValue: 0,
            type: ControlType.number,
            canModify: true,
            iconRef: 'elementBaptismIcon'
        },
        {
            id: 'newlyBaptized',
            i18nRef: 'Common_NumberOfNewlyBaptized',
            defaultValue: 0,
            type: ControlType.number,
            canModify: true,
        },
        {
            id: 'name',
            i18nRef: 'Common_GroupName',
            type: ControlType.text,
            controlOrder: 4,
            canModify: true,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 1,
        },
        {
            id: 'leaderName',
            i18nRef: 'Common_LeaderName',
            type: ControlType.text,
            controlOrder: 5,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 2,
            canModify: true,
        },
        {
            id: 'email',
            i18nRef: 'Common_Email',
            type: ControlType.text,
            controlOrder: 6,
            isNodeSvgLabel: false,
            nodeSvgLabelOrder: 3,
            canModify: true,
        },
        {
            id: 'startDate',
            i18nRef: 'Common_StartDate',
            type: ControlType.date,
            controlOrder: 7,
            canModify: true,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 3,
        },
        {
            id: 'date',
            i18nRef: 'Common_Date',
            canModify: false,
            type: ControlType.none,
            deprecated: true,
        },
        {
            id: 'country',
            i18nRef: 'Common_Country',
            type: ControlType.countrySelector,
            canModify: true
        },
        {
            id: 'place',
            i18nRef: 'Common_PlaceCityState',
            type: ControlType.text,
            controlOrder: 9,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 4,
            deprecated: true,
            canModify: true,
        },
        {
            id: 'location',
            i18nRef: 'Common_GeoLocation',
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
            i18nRef: 'Common_GospelShares',
            defaultValue: 0,
            type: ControlType.number,
            canModify: true,
        },
        {
            id: 'church',
            i18nRef: 'Common_IsChurch',
            defaultValue: false,
            type: ControlType.checkbox,
            canModify: true,
        },
        {
            id: 'churchType',
            i18nRef: 'Common_ChurchType',
            defaultValue: 'newBelievers',
            type: ControlType.radio,
            canModify: true,
            options: [
                {
                    value: 'legacy',
                    i18nRef: 'ChurchType_Legacy',
                },
                {
                    value: 'existingBelievers',
                    i18nRef: 'ChurchType_ExistingBelievers',
                },
                {
                    value: 'newBelievers',
                    i18nRef: 'ChurchType_NewBelievers',
                }
            ]
        },
        {
            id: 'threeThirds',
            i18nRef: 'Common_ThreeThirds',
            defaultValue: [],
            type: ControlType.multiSelect,
            canModify: true,
            options: [
                {
                    value: "1",
                    i18nRef: 'ThreeThirds_PastoralCare'
                },
                {
                    value: "2",
                    i18nRef: 'ThreeThirds_Worship'
                },
                {
                    value: "3",
                    i18nRef: 'ThreeThirds_Accountability'
                },
                {
                    value: "4",
                    i18nRef: 'ThreeThirds_VisionCasting'
                },
                {
                    value: "5",
                    i18nRef: 'ThreeThirds_BibleTeaching'
                },
                {
                    value: "6",
                    i18nRef: 'ThreeThirds_Practice'
                },
                {
                    value: "7",
                    i18nRef: 'ThreeThirds_GoalSetting'
                },
            ],
        },
        {
            id: 'note',
            i18nRef: 'Common_Note',
            type: ControlType.textarea,
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
            selector: 'icon2',
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
            selector: 'icon3',
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
        },
        {
            selector: 'icon4',
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
            selector: 'icon5',
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
            selector: 'icon6',
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
            selector: 'icon7',
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
            selector: 'icon8',
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
            selector: 'icon9',
            iconRef: 'elementLeadersIcon',
            tooltipFieldRef: 'elementLeaders',
            states: [
                {
                    fieldRefId: 'elementLeaders',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            opacity: 1
                        }
                    }
                },
                {
                    fieldRefId: 'elementLeaders',
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
}
