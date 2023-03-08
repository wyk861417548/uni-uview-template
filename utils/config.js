export default{
  // 加密
  querycode(obj,boolen){
    boolen=boolen==false?boolen:true;
    
    if(boolen == false){
      return JSON.parse(decodeURIComponent(obj.data))
    }
    return '?data='+ encodeURIComponent(JSON.stringify(obj));
  },
	
	/**
   * 数据脱敏显示
   * str 脱敏字符串
   * start 开始位置留字符数量
   * end 结束位置留字符数量
   * fixflag 脱敏显示字符
   */
  stringTakeoff(str, start, end, fixflag = '*') {
    const fixStr = []

    const endPoint = str.length - end

    for (let i = 0; i < str.length; i++) {
      if (i < start || (i >= endPoint && str.length > 2)) {
        fixStr.push(str[i])
      } else {
        fixStr.push(fixflag)
      }
    }

    return fixStr.join('')
  },
	
	//获取当前页面的路由地址
	getRouter(){
		let pages = getCurrentPages();
		let router = pages[ pages.length-1 ].route;
		
		return router;
	},

  /**
   * 根据身份证号码获取出生年月日
   *
   * @export
   * @param {*} idCard
   * @returns
   */
   getAgeByIdCard:function (idCard) {
    //获取年龄
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
    if (idCard.substring(10, 12) < month || idCard.substring(10, 12) == month && idCard.substring(12, 14) <= day) {
        age++;
    }
    
    return age;
  },
	
	//日期格式转换
	dateformat(date,fmt){
		let _date = date ? date : new Date();
		
		let cNumber=["日","一","二","三","四","五","六"];
		
		let o = {
			"M+": _date.getMonth() + 1, //月份 
			"d+": _date.getDate(), //日 
			"h+": _date.getHours(), //小时 
			"m+": _date.getMinutes(), //分 
			"s+": _date.getSeconds(), //秒
			'w+': cNumber[_date.getUTCDay()], //星期
			"q+": Math.floor((_date.getMonth() + 3) / 3), //季度 
			"S": _date.getMilliseconds() //毫秒 
		};
		
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (let k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	},
}