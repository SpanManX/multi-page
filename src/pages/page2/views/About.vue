<template>
    <div class="about">
        <div id="test" ref="test">

        </div>
    </div>
</template>
<script>
    import * as echarts from 'echarts';

    export default {
        mounted() {
            this.$nextTick(() => {
                let myChart = echarts.init(this.$refs.test);
                let option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        top: '5%',
                        left: 'center'
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                emphasis: {
                                    color: '#ffffff'
                                }
                            },
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '40',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                {value: 1048, name: '搜索引擎'},
                                {value: 735, name: '直接访问'},
                                {value: 580, name: '邮件营销'},
                                {value: 484, name: '联盟广告'},
                                {value: 300, name: '视频广告'}
                            ]
                        }
                    ]
                };
                myChart.setOption(option);
                myChart.on('mouseover', function (params) {
                    console.log(params);
                    // params.color = '#ffffff'
                    // myChart.dispatchAction({
                    //     type:'highlight',//默认显示江苏的提示框
                    //     seriesIndex: 0,//这行不能省
                    //     name: params.name
                    // });
                });
            })
        }
    }
</script>
<style>
    .about {
        height: 400px;
        width: 400px;
    }

    #test {
        height: 100%;
        width: 100%;
    }
</style>