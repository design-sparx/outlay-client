import { Space, Spin } from 'antd';
import React from 'react';

const Spinner = () => {
  return (
    <Space>
      <Spin tip="Loading">
        <div className="content" />
      </Spin>
    </Space>
  );
};

export default Spinner;
