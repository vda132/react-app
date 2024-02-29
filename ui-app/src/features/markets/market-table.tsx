import { Table, TableColumnsType } from "antd"

const columns: TableColumnsType<any> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gross Sale',
        dataIndex: 'grossSale',
        key: 'grossSale',
    },
    {
        title: 'Earning',
        dataIndex: 'earning',
        key: 'earning',
    }
]

const dataSource = [
    {
        key: '1',
        name: 'E-Grocery Super Market',
        email: 'egrocery@dayrep.com',
        grossSale: '$200.00',
        earning: '$60.00'
    },
    {
        key: '2',
        name: 'DealShare Mart',
        email: 'werve1962@superrito.com',
        grossSale: '$350.00',
        earning: '$150.00'
    },
    {
        key: '3',
        name: 'DMart',
        email: 'trablinever@armyspy.com',
        grossSale: '$120.00',
        earning: '$45.00'
    },
]

export const MarketTable = () => {
    return (
        <Table columns={columns} dataSource={dataSource} />
    )
}