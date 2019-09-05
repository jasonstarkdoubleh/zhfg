//tableData
let tableData = []
let tableObj = {
  name: 'name',
  type: 'type',
  start: 'start',
  end: 'end',
  creat: 'creat',
  remarks: 'remarks',
  status: true
}
for(let i = 0;i<10;i++){
  tableData.push(tableObj)
}

//goodsData
let goodsData = []
let goodsObj = {
  name: 'name',
  type: 'type',
  bigclass: 'bigclass',
  warning: 'warning',
  warningname: 'warningname',
  remarks: 'remarks',
  config:'config'
}
for(let i = 0;i<10;i++){
  goodsData.push(goodsObj)
}

export default [
  {
    url: '/warning/getTableData',
    type: 'get',
    response: () => {
      return {
        code: 0,
        data:{
          data:tableData,
          total:10
        }
      }
    }
  },

  {
    url: '/warning/getGoodsData',
    type: 'get',
    response: () => {
      return {
        code: 0,
        data:{
          data:goodsData,
          total:10
        }
      }
    }
  }
]
