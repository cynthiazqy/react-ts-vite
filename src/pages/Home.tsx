import { Button, Space } from 'antd';
import { useState } from 'react';

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="home-page">
      <h1>首页</h1>
      <div className="card">
        <Space>
          <Button type="primary" onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Home;
