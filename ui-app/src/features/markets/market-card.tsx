import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Avatar, Button, Card } from "antd"

export const MarketCard = () => {
    return (
        <Card style={{ width: '30%' }}>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', gap: '10px' }}>
                    <Button shape="circle" icon={<EditOutlined />}></Button>
                    <Button danger shape="circle" icon={<DeleteOutlined />}></Button>
                </div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar size={100}/>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h3>E-Grocery Super Market</h3>
                        <div style={{ color: '#828e95' }}><p>Seller ID: #009</p></div>
                        <div style={{ color: '#828e95' }}><p>heathercarpenter@dayrep.com</p></div>
                    </div>
                    <div style={{ marginTop: '25px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                            <div>
                                <div style={{ color: '#828e95' }}>Gross Sale</div>
                                <div><h3>$200.00</h3></div>
                            </div>
                            <div>
                                <div style={{ color: '#828e95' }}>Earning</div>
                                <div><h3>$200.00</h3></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}