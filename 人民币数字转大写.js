/*
《正确填写票据和结算凭证的基本规定》 
银行、单位和个人填写的各种票据和结算凭证是办理支付结算和现金收付的重要依据，直接关系到支付结算的准确、及时和安全。票据和结算凭证是银行、单位和个人凭以记载账务的会计凭证，是记载经济业务和明确经济责任的一种书面证明。因此，填写票据和结算凭证，必须做到标准化、规范化，要要素齐全、数字正确、字迹清晰、不错漏、不潦草，防止涂改。中文大写金额数字应用正楷或行书填写，如壹（壹）、贰（贰）、叁、肆（肆）、伍（伍）、陆（陆）、柒、捌、玖、拾、佰、仟、万（万）、亿、元、角、分、零、整（正）等字样。不得用一、二（两）、三、四、五、六、七、八、九、十、念、毛、另（或0）填写，不得自造简化字。如果金额数字书写中使用繁体字，如贰、陆、亿、万、圆的，也应受理。 

一、中文大写金额数字到"元"为止的，在"元"之后，应写"整"（或"正"）字，在"角"之后，可以不写"整"（或"正"）字。大写金额数字有"分"的，"分"后面不写"整"（或"正"）字。 

二、中文大写金额数字前应标明"人民币"字样，大写金额数字有"分"的，"分"后面不写"整"（或"正"）字。 

三、中文大写金额数字前应标明"人民币"字样，大写金额数字应紧接"人民币"字样填写，不得留有空白。大写金额数字前未印"人民币"字样的，应加填"人民币"三字。在票据和结算凭证大写金额栏内不得预印固定的"仟、佰、拾、万、仟、佰、拾、元、角、分"字样。 

四、阿拉伯数字小写金额数字中有"0"时，中文大写应按照汉语语言规律、金额数字构成和防止涂改的要求进行书写。举例如下： 

1·阿拉伯数字中间有"0"时，中文大写要写"零"字，如￥1409.50，应写成人民币陆壹仟肆佰零玖元伍角。 
2·阿拉伯数字中间连续有几个"0"时，中文大写金额中间可以只写一个"零"字，如￥6007.14，应写成人民币陆仟零柒元壹角肆分。 
3·阿拉伯金额数字万位和元位是"0"，或者数字中间连续有几个"0"，万位、元位也是"0"，但千位、角位不是"0"时，中文大写金额中可以只写一个零字，也可以不写"零"字。如￥1680.32，应写成人民币壹仟陆佰捌拾元零叁角贰分，或者写成人民币壹仟陆佰捌拾元叁角贰分，又如￥107000.53，应写成人民币壹拾万柒仟元零伍角叁分，或者写成人民币壹拾万零柒仟元伍角叁分。 
4·阿拉伯金额数字角位是"0"，而分位不是"0"时，中文大写金额"元"后面应写"零"字。如￥16409.02，应写成人民币壹万陆仟肆佰零玖元零贰分；又如￥325.04，应写成人民币叁佰贰拾伍元零肆分。 
五、阿拉伯小写金额数字前面，均应填写人民币符号"￥"。阿拉伯小写金额数字要认真填写，不得连写分辨不清。 
六、票据的出票日期必须使用中文大写。为防止变造票据的出票日期，在填写月、日时，月为壹、贰和壹拾的，日为壹至玖和壹拾、贰拾和叁拾的，应在其前加"零"；日为拾壹至拾玖的，应在其前加"壹"。如1月15日，应写成零壹月壹拾伍日。再如10月20日，应写成零壹拾月零贰拾日。 

七、票据出票日期使用小写填写的，银行不予受理。大写日期未按要求规范填写的，银行可予受理，但由此造成损失的，由出票人自行承担。
*/
//数字转人民币大写
function ConvertChineseMoney(money) {
    var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
    var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
    var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
    var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
    var cnInteger = "整"; //整数金额时后面跟的字符
    var cnIntLast = "元"; //整型完以后的单位
    var maxNum = 999999999999999.9999; //最大处理的数字

    var IntegerNum; //金额整数部分
    var DecimalNum; //金额小数部分
    var ChineseStr = ""; //输出的中文金额字符串
    var parts; //分离金额后用的数组，预定义

    if (money == "") {
        return "";
    }

    money = parseFloat(money);
    if (money >= maxNum) {
        $.alert('超出最大处理数字');
        return "";
    }
    if (money == 0) {
        ChineseStr = cnNums[0] + cnIntLast + cnInteger;
        return ChineseStr;
    }
    money = money.toString(); //转换为字符串
    if (money.indexOf(".") == -1) {
        IntegerNum = money;
        DecimalNum = '';
    } else {
        parts = money.split(".");
        IntegerNum = parts[0];
        DecimalNum = parts[1].substr(0, 4);
    }
    if (parseInt(IntegerNum, 10) > 0) {//获取整型部分转换
        zeroCount = 0;
        IntLen = IntegerNum.length;
        for (i = 0; i < IntLen; i++) {
            n = IntegerNum.substr(i, 1);
            p = IntLen - i - 1;
            q = p / 4;
            m = p % 4;
            if (n == "0") {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    ChineseStr += cnNums[0];
                }
                zeroCount = 0; //归零
                ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
                ChineseStr += cnIntUnits[q];
            }
        }
        ChineseStr += cnIntLast;
        //整型部分处理完毕
    }
    if (DecimalNum != '') {//小数部分
        decLen = DecimalNum.length;
        for (i = 0; i < decLen; i++) {
            n = DecimalNum.substr(i, 1);
            if (n != '0') {
                ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (ChineseStr == '') {
        ChineseStr += cnNums[0] + cnIntLast + cnInteger;
    }
    else if (DecimalNum == '') {
        ChineseStr += cnInteger;
    }
    //如果元位刚好为零，后面需要补零
    //if (ChineseStr.indexOf('拾元') >= 0) {
    //    if (ChineseStr.indexOf('分') >= 0 || ChineseStr.indexOf('角') >= 0) { //处理只到10元，又刚好有角或分的情况
    //        ChineseStr = ChineseStr.substr(0, ChineseStr.indexOf('元') + 1) + '零' + ChineseStr.substr(ChineseStr.indexOf('元') + 1);
    //    }
    //} else
    if (ChineseStr.indexOf('分') >= 0 && ChineseStr.indexOf('角') < 0) {//处理没有角有分的情况
        if (ChineseStr.indexOf('元') > 0) {
            ChineseStr = ChineseStr.substr(0, ChineseStr.indexOf('元')+1) + '零' + ChineseStr.substr(ChineseStr.indexOf('元') + 1);
        }
    }
    return ChineseStr;
}