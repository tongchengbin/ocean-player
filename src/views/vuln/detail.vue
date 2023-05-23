<template>
  <div class="container">
    <div style="margin-top: 30px"></div>
    <h2>{{data.name}}</h2>
    <div id="my-markdown" class="markdown-body">
      <div v-html="renderedMarkdown"></div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import 'mavon-editor/dist/css/index.css'
import MarkdownIt from 'markdown-it';
export default {
  name: "detail",
  components:{

  },
  data(){
    return {
      markdownText: '# Hello, Markdown!',
      renderedMarkdown:'',
      data:{
        description:'',
        name:''
      }
    }
  },
  created() {
    let {query} = this.$route
    this.getDetail(query.id)
  },

  methods:{
    getDetail(id){
      request.get(`/api/vuln/${id}`).then(res=>{
        const md = new MarkdownIt();
        this.data = res.data
        this.renderedMarkdown = md.render(this.data.description);
      })

    }

  }
}
</script>

<style scoped>

</style>