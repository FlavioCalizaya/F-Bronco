

export const dateParse = (data: any) =>{
    const sellingDate = data.split('-',3)
    const year = sellingDate[0]
    const month = sellingDate[1]
    const date = sellingDate[2].split('T',2)[0]

    return year+'/'+ month+'/'+date
}
