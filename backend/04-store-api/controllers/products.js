const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({
        price: {$gt:30}//mongodb query operator: i for case insensitive, search 是一個pattern(正則表達式要抓的)
    }).sort('price').select('name price')
    // throw new Error('testing async error') // express-async-errors package used 丟出去error-handler會去接
    res.status(200).json({products, nbHits: products.length})
} 

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query // 抓有沒有...key，若都沒有就是空的，應該值是undefined
    const queryObject = {}

    if (featured) {
        queryObject.featured = ( (featured === 'true') ? true : false ) // 三元運算子
        
    }

    if (company) { 
        queryObject.company = company 
        
    }

    if (name) {               // $option:'i' 有問題不能用
        queryObject.name = {$regex: name} //mongodb query operator: i for case insensitive, name 是一個pattern(正則表達式要抓的)
    }

    if (numericFilters) {
        const operatorMap = { // 把方便使用者的形式轉成資料庫使用的格式
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g         // javascript的regEX寫法就是把要抓去的pattern放在//之中，/<parttern>/， \b是邊界的意思，()中間用|區隔不同符號，g (flag) is for global search
        let filters = numericFilters.replace(regEx, (match)=>{return `-${operatorMap[match]}-`}) // 把配對到的部分坐後面function的更改，這是活的寫法
        console.log(filters)
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item)=> {  // forEach()就是迴圈
            const [field, operator, value] = item.split('-')
            if (options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
    }

    // sort
    // 這邊有個重點是不能用await因為，若使用find回傳的會是一個已從資料庫撈出來的回傳資料，這樣我們就不能繼續sort()的操作，sort()是在撈取資料的過程中的一個步驟
    let result = Product.find(queryObject)  // 要先find，後面才可以繼續接limit(), sort()之類的
    if (sort) {
        const sortList = sort.split(',').join(' ') // 因為query string回傳時若有多個key是以,分隔value，而sort()的參數是以空白分隔
        result = result.sort(sortList) // result是find()出來的結果，後面可以繼續chain sort()....(注意: 這裡都是只在資料庫中撈取資料的過程，尚未回傳結果回來)
    }
    else{ // default sorted
        result.sort('createdAt')
    }

    // fields
    if (fields) {   // 寫的邏輯跟sort一樣
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }

    // 這邊跟sort, fields的邏輯一樣 
    const page = Number(req.query.page) || 1    
    const limit = Number(req.query.limit) || 10 // 每一頁的比數
    const skip = (page-1) * limit               
    
    result = result.skip(skip).limit(limit) // skip()是跳過前...筆，跟sql 的 offset一樣

    const products = await result // 等待最終資料回傳的結果，所以這邊再用await   // req.query可以拿到url ? 後面的部分(query string) key=value pair的形式 
    res.status(200).json({products, nbHits: products.length})
} 
module.exports = {
    getAllProductsStatic,
    getAllProducts
}