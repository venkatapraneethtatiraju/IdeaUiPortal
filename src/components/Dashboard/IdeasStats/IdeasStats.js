import React, { PureComponent } from 'react'
import "./IdeasStats.scss"
import { Col, Card, Tabs } from 'antd';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { getIdeaStats } from '../../../services/AppService';
import {
    ALL, MONTH, QUARTER, YEAR,
    SUBMITTED, APPROVED, DEVELOPMENT,
    COMPLETED, SUCCESS
} from '../../../Config/Constants';

const { TabPane } = Tabs;

export class IdeasStats extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            chartOptions: {
                chart: {
                    type: 'column',
                    height: 226,
                    style: {
                        fontFamily: ''
                    }
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: [],
                    labels: {
                        style: {
                            fontSize: '8px',
                        },
                        x: 0,
                        y: 12
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        style: {
                            fontSize: '7px',
                        },
                        x: -10,
                        y: 2
                    }
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    y: 5,
                    shadow: false,
                    symbolPadding: 1,
                    padding: 2,
                    itemStyle: {
                        fontSize: '9px',
                        fontWeight: 'normal'
                    },
                    itemDistance: 10
                },
                tooltip: {
                    shared: true,
                    hideDelay: 100,
                    borderRadius: 12,
                    formatter: function () {
                        return this.points.reduce(function (s, point) {
                            return s + '<br/>' + point.series.name + ': ' +
                                point.y;
                        }, '');
                    },
                },
                plotOptions: {
                    column: {
                        grouping: false,
                        shadow: false,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: SUBMITTED,
                    color: '#A5AAD9',
                    data: [],
                    pointPadding: 0,
                    pointPlacement: 0
                },
                {
                    name: APPROVED,
                    color: '#0C5CC9',
                    data: [],
                    pointPadding: 0.2,
                    pointPlacement: 0
                },
                {
                    name: DEVELOPMENT,
                    color: '#9B6496',
                    data: [],
                    pointPadding: 0.2,
                    pointPlacement: 0
                },
                {
                    name: COMPLETED,
                    color: '#1A8B45',
                    data: [],
                    pointPadding: 0.2,
                    pointPlacement: 0
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 600
                        },
                        chartOptions: {
                            legend: {
                                align: 'center',
                                layout: 'horizontal'
                            },
                            yAxis: {
                                title: {
                                    text: ''
                                },
                                labels: {
                                    style: {
                                        fontSize: '7px',
                                    },
                                    x: -10,
                                    y: 2
                                }
                            },
                            subtitle: {
                                text: null
                            },
                        }
                    }]
                }
            }
        };
    }

    //Load Idea stats data on page load for All time
    componentDidMount() {
        this.getIdeaStatsRecord(ALL);
    }

    //Unmount the component
    componentWillUnmount() {
        this.mounted = false;
    }

    //Get the Idea stats based on Key
    onTabChange = (key) => {
        this.getIdeaStatsRecord(key);
    }

    //To get the Idea Stats
    getIdeaStatsRecord = (Key) => {
        getIdeaStats(Key)
            .then(response => {
                if (response.data.message === SUCCESS) {
                    const xaxisCategories = this.createXaxisCategory(response.data.result);
                    const seriesNewData = this.createIdeaStatsSeries(response.data.result, this.state.chartOptions.series);
                    this.setState({ chartOptions: { series: seriesNewData, xAxis: { categories: xaxisCategories } } })
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    //Create the series data
    createIdeaStatsSeries = (responseResult, seriesData) => {
        let submittedArr = [];
        let approvedArr = [];
        let developmentArr = [];
        let completedArr = [];

        for (let idea of responseResult) {
            submittedArr.push(idea.submittedCount);
            approvedArr.push(idea.approvedCount);
            developmentArr.push(idea.developmentCount);
            completedArr.push(idea.completedCount);
        }

        const newSeriesData = seriesData;
        newSeriesData.forEach((idea) => {
            if (idea.name === SUBMITTED) {
                idea.data = submittedArr;
            } else if (idea.name === APPROVED) {
                idea.data = approvedArr;
            } else if (idea.name === DEVELOPMENT) {
                idea.data = developmentArr;
            } else if (idea.name === COMPLETED) {
                idea.data = completedArr;
            }
        });
        return newSeriesData;
    }

    //Create the X axis categories
    createXaxisCategory = (responseResult) => {
        let categotyArr = [];
        for (let idea of responseResult) {
            categotyArr.push(idea.location);
        }
        return categotyArr;
    }

    render() {
        return (
            <>
                <Col span={9} className="idea-stats-container">
                    <h2>Ideas stats</h2>
                    <Card>
                        <Tabs defaultActiveKey={ALL} onChange={this.onTabChange.bind(this)}>
                            <TabPane tab="Month" key={MONTH} />
                            <TabPane tab="Quarter" key={QUARTER} />
                            <TabPane tab="Year" key={YEAR} />
                            <TabPane tab="All time" key={ALL} />
                        </Tabs>
                        <HighchartsReact
                            {...this.state}
                            highcharts={Highcharts}
                            options={this.state.chartOptions}
                        />
                    </Card>
                </Col>
            </>
        )
    }
}

export default IdeasStats
