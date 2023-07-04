const fs = require("fs");
const path = require("path");
const process = require("process");

const defaultContent="{\n" +
  "  \"componentName\": \"Page\",\n" +
  "  \"id\": \"node_dockcviv8fo1\",\n" +
  "  \"props\": {\n" +
  "    \"style\": {\n" +
  "      \"height\": \"100%\",\n" +
  "      \"padding\": \"0\",\n" +
  "      \"backgroundColor\": \"#fff\",\n" +
  "      \"paddingTop\": \"10px\"\n" +
  "    }\n" +
  "  },\n" +
  "  \"docId\": \"doclhk9ucvr\",\n" +
  "  \"fileName\": \"/\",\n" +
  "  \"state\": {\n" +
  "    \"matchFields\": {},\n" +
  "    \"page\": {\n" +
  "      \"pageNumber\": 1,\n" +
  "      \"pageSize\": 10\n" +
  "    },\n" +
  "    \"sort\": {\n" +
  "      \"key\": \"id\",\n" +
  "      \"sortType\": \"ASC\"\n" +
  "    }\n" +
  "  },\n" +
  "  \"dataSource\": {\n" +
  "    \"list\": []\n" +
  "  },\n" +
  "  \"css\": \"body {\\n  font-size: 12px;\\n}\\n\\n.button {\\n  width: 100px;\\n  color: #ff00ff\\n}\",\n" +
  "  \"lifeCycles\": {\n" +
  "    \"initModule\": {\n" +
  "      \"type\": \"JSExpression\",\n" +
  "      \"value\": \"(() => {const $id = \\\"node_dockcviv8fo1\\\"; return ($cached, $scope = window) => {\\n  if ($id in $cached) return $cached[$id];\\n  const exports = $cached[$id] = {};\\n  const {defineComponent,toRaw} = $scope[\\\"Vue\\\"];\\nconst {default: axios} = $scope[\\\"axios\\\"];\\n  exports.defineComponent = defineComponent;\\n  exports.toRaw = toRaw;\\n  exports.axios = axios;\\n  return exports;\\n}})()\"\n" +
  "    },\n" +
  "    \"initProps\": {\n" +
  "      \"type\": \"JSExpression\",\n" +
  "      \"value\": \"{\\n    style: {\\n      type: Object,\\n      default: {}\\n    },\\n  }\"\n" +
  "    },\n" +
  "    \"mounted\": {\n" +
  "      \"type\": \"JSFunction\",\n" +
  "      \"value\": \"function () {\\n    console.log('mounted')\\n  }\"\n" +
  "    },\n" +
  "    \"beforeMount\": {\n" +
  "      \"type\": \"JSFunction\",\n" +
  "      \"value\": \"function () {\\n    console.log('will unmount');\\n  }\"\n" +
  "    }\n" +
  "  },\n" +
  "  \"originCode\": \"class LowcodeComponent extends Component {\\n  state = {\\n    \\\"text\\\": \\\"outer\\\",\\n    \\\"isShowDialog\\\": false,\\n    \\\"info\\\": {\\n      \\\"info\\\": \\\"\\\",\\n      \\\"user\\\": {\\n        \\\"username\\\": \\\"\\\",\\n        \\\"password\\\": \\\"\\\"\\n      }\\n    }\\n  }\\n  componentDidMount() {\\n    console.log('did mount');\\n  }\\n  componentWillUnmount() {\\n    console.log('will unmount');\\n  }\\n  testFunc() {\\n    console.log('test func');\\n  }\\n  onClick() {\\n    this.setState({\\n      isShowDialog: true\\n    })\\n  }\\n  closeDialog() {\\n    this.setState({\\n      isShowDialog: false\\n    })\\n  }\\n\\n\\tonClick_new(){\\n    this.$message.success('hhhhhh')\\n\\t}\\n\\n\\tonSubmit(ev){\\n    ev.preventDefault();\\n    this.dataSourceMap.submit.load()\\n\\t}\\n}\",\n" +
  "  \"hidden\": false,\n" +
  "  \"title\": \"\",\n" +
  "  \"isLocked\": false,\n" +
  "  \"condition\": true,\n" +
  "  \"conditionGroup\": \"\",\n" +
  "  \"meta\": {\n" +
  "    \"originCode\": \"import { defineComponent,toRaw } from 'vue';\\nimport axios from \\\"axios\\\";\\nexport default defineComponent({\\n  props: {\\n    style: {\\n      type: Object,\\n      default: {}\\n    },\\n  },\\n  data: () => ({\\n    matchFields:{},\\n    page:{\\n      pageNumber:1,\\n      pageSize:10\\n    },\\n    sort:{\\n      key:\\\"id\\\",\\n      sortType:\\\"ASC\\\"\\n    },\\n  }),\\n  methods: {\\n   \\n  },\\n  mounted() {\\n    console.log('mounted')\\n  },\\n  beforeMount() {\\n    console.log('will unmount');\\n  },\\n})\\n\"\n" +
  "  }\n" +
  "}\n";

const KEY_MAP = {
  SCHEMA:0,
  ROUTER:1
};

function createFile(fileName,content,writePath,key = KEY_MAP.SCHEMA) {
  const opt = {
    flag:'w'
  };
  if(!writePath){
    writePath = path.resolve(process.cwd(),'../assets');
  }
  return new Promise((resolve,reject)=>{
    if(!content && key === KEY_MAP.SCHEMA){
      content = defaultContent;
    }
    fs.writeFile(writePath,content,opt,(err,data)=>{
      if(err){
        return reject( {msg:writePath+'写入失败',code:500});
      }
      resolve({msg:'写入成功',code:200})
    })
  })
}

function isFileExists(fileName) {
  return fs.existsSync(fileName);
}

function removeFile(fileName) {
  return new Promise((resolve,reject)=>{
    fs.unlink(fileName,(err,data)=>{
      if(err){
        return reject({msg:'删除文件失败',code:500});
      }
      resolve({msg:'删除成功',code:200});
    })
  })
}
module.exports={
  createFile,
  isFileExists,
  removeFile
}
