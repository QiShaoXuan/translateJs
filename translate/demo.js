export default {
    label: '环评测试',
    name: 'test',
    type: 'tab',//ajflkja
    children: [
        {
            label:'排污测试',
            name:'',
            type:'tab',
            children:[
                {
                    label:'废气污染物',
                    name:'',
                    type:'input',
                    value:''
                },
                {
                    label:'固废污染物',
                    name:'',
                    type:'checkbox',
                    value:''
                }
            ]
        },
        {
            label:'法人信息',
            name:'',
            type:'tab',
            children:[
                {
                    label:'公司名称',
                    name:'',
                    type:'radio',
                    value:''
                }
            ]
        }
    ]
}
