# lowcode-engine-demo

Lowcode Engine Vue demo

## 运行演示

```bash
git clone https://github.com/lyllovelemon/lowcode-vue-demo.git
cd lowcode-vue-demo
pnpm install
pnpm start
```

## 使用注意事项

使用变量时：

- `this.props.xxx` -> `this.xxx`
- `this.state.xxx` -> `this.xxx`

现阶段 vue 代码编辑器已支持

- state 内容会自动转化为 vue data
- lifecycle 自动适配为 vue lifecycle
  - `componentDidMount` -> `onMounted`
  - `componentDidCatch` -> `onErrorCaptured`
  - `shouldComponentUpdate` -> `onBeforeUpdate`
  - `componentWillUnmount` -> `onBeforeUnmount`
- 其余方法自动转化为 vue methods
