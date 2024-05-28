export const generateUrlWthSearchParams = (url, params, filters, page=null) => {
    let tempUrl = `${url}?`
    params.forEach((param) => {
        let data = param.label.split(':')
        if(data[0] === "Projects"){
            tempUrl += `project_id=${filters.Projects}&`
        }
        else if(data[0] === "activityType"){
            tempUrl += `activityType=${filters.activityType}&`
        }
        else if(data[0] === "PlotStatus"){
            tempUrl += `PlotStatus=${filters.PlotStatus}&`
        }
        else if(data[0] === "sort"){
            tempUrl += `sort=${filters.sort}&`
        }
        else{
            if(data[0] !== "Organizations"){
                tempUrl += `${data[0]}=${data[1].trim()}&`
            }
        }
    })
    if(page){
        tempUrl += `page=${page}`
    }
    return tempUrl
}
