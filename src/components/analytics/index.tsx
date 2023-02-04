import {Card, Col, Progress, Row, Space, Typography} from 'antd';
import React from 'react';
import {ITransaction} from "../../types";
import CategoryProgessBars from "../category-progess-bars";

interface IProps {
  transactionsData: ITransaction[]
}

const AnalyticsView = ({transactionsData}: IProps) => {
  const totalTransactions = transactionsData.length;
  const totalIncomeTransactions = Number(transactionsData.filter(_ => _.type === 'income').length.toFixed(2));
  const totalExpenseTransactions = Number(transactionsData.filter(_ => _.type === 'expense').length.toFixed(2));
  const totalIncomeTransactionsPercentage = Number(((totalIncomeTransactions / totalTransactions) * 100).toFixed(2));
  const totalExpenseTransactionsPercentage = Number(((totalExpenseTransactions / totalTransactions) * 100).toFixed(2));

  const totalTurnover = Number(transactionsData.reduce((acc, _) => acc + _.amount, 0).toFixed(2));
  const totalIncomeTurnover = Number(transactionsData.filter(_ => _.type === 'income').reduce((acc, _) => acc + _.amount, 0).toFixed(2));
  const totalExpenseTurnover = Number(transactionsData.filter(_ => _.type === 'expense').reduce((acc, _) => acc + _.amount, 0).toFixed(2));
  const totalIncomeTurnoverPercentage = Number(((totalIncomeTurnover / totalTurnover) * 100).toFixed(2));
  const totalExpenseTurnoverPercentage = Number(((totalExpenseTurnover / totalTurnover) * 100).toFixed(2))

  const categories = ['salary', 'freelance', 'food', 'entertainment', 'investment', 'education', 'medical', 'tax'];

  return (
    <Row gutter={[16, 16]}>
      <Col lg={8}>
        <Card title={`Total transactions: ${totalTransactions}`}>
          <Typography.Paragraph>Income: {totalIncomeTransactions}</Typography.Paragraph>
          <Typography.Paragraph>Expenses: {totalExpenseTransactions}</Typography.Paragraph>
          <Space size="middle">
            <Progress type="circle" percent={totalIncomeTransactionsPercentage}/>
            <Progress type="circle" percent={totalExpenseTransactionsPercentage}/>
          </Space>
        </Card>
      </Col>
      <Col lg={8}>
        <Card title={`Total turnover: ${totalTurnover}`}>
          <Typography.Paragraph>Income: {totalIncomeTurnover}</Typography.Paragraph>
          <Typography.Paragraph>Expenses: {totalExpenseTurnover}</Typography.Paragraph>
          <Space size="middle">
            <Progress type="circle" percent={totalIncomeTurnoverPercentage}/>
            <Progress type="circle" percent={totalExpenseTurnoverPercentage}/>
          </Space>
        </Card>
      </Col>
      <Col lg={12}>
        <CategoryProgessBars
          categories={categories}
          type="income"
          transactionData={transactionsData}
          turnover={totalIncomeTurnover}/>
      </Col>
      <Col lg={12}>
        <CategoryProgessBars
          categories={categories}
          type="expense"
          transactionData={transactionsData}
          turnover={totalExpenseTurnover}/>
      </Col>
    </Row>
  );
};

export default AnalyticsView;
