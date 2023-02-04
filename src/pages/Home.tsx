import {Button, Card, DatePicker, message, Select, Space, Spin, Typography} from 'antd';
import React, {useCallback, useEffect, useState} from 'react';
import {PieChartOutlined, PlusOutlined, UnorderedListOutlined} from "@ant-design/icons";
import Wrapper from "../layout";
import AddEditTransaction from "../components/add-edit-transaction";
import axios from "axios";
import ListView from "../components/list-view";
import AnalyticsView from "../components/analytics";

import {ITransaction, IUser} from "../types";

const {RangePicker} = DatePicker;

const tabList = [
  {
    key: 'tab1',
    tab: <Space size="small"><UnorderedListOutlined/>Transactions</Space>,
  },
  {
    key: 'tab2',
    tab: <Space size="small"><PieChartOutlined/>Analytics</Space>,
  },
];

const Home = () => {
  const [openNewTransact, setOpenNewTransact] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState<string>('tab1');
  const [transactionsData, setTransactionsData] = useState<ITransaction[]>([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedRange, setSelectedRange] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState<ITransaction>();
  const [type, setType] = useState('all');
  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  const handleNewModalClose = (): void => {
    setOpenNewTransact(false);
    setSelectedItem(undefined);
  };

  const handlePostTransaction = async (payload: ITransaction): Promise<void> => {
    setLoading(true);
    try {
      if (Boolean(selectedItem)) {
        await axios.post(`/api/transactions/edit-transaction`, payload);
        message.success('Transaction updated successfully');
      } else {
        await axios.post(`/api/transactions/add-transaction`, payload);
        message.success('Added transaction successfully');
      }
      await getAllTransactions();
      handleNewModalClose();
      setLoading(false);
    } catch (e) {
      message.error('Something went wrong');
      setLoading(false);
    }
  }

  const handleDeleteTransaction = async (payload: ITransaction): Promise<void> => {
    setLoading(true);
    try {
      await axios.post(`/api/transactions/delete-transaction`, payload);
      message.success('Transaction deleted successfully');
      await getAllTransactions();
      setLoading(false);
    } catch (e) {
      message.error(`Something went wrong - ${e}`);
      setLoading(false);
    }
  }

  const getAllTransactions = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      if (Boolean(selectedRange)) {
        const user: IUser | null = JSON.parse(localStorage.getItem('outlay-user') ?? '');
        const res = await axios.post('/api/transactions/get-all', {
          userid: user?._id,
          frequency,
          ...(frequency === 'custom' && {selectedRange}),
          type
        })
        setTransactionsData(res.data);
        setLoading(false);
      }
    } catch (e) {
      message.error('Something went wrong');
      setLoading(false);
    }
  }, [frequency, selectedRange, type]);

  const contentList: Record<string, React.ReactNode> = {
    tab1: <ListView
      key='list-view'
      loading={loading}
      transactionsData={transactionsData}
      handleOpenViewModal={(item) => {
        setOpenNewTransact(true);
        setSelectedItem(item);
      }}
      handleDelete={handleDeleteTransaction}/>,
    tab2: <AnalyticsView key='analytics-view' transactionsData={transactionsData}/>,
  };

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  return (
    <Wrapper>
      <Spin spinning={loading}>
        <Typography.Title level={4} className="mb-3">Expenses</Typography.Title>
        <Card
          style={{width: '100%'}}
          title={
            <Space align="end">
              <Space direction="vertical">
                <Typography.Text>Select period</Typography.Text>
                <Select
                  value={frequency}
                  options={[
                    {value: '7', label: 'Last 1 week'},
                    {value: '30', label: 'Last 1 month'},
                    {value: '365', label: 'Last 1 year'},
                    {value: 'custom', label: 'Custom'},
                  ]}
                  onChange={(value) => setFrequency(value)}
                  style={{width: 200}}/>
              </Space>
              {frequency === 'custom' &&
								<RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)}/>}
              <Space direction="vertical">
                <Typography.Text>Select type</Typography.Text>
                <Select
                  value={type}
                  options={[
                    {value: 'all', label: 'All'},
                    {value: 'income', label: 'Income'},
                    {value: 'expense', label: 'Expense'},
                  ]}
                  onChange={(value) => setType(value)}
                  style={{width: 200}}/>
              </Space>
            </Space>
          }
          extra={<Button icon={<PlusOutlined/>} type="primary" onClick={() => setOpenNewTransact(true)}>Add
            New</Button>}
          tabList={tabList}
          activeTabKey={activeTabKey}
          onTabChange={onTabChange}
          bordered={false}
        >
          {contentList[activeTabKey]}
        </Card>
      </Spin>
      {openNewTransact &&
				<AddEditTransaction
					loading={loading}
					handleClose={handleNewModalClose}
					open={openNewTransact}
					handlePost={handlePostTransaction}
					selectedItem={selectedItem!}/>
      }
    </Wrapper>
  );
};

export default Home;
