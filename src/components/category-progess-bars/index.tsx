import React from 'react';
import {Card, Progress, Space, Typography} from "antd";
import {ITransaction} from "../../types";

interface IProps {
  type: 'income' | 'expense'
  categories: string[]
  transactionData: ITransaction[]
  turnover: number
}

const CategoryProgessBars = ({categories, transactionData, turnover, type}: IProps) => {
  return (
    <Card title={`${type === 'income' ? 'Income' : 'Expense'} per category`}>
      <Space direction="vertical" style={{width: '100%'}}>
        {categories.map(c => {
          const amount = transactionData.filter(t => t.type === type && t.category === c)
            .reduce((acc, _) => acc + _.amount, 0);
          return amount > 0 && <div key={`income-${c}`}>
						<Typography.Text strong>{c}</Typography.Text>
						<Progress
							percent={Number(((amount / turnover) * 100).toFixed(0))}/>
					</div>
        })}
      </Space>
    </Card>
  );
};

export default CategoryProgessBars;
