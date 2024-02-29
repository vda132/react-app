import { Button, Row } from "antd";
import { useState } from "react"
import { MarketCard } from "./market-card";
import { MarketTable } from "./market-table";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";

export const MarketsView = () => {
    const [isCardView, setIsCardView] = useState(true);

    const renderMarketCards = () => (
        <Row wrap style={{gap: '10px'}} justify={'center'}>
            <MarketCard />
            <MarketCard />
            <MarketCard />
        </Row>
    )

    const renderMarketsTable = () => (
        <MarketTable />
    )

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <Button
                    type={isCardView ? 'primary' : 'default'}
                    icon={<AppstoreOutlined />}
                    onClick={() => setIsCardView(true)}>
                </Button>
                <Button
                    type={!isCardView ? 'primary' : 'default'}
                    icon={<UnorderedListOutlined />}
                    onClick={() => setIsCardView(false)}>
                </Button>
            </div>
            <div>
                {isCardView ? renderMarketCards() : renderMarketsTable()}
            </div>
        </div>
    )
}   