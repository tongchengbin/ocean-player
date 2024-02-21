module.exports ={
    chainWebpack:config=>{
        config.plugin('html').tap(args=>{
            args[0].title = 'Ocean CTF 实训平台'
            args[0].keyword = 'CTF,Ocean,漏洞,安全,夺旗'
            return args
        })
    },
    lintOnSave:false
}
