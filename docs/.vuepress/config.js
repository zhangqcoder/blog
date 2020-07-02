module.exports = {
  title: "zhangQ博客",
  description: "喜欢前端技术的一名小学生",
  base: "/blog/",
  themeConfig: {
    nav: [
      { text: "文章目录", link: "/article/" },
      { text: "github", link: "https://github.com/zhangqcoder" }
    ],
    sidebar: {
      // docs文件夹下面的article文件夹 文档中md文件 书写的位置(命名随意)
      "/article/": [
        "/article/", // article文件夹的README.md 不是下拉框形式
        {
          title: "JavaScript 基础",
          children: [
            "/article/JavaScript基础/变量和类型", // 以docs为根目录来查找文件
            // 自动加.md 每个子选项的标题 是该md文件中的第一个h1/h2/h3标题
            "/article/JavaScript基础/原型和原型链",
            "/article/JavaScript基础/作用域和闭包",
            "/article/JavaScript基础/执行机制",
            "/article/JavaScript基础/语法和API"
          ]
        },
        {
          title: "数据结构和算法",
          children: [
            "/article/数据结构和算法/JavaScript编码能力",
            "/article/数据结构和算法/手动实现前端轮子",
            "/article/数据结构和算法/数据结构",
            "/article/数据结构和算法/算法"
          ]
        }
      ]
      // docs文件夹下面的other文件夹 这是第二组侧边栏 跟第一组侧边栏没关系
      // '/other/': [
      //   '/other/',
      //   {
      //     title: '第二组侧边栏下拉框的标题1',
      //     children: ['/other/simple/test']
      //   }
      // ]
    },
    sidebarDepth: 2,
    lastUpdated: "Last Updated"
  }
};
