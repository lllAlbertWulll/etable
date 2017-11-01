# etable
用Ajax和php实现表格的实时编辑

Implement tables in real time editing by ajax and php

## Ajax 主要应用场景
  * 异步搜索过滤内容数据;
  * 表单异步验证;
  * 异步加载内容数据;
  * 低调处理一些数据逻辑;

## Ajax 主要特点
  1. 在不刷新当前页面的前提下，与服务器进行异步交互;
  2. 优化了浏览器与服务器之间的数据传输，减少了不必要的数据往返;
  3. 把部分数据处理转移到客户端，减少了服务器的压力;
  
## 实现 Ajax 基本思路
  1. 根据需求选择一个javascript类库，常见的如：jQuery;
  2. javascript部分向服务器端传递数据;
  3. php接受传递的数据，处理数据，返回给javascript;
  4. javascript接受php的数据，并做相应的处理;
