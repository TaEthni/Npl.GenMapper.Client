import { GMTemplate } from '../template.interface';

// export interface ChurchCirclesTemplateType extends GMTemplate {
//     translations: { [key: string]: { translation: { [key: string]: ChurchCirclesTranslation } } };
// }

const boxHeight = 100;
const textHeight = 14;
const textMargin = 6;

const ChurchCircles12Template = {
    version: '0.6',
    title: 'Church Circles 12 Practices',
    name: 'church-circles-12',
    format: 'churchCirclesOkc',
    icon: 'templates/church-circles-12/icons/display.png',
    settings: {
        'textHeight': textHeight,
        'boxHeight': boxHeight,
        'nodeActions': {
            'x': boxHeight / 2,
            'y': 0
        },
        'nodeSize': {
            'width': boxHeight * 1.5,
            'height': boxHeight * 2.1
        }
    },
    svg: {
        'big-rect': {
            // Rect with opacity 0, so that one could hover over all the square even
            // if the visible shape is circle
            'type': 'rect',
            'attributes': {
                'x': -boxHeight / 2,
                'y': -40,
                'width': boxHeight,
                'height': boxHeight + 40,
                'opacity': '0'
            }
        },
        'attenders-image': {
            'type': 'image',
            'attributes': {
                'x': -boxHeight * 0.5,
                'y': -2.8 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
                'xlink:href': 'templates/church-circles-12/icons/attenders.png'
            }
        },
        'believers-image': {
            'type': 'image',
            'attributes': {
                'x': -boxHeight * 0.25,
                'y': -2.8 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
                'xlink:href': 'templates/church-circles-12/icons/believers.png'
            }
        },
        'baptized-image': {
            'type': 'image',
            'attributes': {
                'x': boxHeight * 0.1,
                'y': -2.8 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
                'xlink:href': 'templates/church-circles-12/icons/element-baptism.png'
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
    reports: [
        {
            name: 'active',
            type: 'boolean'
        },
        {
            name: 'attenders',
            type: 'number'
        },
        {
            name: 'believers',
            type: 'number'
        },
        {
            name: 'baptized',
            type: 'number'
        },
        {
            name: 'newlyBaptized',
            type: 'number'
        },
        {
            name: 'church',
            type: 'boolean'
        }
    ],
    templateReports: [
        {
            name: 'churchFunctions',
            fields: [
                'elementGospel',
                'elementRepent',
                'elementBaptism',
                'elementHolySpirit',
                'elementWord',
                'elementLove',
                'elementLordsSupper',
                'elementPrayer',
                'elementSignsWonders',
                'elementGive',
                'elementWorship',
                'elementMakeDisciples',
                'church',
                'active'
            ],
            graph: 'verticalBarChart',
            order: 4,
        },
        {
            name: 'churchType',
            field: 'churchType',
            graph: 'pieChart',
            order: 2
        },
        {
            name: 'threeThirds',
            field: 'threeThirds',
            graph: 'pieGrid',
            order: 3
        }
    ],
    defaultAttributes: [
        {
            propertyName: 'leaderName',
            type: 'text',
            order: 5,
            isLabel: true,
            isVisible: true,
        },
        {
            propertyName: 'email',
            type: 'text',
            order: 6,
            isLabel: false,
            isVisible: true,
        },
        {
            propertyName: 'date',
            type: 'text',
            order: 7,
            isLabel: true,
            isVisible: true,
            deprecated: true,
        },
        {
            propertyName: 'place',
            type: 'text',
            order: 8,
            isLabel: true,
            isVisible: true,
        }
    ],
    fields: [
        {
            header: 'id',
            i18nRef: '',
            initial: 0,
            type: null,
            canModify: false,
        },
        {
            header: 'parentId',
            i18nRef: 'parentId',
            initial: null,
            type: null,
            canModify: false,
        },
        {
            header: 'newGeneration',
            i18nRef: 'churchCircles.newGeneration',
            initial: false,
            type: 'checkbox',
            canModify: true,
            order: 1,
        },
        {
            header: 'active',
            i18nRef: 'churchCircles.active',
            initial: true,
            type: 'checkbox',
            canModify: true,
            order: 2,
            // svg defined currently in genmapper.js
        },
        {
            header: 'inactiveReason',
            i18nRef: 'churchCircles.inactiveReason',
            initial: '',
            type: 'textarea',
            dependsOnFalseField: 'active',
            canModify: true,
            canModifyVisibility: true,
            order: 3,
        },
        {
            header: 'name',
            i18nRef: 'churchCircles.name',
            initial: '',
            type: 'text',
            canModify: true,
            canModifyVisibility: false,
            order: 4,
            svg: {
                type: 'text',
                attributes: {
                    'x': boxHeight * 0.03,
                    'y': boxHeight + textHeight
                }
            },
        },
        // {
        //     'header': 'startDate',
        //     'type': 'date',
        //     'canModify': true,
        //     'canModifyVisibility': false,
        //     'order': 5,
        // },
        {
            header: 'location',
            initial: '',
            type: 'geoLocation',
            canModify: true,
            canModifyVisibility: true,
        },
        {
            header: 'latitude',
            initial: null,
            type: 'hidden',
            canModify: false,
        },
        {
            header: 'longitude',
            initial: null,
            type: 'hidden',
            canModify: false,
        },
        {
            header: 'placeId',
            initial: null,
            type: 'hidden',
            canModify: false,
        },
        {
            header: 'peopleGroups',
            initial: null,
            type: 'peidSelect',
            canModify: true,
            canModifyVisibility: true,
        },
        {
            header: 'peopleGroupsNames',
            initial: null,
            type: 'hidden',
            canModify: false
        },
        {
            header: 'attenders',
            initial: 0,
            type: 'number',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                type: 'text',
                attributes: {
                    'x': -boxHeight * 0.39,
                    'y': -0.8 * textMargin
                },
                style: {
                    'text-anchor': 'center'
                }
            },
        },
        {
            header: 'believers',
            initial: 0,
            type: 'number',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'text',
                'attributes': {
                    'x': -boxHeight * 0.13,
                    'y': -0.8 * textMargin
                },
                'style': {
                    'text-anchor': 'center'
                }
            }
        },
        {
            header: 'baptized',
            initial: 0,
            type: 'number',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'text',
                'attributes': {
                    'x': boxHeight * 0.13,
                    'y': -0.8 * textMargin
                },
                'style': {
                    'text-anchor': 'center'
                }
            }
        },
        {
            header: 'newlyBaptized',
            initial: 0,
            type: 'number',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'text',
                'attributes': {
                    'x': boxHeight * 0.39,
                    'y': -0.8 * textMargin
                },
                'style': {
                    'text-anchor': 'center'
                }
            }
        },
        {
            header: 'gospelShares',
            initial: 0,
            type: 'number',
            canModify: true,
            canModifyVisibility: false
        },
        {
            header: 'church',
            initial: false,
            type: 'checkbox',
            inheritsFrom: 'church-box',
            canModify: true,
            canModifyVisibility: false,
            class: {
                'checkedTrue': 'is-church',
                'checkedFalse': 'is-not-church'
            }
        },
        {
            header: 'churchType',
            initial: 'newBelievers',
            type: 'radio',
            inheritsFrom: 'church-box',
            canModify: true,
            canModifyVisibility: false,
            values: [
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
            header: 'elementGospel',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.4,
                    'y': boxHeight * 0.165,
                    'width': boxHeight / 6,
                    'height': boxHeight / 6,
                    'xlink:href': 'templates/church-circles-12/icons/element-gospel.png'
                }
            }
        },
        {
            header: 'elementRepent',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': -(boxHeight / 5.5),
                    'y': boxHeight * 0.165,
                    'width': boxHeight / 7,
                    'height': boxHeight / 7,
                    'xlink:href': 'templates/church-circles-12/icons/element-repent.png'
                }
            }
        },
        {
            header: 'elementBaptism',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * 0.03,
                    'y': boxHeight * 0.165,
                    'width': boxHeight / 6,
                    'height': boxHeight / 6,
                    'xlink:href': 'templates/church-circles-12/icons/element-baptism.png'
                }
            },
        },
        {
            header: 'elementHolySpirit',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': boxHeight / 4,
                    'y': boxHeight * 0.165,
                    'width': boxHeight / 6,
                    'height': boxHeight / 6,
                    'xlink:href': 'templates/church-circles-12/icons/element-holy-spirit.png'
                }
            },

        },
        {
            header: 'elementWord',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.4,
                    'y': boxHeight * 0.4,
                    'width': boxHeight / 6,
                    'height': boxHeight / 6,
                    'xlink:href': 'templates/church-circles-12/icons/element-word.png'
                }
            },

        },
        {
            header: 'elementLove',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': -(boxHeight / 5.5),
                    'y': boxHeight * 0.4,
                    'width': boxHeight / 6,
                    'height': boxHeight / 6,
                    'xlink:href': 'templates/church-circles-12/icons/element-love.png'
                }
            }
        },
        {
            header: 'elementLordsSupper',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * 0.03,
                    'y': boxHeight * 0.4,
                    'width': boxHeight / 6,
                    'height': boxHeight / 6,
                    'xlink:href': 'templates/church-circles-12/icons/element-lords-supper.png'
                }
            }
        },
        {
            header: 'elementPrayer',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': boxHeight / 4,
                    'y': boxHeight * 0.4,
                    'width': boxHeight / 6,
                    'height': boxHeight / 6,
                    'xlink:href': 'templates/church-circles-12/icons/element-prayer.png'
                }
            },
        },
        {
            header: 'elementSignsWonders',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight * 0.4,
                    'y': boxHeight * 0.65,
                    'width': boxHeight / 6,
                    'height': boxHeight / 6,
                    'xlink:href': 'templates/church-circles-12/icons/element-signs-wonders.png'
                }
            },
        },
        {
            header: 'elementGive',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': -boxHeight / 6,
                    'y': boxHeight * 0.65,
                    'width': boxHeight / 6,
                    'height': boxHeight / 6,
                    'xlink:href': 'templates/church-circles-12/icons/element-give.png'
                }
            },
        },
        {
            header: 'elementWorship',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': boxHeight * 0.03,
                    'y': boxHeight * 0.65,
                    'width': boxHeight / 6,
                    'height': boxHeight / 6,
                    'xlink:href': 'templates/church-circles-12/icons/element-worship.png'
                }
            }
        },
        {
            header: 'elementMakeDisciples',
            initial: false,
            type: 'checkbox',
            canModify: true,
            canModifyVisibility: false,
            svg: {
                'type': 'image',
                'attributes': {
                    'x': boxHeight / 4,
                    'y': boxHeight * 0.65,
                    'width': boxHeight / 6,
                    'height': boxHeight / 6,
                    'xlink:href': 'templates/church-circles-12/icons/element-make-disciples.png'
                }
            }
        },
        {
            header: 'threeThirds',
            initial: ['1', '2', '3', '4', '5', '6', '7'],
            type: 'multiSelect',
            canModify: true,
            canModifyVisibility: false,
            values: [
                { value: '1', header: 'threeThirdsPastoralCare' },
                { value: '2', header: 'threeThirdsWorship' },
                { value: '3', header: 'threeThirdsAccountability' },
                { value: '4', header: 'threeThirdsVisionCasting' },
                { value: '5', header: 'threeThirdsBibleTeaching' },
                { value: '6', header: 'threeThirdsPractice' },
                { value: '7', header: 'threeThirdsGoalSetting' },
            ],
            svg: {
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
            'type': 'textarea',
            'canModify': true,
            'canModifyVisibility': true,
        }
    ]
};
