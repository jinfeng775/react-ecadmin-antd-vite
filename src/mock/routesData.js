// 模拟后端返回的路由数据
const mockRoutesData = {
  "code": 200,
  "message": "获取路由菜单成功",
  "data": {
    "routes": [
      {
        "path": "/pageA",
        "name": "页面 A",
        "icon": "pie-chart",
        "children": [
          {
              "path": "aa",
              "name": "AA",
              "icon": "line-chart"
            },
            {
              "path": "ab",
              "name": "AB",
              "icon": "area-chart"
            }
        ]
      },
      {
        "path": "/pageB",
        "name": "页面 B",
        "icon": "form"
      },

    ]
  }
};

export default mockRoutesData;