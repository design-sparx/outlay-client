import React from 'react';
import {Button, DatePicker, Form, Input, InputNumber, message, Modal, Select} from "antd";
import {CloseOutlined, SaveOutlined} from "@ant-design/icons";
import dayjs from 'dayjs';
import {ITransaction, IUser} from "../../types";

interface IProps {
  open: boolean
  handleClose: () => void
  loading: boolean
  handlePost: (payload: any) => Promise<void>
  selectedItem: ITransaction
}

const AddEditTransactions = ({loading, handlePost, handleClose, open, selectedItem}: IProps) => {
  const onFinish = async (values: any): Promise<void> => {
    console.log('Success:', values);
    try {
      const user: IUser | null = JSON.parse(localStorage.getItem('outlay-user') ?? '');
      if (Boolean(selectedItem)) {
        await handlePost({
          payload: {
            ...values,
            userid: user?._id
          },
          transactionId: selectedItem._id
        });
      } else {
        await handlePost({
          ...values,
          userid: user?._id
        });
      }
    } catch (e) {
      message.error('Something went wrong');
    }
  };

  const onFinishFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo);
    message.error('Something went wrong');
  };

  return (
    <Modal
      title={`${Boolean(selectedItem) ? 'Edit' : 'Add a new'} transaction`}
      centered
      open={open}
      onCancel={handleClose}
      footer={null}
    >
      <Form
        layout="vertical"
        labelCol={{span: 8}}
        wrapperCol={{span: 24}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{...selectedItem, date: dayjs(selectedItem?.date)}}>
        <Form.Item label="Amount" name="amount">
          <InputNumber min={1} style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item label="Type" name="type">
          <Select
            options={[
              {value: 'income', label: 'Income'},
              {value: 'expense', label: 'Expense'},
            ]}
          />
        </Form.Item>
        <Form.Item label="Category" name="category">
          <Select
            options={[
              {value: 'salary', label: 'Salary'},
              {value: 'freelance', label: 'Freelance'},
              {value: 'food', label: 'Food'},
              {value: 'entertainment', label: 'Entertainment'},
              {value: 'investment', label: 'Investment'},
              {value: 'education', label: 'Education'},
              {value: 'medical', label: 'Medical'},
              {value: 'tax', label: 'Tax'},
            ]}
          />
        </Form.Item>
        <Form.Item label="Date" name="date">
          <DatePicker style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item label="Reference" name="reference">
          <Input type="text"/>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3}/>
        </Form.Item>
        <Form.Item className="d-flex justify-content-end">
          <Button icon={<CloseOutlined/>} onClick={handleClose} loading={loading}>Cancel</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="primary" htmlType="submit" icon={<SaveOutlined/>} loading={loading}>Save</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditTransactions;
