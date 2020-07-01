const OSS=require('ali-oss')

export function client(data){
    //后端提供数据
    return new OSS({
        accessKeyId:data.accessKeyId,
        accessKeySecret:data.accessKeySecret,
        stsToken:data.securityToken,
        region:data.region, //oss地区
        bucket:data.bucket,
        //withCredentials: true,
        //crossDomain:true,
    })
}