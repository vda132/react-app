import { AccountBookOutlined, DollarOutlined, RiseOutlined, UserOutlined } from "@ant-design/icons"
import { Card, Col, Row } from "antd"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    { id: '1' },
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    // responsive: true,
    maintainAspectRatio: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => Math.floor(Math.random() * 151)),
            backgroundColor: 'blue',
        }
    ],
};

export const DashboardMain = () => {
    const myChart = ChartJS.instances['1'];

    useEffect(() => {
        const listener = () => {
            if (myChart)
                myChart.resize();
        };
        window.addEventListener('resize', listener)
        return () => {
            window.removeEventListener('resize', listener);
        }
    }, [myChart])

    return (
        <div>
            <Row>
                <Col xs={24} xxl={19} style={{ flex: '0 0 80%', maxWidth: '80%' }}>
                    <div>
                        <Row gutter={16}>
                            <Col span={8} xl={8} xs={24}>
                                <Card style={{ marginBottom: '24px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <div>TOTAL EARNINGS</div>
                                            <div>
                                                <h4 style={{ fontSize: '22px', margin: '0' }}>
                                                    $ <span>745.35</span>
                                                </h4>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <h4 style={{ fontSize: '12px', color: '#55c27f', margin: '0' }}>
                                                    <RiseOutlined />
                                                    +18.30 %
                                                </h4>
                                                <div style={{ fontSize: '14px', color: 'rgb(135, 138, 153)' }}>than last month</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ecfff3', color: '#55c27f', width: '48px', height: '48px', fontSize: '35px' }}>
                                                <DollarOutlined />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                                <Card style={{ marginBottom: '24px' }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <div
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#dbeff3', color: '#51b3c3', width: '48px', height: '48px', fontSize: '35px' }}>
                                                <AccountBookOutlined />
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                            <div>Orders</div>
                                            <div>
                                                <h4 style={{ fontSize: '22px', margin: '0' }}>
                                                    <span>698.36k</span>
                                                </h4>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <div style={{ fontSize: '14px', color: 'rgb(135, 138, 153)' }}>than last month</div>
                                                <h4 style={{ fontSize: '12px', color: 'red', margin: '0' }}>
                                                    <RiseOutlined />
                                                    -2.74 %
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                                <Card>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <div>CUSTOMERS</div>
                                            <div>
                                                <h4 style={{ fontSize: '22px', margin: '0' }}>
                                                    <span>183.35M</span>
                                                </h4>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <h4 style={{ fontSize: '12px', color: '#55c27f', margin: '0' }}>
                                                    <RiseOutlined />
                                                    +29.30 %
                                                </h4>
                                                <div style={{ fontSize: '14px', color: 'rgb(135, 138, 153)' }}>than last month</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ecfff3', color: '#55c27f', width: '48px', height: '48px', fontSize: '35px' }}>
                                                <UserOutlined />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8} xl={16} xs={24}>
                                <Card>
                                    <div>
                                        <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '16px' }}>Revenue</div>
                                        <Row>
                                            <Col xs={12} sm={6} style={{ textAlign: 'center' }}>
                                                <div style={{
                                                    padding: '12px 0',
                                                    border: '1px solid rgb(239, 242, 247)'
                                                }}>
                                                    <h5 style={{ fontSize: '18px', marginBottom: '4px', marginTop: '0' }}>
                                                        <span>7,585</span>
                                                    </h5>
                                                    <div style={{ fontSize: '14px', color: 'rgb(135, 138, 153)' }}>
                                                        Orders
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={12} sm={6} style={{ textAlign: 'center' }}>
                                                <div style={{
                                                    padding: '12px 0',
                                                    border: '1px solid rgb(239, 242, 247)'
                                                }}>
                                                    <h5 style={{ fontSize: '18px', marginBottom: '4px', marginTop: '0' }}>
                                                        <span>7,585</span>
                                                    </h5>
                                                    <div style={{ fontSize: '14px', color: 'rgb(135, 138, 153)' }}>
                                                        Orders
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={12} sm={6} style={{ textAlign: 'center' }}>
                                                <div style={{
                                                    padding: '12px 0',
                                                    border: '1px solid rgb(239, 242, 247)'
                                                }}>
                                                    <h5 style={{ fontSize: '18px', marginBottom: '4px', marginTop: '0' }}>
                                                        <span>7,585</span>
                                                    </h5>
                                                    <div style={{ fontSize: '14px', color: 'rgb(135, 138, 153)' }}>
                                                        Orders
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={12} sm={6} style={{ textAlign: 'center' }}>
                                                <div style={{
                                                    padding: '12px 0',
                                                    border: '1px solid rgb(239, 242, 247)'
                                                }}>
                                                    <h5 style={{ fontSize: '18px', marginBottom: '4px', marginTop: '0' }}>
                                                        <span>7,585</span>
                                                    </h5>
                                                    <div style={{ fontSize: '14px', color: 'rgb(135, 138, 153)' }}>
                                                        Orders
                                                    </div>
                                                </div>
                                            </Col>
                                            <div style={{ marginTop: '20px', width: '100%' }}>
                                                <Bar options={options} data={data} />
                                            </div>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>

    )
}