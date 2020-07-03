import { GMTemplate, ReportType } from '../template.interface';

export const boxHeight = 100;
export const textHeight = 14;
export const textMargin = 6;
export const boxMargin = 40;

export const nodeWidth = 156;
export const nodeHeight = 222;

export const ChurchCirclesEastTemplate: GMTemplate = {
    id: 'churchCirclesEast',
    name: 'Church Circles East',
    i18nName: 'churchCirclesEast.ChurchCirclesEast',
    theme: 'churchCirclesDefault',
    defaultConfiguration: 'churchCirclesEast',
    settings: {
        iconUrl: 'templates/church-circles-east/icons/display.png'
    },
    svgSettings: {
        textHeight: textHeight,
        boxHeight: boxHeight,
        iconSize: boxHeight / 4,
        nodeActions: {
            x: -boxHeight / 1.3,
            y: 0,
            height: 40,
            width: 28
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
                'x': -(nodeWidth / 2) - 1,
                'y': 10
            },
            iconX: 14,
            iconY: 32
        },
        {
            id: 'add-child-node-action',
            control: 'addChildNode',
            iconName: 'add',
            tooltipi18nRef: 'Node_hoverAddChildGroup',
            attributes: {
                'x': -(nodeWidth / 2) - 1,
                'y': 50
            },
            iconX: 14,
            iconY: 32
        }
    ],
    svgs: [
        {
            id: 'hover-rect',
            type: 'rect',
            attributes: {
                x: -(nodeWidth / 2),
                y: -(textHeight * 3),
                height: nodeHeight - textHeight,
                width: nodeWidth,
                rx: 4,
            },
            style: {
                // fill: 'none',
                // stroke: '#999',
            }
        },
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
                'stroke-width': 2,
                'stroke': 'black'
            }
        },
        {
            id: 'topIcon1',
            type: 'image',
            attributes: {
                'x': -boxHeight * 0.4,
                'y': -(textHeight * 2.8),
                'width': boxHeight / 5,
                'height': boxHeight / 5,
            }
        },
        {
            id: 'topIcon2',
            type: 'image',
            attributes: {
                'x': -((boxHeight / 5) / 2),
                'y': -2.8 * textHeight,
                'width': boxHeight / 5,
                'height': boxHeight / 5,
            }
        },
        {
            id: 'topIcon3',
            type: 'image',
            attributes: {
                'x': boxHeight * 0.25,
                'y': -2.8 * textHeight,
                'width': boxHeight / 5,
                'height': boxHeight / 5,
            }
        },
        {
            id: 'topNumber1',
            type: 'text',
            attributes: {
                'x': -boxHeight * 0.32,
                'y': -0.8 * textMargin,
            },
        },
        {
            id: 'topNumber2',
            type: 'text',
            attributes: {
                'x': 0,
                'y': -0.8 * textMargin
            },
        },
        {
            id: 'topNumber3',
            type: 'text',
            attributes: {
                'x': boxHeight * 0.3,
                'y': -0.8 * textMargin
            },
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
                'y': boxHeight * 0.15,
                'height': boxHeight / 6,
                'width': boxHeight / 6
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
            },
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
        },
        {
            id: 'drag-rect',
            type: 'rect',
            dragAnchor: true,
            attributes: {
                'x': -boxHeight / 2,
                'y': -40,
                'width': boxHeight,
                'height': boxHeight + 40,
                'opacity': '0'
            }
        },
    ],
    reports: [
        {
            name: 'active',
            type: ReportType.boolean
        },
        {
            name: 'attenders',
            type: ReportType.number
        },
        {
            name: 'believers',
            type: ReportType.number
        },
        {
            name: 'baptized',
            type: ReportType.number
        },
        {
            name: 'church',
            type: ReportType.boolean
        }
    ],
    templateReports: [
        {
            name: 'churchFunctions',
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
        }
    ]
};
