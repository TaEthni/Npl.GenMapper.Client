import { ControlType, TemplateConfiguration, ValueType } from '../template.interface';
import { boxHeight } from './template';

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
            canModify: false,
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
            valueType: ValueType.boolean,
            canModify: true,
            controlOrder: 4,
            iconRef: 'leadernohatIcon',
            oikosQuestionId: '60f4838f-201c-43be-8d4c-618806388de4',
        },
        {
            id: 'leader_has_teachingtraining',
            // i18nRef: 'churchCircles.inside_outside_leader',
            i18nRef: 'Trained Leader?',
            i18nDescriptionValue:
                'Has the local leader received pastoral training that includes how to teach and preach?',
            dependsOnTrueField: 'elementLeaders',
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 5,
            canModify: true,
            iconRef: 'leaderwithhatIcon',
            oikosQuestionId: '61163ea5-3cfc-4e0b-a61a-86600eb272f0',
        },
        {
            id: 'leaderName',
            i18nRef: 'Common_LeaderName',
            i18nDescriptionValue: 'What is the name of the leader who came and established the group?',
            type: ControlType.text,
            valueType: ValueType.string,
            controlOrder: 6,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 2,
            canModify: true,
            dependsOnTrueField: 'elementLeaders',
            oikosQuestionId: 'e21414fe-4016-4c43-a59f-62177a9086f8',
            oikosQuestionGroupId: '14fb7af0-ca80-453f-b39c-324ebdf090c9',
        },
        {
            id: 'inside_outside_leader',
            // i18nRef: 'churchCircles.inside_outside_leader',
            i18nValue: 'Where does the leader appointed come from?',
            dependsOnTrueField: 'elementLeaders',
            defaultValue: '0',
            canModify: true,
            type: ControlType.radio,
            valueType: ValueType.boolean,
            controlOrder: 7,
            oikosQuestionId: '61a65550-ca20-4ac2-a4f7-67c25d6bc8c9',
            options: [
                {
                    value: '0',
                    i18nValue: 'From outside (different church)',
                    oikosQuestionValue: false,
                },
                {
                    value: '1',
                    i18nValue: 'From inside the church',
                    oikosQuestionValue: true,
                },
            ],
        },
        {
            id: 'elementWord',
            i18nRef: 'Element_Word',
            i18nDescriptionValue: 'An obedience based discipleship program has been taught in the group?',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 8,
            canModify: true,
            iconRef: 'wordIcon',
            oikosQuestionId: '8d6e062b-6992-4011-a65b-83a05d33a5fb',
            // svgElementIconRef: 'icon2',
            // iconUrl: 'templates/church-circles-east/icons/element-word.png',
        },
        {
            id: 'elementPrayer',
            i18nRef: 'Element_Prayer',
            i18nDescriptionValue: 'Does the group regularly pray together and encourage individual prayer?',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 9,
            canModify: true,
            iconRef: 'prayIcon',
            oikosQuestionId: 'a3e2856a-c620-42c5-8440-c4fa1d6d1ea3',
        },
        {
            id: 'elementBaptism',
            i18nRef: 'Element_Baptism',
            i18nDescriptionValue: "Believer's baptism is practiced in your group?",
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 10,
            canModify: true,
            iconRef: 'baptismIcon',
            oikosQuestionId: '1954e321-3bb4-4a4f-bde8-d9872c59e7e9',
        },
        {
            id: 'inside_outside_baptism',
            // i18nRef: 'churchCircles.inside_outside_baptism',
            i18nValue: 'Where does the leader who gives baptism come from?',
            dependsOnTrueField: 'elementBaptism',
            defaultValue: '0',
            canModify: true,
            type: ControlType.radio,
            valueType: ValueType.boolean,
            controlOrder: 11,
            oikosQuestionId: '342ed9c1-f3ab-4d57-9480-f3dab827d696',
            options: [
                {
                    value: '0',
                    i18nValue: 'From outside (different church)',
                    oikosQuestionValue: false,
                },
                {
                    value: '1',
                    i18nValue: 'From inside the church',
                    oikosQuestionValue: true,
                },
            ],
        },
        {
            id: 'elementLove',
            i18nRef: 'Element_Love',
            i18nDescriptionValue: 'Does the group love, encourage, and minister to each other?',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 12,
            canModify: true,
            iconRef: 'fellowshipIcon',
            oikosQuestionId: '7b3e7f8b-82a2-4391-a6cd-6aa9c7f96eb7',
        },
        {
            id: 'elementMakeDisciples',
            i18nRef: 'Element_MakeDisciples',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 13,
            canModify: true,
            iconRef: 'arrowIcon',
            oikosQuestionId: 'd12ec56a-33ae-460c-8d48-aaea1b991b64',
        },
        {
            id: 'elementWorship',
            i18nRef: 'Element_Worship',
            i18nDescriptionValue: 'Does the group regularly worship together?',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 14,
            canModify: true,
            iconRef: 'worshipIcon',
            oikosQuestionId: '16f6279a-28c7-4714-a50f-3d4e7d4f8f53',
        },
        {
            id: 'elementLordsSupper',
            i18nRef: 'Element_LordsSupper',
            i18nDescriptionValue: "Is the Lord's supper practiced in your group?",
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 15,
            canModify: true,
            iconRef: 'cupIcon',
            oikosQuestionId: '49efc94a-4f5f-49b0-aeec-769a3e11551a',
        },
        {
            id: 'inside_outside_the_lords_supper',
            // i18nRef: 'churchCircles.inside_outside_the_lords_supper',
            i18nValue: "Where does the leader who gives the Lord's Supper come from?",
            dependsOnTrueField: 'elementLordsSupper',
            defaultValue: '0',
            canModify: true,
            type: ControlType.radio,
            valueType: ValueType.boolean,
            controlOrder: 16,
            oikosQuestionId: 'c527679f-0bf2-4df1-a3ae-34e90ac6802a',
            options: [
                {
                    value: '0',
                    i18nValue: 'From outside (different church)',
                    oikosQuestionValue: false,
                },
                {
                    value: '1',
                    i18nValue: 'From inside the church',
                    oikosQuestionValue: false,
                },
            ],
        },
        {
            id: 'elementGive',
            i18nRef: 'Element_Give',
            i18nDescriptionValue: 'The group is collecting and offering',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 18,
            canModify: true,
            iconRef: 'coinIcon',
            oikosQuestionId: 'b6689fcd-d9a9-4ec6-b6ee-b0818b70a5a1',
        },
        {
            id: 'church',
            i18nRef: 'Common_IsChurch',
            i18nDescriptionValue: 'The group self identifies as a church?',
            defaultValue: false,
            type: ControlType.checkbox,
            valueType: ValueType.boolean,
            controlOrder: 19,
            canModify: true,
            oikosQuestionId: 'dc29369f-62a8-4bcb-88e3-8a9057121b08',
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
                    oikosQuestionId: 'ef0e20ac-7b36-4629-fcf9-08d9488a716b',
                    oikosQuestionGroupId: 'dfa0b1ff-1c81-4e70-a538-08d9488a1812',
                    validation: {
                        maxFieldRef: 'attenders',
                    },
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
                    },
                    oikosQuestionId: '67b7513a-b241-4a85-fcfa-08d9488a716b',
                    oikosQuestionGroupId: 'dfa0b1ff-1c81-4e70-a538-08d9488a1812',
                },
            ],
        },
        {
            id: 'name',
            i18nRef: 'Common_GroupName',
            type: ControlType.text,
            valueType: ValueType.string,
            controlOrder: 22,
            canModify: true,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 1,
            oikosQuestionId: 'a3aa4a89-2585-49b1-a362-8067691914c5',
        },
        {
            id: 'email',
            i18nRef: 'Common_Email',
            type: ControlType.text,
            valueType: ValueType.string,
            controlOrder: 23,
            isNodeSvgLabel: false,
            nodeSvgLabelOrder: 3,
            canModify: true,
        },
        {
            id: 'startDate',
            i18nRef: 'Common_StartDate',
            type: ControlType.date,
            valueType: ValueType.date,
            controlOrder: 24,
            canModify: true,
            isNodeSvgLabel: true,
            nodeSvgLabelOrder: 3,
            oikosQuestionId: '5880a7d6-4277-46be-bbb7-7c907d38f1dd',
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
                    isOther: true,
                },
            ],
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
            iconRef: 'baptismIcon',
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
                            stroke: 'black',
                            'stroke-width': 2,
                        },
                    },
                },
                {
                    fieldRefId: 'church',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'stroke-dasharray': '7,7',
                            stroke: '#e4d339',
                            'stroke-width': 4,
                        },
                    },
                },
                {
                    fieldRefId: 'active',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            'stroke-opacity': 0.2,
                            fill: 'lightgray',
                        },
                    },
                },
                {
                    fieldRefId: 'active',
                    fieldRefValue: true,
                    svg: {
                        style: {
                            'stroke-opacity': 1,
                            fill: 'white',
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
            states: [
                {
                    fieldRefId: 'attenders',
                    setText: true,
                },
            ],
        },
        {
            selector: 'topNumber2',
            states: [
                {
                    fieldRefId: 'believers',
                    setText: true,
                },
            ],
        },
        {
            selector: 'topNumber3',
            states: [
                {
                    fieldRefId: 'baptized',
                    setText: true,
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementLeaders',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0,
                        },
                    },
                },
                {
                    fieldRefId: 'inside_outside_leader',
                    fieldRefValue: '0',
                    svg: {
                        attributes: {
                            x: boxHeight / 2.1,
                        },
                    },
                },
                {
                    fieldRefId: 'leader_has_teachingtraining',
                    fieldRefValue: true,
                    setIcon: true,
                    iconRef: 'leaderwithhatIcon',
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementWord',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0,
                        },
                    },
                },
            ],
        },
        {
            selector: 'icon3',
            iconRef: 'prayIcon',
            attributes: {
                height: boxHeight / 6,
                width: boxHeight / 6,
            },
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
                            opacity: 0,
                        },
                    },
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementBaptism',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0,
                        },
                    },
                },
                {
                    fieldRefId: 'inside_outside_baptism',
                    fieldRefValue: '0',
                    svg: {
                        attributes: {
                            x: boxHeight / 1.9,
                        },
                    },
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementLove',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0,
                        },
                    },
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementMakeDisciples',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0,
                        },
                    },
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementWorship',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0,
                        },
                    },
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementLordsSupper',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0,
                        },
                    },
                },
                {
                    fieldRefId: 'inside_outside_the_lords_supper',
                    fieldRefValue: '0',
                    svg: {
                        attributes: {
                            x: boxHeight / 2.1,
                        },
                    },
                },
            ],
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
                            opacity: 1,
                        },
                    },
                },
                {
                    fieldRefId: 'elementGive',
                    fieldRefValue: false,
                    svg: {
                        style: {
                            opacity: 0,
                        },
                    },
                },
            ],
        },
    ],
};
