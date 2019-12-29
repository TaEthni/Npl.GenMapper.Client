import { GMTemplate } from '../template.interface';

// export interface ChurchCirclesTemplateType extends GMTemplate {
//     translations: { [key: string]: { translation: { [key: string]: ChurchCirclesTranslation } } };
// }

const boxHeight = 100;
const textHeight = 14;
const textMargin = 6;

const nodeWidth = 155;
const nodeHeight = 222;

export const ChurchCirclesCzechTemplate: GMTemplate = {
    id: 'churchCirclesCzech',
    name: 'Church Circles Czech',
    i18nName: 'churchCircles.ChurchCircles',
    theme: 'churchCirclesDefault',
    defaultConfiguration: 'churchCirclesCzech',
    settings: {
        // iconUrl: 'templates/church-circles/icons/display.png'
    },
    svgSettings: {
        textHeight: textHeight,
        boxHeight: boxHeight,
        iconSize: boxHeight / 4,
        nodeActions: {
            x: boxHeight / 2,
            y: 0,
            height: 40,
            width: 28,
        },
        nodeBounds: {
            width: boxHeight * 1.5,
            height: boxHeight * 2.1
        },
        nodeWidth,
        nodeHeight
    },
    svgActions: [
        {
            id: 'edit-node-action',
            control: 'editNode',
            iconName: 'edit',
            tooltipi18nRef: 'Node_EditGroup',
            attributes: {
                x: boxHeight / 2,
                y: 10,
            },
            iconX: '14px',
            iconY: '32px'
        },
        {
            id: 'add-child-node-action',
            control: 'addChildNode',
            iconName: 'add',
            tooltipi18nRef: 'Node_hoverAddChildGroup',
            attributes: {
                x: boxHeight / 2,
                y: 50,
            },
            iconX: '14px',
            iconY: '32px'
        }
    ],
    svgs: [
        {
            id: 'big-rect',
            type: 'rect',
            attributes: {
                'x': -boxHeight / 2,
                'y': -40,
                'width': boxHeight,
                'height': boxHeight + 40,
                'opacity': '0'
            }
        },
        {
            id: 'church-box',
            type: 'rect',
            attributes: {
                'x': -boxHeight / 2,
                'y': 0,
                'rx': 0.5 * boxHeight,
                'width': boxHeight,
                'height': boxHeight
            },
            style: {
                'stroke-opacity': 1,
                'stroke-width': 2,
                'stroke': 'black'
            }
        },
        {
            id: 'topIcon1',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.52,
                'y': -3 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
            },
            style: {
                'opacity': 1
            },
        },
        {
            id: 'topIcon2',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.25,
                'y': -3 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
            },
            style: {
                'opacity': 1
            },
        },
        {
            id: 'topIcon3',
            type: 'image',
            attributes: {
                'x': boxHeight * 0.01,
                'y': -3 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
            },
            style: {
                'opacity': 1
            },
        },
        {
            id: 'topIcon4',
            type: 'image',
            attributes: {
                'x': boxHeight * 0.26,
                'y': -3 * textHeight,
                'width': boxHeight / 4,
                'height': boxHeight / 4,
            },
            style: {
                'opacity': 1
            },
        },
        {
            id: 'topNumber1',
            type: 'text',
            attributes: {
                'x': -boxHeight * 0.39,
                'y': -0.8 * textMargin
            },
            style: {
                'text-anchor': 'center'
            }
        },
        {
            id: 'topNumber2',
            type: 'text',
            attributes: {
                'x': -boxHeight * 0.13,
                'y': -0.8 * textMargin
            },
            style: {
                'text-anchor': 'center'
            }
        },
        {
            id: 'topNumber3',
            type: 'text',
            attributes: {
                'x': boxHeight * 0.13,
                'y': -0.8 * textMargin
            },
            style: {
                'text-anchor': 'center'
            }
        },
        {
            id: 'topNumber4',
            type: 'text',
            attributes: {
                'x': boxHeight * 0.39,
                'y': -0.8 * textMargin
            },
            style: {
                'text-anchor': 'center'
            }
        },
        {
            id: 'leftText1',
            type: 'text',
            attributes: {
                'x': boxHeight * -0.5,
                'y': boxHeight * 0.6,
                'transform': 'rotate(90 -56 48)',
                'rotate': -90
            },
            style: {
                'text-anchor': 'center',
                'letter-spacing': '0.35em'
            }
        },
        {
            id: 'icon1',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.4,
                'y': boxHeight * 0.1,
            }
        },
        {
            id: 'icon2',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.125,
                'y': boxHeight * 0.1,
            }
        },
        {
            id: 'icon3',
            type: 'image',
            attributes: {
                'x': boxHeight * 0.15,
                'y': boxHeight * 0.1,
            }
        },
        {
            id: 'icon4',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.4,
                'y': boxHeight * 0.375,
            }
        },
        {
            id: 'icon5',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.125,
                'y': boxHeight * 0.375,
            }
        },
        {
            id: 'icon6',
            type: 'image',
            attributes: {
                'x': boxHeight * 0.15,
                'y': boxHeight * 0.375,
            }
        },
        {
            id: 'icon7',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.4,
                'y': boxHeight * 0.65,
            }
        },
        {
            id: 'icon8',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.125,
                'y': boxHeight * 0.65,
            }
        },
        {
            id: 'icon9',
            type: 'image',
            attributes: {
                'x': boxHeight * 0.15,
                'y': boxHeight * 0.65,
            }
        }
    ],
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
            i18nRef: 'Common_ChurchFunctions',
            fields: [
                'elementBaptism',
                'elementWord',
                'elementPrayer',
                'elementLordsSupper',
                'elementGive',
                'elementLove',
                'elementWorship',
                'elementLeaders',
                'elementMakeDisciples',
                'church',
                'active'
            ],
            graph: 'verticalBarChart',
            order: 4,
        },
        {
            name: 'churchType',
            i18nRef: 'Common_ChurchType',
            field: 'churchType',
            graph: 'pieChart',
            order: 2
        },
        {
            name: 'threeThirds',
            i18Ref: 'Common_ThreeThirds',
            field: 'threeThirds',
            graph: 'pieGrid',
            order: 3
        }
    ],
};
