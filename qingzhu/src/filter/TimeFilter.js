Date.prototype.getweek = function(){
    var num = this.getDay();
    var week = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六']
    return week[num]
};
export default 
    (time)=>{
    var time = JSON.parse(time)
    var data = new Date(time);
    var year = data.getFullYear();
    var month = (data.getMonth()+1+"").padStart(2,"0");
    var day = (data.getDate()+"").padStart(2,"0");

    // var hour = (data.getHours()+"").padStart(2,"0");
    // var minute = (data.getMinutes()+"").padStart(2,"0");
    // var second = (data.getSeconds()+"").padStart(2,"0");
    var week = data.getweek();

    return `${year}年${month}月${day}日 ${week}`


}
