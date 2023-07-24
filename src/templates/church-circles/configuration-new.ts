import { ControlType, TemplateConfiguration, ValueType } from '../template.interface';

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
            canModify: false,
        },
        {
            id: 'parentId',
            i18nRef: 'Common_Parent',
            type: ControlType.parentSelector,
            valueType: ValueType.string,
            canModify: true,
        },
        {
            id: 'newGeneration',
            i18nRef: 'Common_NewGeneration',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 1,
            canModify: true,
        },
        {
            id: 'active',
            i18nRef: 'Common_Active',
            defaultValue: true,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 2,
            canModify: true,
            oikosQuestionId: 'b9944e25-2b41-4005-81f6-82b1f8b33c9d',
            // svg defined currently in genmapper.js
        },
        {
            id: 'inactiveReason',
            i18nRef: 'Common_InactiveReason',
            type: ControlType.textarea,
            valueType: ValueType.string,
            controlOrder: 3,
            canModify: true,
            dependsOnFalseField: 'active',
        },
        {
            id: 'elementBaptism',
            i18nRef: 'Element_Baptism',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 4,
            canModify: true,
            iconRef: 'elementBaptismIcon',
            oikosQuestionId: '1954e321-3bb4-4a4f-bde8-d9872c59e7e9',
        },
        {
            id: 'elementPrayer',
            i18nRef: 'Element_Prayer',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 5,
            canModify: true,
            iconRef: 'elementPrayerIcon',
            oikosQuestionId: 'a3e2856a-c620-42c5-8440-c4fa1d6d1ea3',
        },
        {
            id: 'elementMakeDisciples',
            i18nRef: 'Element_MakeDisciples',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 6,
            canModify: true,
            iconRef: 'elementMakeDisciplesIcon',
            oikosQuestionId: 'd12ec56a-33ae-460c-8d48-aaea1b991b64',
        },
        {
            id: 'elementLove',
            i18nRef: 'Element_Love',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 7,
            canModify: true,
            iconRef: 'elementLoveIcon',
            oikosQuestionId: '7b3e7f8b-82a2-4391-a6cd-6aa9c7f96eb7',
        },
        {
            id: 'elementWorship',
            i18nRef: 'Element_Worship',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 8,
            canModify: true,
            iconRef: 'elementWorshipIcon',
            oikosQuestionId: '16f6279a-28c7-4714-a50f-3d4e7d4f8f53',
        },
        {
            id: 'elementLordsSupper',
            i18nRef: 'Element_LordsSupper',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 9,
            canModify: true,
            iconRef: 'elementLordsSupperIcon',
            oikosQuestionId: '49efc94a-4f5f-49b0-aeec-769a3e11551a',
        },
        {
            id: 'elementGive',
            i18nRef: 'Element_Give',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 10,
            canModify: true,
            iconRef: 'elementGiveIcon',
            oikosQuestionId: 'b6689fcd-d9a9-4ec6-b6ee-b0818b70a5a1',
        },
        {
            id: 'elementWord',
            i18nRef: 'Element_Word',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 11,
            canModify: true,
            iconRef: 'elementWordIcon',
            oikosQuestionId: '8d6e062b-6992-4011-a65b-83a05d33a5fb',
        },
        {
            id: 'elementLeaders',
            i18nRef: 'Element_Leaders',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 12,
            canModify: true,
            iconRef: 'elementLeadersIcon',
            oikosQuestionId: '60f4838f-201c-43be-8d4c-618806388de4',
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
            iconRef: 'elementBaptismIcon',
        },
        {
            id: 'newlyBaptized',
            i18nRef: 'Common_NumberOfNewlyBaptized',
            parseValueAsFloat: true,
            defaultValue: 0,
            // type: ControlType.number,
            valueType: ValueType.number,
            canModify: false,
        },
        {
            id: 'peoples',
            i18nRef: 'Common_People',
            type: ControlType.peopleSelector,
            useValueFromFieldId: 'attenders',
            iconRef: 'attendersIcon',
            controlOrder: 14,
            canModify: false,
            oikosQuestionGroupId: 'dfa0b1ff-1c81-4e70-a538-08d9488a1812',
            fields: [
                {
                    id: 'attenders',
                    i18nRef: 'Common_NumberOfAttendees',
                    defaultValue: 0,
                    type: ControlType.number,
                    valueType: ValueType.number,
                    canModify: true,
                    iconRef: 'attendersIcon',
                    oikosQuestionId: 'def9c593-79da-491d-fcf8-08d9488a716b',
                    oikosQuestionGroupId: 'dfa0b1ff-1c81-4e70-a538-08d9488a1812',
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
                    },
                    oikosQuestionId: 'ef0e20ac-7b36-4629-fcf9-08d9488a716b',
                    oikosQuestionGroupId: 'dfa0b1ff-1c81-4e70-a538-08d9488a1812',
                },
                {
                    id: 'baptized',
                    i18nRef: 'Common_NumberOfBaptized',
                    defaultValue: 0,
                    type: ControlType.number,
                    valueType: ValueType.number,
                    canModify: true,
                    iconRef: 'elementBaptismIcon',
                    validation: {
                        maxFieldRef: 'believers',
                    },
                    oikosQuestionId: '67b7513a-b241-4a85-fcfa-08d9488a716b',
                    oikosQuestionGroupId: 'dfa0b1ff-1c81-4e70-a538-08d9488a1812',
                },
                {
                    id: 'newlyBaptized',
                    i18nRef: 'Common_NumberOfNewlyBaptized',
                    defaultValue: 0,
                    type: ControlType.number,
                    valueType: ValueType.number,
                    canModify: true,
                    iconRef: 'elementBaptismIcon',
                    validation: {
                        maxFieldRef: 'baptized',
                    },
                },
            ],
        },
        {
            id: 'name',
            i18nRef: 'Common_GroupName',
            type: ControlType.text,
            valueType: ValueType.string,
            controlOrder: 15,
            canModify: true,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 1,
            oikosQuestionId: 'a3aa4a89-2585-49b1-a362-8067691914c5',
        },
        {
            id: 'leaderName',
            i18nRef: 'Common_LeaderName',
            type: ControlType.text,
            valueType: ValueType.string,
            controlOrder: 16,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 2,
            canModify: true,
            oikosQuestionId: 'e21414fe-4016-4c43-a59f-62177a9086f8',
            oikosQuestionGroupId: '14fb7af0-ca80-453f-b39c-324ebdf090c9',
        },
        {
            id: 'email',
            i18nRef: 'Common_Email',
            type: ControlType.text,
            valueType: ValueType.string,
            controlOrder: 17,
            isNodeSvgLabel: false,
            nodeSvgLabelOrder: 3,
            canModify: true,
        },
        {
            id: 'startDate',
            i18nRef: 'Common_StartDate',
            type: ControlType.date,
            valueType: ValueType.date,
            controlOrder: 18,
            canModify: true,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 3,
            oikosQuestionId: '5880a7d6-4277-46be-bbb7-7c907d38f1dd',
        },
        {
            id: 'date',
            i18nRef: 'Common_Date',
            canModify: false,
            type: ControlType.none,
            valueType: ValueType.string,
            controlOrder: 19,
            deprecated: true,
        },
        {
            id: 'country',
            i18nRef: 'Common_Country',
            type: ControlType.countrySelector,
            valueType: ValueType.string,
            controlOrder: 20,
            canModify: true,
        },
        {
            id: 'place',
            i18nRef: 'Common_PlaceCityState',
            type: ControlType.text,
            valueType: ValueType.string,
            controlOrder: 21,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 4,
            deprecated: true,
            canModify: true,
        },
        {
            id: 'location',
            i18nRef: 'Common_GeoLocation',
            type: ControlType.geoLocation,
            valueType: ValueType.string,
            controlOrder: 22,
            canModify: true,
        },
        {
            id: 'latitude',
            canModify: false,
            parseValueAsFloat: true,
            valueType: ValueType.number,
        },
        {
            id: 'longitude',
            canModify: false,
            parseValueAsFloat: true,
            valueType: ValueType.number,
        },
        {
            id: 'placeId',
            canModify: false,
        },
        {
            id: 'peopleGroups',
            canModify: false,
        },
        {
            id: 'peopleGroupsNames',
            canModify: false,
        },
        {
            id: 'gospelShares',
            i18nRef: 'Common_GospelShares',
            defaultValue: 0,
            type: ControlType.number,
            valueType: ValueType.number,
            controlOrder: 23,
            canModify: true,
        },
        {
            id: 'church',
            i18nRef: 'Common_IsChurch',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 24,
            canModify: true,
            oikosQuestionId: 'dc29369f-62a8-4bcb-88e3-8a9057121b08',
        },
        {
            id: 'churchType',
            i18nRef: 'Common_ChurchType',
            defaultValue: 'newBelievers',
            type: ControlType.radio,
            valueType: ValueType.enum,
            controlOrder: 25,
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
                },
            ],
        },
        {
            id: 'threeThirds',
            i18nRef: 'Common_ThreeThirds',
            defaultValue: [],
            type: ControlType.multiSelect,
            valueType: ValueType.multiEnum,
            controlOrder: 26,
            canModify: true,
            options: [
                {
                    value: '1',
                    i18nRef: 'ThreeThirds_PastoralCare',
                },
                {
                    value: '2',
                    i18nRef: 'ThreeThirds_Worship',
                },
                {
                    value: '3',
                    i18nRef: 'ThreeThirds_Accountability',
                },
                {
                    value: '4',
                    i18nRef: 'ThreeThirds_VisionCasting',
                },
                {
                    value: '5',
                    i18nRef: 'ThreeThirds_BibleTeaching',
                },
                {
                    value: '6',
                    i18nRef: 'ThreeThirds_Practice',
                },
                {
                    value: '7',
                    i18nRef: 'ThreeThirds_GoalSetting',
                },
            ],
        },
        {
            id: 'note',
            i18nRef: 'Common_Note',
            type: ControlType.textarea,
            valueType: ValueType.string,
            controlOrder: 27,
            canModify: true,
            oikosQuestionId: 'bafce19b-5b73-4a44-7bdc-08d94ab5eec8',
        },
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
                        },
                    },
                },
                {
                    fieldRefId: 'church',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'stroke-dasharray': '7,7',
                        },
                    },
                },
                {
                    fieldRefId: 'churchType',
                    fieldRefValue: 'legacy',
                    svg: {
                        attributes: {
                            rx: 0,
                        },
                        style: {
                            stroke: 'green',
                            'stroke-width': 4,
                        },
                    },
                },
                {
                    fieldRefId: 'churchType',
                    fieldRefValue: 'existingBelievers',
                    svg: {
                        attributes: {
                            rx: 0,
                        },
                    },
                },
                {
                    fieldRefId: 'active',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'stroke-opacity': 0.2,
                        },
                    },
                },
                {
                    fieldRefId: 'active',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            'stroke-opacity': 1,
                        },
                    },
                },
            ],
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
                            opacity: 0.4,
                        },
                    },
                },
            ],
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
                            opacity: 0.4,
                        },
                    },
                },
            ],
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
                            opacity: 0.4,
                        },
                    },
                },
            ],
        },
        {
            selector: 'topNumber1',
            tooltipFieldRef: 'attenders',
            states: [
                {
                    fieldRefId: 'attenders',
                    setText: true,
                },
            ],
        },
        {
            selector: 'topNumber2',
            tooltipFieldRef: 'believers',
            states: [
                {
                    fieldRefId: 'believers',
                    setText: true,
                },
            ],
        },
        {
            selector: 'topNumber3',
            tooltipFieldRef: 'baptized',
            states: [
                {
                    fieldRefId: 'baptized',
                    setText: true,
                },
            ],
        },
        {
            selector: 'topNumber4',
            tooltipFieldRef: 'newlyBaptized',
            states: [
                {
                    fieldRefId: 'newlyBaptized',
                    setText: true,
                },
            ],
        },
        {
            selector: 'leftText1',
            tooltipFieldRef: 'threeThirds',
            states: [
                {
                    fieldRefId: 'threeThirds',
                    setText: true,
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementBaptism',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2,
                        },
                    },
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementPrayer',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2,
                        },
                    },
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementMakeDisciples',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2,
                        },
                    },
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementLove',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2,
                        },
                    },
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementWorship',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2,
                        },
                    },
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementLordsSupper',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2,
                        },
                    },
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementGive',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2,
                        },
                    },
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementWord',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2,
                        },
                    },
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementLeaders',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0.2,
                        },
                    },
                },
            ],
        },
    ],
};
