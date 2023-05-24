<template>
    <div class="lowcode-plugin-sample-preview">
      <Suspense>
        <VueRenderer
          v-if="schema"
          class="lowcode-plugin-sample-preview-content"
          :schema="schema"
          :components="components"
          :disableComMock="false"
        ></VueRenderer>
        <template #fallback>
          <div class="lowcode-plugin-sample-preview-loading">loading...</div>
        </template>
      </Suspense>
    </div>
</template>

<script>
  import VueRenderer from "@knxcloud/lowcode-vue-renderer";
  import {buildComponents} from "@knxcloud/lowcode-utils";
  import {toRaw,Suspense} from 'vue';
  export default {
    name:'CPage',
    components:{
      VueRenderer,
      Suspense
    },
    data(){
      return{
        schema:"",
        components:""
      }
    },
    mounted(){
      this.renderPage();
    },
    methods:{
      async initSchema(){
        const packages=require("@/assets/assets.json");
        const projectSchema = JSON.parse("{{\n" +
          "    \"version\": \"1.0.0\",\n" +
          "    \"componentsMap\": [\n" +
          "        {\n" +
          "            \"devMode\": \"lowCode\",\n" +
          "            \"componentName\": \"Page\"\n" +
          "        }\n" +
          "    ],\n" +
          "    \"componentsTree\": [\n" +
          "        {\n" +
          "            \"componentName\": \"Page\",\n" +
          "            \"id\": \"node_dockcviv8fo1\",\n" +
          "            \"docId\": \"doclhk9ucvr\",\n" +
          "            \"props\": {\n" +
          "                \"style\": {}\n" +
          "            },\n" +
          "            \"fileName\": \"/\",\n" +
          "            \"state\": {\n" +
          "                \"text\": \"outer\",\n" +
          "                \"showDetail\": false\n" +
          "            },\n" +
          "            \"dataSource\": {\n" +
          "                \"list\": [\n" +
          "                    {\n" +
          "                        \"type\": \"fetch\",\n" +
          "                        \"isInit\": false,\n" +
          "                        \"options\": {\n" +
          "                            \"params\": {},\n" +
          "                            \"method\": \"GET\",\n" +
          "                            \"isCors\": true,\n" +
          "                            \"timeout\": 5000,\n" +
          "                            \"headers\": {},\n" +
          "                            \"uri\": \"mock/info.json\"\n" +
          "                        },\n" +
          "                        \"id\": \"info\"\n" +
          "                    }\n" +
          "                ]\n" +
          "            },\n" +
          "            \"css\": \"body {\\n  font-size: 12px;\\n}\\n\\n.button {\\n  width: 100px;\\n  color: #ff00ff\\n}\",\n" +
          "            \"lifeCycles\": {\n" +
          "                \"initProps\": {\n" +
          "                    \"type\": \"JSExpression\",\n" +
          "                    \"value\": \"{\\n    style: {\\n      type: Object,\\n      default: {}\\n    },\\n  }\"\n" +
          "                },\n" +
          "                \"mounted\": {\n" +
          "                    \"type\": \"JSFunction\",\n" +
          "                    \"value\": \"function () {\\n    console.log('did mount');\\n  }\"\n" +
          "                },\n" +
          "                \"beforeMount\": {\n" +
          "                    \"type\": \"JSFunction\",\n" +
          "                    \"value\": \"function () {\\n    console.log('will unmount');\\n  }\"\n" +
          "                }\n" +
          "            },\n" +
          "            \"originCode\": \"class LowcodeComponent extends Component {\\n  state = {\\n    \\\"text\\\": \\\"outer\\\",\\n    \\\"isShowDialog\\\": false,\\n    \\\"info\\\": {\\n      \\\"info\\\": \\\"\\\",\\n      \\\"user\\\": {\\n        \\\"username\\\": \\\"\\\",\\n        \\\"password\\\": \\\"\\\"\\n      }\\n    }\\n  }\\n  componentDidMount() {\\n    console.log('did mount');\\n  }\\n  componentWillUnmount() {\\n    console.log('will unmount');\\n  }\\n  testFunc() {\\n    console.log('test func');\\n  }\\n  onClick() {\\n    this.setState({\\n      isShowDialog: true\\n    })\\n  }\\n  closeDialog() {\\n    this.setState({\\n      isShowDialog: false\\n    })\\n  }\\n\\n\\tonClick_new(){\\n    this.$message.success('hhhhhh')\\n\\t}\\n\\n\\tonSubmit(ev){\\n    ev.preventDefault();\\n    \\n\\t}\\n}\",\n" +
          "            \"hidden\": false,\n" +
          "            \"title\": \"\",\n" +
          "            \"isLocked\": false,\n" +
          "            \"condition\": true,\n" +
          "            \"conditionGroup\": \"\",\n" +
          "            \"meta\": {\n" +
          "                \"originCode\": \"import { defineComponent } from 'vue';\\n\\nexport default defineComponent({\\n  props: {\\n    style: {\\n      type: Object,\\n      default: {}\\n    },\\n  },\\n  data: () => ({\\n    text: \\\"outer\\\",\\n    showDetail: false\\n  }),\\n  methods: {},\\n  mounted() {\\n    console.log('did mount');\\n  },\\n  beforeMount() {\\n    console.log('will unmount');\\n  },\\n})\\n\"\n" +
          "            }\n" +
          "        }\n" +
          "    ],\n" +
          "    \"i18n\": {}\n" +
          "}}");
        if(!packages.length||!Object.keys(projectSchema).length){
          return {schema:'',components:''};
        }
        const { componentsMap:componentsMapArray=[], componentsTree=[]} = projectSchema;
        const componentsMap = {};
        // 将组件数组转换为对应映射
        componentsMapArray.forEach(component=>{
          componentsMap[component.componentName] = component;
        });
        const libraryMap = {};// 创建库的Map
        const libraryAssets = []; // 相关第三方包的资源数组
        packages.forEach(({package:_package,library,urls,renderUrls})=>{
          libraryMap[_package] = library;
          if(renderUrls){
            libraryAssets.push(renderUrls);
          }else if(urls){
            libraryAssets.push(urls);
          }
        })
        const components = buildComponents(libraryMap,componentsMap);
        return { schema: componentsTree[0] , components };
      },
      async renderPage(){
        const {schema,components} = await this.initSchema();
        this.schema = toRaw(schema);
        this.components = toRaw(components);
      }
    }
  }
</script>
