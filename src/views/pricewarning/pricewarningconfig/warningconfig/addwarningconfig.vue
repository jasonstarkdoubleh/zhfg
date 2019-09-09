<template>
  <div>
    123
  </div>
</template>

<script>
    export default {
        name: "addwarningconfig",
        data(){
            return {
                upDateShow: true,                            //显示涨幅天数
                colorOne:'#FF0000',
                colorTwo:'#FFA500',
                colorThree:'#FFFF00',
                colorFour:'#008000',
                disabled:false,
                dialogLoading:false,
                sizeForm: {
                    ewarnName: '',
                    ewarnTypeId: '',
                    beginDate:'',
                    endDate:'',
                    crteName:'',
                    ewarnTerm:'',
                    ewarnDays:0,
                    remarks:'',
                    ewarnUlmtRed:'',
                    ewarnLlmtRed:'',
                    ewarnUlmtOrange:'',
                    ewarnLlmtOrange:'',
                    ewarnUlmtYellow:'',
                    ewarnLlmtYellow:'',
                    ewarnUlmtGreen:'',
                    ewarnLlmtGreen:'',
                },
                warningTypeOptions: [],
            }
        },
        methods:{
            handleUpDateShow(boo) {                                                    //控制输入涨幅天数
                this.upDateShow = boo;
                console.log(this.upDateShow);
            },
            onSubmit() {
                console.log(this.sizeForm.beginDate);
                this.dialogLoading = true;
                this.disabled = true;
            },
        }
    }
</script>

<style scoped>

</style>
