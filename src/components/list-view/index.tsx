import React from 'react';
import {Button, Space, Table, Typography} from "antd";
import {ColumnsType} from "antd/es/table";
import moment from "moment/moment";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {ITransaction} from "../../types";

interface IProps {
  transactionsData: ITransaction[]
  loading: boolean
  handleOpenViewModal: (item: ITransaction) => void
  handleDelete: (payload: any) => Promise<void>
}

const ListView = ({loading, transactionsData, handleOpenViewModal, handleDelete}: IProps) => {
  const columns: ColumnsType<ITransaction> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => <Typography.Text>{moment(date).format('YYYY-MM-DD')}</Typography.Text>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
    },
    {
      title: 'Actions',
      dataIndex: undefined,
      key: 'actions',
      render: (value, record) => {
        return <Space>
          <Button icon={<EditOutlined/>} onClick={() => handleOpenViewModal(record)}>Edit</Button>
          <Button
            icon={<DeleteOutlined/>}
            danger
            onClick={() => handleDelete({payload: record, transactionId: record._id})}>
            Delete
          </Button>
        </Space>
      }
    }
  ];

  return (
    <Space direction="vertical" size="large" style={{width: '100%'}}>
      <Table dataSource={transactionsData.map(t => {
        return {key: t._id, ...t}
      })} columns={columns}/>;
    </Space>
  );
};

export default ListView;
